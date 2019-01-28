const TymLogger = require("tymlogger");
const getSlots = require("../helpers/getSlots");

const log = new TymLogger();

class Screen {
    constructor (store, client) {
        this.store = store;
        this.client = client;
    }

    onConnect () {
        log.success(" -> Screen authorized!");
        this.store.dispatch({ type: "SCREEN_AUTH", payload: this.client });

        this.client.emit("getControllers", getSlots(this.store.getState().controllers));
    }

    onDisconnect () {
        this.client.on("disconnect", () => {
            log.error(" -> Screen disconnected!");
            this.store.dispatch({ type: "SCREEN_DISCONNECT" });
        });
    }
}

module.exports = Screen;
