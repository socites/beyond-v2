let Beyond = function () {
    "use strict";

    // The beyond events handler, only beyond can trigger events
    let events = new Events({'bind': this});

    // The beyond dispatcher for global events
    // Events are triggered outside beyond for any object that requires to inform about an event
    let dispatcher = new Events();
    this.register = function (event, listener, priority) {
        return dispatcher.bind(event, listener, priority);
    };
    this.unregister = function (event, listener) {
        return dispatcher.unbind(event, listener);
    };
    this.dispatch = function () {
        return dispatcher.trigger.apply(dispatcher, arguments);
    };

    let application = new Application(this);
    Object.defineProperty(this, 'application', {
        'get': function () {
            return application;
        }
    });

    let libraries = new Libraries(this);
    Object.defineProperty(this, 'libraries', {
        'get': function () {
            return libraries;
        }
    });

    let modules = new Modules(this, events);
    Object.defineProperty(this, 'modules', {
        'get': function () {
            return modules;
        }
    });

    let staticResources = new StaticResources(this);

    exposeReady(this, events);

    this.registerError = function () {
        this.errorHandler.registerError.apply(this.errorHandler, arguments);
    };

    this.start = function (config) {

        config = (config) ? config : {};

        application.start(config.application);
        staticResources.start(config.static);

    };

    this.start = function () {

        var appHost = this.hosts.application.ws;
        if (appHost) {
            exportSocket(this, this, appHost);
        }

        if (!$('body > .app-container').length) {
            console.error('body > .app-container does not exist');
        }

        events.trigger('start');
        delete this.start;

    };

};

window.beyond = new Beyond();
