const io = require("socket.io-client");
const TymLogger = require("tymlogger");

const WS_URL = `http://localhost:${require("./settings.json").port}`;

const log = new TymLogger();
const socket = io(WS_URL);

log.success(`GameCast v${require("./package.json").version} - Gamepad test`);
log.write(" -> Controller auth...");

socket.emit("auth", "CONTROLLER");
log.success(" -> Controller authorized!");

let controllerID = null;

log.write(" -> Get controller ID...");
socket.on("getId", (data) => {
    log.write(` -> Controller ID - ${data}`);
    controllerID = data;
});

setTimeout(function () {
    log.write(" -> Press key - UP");
    socket.emit("keyPress", { id: controllerID, key: "UP" });
}, 100);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 600);

setTimeout(function () {
    log.write(" -> Press key - DOWN");
    socket.emit("keyPress", { id: controllerID, key: "DOWN" });
}, 700);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 1200);

setTimeout(function () {
    log.write(" -> Press key - LEFT");
    socket.emit("keyPress", { id: controllerID, key: "LEFT" });
}, 1300);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 1800);

setTimeout(function () {
    log.write(" -> Press key - RIGHT");
    socket.emit("keyPress", { id: controllerID, key: "RIGHT" });
}, 1900);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 2400);

setTimeout(function () {
    log.write(" -> Press key - START");
    socket.emit("keyPress", { id: controllerID, key: "START" });
}, 2500);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 3000);

setTimeout(function () {
    log.write(" -> Press key - SELECT");
    socket.emit("keyPress", { id: controllerID, key: "SELECT" });
}, 3100);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 3600);

setTimeout(function () {
    log.write(" -> Press key - A");
    socket.emit("keyPress", { id: controllerID, key: "A" });
}, 3700);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 4200);

setTimeout(function () {
    log.write(" -> Press key - B");
    socket.emit("keyPress", { id: controllerID, key: "B" });
}, 4300);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 4800);

setTimeout(function () {
    log.write(" -> Press key - C");
    socket.emit("keyPress", { id: controllerID, key: "C" });
}, 4900);
setTimeout(function () {
    socket.emit("keyUnPress", { id: controllerID });
}, 5400);

setTimeout(function () {
    log.success(" -> Gamepad test done!");
}, 5500);