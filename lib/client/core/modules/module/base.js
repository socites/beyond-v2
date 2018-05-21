function ModuleBase(module, id) {

    // Set the module id
    Object.defineProperty(module, 'id', {
        'get': function () {
            return id;
        }
    });

    // Set the library of the module
    let library = id.split('/');
    library = (id[0] === 'libraries') ? beyond.libraries.get(id[1]) : undefined;
    Object.defineProperty(this, 'library', {
        'get': function () {
            return library;
        }
    });

    // Set the module path
    let path = (library && id === library.path) ? '/main' : id;
    path = path.split('/');

    if (library) {
        path.splice(0, 2); // Remove /libraries/library
    }
    else {
        path.splice(0, 1); // Remove /application
    }

    path = path.join('/');
    Object.defineProperty(module, 'path', {
        'get': function () {
            return path;
        }
    });

}
