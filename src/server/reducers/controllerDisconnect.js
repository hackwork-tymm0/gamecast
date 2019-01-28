const TymLogger = require("tymlogger");
const Colors = require("colors");
const ObjectEqual = require("../helpers/objEqual");

const log = new TymLogger();

module.exports = function (state, payload) {
    let newState = {...state};
    let controllers = [];

    for (let controller of state.controllers) {
        if (ObjectEqual(controller.client, payload)) {
            controllers.push({
                activated: 0,
                client: null
            });
        } else {
            controllers.push(controller);
        }
    }

    newState.controllers = controllers;

    log.write(` -> ${Colors.blue("Redux:")} ${Colors.green("Controller deleted in store")}`);

    return newState;
}