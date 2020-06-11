# JS easytracker
Tracker is a library to track function execution. Primary objective of this JS library is to track/log the function using decorator syntax which makes it very easy to integrate into project and to analyse the function execution. Currently this library tracks function execution time, parameters and return value. All this is configurable. 

## Installation

```bash
yarn add easytracker
```

## Usage
 
### import

```
import {track, setConfig} from 'easytracker';
```

### configuration

```
setConfig({
    trackParameters: true,  // default is true
    trackReturnValue: true, // default is true
    trackTime: false, // default is true
    stringifiedObjects: true // default is true
});

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
    @track('someId', {trackParameters:false})
    async dummyConfigFunction(var1, var2) {
        return new Promise((res) => {
            setTimeout(() => {
                res("this is a dummy return value");
            }, 3000);
        });
    }
```

It will log in console like 

```
[Tracker] [Thu Jun 11 2020 19:59:52 GMT+0530 (India Standard Time)]
[Identifier]: someId
[Name]: dummyConfigFunction
[Is Async function]: true
[Return value]: "this is a dummy return value"
```

### Issues
If you run into decorator not supported issues. Follow this link `https://babeljs.io/docs/en/babel-plugin-proposal-decorators`


