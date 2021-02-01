"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password'));

(function _callee() {
  var result, singleRecord, node;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(driver.verifyConnectivity());

        case 3:
          console.log('Driver created');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log("connectivity verification failed. ".concat(_context.t0));

        case 9:
          _context.prev = 9;
          _context.next = 12;
          return regeneratorRuntime.awrap(session.run('MATCH(p:bag) RETURN p'));

        case 12:
          result = _context.sent;
          console.log("in result neo4j");
          console.log("type ", _typeof(result));
          console.log("size of ", result.length); //console.log(result)

          singleRecord = result.records[0];
          node = singleRecord.get(0);
          result.forEach(function (r) {
            var result = r.get('bag');
            console.log("ergebnis is ", bag, " und inhalt ", r.get('nodes'));
          }); // console.log("single recor ", singleRecord, " node ", node)

          /*
          var session = driver.session({ defaultAccessMode: neo4j.session.READ })
              await session
              .run('MATCH(p:bag) RETURN p.bagId AS bag')
              .then(result => {
                  result.records.forEach(record => {
                      console.log(record.get('bag'))
                  })
              })
              .catch(error => {
                  console.log(error)
              })
              .then(() => session.close())
          */

        case 19:
          _context.prev = 19;
          console.log("sesssion has end");
          _context.next = 23;
          return regeneratorRuntime.awrap(session.close());

        case 23:
          return _context.finish(19);

        case 24:
          console.log("clolo");
          _context.next = 27;
          return regeneratorRuntime.awrap(driver.close());

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6], [9,, 19, 24]]);
})();