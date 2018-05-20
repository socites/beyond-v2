function TypeLanguages(type) {

    let languages = createCollection({'bind': this});

    this.register = function (values) {

        if (values instanceof Array) {

            for (let value of values) {
                languages.set(value, true);
            }

        }
        else if (typeof values === 'string') {
            languages.set(values);
        }
        else {
            console.error(`Invalid parameter registering language of type "${type.name}"`);
        }

    };

}
