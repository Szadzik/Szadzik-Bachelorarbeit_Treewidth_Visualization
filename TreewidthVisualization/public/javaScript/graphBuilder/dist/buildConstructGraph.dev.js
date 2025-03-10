"use strict";

/**
 * This build a plain graph where the nodes represents the start-pose for the bags of the real bag-Graph.
 * All construct nodes get sortet by a layout to build schema-coordinates (something like a blueprint).
 * Each node represent the center of a bag and get delted after submitting his coordinates.
 */
var constructBags; //collection of the 

var constructEdges; //collect connections between bags (not nodes)

function buildConstruct() {}
/**
 * Edge between a @source node/bag to a @target node/bag 
 * @param {number} source bagId
 * @param {number} target bagId
 */


function setConstructEdges(source, target) {
  cr.add({
    "group": "edges",
    //   constructEdge,
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
 * @param {number} bagId the bag number
 * @param {number} totalNumber the total number of elements in a bag
 */


function setConstructNode(bagId, totalNumber) {
  //console.log(" in set construct node ", bagId, " und totalNumber ", totalNumber)
  var node = cr.add({
    data: {
      id: bagId,
      size: sumDivisibilityRadius(totalNumber),
      displayedText: bagId
    },
    classes: 'construct'
  }); //TODO resize
}
/**
 * Counts the circluated circles in a bag and calls the function @calculateCircumference with
 *  the calculated circles as argument to get the full-bag radius as result.
 * @param {number} totalNumber the total number of elements in a bag
 * @returns {number} the full-bag radius
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
 * @param {number} cCircle number of circluated circles in a bag
 * @returns {number} the full-bag radius
 */


function calculateCircumference(cCircle) {
  var sum = startRadius;

  for (var a = 1; a < cCircle; a++) {
    //start on 1 so the first value does not got +10
    sum += radiusOffset + startRadius;
  }

  sum *= 2; //radius to diameter

  sum += startRadius + 15; //+15 extra border space and + startRadius because the caluclate of radius reach only to center of the node
  //  console.log("die summe der shape größe ", sum)

  return sum;
}
/**
 * Resize the shape size of each node.
 */


function resizeConstructNodes() {
  cr.nodes('.construct').forEach(function (n) {
    // console.log("node n ", n.data('id'), " hat size ", n.data('size'))
    n.style('width', n.data('size'));
    n.style('height', n.data('size'));
  });
}

function getNodePoistions() {
  /*
  let coordinates = cr.nodes().forEach(n => {
      let p = n.renderPosition;
      console.log("position of node ", n, " hat pos: ", p)
  })*/
  var l = cr.nodes().positions();
  l.forEach(function (a) {
    return console.log("pos ", a.position());
  });
} //TODO
//maybe fit layout with iterations

/**
 * Get the position of a node with the id = @bagId of the class "construct"
 * @param {number*} bagId 
 */


function getNodePoistion(bagId) {
  //console.log(" was ist bag id ", bagId)
  // let p = cr.nodes().data('[id = "bagId"  ]')
  var p = cr.nodes('.construct').filter("[id = \"".concat(bagId, "\"]")); //let p = cr.getElementById(bagId);
  //console.log(" was ist p ", p)
  //let p2 = cr.$('[id = "${bagId}" ]')
  // let p = cr.elements('node# "${bagId}" ') //`[bag = "${bag}"]`
  // console.log(" p size ", p)
  // p = p.position();
  //  console.log(" hat p eine psotion ", p.position(), " und die bag id ", bagId, " und lanfe ", p.length)

  return p.position();
}

function getDegrees() {
  cr.nodes('.construct').forEach(function (n) {
    var d = n.degree();
    console.log("knoten ", n.data('displayedText'), " of construct has degree ", d);
  });
}

;

function maxDegree() {
  var d = cr.nodes('.construct');
  console.log(' sizedD ', d.length);
  d.sort(function (a, b) {
    console.log("degre ohne ", a.degree);
    return a.degree() - b.degree();
  });
  d.nodes().forEach(function (i) {
    return console.log(" degree of max ", i.data('displayedText'));
  });
  console.log("last node is ", d[d.length - 1].data('displayedText'), " und ohen data ", d[d.length - 1].displayedText);
}

function getMaxDegreeNode() {
  //sort node on grad (in and out edges). Last = highest grad, first = smallest grad.
  var degrees = cr.nodes('.construct').map(function (ele) {
    return {
      id: ele.data('id'),
      degree: ele.degree(),
      text: ele.data('displayedText')
    };
  });
  degrees.sort(function (a, b) {
    return a.degree - b.degree;
  });
  nodeMaxGrad = degrees[degrees.length - 1].id; //get node of highest degree

  console.log("last id node ", degrees[degrees.length - 1].id, " and text ", degrees[degrees.length - 1].text);
}