'use strict'

const config = require('./server/config')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var apiai = require('apiai');

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.usrlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.send('Hello world, I am a Chat bot')
})

app.get("/webhook", function (req, res) {
	console.log("request");
	if (req.query["hub.mode"] === subscribe && req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
			console.log("Verified webhook");
			res.status(200).send(req.query["hub.challenge"]);
	} else {
			console.error("Verification failed. The tokens do not match.");
			res.sendStatus(403);
	}
});

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})