
const TymLogger = require("tymlogger");
const Colors = require("colors");

// Controller Reducers
const controllerAuth = require("./reducers/controllerAuth");
const controllerDisconnect = require("./reducers/controllerDisconnect");

// Screen Reducers
const screenAuth = require("./reducers/screenAuth");
const screenDisconnect = require("./reducers/screenDisconnect");

const log = new TymLogger();

module.exports = function (state, action) { 
    log.write(` -> ${Colors.blue("Redux:")} ACTION - ${Colors.yellow(action.type)}`);

    switch (action.type) {
        case "CONTROLLER_AUTH":
            return controllerAuth(state, action.payload);

        case "CONTROLLER_DISCONNECT":
            return controllerDisconnect(state, action.payload);

        case "SCREEN_AUTH":
            return screenAuth(state, action.payload);
        
        case "SCREEN_DISCONNECT":
            return screenDisconnect(state);

        default:
            return {...state};
    }
}
