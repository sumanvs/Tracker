const {track, Tracker} = require( '../src');

// Config to setup the tracking parameters
Tracker.setConfig({
    trackParameters: true,  // default is true
    trackReturnValue: true,  // default is true
    trackTime: true, // default is true
    stringifiedObjects: true // default is true
});

// Config to enable/disable tracker. 
// This parameters can help if we want to completely disable it for production or on specific rules. 
Tracker.setIsDisabled(false); // default is NOT disabled

// Config to set user context of all logs. This log will come with every tracking
Tracker.setUserData({'username': 'example'});

export default class HelloWorld {
    @track("", {trackReturnValue: false})
    exampleFunction(val) {
         return 2+val;
    }
}

new HelloWorld().exampleFunction(5);