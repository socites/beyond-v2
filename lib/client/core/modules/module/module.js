function Module(id) {

    Object.defineProperty(this, 'id', {
        'get': function () {
            return id;
        }
    });

    let types = new ModuleTypes(this);
    Object.defineProperty(this, 'types', {
        'get': function () {
            return types;
        }
    });

}
