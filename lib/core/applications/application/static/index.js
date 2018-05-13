require('colors');
module.exports = function (application, config, runtime) {
    "use strict";

    let async = require('async');

    if (!config) {
        config = [];
    }
    else if (typeof config === 'string') {
        config = [config];
    }
    else if (!(config instanceof Array)) {
        console.error('Invalid static configuration on application "'.red + (application.name).red.bold + '"'.red);
        config = [];
    }

    if (config.indexOf('index.html') === -1) {
        config.push('index.html');
    }

    let Finder = require('finder');
    let finder = new Finder(application.dirname, {'list': config, 'usekey': 'relative.file'});

    let Resource = require('path').join(require('main.lib'), 'resource');
    Resource = require(Resource);

    let items, keys;
    Object.defineProperty(this, 'processed', {
        'get': function () {
            return !!items;
        }
    });
    Object.defineProperty(this, 'items', {
        'get': function () {
            return items;
        }
    });
    Object.defineProperty(this, 'keys', {
        'get': function () {
            return keys;
        }
    });

    Object.defineProperty(this, 'length', {
        'get': function () {
            if (keys) return keys.length;
        }
    });

    this.process = async(function* (resolve, reject, language) {

        if (!language) {
            reject(new Error('language not set.'));
            return;
        }

        yield finder.process();

        let process = require('./process.js');

        items = {};
        keys = [];
        for (let key in finder.items) {

            let file = finder.items[key];
            let resource;
            resource = new Resource({'file': file.file});
            resource = yield process(resource, application, runtime, language);

            keys.push(key);
            items[key] = resource;

        }

        resolve();

    });

    this.resource = async(function* (resolve, reject, key, language) {

        if (!language) {
            reject('language not set');
            return;
        }

        if (items) {
            resolve(items[key]);
            return;
        }

        if (!(yield finder.exists(key))) {

            if (key === 'index.html') {

                let process = require('./process.js');
                let file = require('path').join(__dirname, 'index.html');

                let resource = new Resource({'file': file});
                resolve(yield process(resource, application, runtime, language));
                return;

            }

            resolve();
            return;

        }
        else {

            let process = require('./process.js');

            let file = require('path').join(application.dirname, key);
            let resource = new Resource({'file': file});
            resolve(yield process(resource, application, runtime, language));

        }

    });

};
