const TymLogger = require("tymlogger");
const Colors = require("colors");

const log = new TymLogger();

module.exports = function (state, payload) {
    let newState = {...state};
    newState.screen = payload;

    log.write(` -> ${Colors.blue("Redux:")} ${Colors.green("Screen added to store")}`);

    return newState;
}