function Module(id) {

    new ModuleBase(this, id);

    let types = new ModuleTypes(this);
    Object.defineProperty(this, 'types', {
        'get': function () {
            return types;
        }
    });

}
