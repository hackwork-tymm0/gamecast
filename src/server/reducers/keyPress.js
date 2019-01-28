const TymLogger = require("tymlogger");
const Colors = require("colors");

const log = new TymLogger();

module.exports = function (state, payload) {
    log.write(` -> ${Colors.blue("Redux:")} Key pressed - ${Colors.yellow(payload.key)}`);

    let newState = {...state};
    let controllers = [];

    for (let controller of state.controllers) {
        if (controller.id === payload.id) {
            let newController = {...controller};
            newController.key = payload.key;

            controllers.push(newController)
        } else {
            controllers.push(controller)
        }
    }

    newState.controllers = controllers;
    return newState;
}
