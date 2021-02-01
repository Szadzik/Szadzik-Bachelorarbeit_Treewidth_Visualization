//https://www.brainbell.com/javascript/child-process.html
//https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

const { executionAsyncResource } = require('async_hooks');
const { exec } = require('child_process');
var timer = 5000;


function startTreewidth(application) {
    if (application == "PACE2017-TrackA") //tamaki
        return;
    else if (application == "Jdrasil")
        return;
}
//ps
//kill -SIGTERM pid
//need try ctach java process: pgrep -f tw-java | xargs kill -SIGTERM  

// HEURISTIC
let command = 'cd ./PACE2017-TrackA && ./tw-heuristic < ../test.gr', //      > ../testHw.td
    options = { encoding: 'utf8' },
    dir = exec(command, options);


try {
    setTimeout(function() {
        command = 'pgrep -f tw-heuristic | xargs kill -SIGTERM  ', //kill tw-heuristic process, so td gets print
            options = { killSignal: 'SIGTERM' }, //kills himself after killing dir
            dir2 = exec(command, options);

        dir2.stdout.on('data', (data) => {
            console.log('data2 is ' + data);
        })
        dir2.stderr.on('data', (data) => {
            console.log('Error on dir2: ' + data);
        })

    }, timer);
} catch (err) {
    alertErr("Error in process ./tw-heuristic. </br> " + err.message);
} finally {
    //ensures that no lost java application is running that takes thread space
    exec('pgrep -f java | xargs kill -SIGTERM');
}

dir.stdout.on('data', (data) => {
    console.log(data);
})
dir.stderr.on('data', (data) => {
    console.log('Error: ' + data);
})
dir.on('close', (code) => {
    console.log('Process exit code: ' + code);
    //start VISUAL TODO , maybe dont do td and take full output to start
})

////// EXACT //////

command = 'cd ./PACE2017-TrackA && ./tw-exact < ../test.gr',
    options = { encoding: 'utf8' },
    dir = exec(command, options);




// from linux wwu exact

const { exec } = require('child_process');
let command = 'cd ./PACE2017-TrackA && ./tw-exact < ../test.gr',
    options = { encoding: 'utf8' },

    dir = exec(command, options);

dir.stdout.on('data', (data) => {
    console.log(data);
})
dir.stderr.on('data', (data) => {
    console.log('Error: ' + data);
})
dir.on('close', (code) => {
    console.log('Process exit code: ' + code);
})


/////////////////////////////////////////////////////////////////////////////////////////// 
// As helpers.js format 
///////////////////////////////////////////////////
//Exact

const resultPath = __dirname + '/uploads/'

function tw_exact() {
    const { exec } = require('child_process');

    let command = 'cd paceAlgorithms/PACE2017-TrackA/ && ./tw-exact <../example.gr > ../../uploads/example.td && cd /var/www/html',
        options = { encoding: 'utf8' },
        dir = exec(command, options);

    dir.stdout.on('data', (data) => {
        console.log(data);
    });
    dir.stderr.on('data', (data) => {
        console.log('Error: ' + data);
    });
    dir.on('close', (code) => {
        console.log('On close: Process exit code: ' + code);
    });

}
exports.tw_exact = tw_exact;


////heuristic
function tw_heuristic(file) {
    const { exec } = require('child_process');
    let command = 'cd ./PACE2017-TrackA && ./tw-heuristic < ../test.gr > ../testHW.td',
        options = { encoding: 'utf8' },
        dir = exec(command, options);

    try {
        setTimeout(function() {

            command = 'pgrep -f tw-heuristic | xargs kill -SIGTERM ',
                option = { killSignal: 'SIGTERM' },
                dir2 = exec(command, options);
            dir2.stdout.on('data', (data) => {
                console.log('data2 is ' + data);
            });
            dir2.stderr.on('data', (data) => {
                console.log('Error on dir2: ' + data);
            });
            dir2.on('close', (code) => {
                console.log('On close shell2: Process exit code: ' + code);
            });
            console.log("timeout end");
        }, 4000);
    } catch (err) {} finally {
        exec('pgrep -f java | xargs kill -SIGTERM')
    }


    dir.stdout.on('data', (data) => {
        console.log(data);

    });
    dir.stderr.on('data', (data) => {
        console.log('Error: ' + data);
    });
    dir.on('close', (code) => {
        console.log('On close: Process exit code: ' + code);
    });
}
exports.tw_heuristic = tw_heuristic;



/**
 * Create a child process in shell that start the PACE2017-TrackA algorithm.
 * After 4sec, a second shell will be created to stop the heursitic-process and itself after this.
 * The heuristic process returns a tree-graph in the shell.
 * @param {string} filePath the filepath with extension of a file
 * @returns the output from PACE2017-TrackA, a tree graph
 */
async function tw_heursitic_terminal(filePath) {
    const util = require("util");
    const { exec } = require('child_process');
    const execProm = util.promisify(exec);

    try {
        let command = 'cd paceAlgorithms/PACE2017-TrackA/ && ./tw-heuristic < ' + filePath,
            options = { encoding: 'utf8' },
            dir = await execProm(command, options);

        //Second shell which kill the tw-heursitic process and itself after 4sec.
        setTimeout(function() {
            command = 'pgrep -f tw-heuristic | xargs kill -SIGTERM',
                option = { killSignal: 'SIGTERM' },
                dir2 = exec(command, options);


        }, 4000);

        return dir.stdout;

    } catch (err) {
        console.log("Child process, catch error: ", err);
        console.log("> Kill all remaining pace processes <");
        exec('pgrep -f java | xargs kill -SIGTERM');
        //kills all java application. The applied pace algorithms are in java. 
        //alternative: pgrep -f tw-heuristic | xargs kill -SIGTERM
    }

}
exports.tw_heuristic_terminal = tw_heursitic_terminal;