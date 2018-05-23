function Application(beyond, config) {

    config = (config) ? config : {};

    Object.defineProperty(beyond, 'params', {
        'get': function () {
            return config.params;
        }
    });

    let hosts;
    Object.defineProperty(this, 'host', {
        'get': function () {
            return hosts;
        }
    });

    this.setup = function (config) {

        config = (config) ? config : {};
        hosts = config.hosts;

    };

}
