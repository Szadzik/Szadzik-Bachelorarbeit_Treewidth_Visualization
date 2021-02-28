"use strict";

/** @type {number} */
var radius;
/** @type {number} */

var startRadius = 25;
/** @type {number} */

var startNumber = 3;
/** @type {number} */

var radiusOffset = 15;
var mapBagInformation = new Map(); //map with key = bagId, that contains the number of containing elements and the gap jumps on circle position.

var startX = 0;
var startY = 0;
var countTotal;
var elesOnCircle;
var circleNumber;
var restNodes;
var countElesOnCircle;
var countFinishedBags;
/**
 * This function fill @mapBagInformation with all his important information of 
 * each bag(colorGraph) which are:
 * @param {number} totalNumber the total number of nodes in the bag
 * @param {number} numberEle count to know how much nodes are left from the total amount
 * @param {x:number, y:number} startPosition  startPosition which represent the center of the bag
 */

function mapAngles() {
  countFinishedBags = 0;
  bagIds.forEach(function (b) {
    var collect = cr.nodes().filter(function (ele) {
      //collect all plain bag-nodes
      return ele.data('bag') == b;
    });
    mapBagInformation.set(b, {
      totalNumber: collect.length,
      numberEle: collect.length,
      startPosition: getNodePoistion(b)
    });
  });
  setPresets();
}
/**
 * Take a node of his bag to calculate his position with the function @determineNodePosition(bag). 
 * After this, update the @mapBagInformation and verify 
 * if a bag positioning has finished to reset the presets by @setPresets() 
 * to continue with the next bag.
 * @param {number} bag id of the plain construct bag
 */


function calucatePostionCircle(bag) {
  var coordinates = determineNodePositions(bag);
  mapBagInformation.set(bag, {
    numberEle: mapBagInformation.get(bag).numberEle - 1,
    totalNumber: mapBagInformation.get(bag).totalNumber,
    startPosition: mapBagInformation.get(bag).startPosition
  });

  if (mapBagInformation.get(bag).numberEle == 0) {
    //a bag has finished //maybe need sort later?
    countFinishedBags++;
    setPresets();
  }

  console.log("x i ", coordinates.x, " y i ", coordinates.y);
  return coordinates;
  /*{
      //coordinates
      x: coordinates[0],
      y: coordinates[1]
  };*/
}
/**
 * Set the start Attributes to position the next bag
 */


function setPresets() {
  countTotal = 0;
  radius = startRadius;
  elesOnCircle = startNumber;
  circleNumber = 1;
  restNodes = 0;
  countElesOnCircle = 0;
}
/**
 * Determine the position of the next node on @indexTotal of the @totalNumber of nodes in his bag.
 * If a bag contains only one element then he got centered in the middle of the bag, 
 * unlike the others which get positioned on circluated circles and calls @calculateCoordinates(indexTotal).
 * @param {number} bag id of the plain construct bag
 */


function determineNodePositions(bag) {
  //console.log("in determine,was ist bag ", bag)
  //console.log("was ist bagInfo ", mapBagInformation.get(bag))
  var totalNumber = mapBagInformation.get(bag).totalNumber;
  var pos = mapBagInformation.get(bag).startPosition; //  console.log(" was ist bag ", bag, " und seine pos ", pos)

  countTotal++;
  countElesOnCircle++;
  var indexTotal = mapBagInformation.get(bag).numberEle;

  if (totalNumber == 1 || totalNumber == 0) {
    console.log("ein knoten hat pos ", pos);
    return pos;
  } else {
    var coordinates = calculateCoordinates(indexTotal, pos, totalNumber); //calaculate coordinates of node on 'indexTotal'

    if (countElesOnCircle == elesOnCircle) {
      // if iteration circle is full
      elesOnCircle *= 2;
      circleNumber++;
      radius += startRadius + radiusOffset;
      restNodes = totalNumber - countTotal;
      countElesOnCircle = 0;
    }

    return coordinates;
  }
}
/**
 * Calculate the position of a node on a circluated cricle. 
 * The position depents on the number of given elements which is left to be draw @restNodes, 
 * from the total amount of his bag and from the circle index.
 * @param {number} indexTotal index of the node from the total number of nodes of his bag
 * @param {number} bag id of the plain construct bag
 */


function calculateCoordinates(indexTotal, pos, totalNumber) {
  // let pos = mapBagInformation.get(bag).nodes[counTotal - 1].position();
  var countGap;

  if (totalNumber <= startNumber) {
    //less or same amount of nodes as startNumber
    countGap = totalNumber;
  } else if (restNodes < elesOnCircle && countTotal > startNumber) {
    //amount of restNodes which is more than startNumber but less as elesOnCircle
    countGap = restNodes;
  } else {
    countGap = elesOnCircle; //rest nodes of a bigger amount that is now less or same like of startNumber
  }

  var gap = 360 / countGap; //calculate distance between nodes on the given circle index

  var radiantGap = indexTotal * gap * (Math.PI / 180); //let offset = 0; //circleNumber % 2 == 0 ? 0 : 10;

  var offset = circleNumber % 2 == 0 ? gap / 2 : 0; //let offset2 = circleNumber % 2 == 0 ? 30 * (Math.PI / 180) : 120 * (Math.PI / 180)
  // let x = startX + radius * Math.cos((radiantGap + offset) % 360);
  // let y = startY + radius * Math.sin((radiantGap + offset) % 360);

  var x = pos.x + radius * Math.cos((radiantGap + offset) % 360);
  var y = pos.y + radius * Math.sin((radiantGap + offset) % 360);
  return {
    x: x,
    y: y
  };
}

function fitPosition() {}