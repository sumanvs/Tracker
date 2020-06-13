import Tracker from './tracker';


/**
 * Function to format the log message. 
 * Note: Any proise rejection is by default considered as warning
 * @param {*} configObj 
 * @param {*} name 
 * @param {*} identifier 
 * @param {*} parameters 
 * @param {*} returnValue 
 * @param {*} errorDesc 
 * @param {*} t1 
 * @param {*} t2 
 */
function log(configObj, fName, identifier, parameters, returnValue, errorDesc, t1, t2, isAsync) {

    let str = `[Tracker] [${new Date()}]`;
    identifier ? str += `\n[Identifier]: ${identifier}` : null;    

    str += `\n[Function Name]: ${fName}`;
    str += `\n[Is Async function]: ${isAsync || false}`;

    if (Tracker.getUserData()) {
        str += `\n[USER]: ${configObj.stringifiedObjects ? JSON.stringify(Tracker.getUserData(), 2) : Tracker.getUserData()}`;
    }

    if (configObj.trackParameters && parameters && parameters.length > 0) {
        str += `\n[Parameters]: ${configObj.stringifiedObjects ? JSON.stringify(parameters, 2) : parameters}`;
    }

    if (configObj.trackReturnValue && returnValue) {
        str += `\n[Return value]: ${configObj.stringifiedObjects ? JSON.stringify(returnValue, 2) : returnValue}`;
    }

    if (configObj.trackTime) {
        str += `\n[Time elapsed]: ${t2 - t1} milli-seconds`;
    }

    if (errorDesc) {
        str += `\n[Error]: ${errorDesc}`;
        console.warn(str);
    } else {
        console.log(str);
    }
}

/**
 * Decorator function to handle client functions
 * @param {*} identifier 
 * @param {*} localConfig 
 */
function track(identifier = null, localConfig = {}) {
   
    function trackFunc(target, property, descriptor) {

        // If disabled then DO NOT process
        if (Tracker.isDisabled()) {
            return descriptor.value;
        }

        // console.log('desc', descriptor.value.constructor.name);
        // console.log("property", property);
        // console.log("target", target);
        // console.log("par", params);

        // const isAsync = descriptor.value.constructor.name === 'AsyncFunction';
        const actualFunction = descriptor.value;

        function decoratorImpl(...funcParams) {
            // console.log(funcParams);
            const configObj = {...(Tracker.getConfig()), ...localConfig};
            const t = Date.now();

            // Call the getFullName function on the humanObj object
            const res = actualFunction.call(this, ...funcParams);
            if (Promise.resolve(res) == res) {
                // this is a promise
                return res.
                    then((data) => {
                        const t1 = Date.now();
                        log(configObj, property, identifier, funcParams, data, null, t, t1, true);
                        return res;
                    }).catch(error => {
                        const t1 = Date.now();
                        log(configObj, property, identifier, funcParams, null, error.message || error, t, t1, true);
                        throw error;
                    });
            }

            const t1 = Date.now();
            log(configObj, property, identifier, funcParams, res, null, t, t1);
            
            return res;
        }

        // Here, we are overwriting the getFullName with the decoratorFunc which has log
        // functionality and also actualFunction i.e. getFullName function
        descriptor.value = decoratorImpl;

        // This descriptor will overwrite the getFullName descriptor's value property
        return descriptor;
    }

    return trackFunc;
}

export default track;
