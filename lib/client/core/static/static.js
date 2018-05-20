function StaticResources() {

    let overwrites;
    Object.defineProperty(this, 'overwrites', {
        'get': function () {
            return overwrites;
        }
    });

    this.start = function (config) {
        config = (config) ? config : {};
        overwrites = config.overwrites;
    };

}
