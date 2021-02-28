"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SidebarButtons =
/*#__PURE__*/
function () {
  function SidebarButtons() {
    _classCallCheck(this, SidebarButtons);
  }

  _createClass(SidebarButtons, [{
    key: "selectMaxDegreeConstruct",
    value: function selectMaxDegreeConstruct() {
      console.log("in click maxdeg");
      var id = treeDegrees[treeDegrees.length - 1].id;
      var mD = cr.nodes('.construct').filter("[id = \"".concat(id, "\"]"));
      mD.toggleClass('highestGrad', true);
    }
  }, {
    key: "selectBiggestBag",
    value: function selectBiggestBag() {
      var biggestBag = sortedTotalBagSize[sortedTotalBagSize.length - 1];
    }
  }]);

  return SidebarButtons;
}();