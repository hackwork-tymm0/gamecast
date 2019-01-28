
const TymLogger = require("tymlogger");
const Colors = require("colors");

// Controller Reducers
const controllerAuth = require("./reducers/controllerAuth");
const controllerDisconnect = require("./reducers/controllerDisconnect");

// Screen Reducers
const screenAuth = require("./reducers/screenAuth");
const screenDisconnect = require("./reducers/screenDisconnect");

// Keys Reducers
const keyPress = require("./reducers/keyPress");
const keyUnPress = require("./reducers/keyUnPress");

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

        case "KEY_PRESS":
            return keyPress(state, action.payload);
        
        case "KEY_UNPRESS":
            return keyUnPress(state, action.payload);

        default:
            return {...state};
    }
}
