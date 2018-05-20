let Modules = function (beyond, events) {
    "use strict";

    let modules = createCollection({'bind': this});

    let loaded = new Map();
    Object.defineProperty(this, 'loaded', {
        'get': function () {
            return loaded;
        }
    });

    function get(moduleId) {

        if (!modules.has(moduleId)) {
            let module = new Module(moduleId);
            modules.set(moduleId, module);
        }

        return modules.get(moduleId);

    }

    this.get = function (moduleId, extendedId) {

        let done = function () {

            events.trigger(moduleId + ':done');
            events.trigger('done', moduleId);

            loaded.set(moduleId, true);

        };

        let module = get(moduleId);
        let extended = (extendedId) ? get(extendedId) : undefined;

        return {
            'module': module,
            'extended': extended,
            'done': done
        };

    };

};
