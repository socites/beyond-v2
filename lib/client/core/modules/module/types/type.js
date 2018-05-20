function ModuleType(module, name) {

    Object.defineProperty(this, 'module', {
        'get': function () {
            return module;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });

    let multilanguage;
    Object.defineProperty(this, 'multilanguage', {
        'get': function () {
            return multilanguage;
        },
        'set': function (value) {
            if (typeof multilanguage !== 'undefined') {
                console.warn(`Multilanguage configuration is already set on type '${name}', module '${module.ID}'`);
            }
            multilanguage = !!value;
        }
    });

}
