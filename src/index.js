var http = require("http");
//import axiostest.js;
//create a server object:
http
  .createServer(function(req, res) {
    res.write("Hello World!"); //write a response to the client
    res.write(results / result.json);
    res.write("dus");

    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
