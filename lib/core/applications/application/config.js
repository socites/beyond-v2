module.exports = function (application, libraries, config, runtime) {
    "use strict";

    /**
     * @language false returns the hosts of the libraries, then the language is not required
     */
    return function (language) {

        let mode = 'web';
        if (runtime.build &&
            runtime.build.applications &&
            runtime.build.applications[application.name] &&
            runtime.build.applications[application.name].client &&
            runtime.build.applications[application.name].client.mode) {

            mode = runtime.build.applications[application.name].client.mode;
        }

        if (typeof language !== 'boolean' && !language) {
            throw new Error('language not set');
        }

        let output = {
            'application': {},
            'libraries': {}
        };

        if (runtime.local) {

            output.application.hosts = {
                'js': '/applications/' + application.name + '/languages/' + language + '/'
            };

            if (application.connect) {

                output.application.hosts = {
                    'js': output.application.hosts.js,
                    'ws': '/' + application.name,
                    'version': application.version
                };

            }

        }
        else {

            let hostJS;
            if (mode === 'phonegap') {
                hostJS = '';
            }
            else if (output.build.hosts.js) {
                hostJS = '/' + output.build.hosts.js + '/';
            }
            else {
                hostJS = '/';
            }

            output.application.hosts = {
                'js': hostJS
            };

            if (application.connect) {

                let url = require('url').parse(output.build.hosts.ws);
                let protocol = url.protocol;
                if (protocol !== 'wss:') protocol = 'wss:';
                let port = url.port;
                if (!port && protocol === 'ws:') port = '80';
                if (!port && protocol === 'wss:') port = '443';

                let host = protocol + '://' + url.hostname + ':' + port + '/' + application.name;
                output.application.hosts.ws = host;

                output.application.hosts = {
                    'js': output.application.hosts.js,
                    'ws': host,
                    'version': application.version
                };

                output.application.hosts.ws = output.application.hosts.ws.replace('$version', application.version);

            }

        }

        // Configure libraries hosts
        for (let i in config.imports.libraries) {

            let library = config.imports.libraries[i];
            library = library.split('/');
            library = {'name': library[0], 'version': library[1]};
            let version = library.version;

            library = libraries.items[library.name];
            version = library.versions.items[version];

            let host;
            let hosts = version.hosts;
            output.libraries[library.name] = {'hosts': hosts};

            // Configure hosts.ws of libraries
            // Check if ws address is overwritted by application config
            if (runtime.local && version.hosts.ws && application.ws[library.name]) {
                host = application.ws[library.name] + '/libraries' + '/' + library.name;
                hosts.ws = host;
            }

            // Configure hosts.js of libraries
            if (runtime.local) {
                continue;
            }

            if (mode === 'phonegap') {
                host = 'libraries/' + library.name + '/';
            }
            else {
                host = hosts.application.js + 'libraries/' + library.name + '/';
            }

            hosts.js = host;

        }

        return output;

    };

};
