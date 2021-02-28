"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Start a clock and recall the passed time since then 
 * by calling @getTime
 */
var CLock =
/*#__PURE__*/
function () {
  function CLock() {
    _classCallCheck(this, CLock);

    this.time = new Date(); //the date that will be set on run layout
  }
  /**
   * Calculates the passed (run-)time since @initialTime and return a string
   * of the elapsed hours, minutes, seconds and miliseconds time.
   * @param {Number} ms elapsed miliseconds since @initialTime
   * @returns {String} elapsed time since @initialTime
   */


  _createClass(CLock, [{
    key: "diff_time",
    value: function diff_time(ms) {
      var s = Math.floor(ms / 1000);
      ms = ms % 1000;
      var m = Math.floor(s / 60);
      s = s % 60;
      var h = Math.floor(m / 60);
      m = m % 60;
      return "Hours: " + h + "</br>Minutes: " + m + "</br>Seconds: " + s + "</br>Miliseconds: " + ms;
    }
    /**
     *  Returns the time since the setted time.
     */

  }, {
    key: "getTime",
    get: function get() {
      var timeNow = Date.now();
      var ms = timeNow - this.time;
      return this.diff_time(ms);
    }
    /**
     * Returns the start time of this clock.
     */

  }, {
    key: "setTime",
    get: function get() {
      return this.time;
    }
  }]);

  return CLock;
}();