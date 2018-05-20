function ModuleExtensions(beyond) {
    "use strict";

    let extensions = new Map();
    let handler = new ModulesHandler(extensions);

    beyond.registerModulesExtension = function (property, fnc) {
        extensions.set(property, fnc);
    };

}
