const TymLogger = require("tymlogger");
const Colors = require("colors");

const log = new TymLogger();

module.exports = function (state, payload) {
    let newState = {...state};
    newState.screen = {};

    log.write(` -> ${Colors.blue("Redux:")} ${Colors.green("Screen deleted in store")}`);

    return newState;
}