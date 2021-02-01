"use strict";

var layout; //the currently layout which is set

var prevLayout; //the previous layout which was set

var prevLayoutName; //the name of the previous layout 1st iteration (so not preset). 

var numberOfBags;
var bagIds = new Array(); //array that contains all bagIds

function handleTreeCreation(result) {
  console.log("in handleTree");
  var lines = result.split('\n'); //put each line of file in list @list

  setBagDependencies(lines);
  resizeConstructNodes();
  calculateDegrees();
  mapAngles();
  setAutoMove();

  if (prevLayoutNameTd == "") {
    //set on truein setlayout
    setLayout("customCise", true);
  } else {
    //TODO should save layout on new load
    setLayout(prevLayoutNameTd, true);
  }

  console.log("out of handleCreation");
}

function handleGraphCreation() {
  console.log("in handleTGraph");
}

function calculateDegrees() {
  //TOD Omax,min
  var cC = calculateConstructDegress();
  var cT = calculateTreeDegress();
  var cG = calculateGraphDegrees();
  console.log("min Construct ", cC[0].id, " max ", cC[degrees.length - 1].id);
  console.log("min tree ", cT[0].id, " max ", cT[degrees.length - 1].id);
  console.log("min graph ", cG[0].id, " max ", cG[degrees.length - 1].id);
}

function calculateConstructDegress() {
  var degrees = cr.nodes('.construct').map(function (ele) {
    return {
      id: ele.data('id'),
      degree: ele.degree(),
      text: ele.data('displayedText')
    };
  });
  degrees = sortDegrees(degrees);
}

function calculateTreeDegress() {
  var degrees = cr.nodes('.tree').map(function (ele) {
    return {
      id: ele.data('id'),
      degree: ele.degree(),
      text: ele.data('displayedText')
    };
  });
  degrees = sortDegrees(degrees);
}

function calculateGraphDegrees() {
  var degrees = cy.nodes().map(function (ele) {
    return {
      id: ele.data('id'),
      degree: ele.degree(),
      text: ele.data('displayedText')
    };
  });
  degrees = sortDegrees(degrees);
}
/**
 * Sort nodes by grad. Last index = highest grad, first index = smallest grad.
 * @param {*} degrees 
 * @returns
 */


function sortDegrees(degrees) {
  degrees.sort(function (a, b) {
    return a.degree - b.degree;
  });
  return degrees[degrees.length - 1].id; //get node of highest degree
}