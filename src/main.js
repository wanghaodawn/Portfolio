var http = require('http');
var fs = require('fs');
var url = require('url');
var util = require('util');

http.createServer(function (request, response) {

    // Get pathname 
    var pathname = url.parse(request.url).pathname;
    var filename = "html" + pathname;
    console.log("Request for filename: [" + pathname + "] filename: [" + filename + "] received.");

    // Read from file system for the content
    fs.readFile(filename, function (err, data) {
      if (err) {
         console.log(err);
         // HTTP status code: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      } else {             
         // HTTP status code: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});    
         
         // Response
         response.write(data.toString());       
      }
      //  Send response data
      response.end();
  });
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');