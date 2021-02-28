"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Contains layout information that are required from the graph and tree.
 */
var LayoutDatas = function LayoutDatas(isTree) {
  _classCallCheck(this, LayoutDatas);

  this.maxLayoutDuration = 1500;
  this.layoutPadding = 50;

  this.concentric = function (node) {
    this.calculateCachedCentrality;
    return node.data('size');
  };

  this.levelWidth = function (nodes) {
    this.calculateCachedCentrality;
    var min = nodes.min(function (n) {
      return n.data('centrality');
    }).value;
    var max = nodes.max(function (n) {
      return n.data('centrality');
    }).value;
    return (max - min) / 5;
  };

  this.calculateCachedCentrality = function () {
    var nodes;
    if (isTree) nodes = cr.nodes('.construct');else nodes = cy.nodes();

    if (nodes.length > 0 && nodes[0].data('centrality') == null) {
      var centrality;
      if (isTree) centrality = cr.nodes('.construct').closenessCentralityNormalized();else centrality = cy.elements().closenessCentralityNormalized();
      nodes.forEach(function (n) {
        return n.data('centrality', centrality.closeness(n));
      });
    }
  };
};