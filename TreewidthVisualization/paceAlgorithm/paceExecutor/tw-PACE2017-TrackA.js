/**
* Execute the tw-exact algorithm from PACE2017-TrackA
*/

const resultPath = './uploads/'; 
const uploadPath = './uploads/';
/**
* Runs the tw-exact from PACE2017-TrackA
*/
function tw_exact(fileName) {
    const { exec } = require('child_process');

        let command = 'cd ./../paceAlgorithms/PACE2017-TrackA && ./tw-exact < ../test.gr',
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




/**
*Runs the tw-heursitic from PACE2017-TrackA
*/
function tw_heuristic() {
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
