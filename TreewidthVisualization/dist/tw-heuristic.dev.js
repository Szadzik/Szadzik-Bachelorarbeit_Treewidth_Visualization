"use strict";

/** 
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This file must bee in the main folder (/var/www/html)
 * or the path of the functions needs to be changed.
 * It will start the heuristic algorithm from PACE2017-TrackA
 */
var time = 4000; //waiting time

/**
 * Create a child process in shell that start the PACE2017-TrackA algorithm.
 * After a specific time, a second shell will be created to stop the heursitic-process 
 * and itself after this.
 * The heuristic process returns a tree-graph in the shell.
 * @param {string} filePath the filepath with extension of a file
 * @returns the output from PACE2017-TrackA, a tree graph
 */

function tw_heursitic_terminal(filePath) {
  var util, _require, exec, execProm, command, options, child, childKiller;

  return regeneratorRuntime.async(function tw_heursitic_terminal$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          util = require("util");
          _require = require('child_process'), exec = _require.exec;
          execProm = util.promisify(exec);
          _context.prev = 3;
          command = 'cd paceAlgorithm/PACE2017-TrackA/ && ./tw-heuristic < ' + filePath;
          options = {
            encoding: 'utf8'
          };
          _context.next = 8;
          return regeneratorRuntime.awrap(execProm(command, options));

        case 8:
          child = _context.sent;
          childKiller = new Promise(function (promise, resolve) {
            setTimeout(function () {
              //after waiting, kill the child from above
              killShell();
            }, time);
          }); //start parallel the child and childKiller => avoids blocking 

          _context.next = 12;
          return regeneratorRuntime.awrap(Promise.all([child, childKiller]));

        case 12:
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          getStdout(_context.t0); // console.log("Close all remaining processes");
          // exec('pgrep -f java | xargs kill -SIGTERM'); //or tw-heursitic
          //return err.stdout;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14]]);
}

exports.tw_heuristic_terminal = tw_heursitic_terminal;
/**
 *Create a child process in shell that start the PACE2017-TrackA algorithm.
 * After a specific time, a second shell will be created to stop the heursitic-process 
 * and itself after this.
 * The result will be saved in a .td file.
 * @param {string} filePath the filepath with extension of a file
 * @returns On succesd 0 will be returned, else -1.
 */

function tw_heursitic_file(filePath) {
  var util, _require2, exec, execProm, command, options, child, childKiller, resultPath;

  return regeneratorRuntime.async(function tw_heursitic_file$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          util = require("util");
          _require2 = require('child_process'), exec = _require2.exec;
          execProm = util.promisify(exec);
          _context2.prev = 3;
          command = 'cd paceAlgorithm/PACE2017-TrackA/ && ./tw-heuristic < ' + filePath;
          options = {
            encoding: 'utf8'
          };
          _context2.next = 8;
          return regeneratorRuntime.awrap(execProm(command, options));

        case 8:
          child = _context2.sent;
          childKiller = new Promise(function (promise, resolve) {
            setTimeout(function () {
              //after waiting, kill the child from above
              killShell();
            }, time);
          }); //start parallel the child and childKiller => avoids blocking 

          _context2.next = 12;
          return regeneratorRuntime.awrap(Promise.all([child, childKiller]));

        case 12:
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          resultPath = file.substring(0, file.lastIndexOf('.')) + '.td';
          return _context2.abrupt("return", createTdFile(_context2.t0, resultPath));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 14]]);
}

exports.tw_heuristic_file = tw_heursitic_file;
/**
 * Returns the output of the pace algorithm as string.
 * @param {error} err 
 * @returns On success, the generated pace .td file will be returned as string, else -1.
 */

function getStdout(err) {
  try {
    return err.stdout;
  } catch (err) {
    return -1;
  }
}
/**
 * A second shell will be created, that kill the tw-heuristic 
 * process from the first shell of the function @code{tw_heuristic_terminal}
 * and itself after this. 
 */


function killShell() {
  var util = require("util");

  var _require3 = require('child_process'),
      exec = _require3.exec;

  var command = 'pgrep -f tw-heuristic | xargs kill -SIGTERM',
      option = {
    killSignal: 'SIGTERM'
  },
      child2 = exec(command, option);
}
/**
 * Create the .td file by the result of @code{tw_heursitic_file}.
 * This function gets as input the error that contains the stdout content.
 * From stdout, a .td file be created with the same name as the .gr file.
 * On success 0 will be returned, else -1.
 * @param {error} err process results of the function tw_heuristic_file 
 * @returns returns 0 if the file was created successfully , -1 on error
 */


function createTdFile(err, resultPath) {
  var util, _require4, exec, execProm, command;

  return regeneratorRuntime.async(function createTdFile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          util = require("util");
          _require4 = require('child_process'), exec = _require4.exec;
          execProm = util.promisify(exec);
          _context3.prev = 3;
          command = 'printf "' + err.stdout + '" >> ' + resultPath; //enable backslash -e

          _context3.next = 7;
          return regeneratorRuntime.awrap(execProm(command));

        case 7:
          console.log("file finished");
          return _context3.abrupt("return", 0);

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](3);
          console.error("No .td file generated.");
          return _context3.abrupt("return", -1);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 11]]);
}