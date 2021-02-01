 /**
  * Express creates a http Server and allows acces to middleware.
  * For a more complex server client communication should a web socket server a better solution.
  * 
  * TODO: How to handle multiple access and folder.
  */

 // 1) Load the express module
 const express = require('express');
 const fs = require('fs');
 const path = require('path')
 const formidable = require('formidable');
 var favicon = require('serve-favicon');

 // 2) Create express server
 const app = express();

 //app.use(express.static(__dirname + '/public'));

 // 5) Listen to the browser request and process it
 //app.get() – handle GET requests from the client
 // https://stackoverflow.com/questions/32257736/app-use-express-serve-multiple-html
 app.get('/', function(req, res) {
     console.log("in layout");
     res.sendFile(path.join(__dirname + '/public/indexW3.html'));
 });

 app.get('/fileupload', function(req, res) {
     console.log("uplaod file1");
 });


 const iconPath = path.join(__dirname + '/public/assets/icons/ico/icon29.ico');
 app.use(favicon(path.join(iconPath)));

 const HTML_DIR = path.join(__dirname, '/public/');
 app.use(express.static(HTML_DIR));


 app.get('/fileupload', function(req, res) {
     console.log("uplaod file2");
 });
 app.get('/upload', function(req, res) {
     console.log("uplaod something");
 });


 app.post('/api/upload', (req, res, next) => {

     const form = new formidable.IncomingForm();
     form.parse(req, function(err, fields, files) {

         var oldPath = files.profilePic.path;
         var newPath = path.join(__dirname, 'uploads') +
             '/' + files.profilePic.name
         var rawData = fs.readFileSync(oldPath)

         fs.writeFile(newPath, rawData, function(err) {
             if (err) console.log(err)
             return res.send("Successfully uploaded")
         })
     })
 });
 // 4) Turn on the server
 app.listen(3000, function(err) {
     if (err) console.log(err)
     console.log('Server listening on Port 3000');
 });


 //6) ready to start functions and accepting connections
 app.on('listening', function() {
     console.log("listening in on");
 });

 //https://www.programmersought.com/article/52786065688/
 //https://stackoverflow.com/questions/59376582/get-http-localhost3000-public-js-test-js-neterr-aborted-404-not-found