function Toast(beyond) {
    "use strict";

    let events = new Events({'bind': this});

    let MESSAGE_TYPE = Object.freeze({
        'GENERAL_MESSAGE': 1,
        'GENERAL_ERROR': 2,
        'CONNECTION_ERROR': 3,
        'WARNING': 4
    });
    Object.defineProperty(this, 'MESSAGE_TYPE', {
        'get': function () {
            return MESSAGE_TYPE;
        }
    });

    const DURATION_DEFAULT = 3000;
    let messages = new Messages();

    let autoincrement = 0;

    beyond.showMessage = function (specs, duration) {

        // Check parameters
        if (typeof specs === 'string') {
            specs = {
                'text': specs,
                'duration': duration
            }
        }
        if (typeof specs !== 'object') {
            throw new Error('Invalid parameters');
        }
        if (!specs.type) {
            specs.type = MESSAGE_TYPE.GENERAL_MESSAGE;
        }
        if (specs.retry && typeof specs.retry !== 'function') {
            throw new Error('Invalid parameters, retry must be a function');
        }

        let id = specs.id;
        if (!id) {
            autoincrement++;
            id = 'message-' + autoincrement;
        }

        if (specs.type === MESSAGE_TYPE.CONNECTION_ERROR) {

            if (!specs.retry) {
                throw new Error('Invalid parameters, retry was expected');
            }

            messages.set({
                'id': id,
                'type': MESSAGE_TYPE.CONNECTION_ERROR,
                'retry': specs.retry,
                'duration': 0 // Infinity
            });

        }
        else if (specs.type === MESSAGE_TYPE.GENERAL_ERROR) {

            if (!specs.text) {
                throw new Error('Invalid parameters, text was expected');
            }

            if (specs.retry) {
                duration = 0; // Infinity
            }
            else if (typeof specs.duration === 'number') {
                duration = specs.duration;
            }
            else {
                duration = DURATION_DEFAULT;
            }

            messages.set({
                'id': id,
                'type': MESSAGE_TYPE.GENERAL_ERROR,
                'text': specs.text,
                'retry': specs.retry,
                'duration': duration
            });

        }
        else if (specs.type === MESSAGE_TYPE.GENERAL_MESSAGE) {

            if (!specs.text) {
                throw new Error('Invalid parameters, text was expected');
            }

            messages.set({
                'id': id,
                'type': MESSAGE_TYPE.GENERAL_MESSAGE,
                'text': specs.text,
                'close': !!specs.close,
                'duration': (typeof specs.duration === 'number') ? specs.duration : DURATION_DEFAULT
            });

        }
        else if (specs.type === MESSAGE_TYPE.WARNING) {

            if (!specs.text) {
                throw new Error('Invalid parameters, message was expected');
            }

            messages.set({
                'id': id,
                'type': MESSAGE_TYPE.WARNING,
                'text': specs.text,
                'close': !!specs.close,
                'duration': (typeof specs.duration === 'number') ? specs.duration : DURATION_DEFAULT
            });

        }
        else {
            throw new Error('Invalid parameters, message type is invalid')
        }

        events.trigger('change');
        return id;

    };

    beyond.showConnectionError = function (callback) {
        return beyond.showMessage({
            'type': MESSAGE_TYPE.CONNECTION_ERROR,
            'retry': callback
        });
    };
    beyond.showWarning = function (text, duration) {
        return beyond.showMessage({
            'type': MESSAGE_TYPE.WARNING,
            'text': text,
            'duration': duration
        });
    };

    this.removeMessage = function (id) {
        messages.delete(id);
        events.trigger('change');
    };

    beyond.removeMessage = this.removeMessage;

    this.retry = function () {

        let message = this.message;
        if (!message) {
            console.error('Retry method was called, but there is no active message');
            return;
        }

        if (message.type === MESSAGE_TYPE.CONNECTION_ERROR) {

            let remove = [];
            for (let index in messages.keys) {

                let id = messages.keys[index];

                message = messages.get(id);
                if (message.type === MESSAGE_TYPE.CONNECTION_ERROR) {
                    message.retry();
                    remove.push(id);
                }

            }

            for (let index in remove) {
                let id = remove[index];
                messages.delete(id);
            }

        }
        else {

            if (typeof message.retry !== 'function') {
                console.error('Message retry function not set');
            }
            else {
                message.retry();
            }

            messages.delete(message);

        }

        setTimeout(function () {
            events.trigger('change');
        }, 500)


    };

    this.close = function () {

        let message = this.message;
        if (!message) {
            return;
        }

        if (message.type === MESSAGE_TYPE.CONNECTION_ERROR) {
            console.error('Connection error message type cannot be closed', message);
            return;
        }

        messages.delete(message);
        events.trigger('change');

    };

    Object.defineProperty(this, 'message', {
        'get': function () {

            if (messages.typeExists(MESSAGE_TYPE.CONNECTION_ERROR)) {
                return {
                    'type': MESSAGE_TYPE.CONNECTION_ERROR
                }
            }

            return messages.first;
        }
    });

}
