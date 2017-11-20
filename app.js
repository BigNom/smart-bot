const apiai = require('apiai');
const config = require('./server/config');
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const uuid = require('uuid');


// Messenger API parameters

if (!config.API_AI_CLIENT_ACCESS_TOKEN) {
	throw new Error('missing API_AI_CLIENT_ACCESS_TOKEN');
}

app.set('port', (process.env.PORT || 5000))

//verify request came from facebook
app.use(bodyParser.json({
	verify: verifyRequestSignature
}));

//serve static files in the public directory
app.use(express.static('public'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))

// Process application/json
app.use(bodyParser.json())

const apiAiService = apiai(config.API_AI_CLIENT_ACCESS_TOKEN, {
	language: "en",
	requestSource: "fb"
});


// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
})