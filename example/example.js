const {track, Tracker} = require( '../src');

// Config to setup the tracking parameters
Tracker.setConfig({
    trackParameters: true,  // default is true
    trackReturnValue: true,  // default is true
    trackTime: true, // default is true
    stringifiedObjects: true // default is true
});


/**
* Config to set level of tracking
* This parameters can help if we want to completely disable it for production or for specific levels
* Level can be "L", "I", "W", "E", "N" (aka: log, info, warn, error and none)
* Tracker.setLevel("N"); will disable all tracking
* Tracker.setLevel("W"); // will allow all warning and error level tracking
*/
Tracker.setLevel("L"); // default level is L

// To control the normal console in application based on level set for tracker
// Note: Tracker level must be set before calling this.
Tracker.overrideConsole();

// Config to set user context of all logs. This log will come with every tracking
Tracker.setUserData({'username': 'example'});

// Want to send logs to server. Here you can register a handler
Tracker.setServerHandle((printer, message) => {
    // DO NOT CALL console methods, as you have already overrode it earlier.
    // When this handler is set: 
    // Tracker will not print on console itslef. Use printer function as below to get message on console.
    printer(`FROM HANDLER: \n${message} \n`);
})

export default class HelloWorld {

    constructor() {
        this.mayVal = true; 
    }

    @track("W", "", {trackReturnValue: false}) // default level is 'L'
    exampleFunction(val) {
        console.log("This is a console log level example");
        console.warn("This is a console warn level example");
        return 2+val;
    }
}

new HelloWorld().exampleFunction(5);

// For normal function
const normalFunction = track("L", "myIden")(() => {
    return "this is a normal function";
})

normalFunction();
