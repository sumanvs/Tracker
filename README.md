# JS easytracker
Tracker is a library to track function execution. Primary objective of this JS library is to track/log the function using decorator syntax which makes it very easy to integrate into project and to analyse the function execution. Currently this library tracks function execution time, parameters and return value. All this is configurable. 

## Purpose and benifits

- Easy and seamless logging for js project
- Option to easily override console logs
- Option to set the log levels for tracker and for console both
- Option to set user data or identifer with logs
- Easy tracking of function with its parameter, return value. time taken
- All tracking is configurable
- Option to provide handler to handle all logs at one place in consistent structure (can help to store these tracking on server for analysing and reporting)

## Node example
[See node example](example/README.md)

## Installation

```bash
yarn add easytracker
```

## Usage
 
### import

```
import {track, Tracker} from 'easytracker';

or 

const {track, Tracker} = require( 'easytracker');
```

### configuration

```
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

```

### tracking function

```
    @track()
    async initialConfig() {
       // Some function
    }
```

It will log in console like:
```
[Tracker] [Thu Jun 11 2020 19:59:52 GMT+0530 (India Standard Time)]
[Name]: initialConfig
[Is Async function]: true
```

### Option to override at specific function level and to provide level

```
    // default level for @track is "L"
    @track("I", "", {trackReturnValue: false})
    exampleFunction(val) {
         return 2+val;
    }

    exampleFunction(5);
```

It will log in console like 

```
[Tracker] [Sat Jun 13 2020 13:34:39 GMT+0530 (India Standard Time)]
[Function Name]: exampleFunction
[Class Name]: HelloWorld
[Is Async function]: false
[User]: {"username":"example"}
[Parameters]: [5]
[Time elapsed]: 1 milli-seconds
```

### To track normal function

```
// For normal function, wrap with track
const normalFunction = track("L", "myIden")(() => {
    return "this is a normal function";
})

normalFunction();

// It will log like
[Tracker]: [Sat Jun 20 2020 18:51:42 GMT+0530 (India Standard Time)]
[Identifier]: myIden
[Function Name]: anonymous
[User]: {"username":"example"}
[Return value]: "this is a normal function"
[Time elapsed]: 0 milli-seconds 

```

### Issues
If you run into decorator not supported issues. Follow this link `https://babeljs.io/docs/en/babel-plugin-proposal-decorators`


