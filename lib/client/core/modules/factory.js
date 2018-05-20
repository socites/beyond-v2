var Factory = function (id, events) {
    "use strict";

};

var handler = {
    'get': function (target, prop, value, receiver) {
        return Reflect.set(...arguments);
    }
};

var target = new Factory();
module = new Proxy(target, handler);
