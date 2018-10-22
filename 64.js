var request = require('request').defaults({ encoding: null });

request.get('http://tinypng.org/images/example-shrunk-8cadd4c7.png', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
        console.log(data);
    }
});