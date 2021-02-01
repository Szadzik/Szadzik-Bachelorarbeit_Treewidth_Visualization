"use strict";

function tw_exact(filePath) {
  var _require, exec, execProm, resultPath, command, dir;

  return regeneratorRuntime.async(function tw_exact$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _require = require('child_process'), exec = _require.exec;
          execProm = util.promisify(exec);
          _context.prev = 2;
          resultPath = filePath.substring(0, lastIndexOf('.')) + '.td';
          command = 'cd paceAlgorithms/PACE2017-TrackA/ && ./tw-exact < ' + filePath + ' > ' + resultPath + ' && cd /var/www/html', dir = execProm(command);
          dir.stdout.on('data', function (data) {
            console.log(data);
          });
          dir.stderr.on('data', function (data) {
            console.log('Error: ' + data);
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(dir.on('close', function (code) {
            console.log('On close: Process exit code: ' + code);
          }));

        case 9:
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          console.log("catch error: ", _context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
}

exports.tw_exact = tw_exact;

function tw_exact2(filePath) {
  var _require2, exec, execProm, resultPath, command, dir;

  return regeneratorRuntime.async(function tw_exact2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _require2 = require('child_process'), exec = _require2.exec;
          execProm = util.promisify(exec);
          _context2.prev = 2;
          resultPath = filePath.substring(0, lastIndexOf('.')) + '.td';
          command = 'cd paceAlgorithms/PACE2017-TrackA/ && ./tw-exact < ' + filePath, dir = execProm(command);
          dir.stdout.on('data', function (data) {
            console.log(data);
          });
          dir.stderr.on('data', function (data) {
            console.log('Error: ' + data);
          });
          _context2.next = 9;
          return regeneratorRuntime.awrap(dir.on('close', function (code) {
            console.log('On close: Process exit code: ' + code);
          }));

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](2);
          console.log("catch error: ", _context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 11]]);
}

exports.tw_exact2 = tw_exact2;