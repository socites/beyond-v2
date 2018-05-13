module.exports = function (environment) {
    "use strict";

    // Check if server.json file exists
    let fs = require('fs'),
        path = require('path'),
        root = process.cwd();

    let file = path.join(root, 'server.json');
    let config;
    if (fs.existsSync(file)) {
        config = 'server.json';
    }
    else {

        config = {
            'defaults': {
                'application': 'default',
                'language': 'en'
            }
        };

        // check if application configuration exists
        // in this case, beyond will not serve other applications, or any library
        file = path.join(root, 'application.json');
        if (fs.existsSync(file)) {
            config = {'application': 'application.json'};
        }
        else {

            config.applications = {
                'default': {
                    "version": "1.0",
                    "port": "3010"
                }
            };


        }

    }

    let runtime = new (require('../runtime'))({'local': true, 'environment': environment});

    // Initialise types
    require('../core/types').initialise(config.types);

    let co = require('co');
    co(function* () {

        config = new (require('../config'))(config, runtime);
        yield config.initialise();

        if (!config.valid) {
            console.error('Invalid configuration'.red);
            return;
        }

        let modules = new (require('../core'))(config, environment);
        yield modules.initialise();

        // Initialise server
        let server = new require('../server');
        server.start(config, modules, runtime);

    });

};
