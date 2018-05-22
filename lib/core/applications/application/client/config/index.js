module.exports = function (application, runtime) {

    let async = require('async');

    this.script = async(function* (resolve, reject, language) {
        "use strict";

        if (!language) {
            reject(new Error('language not set'));
            return;
        }

        let Resource = require('path').join(require('main.lib'), 'resource');
        Resource = require(Resource);

        let script = '';

        let config = application.config(language);

        if (runtime.local) {
            let server = require('path').join(require('main.lib'), '/server/index');
            let ports = require(server).ports;
            config.ports = {'http': ports.http, 'ws': ports.rpc};
        }

        config.params = application.params;
        config.params.local = runtime.local;
        config.params.name = application.name;
        config.params.language = language;
        config.params.version = application.version;

        let overwrites = 'undefined';
        if (application.template && application.template.overwrites) {
            overwrites = yield (require('./static-overwrites.js')(application.template.overwrites));
            overwrites = JSON.stringify(overwrites);
        }
        config.overwrites = overwrites;

        script += `let config = ${JSON.stringify(config)};\n`;
        script += 'beyond.start(config);';

        let resource = new Resource({'content': script, 'contentType': '.js'});
        resolve(resource);

    });

};
