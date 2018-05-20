function createCollection(specs) {

    specs = (specs) ? specs : {};
    let collection = new Map();

    if (specs.bind) {

        Object.defineProperty(specs.bind, 'keys', {
            'get': function () {
                return collection.keys();
            }
        });

        Object.defineProperty(specs.bind, 'entries', {
            'get': function () {
                return collection.entries();
            }
        });

        Object.defineProperty(specs.bind, 'size', {
            'get': function () {
                return collection.size;
            }
        });

        specs.bind.has = function (key) {
            return collection.has(key);
        };

        specs.bind.get = function (key) {
            return collection.get(key);
        };

    }

    return collection;

}
