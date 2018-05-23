let Library = function (name, config) {
    "use strict";

    config = (config) ? config : {};

    // Set the library name
    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });

    // Set the path
    Object.defineProperty(this, 'path', {
        'get': function () {
            return 'libraries/' + name;
        }
    });

    Object.defineProperty(this, 'config', {
        'get': function () {
            return config;
        }
    });

    Object.defineProperty(this, 'hosts', {
        'get': function () {
            return config.hosts;
        }
    });

};
