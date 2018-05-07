let ajv = new (require('ajv'))({'allErrors': true});
let validate = ajv.compile({'type': 'number'});

let valid = validate('hello');
console.log(valid, validate.errors);
