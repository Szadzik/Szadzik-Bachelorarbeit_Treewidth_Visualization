"use strict";

//test node.js in win

/*
let { spawn } = require(['child_process']);

function runChild() {
    console.log("in run child process");


    let dir = spawn('echo', ["hi"], { shell: true });

    dir.stdout.on('data', (data) => {
        console.log(data.toString());
    })
    dir.stderr.on('data', (data) => {
        console.log('Error: ' + data);
    })
    dir.stdout.on('close', (code) => {
        console.log('Process exit code: ' + code);
    })
    dir.stdout.on('exit', (data) => {
        console.log("exit code " + data);
    });
}

var child = spawn('node ./commands/server.js');
*/

/*
function execute(command) {
    const exec = require(['child_process']).exec

    exec(command, (err, stdout, stderr) => {
        process.stdout.write(stdout)
    })
}

execute('echo "Hello World!"')
*/
var sh = require(['shelljs']);