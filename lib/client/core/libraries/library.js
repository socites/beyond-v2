let Library = function (name, config) {
    "use strict";

    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });

    Object.defineProperty(this, 'path', {
        'get': function () {
            return 'libraries/' + name;
        }
    });

    let host = beyond.hosts.libraries[name].ws;
    if (host) {
        exportSocket(this, beyond, host);
    }

};
