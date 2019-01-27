
const TymLogger = require("tymlogger");

const io = require("socket.io")(require("../../settings.json").port);
const log = new TymLogger();

class GameCast {
    main () {
        log.success("");
        log.success(`GameCast v${require("../../package.json").version}`);
        log.success("---------------------------------------------");
        log.success("");
        log.write("Starting Socket.IO...");
    }
}

module.exports = GameCast;
