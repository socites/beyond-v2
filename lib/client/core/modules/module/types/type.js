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

    let languages = new TypeLanguages(this);
    Object.defineProperty(this, 'languages', {
        'get': function () {
            return languages;
        }
    });

}
