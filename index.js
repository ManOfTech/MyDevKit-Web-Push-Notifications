const axios = require('axios');
const hostname = 'https://api.mydevkit.io';


const error_handling = (object, required_keys, custom) => {
    let copy = Object.assign({}, object);
    let bool = false;
    required_keys.forEach(key => {
        if (!copy[key]) {
            bool = true;
            console.error(`The ${key} parameter is required.`);
        }
    });
    if (typeof custom !== 'object') {
        bool = true;
        console.error('Your custom option must be an object.');
    }
    return bool;
};

const send = (secret_key = null, application_key = null, template_id = null, custom = {}) => {
    const error = error_handling({ secret_key, application_key, template_id }, ['secret_key', 'application_key', 'template_id'], custom);
    const body = Object.assign({}, custom, { application_key, template_id });
    const headers = { Authorization: secret_key };
    return !error ? axios.post(`${hostname}/api/v1/notify/sns`, body, { headers })
        .then(r => r && r.data ? r.data : r)
        .catch(e => e && e.response && e.response.data ? e.response.data : e)
    : null;
};

const register = (public_key = null, application_key = null, device_token = null, custom = {}) => {
    const error = error_handling({ public_key, application_key, device_token }, ['public_key', 'application_key', 'device_token'], custom);
    const body = Object.assign({}, custom, { application_key, device_token });
    const headers = { Authorization: public_key };
    return !error ? axios.post(`${hostname}/api/v1/register/web`, body, { headers }) 
        .then(r => r && r.data ? r.data : r)
        .catch(e => e && e.response && e.response.data ? e.response.data : e)
    : null;
};

module.exports = {
    send,
    register,
};
