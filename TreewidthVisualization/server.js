/**
 * This file is the server on a (open-)vpn that handle the paceAlgorithm on upload.
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
    res.sendFile(__dirname + '/index.html'); // change the path to your index.html
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
app.post('/uploadFiles', (req, res) => {

    console.log("req.file ", req.file);
    console.log("req.path ", req.files.uploaded_input.path);

    try {
        console.log("in post for tw_exact_terminal");
        let file = req.files.uploaded_input.path;
        tw.tw_exact_terminal(file).then(response => {
                console.log("Response from tw recieved. Continue with sending.");
                res.send(response);
            })
            .then(() => {
                console.log("Finished sending, start file deleting.");
                fs.unlink(file, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                console.log("End tw_exact_terminal.");
            })
    } catch (err) {
        res.send(400);
    }

});
/**
 * var field = document.getElementById("chicken");
field.id = "horse";  // using element properties
field.setAttribute("name", "horse");  // using .setAttribute() method
 */
//TODO tw-exact-file
/**
 * The handle of uploadFiles who start a pace algorithm with tw-exact 
 *  and then creates a .td file with the same name prefix.
 */
app.post('/uploadFiles', (req, res) => {

    console.log("req.file ", req.file);
    console.log("req.path ", req.files.uploaded_input.path);

    try {
        console.log("in post for tw_exact_file ");
        let file = req.files.uploaded_input.path;
        let newFile = file.substring(0, file.lastIndexOf('.')) + '.td';

        tw.tw_exact_file(file).then(response => {
                console.log("Response frm tw recieved. Continue with file generating.");
                return res.sendFile(newFile);
            })
            .then(() => {
                console.log("Finished sending, start file deleting.");
                fs.unlink(file, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });

                fs.unlink(newFile, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                console.log("End tw_exact_file.");
            })
    } catch (err) {
        res.send(400);
    }

});