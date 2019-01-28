const io = require("socket.io-client");
const TymLogger = require("tymlogger");

const WS_URL = `http://localhost:${require("./settings.json").port}`;

const log = new TymLogger();
const socket = io(WS_URL);

log.success(`GameCast v${require("./package.json").version} - Gamepad test`);
log.write(" -> Controller auth...");

socket.emit("auth", "CONTROLLER");