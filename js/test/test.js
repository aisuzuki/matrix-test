"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrix = require("../index");
require("mocha");
describe('Matrix Test.', () => {
    it('Testng', async () => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const username = 'example0';
        const password = 'password';
        //    console.log('register')
        //    const registratoin = await matrix.register(username, password, matrix.AuthTypes.dummy)
        console.log('login');
        const auth = await matrix.login(username, password, matrix.AuthTypes.password);
        console.log('sendmessage1');
        await matrix.sendMessage(auth.user_id, 'TestEvent', 0, auth.access_token, { testevent_key1: 'testeventvalue1', testevent_key2: 'testeventvalue2' });
        console.log('sendmessage2');
        await matrix.sendMessage(auth.user_id, 'TestEvent', 1, auth.access_token, { testevent_key1: 'testeventvalue1', testevent_key2: 'testeventvalue2' });
        console.log('sync');
        const syncresult = await matrix.sync(auth.access_token);
        /* "to_device": {
          "events": [
              {
                  "content": {
                      "example_content_key": "example_value"
                  },
                  "sender": "@example:localhost",
                  "type": "testevent"
              },
              {
                  "content": {
                      "example_content_key": "example_value"
                  },
                  "sender": "@example:localhost",
                  "type": "testevent"
              }
          ]
          */
        syncresult.to_device.events.forEach(e => {
            console.log('event type: ' + e.type);
            console.log('sender: ' + e.sender);
            console.log('content: ' + e.content);
        });
    });
});
//# sourceMappingURL=test.js.map