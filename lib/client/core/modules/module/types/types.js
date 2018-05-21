function ModuleTypes(module) {

    let types = createCollection({'bind': this});

    this.register = function (name) {

        let type = new ModuleType(module, name);
        types.set(name);

        return type;

    };

}
