var http = require('http');
var fs = require('fs');
var url = require('url');
var util = require('util');

http.createServer(function (request, response) {

    // Get pathname 
    var pathname = url.parse(request.url).pathname;

    if (pathname.length <= 1) {
        pathname = "/index.html";
    }

    // Convert pathname to filename according to extention
    var filename = pathname;
    if (pathname.endsWith(".html")) {
        filename = "html" + pathname;
    } else if (pathname.endsWith(".css")) {
        filename = pathname.substring(1);
    } else if (pathname.endsWith(".png") || pathname.endsWith(".jpg") || pathname.endsWith(".jpeg") || pathname.endsWith(".gif") || pathname.endsWith(".ico")) {
        filename = pathname.substring(1);
    }
    
    console.log("Request for pathname: [" + pathname + "] filename: [" + filename + "] received.");

    // Read from file system for the content
    fs.readFile(filename, function (err, data) {
        if (err) {
            console.log(err);
            // HTTP status code: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else if (filename.startsWith("images")) {
            // HTTP status code: 200 : OK
            if (filename.endsWith(".png")) {
                response.writeHead(200, {'Content-Type': 'image/png'}); 
            } else if (filename.endsWith(".jpg")) {
                response.writeHead(200, {'Content-Type': 'image/jpg'}); 
            } else if (filename.endsWith(".jpeg")) {
                response.writeHead(200, {'Content-Type': 'image/jpeg'}); 
            } else if (filename.endsWith(".gif")) {
                response.writeHead(200, {'Content-Type': 'image/gif'}); 
            } else if (filename.endsWith(".ico")) {
                response.writeHead(200, {'Content-Type': 'image/ico'}); 
            }
            response.end(data, 'binary');
        } else {
            // HTTP status code: 200 : OK
            if (filename.endsWith(".css")) {
                response.writeHead(200, {'Content-Type': 'text/css'});
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});    
            }
         
            // Response
            response.write(data.toString());   
            // Send response data
            response.end();    
        }
    });
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');