require('colors');
module.exports = function (config, runtime) {
    "use strict";

    let async = require('async');

    let libraries, applications;
    Object.defineProperty(this, 'libraries', {
        'get': function () {
            return libraries;
        }
    });
    Object.defineProperty(this, 'applications', {
        'get': function () {
            return applications;
        }
    });

    this.initialise = async(function* (resolve, reject) {

        if ((config instanceof require('../config'))) {
            config = config.modules;
        }
        else {
            config = new (require('./config'))(config, runtime);
            yield config.initialise();
        }

        // register the beyond.js client library
        let beyond = require('path').join(__dirname, '../client/library.json');
        yield config.libraries.register('beyond', beyond);

        // register the vendor client library
        let vendor = require('path').join(__dirname, '../client/vendor/library.json');
        yield config.libraries.register('vendor', vendor);

        // register ui helpers library
        let ui = require('path').join(__dirname, '../client/ui/library.json');
        yield config.libraries.register('ui', ui);

        libraries = new (require('./libraries'))(config.libraries, runtime, config.services);
        yield libraries.initialise();

        applications = new (require('./applications'))(libraries, config.applications, runtime);

        resolve();

    });

};
