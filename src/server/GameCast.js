
const TymLogger = require("tymlogger");
const { createStore } = require("redux");
const colors = require("colors");

const Reducer = require("./Reducer");
const InitialStore = require("./InitialStore");

const log = new TymLogger();

class GameCast {
    main () {
        log.success("");
        log.success(`GameCast v${require("../../package.json").version}`);
        log.success("---------------------------------------------");
        log.success("");
        log.write("Starting Redux...");
        
        const store = createStore(Reducer, InitialStore);

        store.subscribe(function () {
            console.log(store.getState());
        });

        function getSlots () {
            let slots = [];

            for (let controller of store.getState().controllers) {
                slots.push(controller.activated);
            }

            return JSON.stringify(slots);
        }

        log.write("Starting Socket.IO...");

        const io = require("socket.io")(require("./settings.json").port);

        log.success("Socket.IO started!");

        io.on("connection", client => {
            log.success(" -> WS connection detected.");
            client.on("auth", data => {
                log.write(` -> AUTH - ${colors.yellow(data)}`);
                switch(data) {
                    case "CONTROLLER":
                        log.success(" -> Gamepad authorized!");
                        store.dispatch({ type: "CONTROLLER_AUTH", payload: client });
                        store.getState().screen.emit("getControllers", getSlots());

                        client.on("disconnect", () => {
                            log.error(" -> Controller disconnected!");
                            store.dispatch({ type: "CONTROLLER_DISCONNECT", payload: client });
                            store.getState().screen.emit("getControllers", getSlots());
                        });
                    break;

                    case "SCREEN":
                        log.success(" -> Screen authorized!");
                        store.dispatch({ type: "SCREEN_AUTH", payload: client });

                        client.emit("getControllers", getSlots());

                        client.on("disconnect", () => {
                            log.error(" -> Screen disconnected!");
                            store.dispatch({ type: "SCREEN_DISCONNECT" });
                        });
                    break;
                }
            });

            client.on("disconnect", () => {
                log.error(" -> WS connection closed");
            });
        });
    }
}

module.exports = GameCast;
