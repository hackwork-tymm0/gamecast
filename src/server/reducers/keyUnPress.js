
module.exports = function (state, payload) {
    let newState = {...state};
    let controllers = [];

    for (let controller of state.controllers) {
        if (controller.id === payload.id) {
            let newController = {...controller};
            newController.key = "NONE";

            controllers.push(newController);
        } else {
            controllers.push(controller)
        }
    }

    newState.controllers = controllers;

    return newState;
}
