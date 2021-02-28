/** 
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This file must bee in the main folder (/var/www/html)
 * or the path of the functions needs to be changed.
 * It will start the exact algorithm from PACE2017-TrackA
 */


/**
 * Create a child process in shell that start the PACE2017-TrackA algorithm.
 * The exact process returns a tree-graph in the shell.
 * @param {string} filePath the filepath with extension of a file
 * @returns the output from PACE2017-TrackA, a tree graph
 */
async function tw_exact_terminal(filePath) {
    const util = require("util");
    const { exec } = require('child_process');
    const execProm = util.promisify(exec);

    try {
        let command = 'cd paceAlgorithm/PACE2017-TrackA/ && ./tw-exact < ' + filePath,
            options = { encoding: 'utf8' },
            child = await execProm(command, options);

        return child.stdout;
    } catch (err) {
        console.log("Child process, catch error: ", err);
    }

}
exports.tw_exact_terminal = tw_exact_terminal;



/**
 * Create a child process in shell that start the PACE2017-TrackA algorithm.
 * As result, a .td file with the same name prefix will be created.
 * The process is exact.
 * @param {string} filePath the filepath with extension of a file
 */
async function tw_exact_file(filePath) {
    const util = require("util");
    const { exec } = require('child_process');
    const execProm = util.promisify(exec);

    try {
        let resultPath = file.substring(0, file.lastIndexOf('.')) + '.td';

        let command = 'cd paceAlgorithm/PACE2017-TrackA/ && ./tw-exact < ' + filePath + ' > ' + resultPath,
            options = { encoding: 'utf8' },
            child = await execProm(command, options);

    } catch (err) {
        console.log("Child process, catch error: ", err);
    }

}
exports.tw_exact_file = tw_exact_file;