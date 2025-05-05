//homework 5 code

const http = require("http"); // web server module
const querystr = require('querystring'); // parse and format URL query strings
const port = 8080;

//callback function, by web server to process client HTTP requests
function applicationServer(request, response) {
    // text/plain: Used for plain text
    // application/json: Used for transmitting JSON data.
    // application/x-www-form-urlencoded: Commonly used for form submissions.
    let acceptableContent = ["text/plain", "application/json", "application/x-www-form-urlencoded"];
    
    if(request.method != "POST") {                                                       //Check if client is posting the request
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end("Clients can only send post requests.");
    }

    let contentType = request.headers["content-type"];                   
    console.log(contentType);
    if(contentType == undefined || !(acceptableContent.includes(contentType))){          //Check if content type is in the supported list
        response.writeHead(415, {'Content-Type': 'text/plain'});
        response.write("Content type is not supported. Use one of these: \n");
        response.end(acceptableContent.join('\r\n'));
    }
    
    let body = "";
    request.on("data", (chunk) => {
        body += chunk;
    });
    request.on("end", () => {                                                            //Attempt to parse the content types
        if(contentType === "text/plain") {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end(body);
        }
        else if(contentType === "application/json") {
            try {
                let parsedMessage = JSON.parse(body);
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify(parsedMessage));
            }
            catch(error) {
                response.writeHead(400, {"Content-Type": "text/plain"});
                response.end("Bad Request: Invalid JSON format");
            }
        }
        else if(contentType === "application/x-www-form-urlencoded") {
            let parsedMessage = querystr.stringify(querystr.decode(body));
            response.writeHead(200, { "Content-Type": "application/x-www-form-urlencoded" });
            response.end(parsedMessage);
        }
    });
}

//Create and listen to server
const webServer = http.createServer(applicationServer);
console.debug("Started Server on " + port);
webServer.listen(port);

module.exports = webServer;