function Application(beyond, config) {

    config = (config) ? config : {};

    Object.defineProperty(beyond, 'params', {
        'get': function () {
            return config.params;
        }
    });

    let host;
    Object.defineProperty(this, 'host', {
        'get': function () {
            return host;
        }
    });

    let trustedDomains = new TrustedDomains(this);

    this.start = function (config) {

        config = (config) ? config : {};
        host = config.host;

    };

}
