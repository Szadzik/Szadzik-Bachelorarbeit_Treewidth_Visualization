"use strict";

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
function tw_exact_terminal(filePath) {
  var util, _require, exec, execProm, command, options, child;

  return regeneratorRuntime.async(function tw_exact_terminal$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          util = require("util");
          _require = require('child_process'), exec = _require.exec;
          execProm = util.promisify(exec);
          _context.prev = 3;
          command = 'cd paceAlgorithm/PACE2017-TrackA/ && sudo rm *.log &&./tw-exact < ' + filePath;
          options = {
            encoding: 'utf8'
          };
          _context.next = 8;
          return regeneratorRuntime.awrap(execProm(command, options));

        case 8:
          child = _context.sent;
          return _context.abrupt("return", child.stdout);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.log("Child process, catch error: ", _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
}

exports.tw_exact_terminal = tw_exact_terminal;
/**
 * Create a child process in shell that start the PACE2017-TrackA algorithm.
 * As result, a .td file with the same name prefix will be created.
 * The process is exact.
 * @param {string} filePath the filepath with extension of a file
 */

function tw_exact_file(filePath) {
  var util, _require2, exec, execProm, resultPath, command, options, child;

  return regeneratorRuntime.async(function tw_exact_file$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          util = require("util");
          _require2 = require('child_process'), exec = _require2.exec;
          execProm = util.promisify(exec);
          _context2.prev = 3;
          resultPath = file.substring(0, file.lastIndexOf('.')) + '.td';
          command = 'cd paceAlgorithm/PACE2017-TrackA/ && ./tw-exact < ' + filePath + ' > ' + resultPath;
          options = {
            encoding: 'utf8'
          };
          _context2.next = 9;
          return regeneratorRuntime.awrap(execProm(command, options));

        case 9:
          child = _context2.sent;
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](3);
          console.log("Child process, catch error: ", _context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 12]]);
}

exports.tw_exact_file = tw_exact_file;