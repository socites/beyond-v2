let Beyond = function (config) {
    "use strict";

    if (!config.css) config.css = {};

    this.hosts = config.hosts;

    this.css = {'values': config.css.values};

    this.requireConfig = new RequireConfig(events);

    this.sockets = new Sockets();

    this.pages = new Pages(events);
    this.navigation = new Navigation(this, this.pages, events);
    Object.defineProperty(this, 'pathname', {
        'get': function () {
            return this.navigation.pathname;
        }
    });

    this.navigate = function () {
        this.navigation.navigate.apply(this.navigation, arguments);
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

window.beyond = new Beyond(beyond);
