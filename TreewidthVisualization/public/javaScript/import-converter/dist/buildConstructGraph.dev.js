"use strict";

/**
 * This build a construct graph as reference for the real bag-Graph.
 * All construct nodes get sortet by a layout to build schema-coordinates (something like a blueprint).
 * Each node represent the center of a bag and get delted after submitting his coordinates.
 */
var constructBags; //collection of the 

var constructEdges; //collect connections between bags (not nodes)
//reference

function buildConstruct() {}
/**
 * Edge between a @source node/bag to a @target node/bag 
 * @param {*} source bagId
 * @param {*} target bagId
 */


function setConstructEdges(source, target) {
  cr.add({
    data: {
      id: 'e:' + source + " " + target,
      source: source,
      //bagId
      target: target //bagId

    }
  });
}
/**
 * Nodes as reference-start-pose for each real bag
 */


function addConstructNodes() {
  constructBags.forEach(function (b) {
    cr.add({
      data: {
        id: b
      },
      classes: 'construct'
    });
  });
}

function getNodePoistion() {
  var coordinates = nodeMaxGrad.renderPosition();
}

function drawBubble() {
  cr.ready(function () {
    var bb = cr.bubbleSets({
      interactive: true,
      zIndex: 100
    }); //list of (bag-)Ids

    var bags = Array.from(new Set(cr.elements().map(function (el) {
      return el.data('bag');
    })));
    bags.forEach(function (bag) {
      var nodes = cr.nodes("[bag = \"".concat(bag, "\"]"));

      var _bb$addPath = bb.addPath(nodes, null, null, {
        virtualEdges: true,
        style: {
          fill: 'rgba(255, 0, 0, 0)',
          stroke: 'black',
          strokeDasharray: '5, 5, 5'
        }
      }),
          node = _bb$addPath.node;
    });
  });
}

function drawBubbleFull() {
  cr.ready(function () {
    var bb = cr.bubbleSets();
    bb.addPath(cr.nodes(), cr.edges(), null);
  });
}