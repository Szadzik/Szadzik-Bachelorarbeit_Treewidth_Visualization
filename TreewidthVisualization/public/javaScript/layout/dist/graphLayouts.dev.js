"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Contains layouts for the graph.
 */
var GraphLayouts =
/*#__PURE__*/
function () {
  function GraphLayouts() {
    var _this$layouts;

    _classCallCheck(this, GraphLayouts);

    var maxLayoutDuration = 1500;
    var layoutPadding = 50;

    var concentric = function concentric(node) {
      calculateCachedCentrality();
      return node.data('centrality');
    };

    var levelWidth = function levelWidth(nodes) {
      calculateCachedCentrality();
      var min = nodes.min(function (n) {
        return n.data('centrality');
      }).value;
      var max = nodes.max(function (n) {
        return n.data('centrality');
      }).value;
      return (max - min) / 5;
    };

    var calculateCachedCentrality = function calculateCachedCentrality() {
      //add property centrality
      var nodes = cy.nodes();

      if (nodes.length > 0 && nodes[0].data('centrality') == null) {
        var centrality = cy.elements().closenessCentralityNormalized();
        nodes.forEach(function (n) {
          return n.data('centrality', centrality.closeness(n));
        });
      }
    };

    var highestDegree = function highestDegree() {
      console.log("in heigh degree");
      return graphDegrees[graphDegrees.length - 1].id;
    };

    this.layouts = (_this$layouts = {
      breadthfirst: {
        name: 'breadthfirst',
        roots: highestDegree,
        //  roots: cy.nodes(`[id = "${highestDegree}"]`),
        animate: false
      },
      circle: {
        name: 'circle',
        fit: true,
        padding: 30,
        boundingBox: undefined,
        avoidOverlap: true,
        radius: undefined,
        startAngle: 10 * Math.PI,
        counterclockwise: true,
        sort: undefined,
        //animate: true,
        animationDuration: 500,
        ready: undefined,
        stop: undefined
      },
      colaTree: {
        name: 'cola',
        flow: 'tree'
      },
      cola: {
        name: 'cola',
        padding: layoutPadding,
        nodeSpacing: 12,
        edgeLengthVal: 45,
        maxSimulationTime: maxLayoutDuration,
        boundingBox: {
          // to give cola more space to resolve initial overlaps
          x1: 0,
          y1: 0,
          x2: 10000,
          y2: 10000
        }
      }
    }, _defineProperty(_this$layouts, "colaTree", {
      name: 'cola',
      flow: 'tree'
    }), _defineProperty(_this$layouts, "concentricCentrality", {
      name: 'concentric',
      padding: layoutPadding,
      animate: false,
      animationDuration: maxLayoutDuration,
      concentric: concentric,
      levelWidth: levelWidth
    }), _defineProperty(_this$layouts, "concentricHierarchyCentrality", {
      name: 'concentric',
      padding: layoutPadding,
      animate: false,
      animationDuration: maxLayoutDuration,
      concentric: concentric,
      levelWidth: levelWidth,
      sweep: Math.PI * 2 / 3,
      clockwise: true,
      startAngle: Math.PI * 1 / 6
    }), _defineProperty(_this$layouts, "cose", {
      name: 'cose',
      animate: 'false' //Just show the end result

    }), _defineProperty(_this$layouts, "coseBilkent", {
      name: 'cose-bilkent',
      animate: 'false' //Just show the end result

    }), _defineProperty(_this$layouts, "coseBilkentDraft", {
      name: 'cose-bilkent',
      quality: 'draft',
      animate: 'false' //Just show the end result,

    }), _defineProperty(_this$layouts, "coseBilkentProof", {
      name: 'cose-bilkent',
      quality: 'proof',
      animate: 'false' //Just show the end result,

    }), _defineProperty(_this$layouts, "coseE", {
      name: "cose",
      idealEdgeLength: 100,
      nodeOverlap: 20,
      refresh: 20,
      fit: true,
      padding: 30,
      randomize: false,
      componentSpacing: 100,
      nodeRepulsion: 400000,
      edgeElasticity: 100,
      nestingFactor: 5,
      gravity: 80,
      numIter: 1000,
      initialTemp: 200,
      coolingFactor: 0.95,
      minTemp: 1.0,
      animate: false
    }), _defineProperty(_this$layouts, "dagre", {
      name: 'dagre',
      padding: 30,
      animate: false,
      rankDir: 'BT'
    }), _defineProperty(_this$layouts, "euler", {
      name: 'euler'
    }), _defineProperty(_this$layouts, "grid", {
      name: 'grid'
    }), _defineProperty(_this$layouts, "klay", {
      name: 'klay'
    }), _defineProperty(_this$layouts, "random", {
      name: 'random'
    }), _this$layouts);
  }

  _createClass(GraphLayouts, [{
    key: "setEulerSpace",
    value: function setEulerSpace() {
      eulerSpace = cr.nodes('.construct')[0].data('size') / 10000000;
      console.log("size euler", cr.nodes('.construct')[0].data('size'), " und reuchung ", eulerSpace);
    }
  }]);

  return GraphLayouts;
}();