
const TymLogger = require("tymlogger");
const { createStore } = require("redux");
const colors = require("colors");

const Reducer = require("./Reducer");
const InitialStore = require("./InitialStore");

// Handlers
const Controller = require("./handlers/Controller");
const Screen = require("./handlers/Screen");

const log = new TymLogger();

class GameCast {
    main () {
        log.success("");
        log.success(`GameCast v${require("../../package.json").version}`);
        log.success("---------------------------------------------");
        log.success("");
        log.write("Starting Redux...");
        
        const store = createStore(Reducer, InitialStore);

        log.write("Starting Socket.IO...");

        const io = require("socket.io")(require("./settings.json").port);

        log.success("Socket.IO started!");

        io.on("connection", client => {
            log.success(" -> WS connection detected.");
            client.on("auth", data => {
                log.write(` -> AUTH - ${colors.yellow(data)}`);
                switch(data) {
                    case "CONTROLLER":
                        const controller = new Controller(store, client);
                        controller.onConnect();
                        controller.onGetId(); 
                        controller.keysActions();
                        controller.onDisconnect();
                    break;

                    case "SCREEN":
                        let screen = new Screen(store, client);
                        screen.onConnect();
                        screen.onDisconnect();
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
