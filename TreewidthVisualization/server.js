/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This file is the server on a (open-)vpn that handle the pace algorithm on upload.
 * Beforehand, the uploaded data is handled on the client side and 
 * is only sending an upload file if it is ONE file of sepecific formats.
 * 
 * The server is created by express.js, a extension for node.js that 
 * creates a http server and allows acces to middleware.
 */

 const express = require('express');
 const formidableMiddleware = require('express-formidable');
 const path = require('path');
 const fs = require('fs');
 const tw = require('./tw-exact');
 const tw2 = require('./tw-heuristic');
 
 
 //create the server application
 const app = express();
 
 app.use(formidableMiddleware({
     encoding: 'utf-8',
     uploadDir: __dirname + '/uploads',
     keepExtensions: true,
     multiples: false
 }));
 
 //the port on which the server runs
 const port = process.env.PORT || 3000;
 
 //send client his contents on request (on connection)
 app.get('/', function(req, res) {
     console.log({ method: req.method, url: req.url });
     res.sendFile(__dirname + '/public/index.html'); // change the path to your index.html
 });
 
 //make all datas usable from public folder 
 app.use(express.static(__dirname + '/public'));
 
 
 //start server
 app.listen(port, () => console.log(`Listening on port ${port}...`));

 // tw-exact-terminal
 /**
  * The handle of uploadFiles who start a pace algorithm with tw-exact 
  *  and send the result to shell.
  */
 app.post('/tw_exact_terminal', (req, res) => {
     //console.log("req.file ", req.files);
     console.log("req.path ", req.files.uploaded_input.path);
     let file = req.files.uploaded_input.path;
     let fileName = file.substring(file.lastIndexOf('/')+1, file.length);
     console.log("new filename ", fileName);
     try {
         console.log("in post for tw_exact_terminal");
         tw.tw_exact_terminal(file).then(response => {
                 console.log("Response from tw recieved. Continue with sending.");
                 res.send(response);
             })
             .then(() => {
                 console.log("Finished sending, start file deleting.");
                 fs.unlink(file, (err) => {
                     if (err) {
                         console.log(err);
                         return;
                     }
                 });
                 console.log("End tw_exact_terminal.");
             })
     } catch (err) {
         try{
            fs.unlink(file, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            const util = require("util");
            const { exec } = require('child_process');
            exec('cd uploads && sudo find -name "upload*" -type f mtime +1 | xargs rm');s

         }catch(err){
            const util = require("util");
            const { exec } = require('child_process');
            exec('cd uploads && sudo rm '+fileName);
            //remove all files that are older than 1 days
            exec('cd uploads && sudo find -name "upload*" -type f mtime +1 | xargs rm');
         }
        
         res.send(400);
     }
 });


 app.post('/tw_heuristic_terminal', (req, res) => {
 
    console.log("req.path ", req.files.uploaded_input.path);
    let file = req.files.uploaded_input.path;
    let fileName = file.substring(file.lastIndexOf('/')+1, file.length);
    console.log("new filename ", fileName);
     try {
         console.log("in post for tw_heursitic_terminal");
         tw2.tw_heuristic_terminal(file).then(response => {
                 console.log("Response from tw recieved. Continue with sending.");
                 res.send(response);
             })
             .then(() => {
                 console.log("Finished sending, start file deleting.");
                 fs.unlink(file, (err) => {
                     if (err) {
                         console.log(err);
                         return;
                     }
                 });
                 console.log("End tw_heuristic_terminal.");
             })
     } catch (err) {
        try{
            fs.unlink(file, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            const util = require("util");
            const { exec } = require('child_process');
            exec('cd uploads && sudo find -name "upload*" -type f mtime +1 | xargs rm');
         }catch(err){
             console.log("in catch2");
            const util = require("util");
            const { exec } = require('child_process');
            exec('cd uploads && sudo rm '+fileName);
            //remove all files that are older than 1 days
            exec('cd uploads && sudo find -name "upload*" -type f mtime +1 | xargs rm');
            
         }
         res.send(400);
     }
 
 });
 
 //////////////////////////////////////////////////////////// 
 // EXAMPLE / TEST 
 ///////////////////////////////////////////////////
 //AN EXAMPLE / TEST How to use the action on actions with the ending file.
 //this is not in use.
 /**
  * The handle of uploadFiles who start a pace algorithm with tw-exact 
  *  and then creates a .td file with the same name prefix.
  */
 app.post('/tw_exact_file', (req, res) => {
     console.log("HEURSITIC");
     console.log("req.file ", req.file);
     console.log("req.path ", req.files.uploaded_input.path);
     let file = req.files.uploaded_input.path;
     let newFile = file.substring(0, file.lastIndexOf('.')) + '.td';
     try {
         console.log("in post for tw_exact_file ");
         tw.tw_exact_file(file).then(response => {
                 console.log("Response frm tw recieved. Continue with file generating.");
                 return res.sendFile(newFile);
             })
             .then(() => {
                 console.log("Finished sending, start file deleting.");
                 fs.unlink(file, (err) => {
                     if (err) {
                         console.log(err);
                         return;
                     }
                 });
 
                 fs.unlink(newFile, (err) => {
                     if (err) {
                         console.log(err);
                         return;
                     }
                 });
                 console.log("End tw_exact_file.");
             })
     } catch (err) {
        fs.unlink(file, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });

        fs.unlink(newFile, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
         res.send(400);
     }
 
 });
 