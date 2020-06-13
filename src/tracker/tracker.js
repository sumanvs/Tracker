
class Tracker {

    constructor () {
        this._configObj = {
            trackParameters: true, 
            trackReturnValue: true, 
            trackTime: true,
            stringifiedObjects: true
        };

        this._isDisabled = false;
        this._userData = null;
    }

    getConfig() {
        return this._configObj;
    }

    setConfig (lconfig) {
        this._configObj = {...this._configObj, ...lconfig};
    };

    isDisabled() {
        return this._isDisabled;
    }

    setIsDisabled(val) {
        this._isDisabled = !!val;
    }

    getUserData() {
        return this._userData;
    }

    setUserData(data) {
        this._userData = data || null;
    }
}

export default new Tracker();