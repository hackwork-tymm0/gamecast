const TymLogger = require("tymlogger");
const getSlots = require("../helpers/getSlots");

const log = new TymLogger();

class Controller {
    constructor (store, client) {
        this.store = store; 
        this.client = client;
    }

    onConnect () {
        log.success(" -> Gamepad authorized!");
        this.store.dispatch({ type: "CONTROLLER_AUTH", payload: this.client });
        this.store.getState().screen.emit("getControllers", getSlots(this.store.getState().controllers));
    }

    onGetId () {
        this.client.emit("getId", this.client.conn.id);
    }

    keysActions () {
        this.client.on("keyPress", (payload) => {
            this.store.dispatch({ type: "KEY_PRESS", payload: payload });
            this.store.getState().screen.emit("getControllers", getSlots(this.store.getState().controllers));
        });
        
        this.client.on("keyUnPress", (payload) => {
            this.store.dispatch({ type: "KEY_UNPRESS", payload: payload });
            this.store.getState().screen.emit("getControllers", getSlots(this.store.getState().controllers));
        });
    }

    onDisconnect () {
        this.client.on("disconnect", () => {
            log.error(" -> Controller disconnected!");
            this.store.dispatch({ type: "CONTROLLER_DISCONNECT", payload: this.client });
            this.store.getState().screen.emit("getControllers", getSlots(this.store.getState().controllers));
        });
    }
}

module.exports = Controller;
