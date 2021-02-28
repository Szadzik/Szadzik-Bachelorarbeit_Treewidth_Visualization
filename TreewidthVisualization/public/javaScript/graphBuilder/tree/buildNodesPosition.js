/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This file takes care of the node positions in the tree-bags.
 * It takes the start position from the bags and calculate the node position on this.
 * The start position and all important dependecies from the "construct graph" are set in @code{mapAngles}.
 * Although the construct graph represent the construct on that represent the bags on which is builded.
 */

var radius; //the radius from the center cirle in which to draw nodes
var startRadius = 25; // the start radius in which the first nodes are placed
var startNumber = 3; // first drawing circle starts with 3 nodes
var radiusOffset = 15; //offset for all radius after startradius to calculate in the body dimension of a node.


var mapBagInformation = new Map(); //map with key = bagId, that contains the number of containing elements 
                                    //as well as remaining elements for calculatings and the gap jumps on circle position.
var startX = 0;
var startY = 0;
var countTotal;
var elesOnCircle; //how much nodes are alowed in the current circle umreference
var circleNumber; //current number of the attended circle
var restNodes; //number of nodes which has not yet been drawn 
var countElesOnCircle;
var countFinishedBags;
var sortedTotalBagSize;

/**
 * This function fill @mapBagInformation with all his important information of 
 * each bag(colorGraph) which are:
 * @param {Number} totalNumber the total number of nodes in the bag
 * @param {Number} numberEle count to know how much nodes are left from the total amount
 * @param {x:Number, y:Number} startPosition  startPosition which represent the center of the bag
 */
function mapAngles() {
    countFinishedBags = 0;
    bagIds.forEach(b => {
        let collect = cr.nodes().filter(function(ele) { //collect all plain bag-nodes
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
 * Return the sorted @mapBagInformation by totalNumber.
 */
function mapTotalNumberSize(){
    let bagTotalSize = new Array();
    let keys = mapBagInformation.keys();
  
    let numbers = mapBagInformation.size;
    while(numbers > 0){
        --numbers;
        let key = keys.next().value;
        bagTotalSize.push({id: key, size: mapBagInformation.get(key).totalNumber });
    }

    bagTotalSize = bagTotalSize.sort((a,b)=>{
        return a.size - b.size;
    });
    return bagTotalSize;
}

/**
 * Take a node of his bag to calculate his position with the function @determineNodePosition(bag). 
 * After this, update the @mapBagInformation and verify 
 * if a bag positioning has finished to reset the presets by @setPresets() 
 * to continue with the next bag.
 * @param {Number} bag id of the plain construct bag
 */
function calucatePostionCircle(bag) {

    var coordinates = determineNodePositions(bag);

    mapBagInformation.set(bag, {
        numberEle: mapBagInformation.get(bag).numberEle - 1,
        totalNumber: mapBagInformation.get(bag).totalNumber,
        startPosition: mapBagInformation.get(bag).startPosition
    });

    if (mapBagInformation.get(bag).numberEle == 0) { //a bag has finished //maybe need sort later?
        countFinishedBags++;
        setPresets();
    }

    return coordinates
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
 * @param {Number} bag id of the plain construct bag
 */
function determineNodePositions(bag) {

    let totalNumber = mapBagInformation.get(bag).totalNumber;
    let pos = mapBagInformation.get(bag).startPosition;

    countTotal++;
    countElesOnCircle++;

    let indexTotal = mapBagInformation.get(bag).numberEle;

    if (totalNumber == 1 || totalNumber == 0) {
        console.log("ein knoten hat pos ", pos)
        return pos;

    } else {

        let coordinates = calculateCoordinates(indexTotal, pos, totalNumber); //calaculate coordinates of node on 'indexTotal'

        if (countElesOnCircle === elesOnCircle) { // if iteration circle is full
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
 * @param {Number} indexTotal index of the node from the total number of nodes of his bag
 * @param {Number} bag id of the plain construct bag
 */
function calculateCoordinates(indexTotal, pos, totalNumber) {
    // let pos = mapBagInformation.get(bag).nodes[counTotal - 1].position();
    let countGap;
    if (totalNumber <= startNumber) { //less or same amount of nodes as startNumber
        countGap = totalNumber;
    } else if (restNodes < elesOnCircle && countTotal > startNumber) { //amount of restNodes which is more than startNumber but less as elesOnCircle
        countGap = restNodes;
    } else {
        countGap = elesOnCircle; //rest nodes of a bigger amount that is now less or same like of startNumber
    }


    let gap = 360 / countGap; //calculate distance between nodes on the given circle index
    let radiantGap = (indexTotal * gap) * (Math.PI / 180);
    let offset = circleNumber % 2 === 0 ? gap / 2 : 0; //change the circle rotation on value
    let x = pos.x + radius * Math.cos((radiantGap + offset) % 360);
    let y = pos.y + radius * Math.sin((radiantGap + offset) % 360);


    return { x: x, y: y };
}


