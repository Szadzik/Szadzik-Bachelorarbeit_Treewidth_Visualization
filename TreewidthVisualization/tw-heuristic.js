/** 
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This file must bee in the main folder (/var/www/html)
 * or the path of the functions needs to be changed.
 * It will start the heuristic algorithm from Pace2017-TrackA
 */
 const time = 4000; //waiting time

 /**
  * Create a child process in shell that start the PACE2017-TrackA algorithm.
  * After a specific time, a second shell will be created to stop the heursitic-process 
  * and itself after this.
  * The heuristic process returns a tree-graph in the shell.
  * @param {String} filePath the filepath with extension of a file
  * @returns the output from paceAlgo
  */
 async function tw_heuristic_terminal(filePath) {
     console.log("in heursitic");
     const util = require("util");
     const { exec } = require('child_process');
     const execProm = util.promisify(exec);
 
     try {
        let childKiller = new Promise((promise, resolve) => {
            setTimeout(function() { //after waiting, kill the child from above
               console.log("in time");
                killShell();
            }, time);
            console.log("in timeout");
        });

         let command = 'cd paceAlgorithm/PACE2017-TrackA && ./tw-heuristic < ' + filePath,
             options = { encoding: 'utf8' },
             child = await execProm(command, options);
             console.log("vor child");

         
         console.log("aus timeout");
 
         //start parallel the child and childKiller => avoids blocking 
         await Promise.all([child, childKiller]); //or 'race' wait for first promise
         console.log("after await");
         return "Error in file";
     } catch (err) {
 
         return getStdout(err);

     }
 }
 exports.tw_heuristic_terminal = tw_heuristic_terminal;
//  netstat -anp|grep "port_number"
// kill -9 PID
 
 /**
  *Create a child process in shell that start the PACE2017-TrackA algorithm.
  * After a specific time, a second shell will be created to stop the heursitic-process 
  * and itself after this.
  * The result will be saved in a .td file.
  * @param {String} filePath the filepath with extension of a file
  * @returns On succesd 0 will be returned, else -1.
  */
 async function tw_heuristic_file(filePath) {
     
     const util = require("util");
     const { exec } = require('child_process');
     const execProm = util.promisify(exec);
 
     try {
 
         let command = 'cd paceAlgorithm/PACE2017-TrackA/ && ./tw-heuristic < ' + filePath,
             options = { encoding: 'utf8' },
             child = await execProm(command, options);
 
         let childKiller = new Promise((promise, resolve) => {
             setTimeout(function() { //after waiting, kill the child from above
                 killShell();
             }, time);
         })
 
         //start parallel the child and childKiller => avoids blocking 
         await Promise.all([child, childKiller]); //or 'race' wait for first promise
	return "Error in file"; 
     } catch (err) {
         let resultPath = file.substring(0, file.lastIndexOf('.')) + '.td';
         return createTdFile(err, resultPath);
     }
 }
 exports.tw_heuristic_file = tw_heuristic_file;


 /**
  * Returns the output of the pace algorithm as string.
  * @param {Error} err 
  * @returns On success, the generated pace .td file will be returned as string, else -1.
  */
 function getStdout(err) {
     console.log("in error ",err);
     try {
	console.log("in retunr message");
         return err.stdout;
     } catch (err) {
	console.log("in error return message");
        exec('pgrep -f tw-heuristic | xargs kill -SIGTERM');  //or java for tw-heuristic
        exec('cd paceAlgorithm/PACE2017-TrackA/ && sudo rm *.log ');
	exec('cd uploads && sudo find -name "upload*" -type f mtime +1 | xargs rm');
         return -1;
     }
 }
 
 /**
  * A second shell will be created, that kill the tw-heuristic 
  * process from the first shell of the function @code{tw_heuristic_terminal}
  * and itself after this. 
  */
 function killShell() {
     console.log("in kill");
     const util = require("util");
     const { exec } = require('child_process');
     let command = 'pgrep -f tw-heuristic | xargs kill -SIGTERM', //or java for tw-heuristic
         option = { killSignal: 'SIGTERM' },
         child2 = exec(command, option);
    console.log("outkill")
 }
 
 /**
  * Create the .td file by the result of @code{tw_heursitic_file}.
  * This function gets as input the error that contains the stdout content.
  * From stdout, a .td file be created with the same name as the .gr file.
  * On success 0 will be returned, else -1.
  * @param {Error} err process results of the function tw_heuristic_file 
  * @returns returns 0 if the file was created successfully , -1 on error
  */
 async function createTdFile(err, resultPath) {
     const util = require("util");
     const { exec } = require('child_process');
     const execProm = util.promisify(exec);
 
     try {
         let command = 'printf "' + err.stdout + '" >> ' + resultPath; //enable backslash -e
         await execProm(command);
         console.log("file finished");
         return 0;
     } catch (err) {
         console.log("No .td file generated.");
         return -1;
     }
 }
