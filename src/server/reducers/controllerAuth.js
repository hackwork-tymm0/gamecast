const TymLogger = require("tymlogger");
const Colors = require("colors");

const log = new TymLogger();

module.exports = function (state, payload) {
    let newState = {...state};
    let controllers = [];
    let added = false;
    console.log(state);
    for (let controller of state.controllers) {
        if (added !== true) {
            if (controller.activated != 1) {
                added = true;
                
                const newController = {
                    activated: 1,
                    client: payload
                };

                controllers.push(newController);
            } else {
                controllers.push(controller);
            }
        } else {
            controllers.push(controller);
        }
    }

    newState.controllers = controllers;

    log.write(` -> ${Colors.blue("Redux:")} ${Colors.green("Controller added to store")}`);

    return newState;
}