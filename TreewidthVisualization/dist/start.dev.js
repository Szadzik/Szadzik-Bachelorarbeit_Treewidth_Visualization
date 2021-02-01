"use strict";

//https://www.brainbell.com/javascript/child-process.html
//https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
var _require = require('child_process'),
    exec = _require.exec;

var timer = 5000;

function startTreewidth(application) {
  if (application == "PACE2017-TrackA") //tamaki
    return;else if (application == "Jdrasil") return;
} //ps
//kill -SIGTERM pid
//need try ctach java process: pgrep -f tw-java | xargs kill -SIGTERM  
// HEURISTIC


var command = 'cd ./PACE2017-TrackA && ./tw-heuristic < ../test.gr',
    //      > ../testHw.td
options = {
  encoding: 'utf8'
},
    dir = exec(command, options);

try {
  setTimeout(function () {
    command = 'pgrep -f tw-heuristic | xargs kill -SIGTERM  ', //kill tw-heuristic process, so td gets print
    options = {
      killSignal: 'SIGTERM'
    }, //kills himhelf after killing dir
    dir2 = exec(command, options);
    dir2.stdout.on('data', function (data) {
      console.log('data2 is ' + data);
    });
    dir2.stderr.on('data', function (data) {
      console.log('Error on dir2: ' + data);
    });
  }, timer);
} catch (err) {
  alertErr("Error in process ./tw-heuristic. </br> " + err.message);
} finally {
  exec('pgrep -f java | xargs kill -SIGTERM'); //ensures that no lost java application is running that takes thread space
}

dir.stdout.on('data', function (data) {
  console.log(data);
});
dir.stderr.on('data', function (data) {
  console.log('Error: ' + data);
});
dir.on('close', function (code) {
  console.log('Process exit code: ' + code);
}); ////// EXACT //////

command = 'cd ./PACE2017-TrackA && ./tw-exact < ../test.gr', options = {
  encoding: 'utf8'
}, dir = exec(command, options);