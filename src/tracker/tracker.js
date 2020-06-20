
export const LEVELS = ["L", "I", "W", "E", "N"]; // no for none.

class Tracker {

    constructor () {
        this._configObj = {
            trackParameters: true, 
            trackReturnValue: true, 
            trackTime: true,
            stringifiedObjects: true
        };

        this._userData = null;
        this._level = LEVELS[0]; // Can be L, I, W, E
        this._privateLogFunc = console.log;
        this._serverHandle = null;
    }

    getConfig() {
        return this._configObj;
    }

    setConfig (lconfig) {
        this._configObj = {...this._configObj, ...lconfig};
    };

    getUserData() {
        return this._userData;
    }

    setUserData(data) {
        this._userData = data || null;
    }

    getLevel() {
        return this._level;
    }

    setLevel(level) {
        
        if (LEVELS.indexOf(level) >= 0) {
            this._level = level;
        }
        else {
            this._level = LEVELS[0];
        }
    }

    overrideConsole() {                
        const levelIndex = LEVELS.indexOf(this._level);

        console.log = this.log("LOG");
        console.info = this.log("INFO");
        console.warn = this.log("WARN");
        console.error = this.log("ERROR");

        if (levelIndex >= 1) {
            console.log = () => {};
        }

        if (levelIndex >= 2) {
            console.log = () => {};
            console.info = () => {};
        }

        if (levelIndex >= 3) {
            console.log = () => {};
            console.info = () => {};
            console.warn = () => {};
        }

        if (levelIndex >= 4) {
            console.log = () => {};
            console.info = () => {};
            console.warn = () => {};
            console.log = () => {};
        }

    }

    setServerHandle(func) {
        this._serverHandle = func;
    }


    log(level) {
        return (message, ...arg) => {

            let str = `[Tracker]: [${new Date()}]`;            
            str += `\n[Level]: ${level}`;
            str += `\n[TrackedBy]: CONSOLE`;

            if (this.getUserData()) {
                str += `\n[User]: ${this.getConfig().stringifiedObjects ? JSON.stringify(this.getUserData(), 2) : Tracker.getUserData()}`;
            }

            str += `\n[Message]: ${message}`;
            if (arg && arg.length > 0) {
                str += `\n[Arguments]: ${JSON.stringify(arg)}`;
            }

            this.print(str);
        }
    }

    print(message) {
        if (this._serverHandle) {
            this._serverHandle(this._privateLogFunc, message);
        }
        else {
            this._privateLogFunc(message);
            this._privateLogFunc("\n")    
        }
    }

}

export default new Tracker();