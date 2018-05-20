let Libraries = function (beyond) {
    "use strict";

    let libraries = createCollection({'bind': this});

    this.get = function (name) {
        return libraries.get(name);
    };

    this.set = function (name, config) {
        let library = new Library(name, config);
        libraries.set(name, library);
    };

};
