"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
var AuthTypes;
(function (AuthTypes) {
    AuthTypes["dummy"] = "m.login.dummy";
    AuthTypes["password"] = "m.login.password";
})(AuthTypes = exports.AuthTypes || (exports.AuthTypes = {}));
// curl -XPOST -d '{"username":"example", "password":"wordpass", "auth": {"type":"m.login.dummy"}}' "https://localhost:8448/_matrix/client/r0/register"
async function register(username, password, authType) {
    const config = {
        url: 'https://localhost:8448/_matrix/client/r0/register',
        method: 'post'
    };
    config.data = {
        username: username,
        password: password,
        auth: { type: authType }
    };
    const body = await axios_1.default.request(config)
        .then(res => {
        return res.data;
    })
        .catch(err => {
        throw new Error('Ger device failed: Code=' + err);
    });
    return body;
}
exports.register = register;
// curl -k -XPOST -d '{"type":"m.login.password", "user":"example", "password":"wordpass"}' "https://localhost:8448/_matrix/client/r0/login"
async function login(username, password, authType) {
    const config = {
        url: 'https://localhost:8448/_matrix/client/r0/login',
        method: 'post'
    };
    config.data = {
        type: authType,
        user: username,
        password: password
    };
    const body = await axios_1.default.request(config)
        .then(res => {
        return res.data;
    })
        .catch(err => {
        throw new Error('Ger device failed: Code=' + err);
    });
    return body;
}
exports.login = login;
// curl -k -H 'Content-Type: application/json' -H 'Accept: application/json'  -XPUT "https://localhost:8448/_matrix/client/r0/sendToDevice/testevent/1?access_token=MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjVjaWQgdXNlcl9pZCA9IEBleGFtcGxlOmxvY2FsaG9zdAowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IFVpOTM6QGY7ZDFHI1A2TkIKMDAyZnNpZ25hdHVyZSDEuDopsjntyWUQl_EIZa3r0r7o8O-f7rUR5HNgDbYo1wo"  -d '{ "messages": { "@example:localhost": { "UAVWTAOIYQ": { "example_content_key": "example_value" } } } }'
async function sendMessage(username, eventName, txid, accessToken, values, deviceIds) {
    const config = {
        url: 'https://localhost:8448/_matrix/client/r0/sendToDevice/' + eventName + '/ ' + txid + ' ?access_token=' + accessToken,
        method: 'put'
    };
    const deviceMessage = {};
    if (!deviceIds) {
        deviceMessage['*'] = values;
    }
    else {
        deviceIds.forEach(i => {
            deviceMessage[i] = values;
        });
    }
    config.data = { messages: {} };
    config.data.messages[username] = deviceMessage;
    const body = await axios_1.default.request(config)
        .then(res => {
        return res.data;
    })
        .catch(err => {
        throw new Error('Ger device failed: Code=' + err);
    });
    return body;
}
exports.sendMessage = sendMessage;
// curl -k -XGET "https://localhost:8448/_matrix/client/r0/sync?access_token=MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjVjaWQgdXNlcl9pZCA9IEBleGFtcGxlOmxvY2FsaG9zdAowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IFVpOTM6QGY7ZDFHI1A2TkIKMDAyZnNpZ25hdHVyZSDEuDopsjntyWUQl_EIZa3r0r7o8O-f7rUR5HNgDbYo1wo"
// TODO: filters
async function sync(accessToken) {
    const config = {
        url: 'https://localhost:8448/_matrix/client/r0/sync?access_token=' + accessToken,
        method: 'get'
    };
    const body = await axios_1.default.request(config)
        .then(res => {
        return res.data;
    })
        .catch(err => {
        throw new Error('Ger device failed: Code=' + err);
    });
    return body;
}
exports.sync = sync;
//# sourceMappingURL=index.js.map