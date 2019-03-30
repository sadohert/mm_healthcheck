require('babel-polyfill');
require('isomorphic-fetch');
if (!global.WebSocket) {
    global.WebSocket = require('ws');
}
//import {Client4} from 'mattermost-redux/client';
const Client4 = require('./node_modules/mattermost-redux/client/client4.js').default;
const client = new Client4;
const wsClient = require('./node_modules/mattermost-redux/client/websocket_client.js').default;
var token;

// Test messages (GUID)
// setEventCallback set to look for those messages
// Set message sent time
// Record message received time
// Output round trip time.
// Maybe loop through larger list and provide average

wsClient.setEventCallback(function(event){
    console.log(event);
});

client.setUrl('https://mattermost.stuartdoherty.com');
client.login("stu", "jQNa9y7^U!")
.then(function(me){
    console.log(`logged in as ${me.email}`);
    token = client.getToken();
    token = 'e1aro47o5f8umchw3phmx6qenh'
    // TODO Check if token exists, error if not
    console.log(`token: ` + token);
})
.then(function(){
    console.log(`About to initializze wsClient`);
//    wsClient.initialize(token, {}, {}, {connectionUrl: 'wss://mattermost.stuartdoherty.com/api/v4/websocket'});
    wsClient.initialize(token, {connectionUrl: 'wss://mattermost.stuartdoherty.com/api/v4/websocket'});
}).then(function(){
    let post1 = {
        channel_id: "cazpan48njne5g3kb7u4gmsueo",
        message: `Stu Client4 API test`,
        type: '',
    }
    client.createPost(post1)
    
})
.catch(function(err){
    console.error(err);
}); 

