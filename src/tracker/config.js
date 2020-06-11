
let configObj = {
    trackParameters: true, 
    trackReturnValue: true, 
    trackTime: true,
    stringifiedObjects: true
};


export const config = () => {
    return configObj;
};

export const setConfig = (lconfig) => {
    configObj = {...configObj, ...lconfig};
};