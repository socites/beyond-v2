function TrustedDomains(application, config) {

    let trustedDomains = [];

    Object.defineProperty(application, 'trustedDomains', {
        'get': function () {
            return trustedDomains;
        }
    });

    this.register = function (domain) {
        trustedDomains.push(domain);
    };

}
