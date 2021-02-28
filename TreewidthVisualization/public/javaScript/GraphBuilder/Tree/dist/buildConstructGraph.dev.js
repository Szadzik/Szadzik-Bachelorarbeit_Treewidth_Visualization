"use strict";

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This build a plain graph where the nodes represents the start-pose for the bags of the real bag-Graph.
 * All construct nodes get sortet by a layout to build schema-coordinates (something like a blueprint).
 * Each node represent the center of a bag and get delted after submitting his coordinates.
 */
var constructBags; //collection of the 

var constructEdges; //collect connections between bags (not nodes)

/**
 * Edge between a @source node/bag to a @target node/bag 
 * @param {Number} source bagId
 * @param {Number} target bagId
 */

function setConstructEdges(source, target) {
  cr.add({
    group: "edges",
    data: {
      id: 'constructE:' + source + " " + target,
      source: source,
      //bagId
      target: target //bagId

    },
    classes: 'construct'
  });
}
/**
 * Set a plain node which is needed for the start position of a bag.
 * @param {Number} bagId the bag number
 * @param {Number} totalNumber the total number of elements in a bag
 */


function setConstructNode(bagId, totalNumber) {
  cr.add({
    data: {
      id: bagId,
      size: sumDivisibilityRadius(totalNumber),
      displayedText: bagId
    },
    classes: 'construct'
  });
}
/**
 * Counts the circluated circles in a bag and calls the function @calculateCircumference with
 *  the calculated circles as argument to get the full-bag radius as result.
 * @param {Number} totalNumber the total number of elements in a bag
 * @returns {Number} the full-bag radius
 */


function sumDivisibilityRadius(totalNumber) {
  var sum = startNumber;
  var cCircle = 1;
  var total = startNumber;

  while (total < totalNumber) {
    sum = sum * 2;
    cCircle++;
    total += sum;
  }

  return calculateCircumference(cCircle);
}
/**
 * Calculate the full-bag radius ,
 * by sum up the number of circluated circles (@cCircle) 
 * with the radius information. 
 * @param {Number} cCircle number of circluated circles in a bag
 * @returns {Number} the full-bag radius
 */


function calculateCircumference(cCircle) {
  var sum = startRadius;

  for (var a = 1; a < cCircle; a++) {
    //start on 1 so the first value does not got +10
    sum += radiusOffset + startRadius;
  }

  sum *= 2; //radius to diameter

  sum += startRadius + 15; //+15 extra border space and + startRadius because the caluclate of radius reach only to center of the node

  return sum;
}
/**
 * Resize the shape size of each node.
 */


function resizeConstructNodes() {
  cr.nodes('.construct').forEach(function (n) {
    n.style('width', n.data('size'));
    n.style('height', n.data('size'));
  });
}

function getNodePoistions() {
  var l = cr.nodes().positions();
  l.forEach(function (a) {
    return console.log("pos ", a.position());
  });
}
/**
 * Get the position of a node with the id = @bagId of the class "construct"
 * @param {Number*} bagId 
 */


function getNodePoistion(bagId) {
  var p = cr.nodes('.construct').filter("[id = \"".concat(bagId, "\"]"));
  return p.position();
}