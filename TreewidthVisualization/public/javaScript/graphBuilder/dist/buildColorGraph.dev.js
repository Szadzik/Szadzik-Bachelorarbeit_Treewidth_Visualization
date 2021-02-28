"use strict";

var collectionColorEdges = cr.collection(); //contains all edges of nodes between bags. TODO

function setColorText() {
  cr.nodeHtmlLabel([{
    query: 'node',
    cssClass: 'cr-title',
    tpl: function tpl(data) {
      return data.colorText;
    }
  }]);
}

function setColorNodes(line, lineNumber) {
  var numberOfbag = line[1];
  bagIds.push(numberOfbag);
  var vertices = line.slice(2, line.length - 1);
  vertices.forEach(function (v) {
    var g = cr.add({
      group: 'nodes',
      //some nodes have same dispalyed Text, so bagId adds attribute v(vertice)=> bagId *dot* v
      data: {
        id: numberOfbag + "." + v,
        displayedText: v,
        bag: numberOfbag,
        color: getColor(v)
      },
      classes: ['tree', 'bag', 'color']
    }); // g.style('color', getColor(v)); //todo toggle for this?
    //g.style('background-color', getColor(v));

    collectionColorEdges = collectionColorEdges.union(g);
  }); // console.log("colornode ", g)
}

function searchEdgeConnections(line) {
  if (line.length < 2) {
    alert('Tried to create an edge but there are not enough parameters: ', lineNumber);
    throw new Error('Tried to create an edge but there are not enough parameters: ', lineNumber);
  }

  var source = line[0];
  var target = line[1];
  var collectSource = cr.nodes().filter(function (ele) {
    //all nodes of group source
    return ele.data('bag') == source; //ele.bag?
  });
  var collectTarget = cr.nodes().filter(function (ele) {
    // nodes of group target
    return ele.data('bag') == target;
  });
  collectSource.forEach(function (s) {
    collectTarget.forEach(function (t) {
      if (s.data('displayedText') == t.data('displayedText')) {
        setColorEdge(s.data('id'), t.data('id'), s.data('displayedText'));
      }
    });
  });
}
/**
 * Draw a edge between @source and @target .
 * @param {string} source       id of node from a bag
 * @param {string} target       id of node from a bag
 * @param {number} displayedText the displayedText from source and target,
 *                               which is need to color the edges like the nodes
 */


function setColorEdge(source, target, displayedText) {
  console.log("farbe ", getColor(displayedText));
  cr.add({
    group: 'edges',
    classes: ['tree', 'bag', 'color'],
    data: {
      id: 'colorE:' + source + " " + target + ":" + displayedText,
      source: source,
      target: target,
      color: getColor(displayedText),
      nodeGroup: displayedText
    }
  });
}

function printNodes() {
  cr.nodes().forEach(function (n) {
    console.log("print ", n.data('displayedText'));
  });
}