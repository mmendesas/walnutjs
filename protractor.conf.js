//example of use walnut options inside protractor.conf.js

exports.config = {
    //file created only for debug purposes
    walnutjsOpts: {
        enableDebugLog: true,          //default is disabled
        // waitElementTimeout: 5000,      //default is 10000
        // evidencesPath: '/evidences/'   //default is '/test/logs/'
    }
};