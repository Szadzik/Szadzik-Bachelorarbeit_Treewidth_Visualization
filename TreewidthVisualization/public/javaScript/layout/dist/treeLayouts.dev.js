"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Contains layouts for the tree.
 */
var TreeLayouts =
/*#__PURE__*/
function () {
  function TreeLayouts() {
    var _this = this;

    _classCallCheck(this, TreeLayouts);

    this.eulerSpace = 0;
    var maxLayoutDuration = 1500;
    var layoutPadding = 50;

    var concentric = function concentric(node) {
      calculateCachedCentrality();
      return node.data('centrality');
    };
    /**
     * Use calculate centrality to calculate the level width.
     * @param {Nodes} nodes 
     */


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
    /**
     * Calculate centraility by node closeness
     */


    var calculateCachedCentrality = function calculateCachedCentrality() {
      //add property centrality
      var nodes = cr.nodes('.construct');

      if (nodes.length > 0 && nodes[0].data('centrality') == null) {
        var centrality = cr.elements().closenessCentralityNormalized();
        nodes.forEach(function (n) {
          return n.data('centrality', centrality.closeness(n));
        });
      }
    };

    this.layouts = {
      //IMPORTANT
      //Root won´t change value on call, 
      //so only the first setted value is root but this is wrong.
      //because of this, functions were declared that create a layout on call.
      breadthfirst: {
        name: 'breadthfirst',
        animate: false
      },
      cise: {
        name: 'cise',
        clusters: function clusters(node) {
          //console.log("bag cise ", node.data('bag'))
          var i = bagIds.indexOf(node.data('bag')); //console.log("ist i in ids of bag ", i)

          return node.data('bag');
        },
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
        animate: true,
        animationDuration: 500,
        ready: undefined,
        stop: undefined
      },
      concentric: {
        name: 'concentric',
        concentric: function concentric(node) {
          return node.degree();
        },
        levelWidth: function levelWidth(node) {
          return '#' + CytoscapeButtons.treePropertiesNode.bigBag.id();
        },
        // equidistant: 'true',
        minNodeSpacing: 1
      },
      concentricCentrality: {
        name: 'concentric',
        padding: layoutPadding,
        animate: false,
        animationDuration: maxLayoutDuration,
        concentric: concentric,
        levelWidth: levelWidth
      },
      concentricCentralityDegree: {
        name: 'concentric',
        padding: layoutPadding,
        animate: false,
        animationDuration: maxLayoutDuration,
        concentric: function concentric(node) {
          return node.degree();
        },
        levelWidth: function levelWidth(node) {
          return node.degree();
        }
      },
      cose: {
        name: 'cose',
        animate: 'false' //Just show the end result

      },

      /**cose-bilkent: cose with better result but has higher costs */
      coseBilkent: {
        name: 'cose-bilkent',
        animate: 'false' //Just show the end result

      },
      coseE: {
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
      },
      dagre2: {
        name: 'dagre',
        rankDir: 'BT',
        padding: 30,
        animate: false,
        ranker: function ranker(node) {
          if (node.hasClass('bag')) {} else return node.degree();
        }
      },
      dagre: {
        name: 'dagre',
        padding: 30,
        animate: false,
        //ranker: function(node) { return node.degree(); }
        ranker: function ranker(node) {
          if (node.hasClass('bag')) {} else return node.degree();
        }
      },
      euler: {
        name: 'euler',
        animate: false,
        springCoeff: function springCoeff(edge) {
          return 0.00003 - _this.eulerSpace;
        }
      },
      grid: {
        name: 'grid'
      },
      klay: {
        name: 'klay'
      },
      random: {
        name: 'random'
      },
      preset: {
        name: 'preset',
        positions: function positions(node) {
          //or make collection?
          if (node.hasClass('bag')) {
            //fastet if check with class
            return calucatePostionCircle(node.data('bag'));
          }
        }
      }
    };
  }
  /**
   * Set the euler space by the node size/volume
   */


  _createClass(TreeLayouts, [{
    key: "setEulerSpace",
    value: function setEulerSpace() {
      this.eulerSpace = cr.nodes('.construct')[0].data('size') / 10000000;
    }
    /**
     * Delete all edges and nodes until the maxDegree node is found.
     * Than restore all delted nodes and edges so that all elements
     * are the same but the first node of the collection is
     * the node with maxDegree for different layout builds.
     * 
     * THIS IS NOT INTEGRATED, But this works and could be integrated
     */

  }, {
    key: "constructByDegree",
    value: function constructByDegree() {
      var id = bagDegrees[bagDegrees.length - 1].id;
      var edges = cr.edges().remove();
      var collection = new Array();
      var notId = true;
      var index = 0;
      cr.nodes().forEach(function (n) {
        return console.log("node davor", n.id());
      });

      while (notId) {
        var node = cr.nodes()[index];

        if (id !== node.id()) {
          console.log("id ", node.id());
          var remove = node.remove(); //let remove = n.remove()

          console.log("was ist removed ", remove);
          collection.push(remove);
        } else notId = false;
      }

      collection.forEach(function (n) {
        return console.log("node in collection ", n.id());
      });
      collection.forEach(function (n) {
        return n.restore();
      });
      cr.nodes().forEach(function (n) {
        return console.log("node nach add ", n.id());
      });
      edges.restore();
    }
    /**
     * Returns the Breathfirst layout with maxDegree as root
     */

  }, {
    key: "breadthfirstMaxDegree",
    value: function breadthfirstMaxDegree() {
      var options = {
        name: 'breadthfirst',
        roots: '#' + bagDegrees[bagDegrees.length - 1].id
      };
      return cr.makeLayout(options); //on construct does not work
    }
    /**
     * Returns the Breathfirst layout with the biggestBag as root
     */

  }, {
    key: "breadthfirstBiggestBag",
    value: function breadthfirstBiggestBag() {
      var options = {
        name: 'breadthfirst',
        roots: '#' + CytoscapeButtons.treePropertiesNode.bigBag.id()
      };
      return cr.makeLayout(options); //on construct does not work
    }
  }]);

  return TreeLayouts;
}();