"use strict";

var root;

function setWeights(weight, nodes) {
  nodes.forEach(function (n) {
    n.data('weight', weight);
    console.log("gesetzes weight ", n.data('weight'));
  });
  console.log("was sindneighbours ", nodes.neighborhood('.node'));
  nodes.neighborhood('nodes').forEach(function (n) {
    console.log(" ein nachbar is ", n.id());
  }); //if(nodes.neighborhood().length > 0){
  //    setWeights(weight+1, nodes.neighborhood())
  // }
}

function initalWeights() {
  var bagDegrees = calculateConstructDegress();
  root = bagDegrees[bagDegrees.length - 1].id;
  console.log("in star st weight ", root);
  var start = cr.nodes('.construct').filter("[id = \"".concat(root, "\"]"));
  console.log("startNode ", start, " his id ", start.id);
  setWeights(0, start);
}