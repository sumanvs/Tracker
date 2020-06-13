# JS easytracker
Tracker is a library to track function execution. Primary objective of this JS library is to track/log the function using decorator syntax which makes it very easy to integrate into project and to analyse the function execution. Currently this library tracks function execution time, parameters and return value. All this is configurable. 

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

// Config to enable/disable tracker. 
// This parameters can help if we want to completely disable it for production or on specific rules. 
Tracker.setIsDisabled(false); // default is NOT disabled

// Config to set user context of all logs. This log will come with every tracking
Tracker.setUserData({'username': 'example'});

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

### Option to override at specific function level

```
    @track("", {trackReturnValue: false})
    exampleFunction(val) {
         return 2+val;
    }

    exampleFunction(5);
```

It will log in console like 

```
[Tracker] [Sat Jun 13 2020 13:34:39 GMT+0530 (India Standard Time)]
[Function Name]: exampleFunction
[Is Async function]: false
[USER]: {"username":"example"}
[Parameters]: [5]
[Time elapsed]: 0 milli-seconds
```

### Issues
If you run into decorator not supported issues. Follow this link `https://babeljs.io/docs/en/babel-plugin-proposal-decorators`


