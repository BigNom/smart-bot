var http = require('http');
// var apiai = require("../module/apiai");
var apiai = require("apiai");

var app = apiai("84044fd60c384f0da64abd99c8593722");

var code = 405;

var server = http.createServer(function(request, response) {
    if (request.method == 'POST' && request.url == '/upload') {
        var voiceRequest = app.voiceRequest();

        voiceRequest.on('response', function(_response) {
            response.end(JSON.stringify(_response));
        });

        voiceRequest.on('error', function(error) {
            console.log(error);
            response.end();
        });

        request.on('data', function(chunk) {
            voiceRequest.write(chunk);
        });

        request.on('end', function() {
            voiceRequest.end();
        });
    } else {
        response.writeHead(code, {});
        response.end();
    }

    console.log(request.headers);
});

server.listen(8000);