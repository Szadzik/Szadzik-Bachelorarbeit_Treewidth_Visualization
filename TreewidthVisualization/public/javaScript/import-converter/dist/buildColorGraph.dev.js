"use strict";

var collectionColorEdges; //contains all edges of nodes between bags. TODO

function buildColorNode(vertice) {
  var colorText = 'ST<p style ="-webkit-text-stroke: 0.3px black;">';
  var color = colors[vertice % colors.length];
  colorText += '<span style=' + '"color:' + color + '; font-family: Arial, Lato,  Helvetica; font-size: 12px; ">' + vertice + " " + '</span>' + '</p>CK OVERFLOW';
  return colorText;
}

function setColorText() {
  cr.nodeHtmlLabel([{
    query: 'node',
    cssClass: 'cr-title',
    tpl: function tpl(data) {
      return data.colorText;
    }
  }]);
}

function setNodes(line, lineNumber) {
  if (!Array.isArray(line)) {
    throw new Error("This is not a array");
  }

  if (line.length < 2) {
    alert('Tried to define bag, but this is not a bag on line: ', lineNumber);
    throw new Error('Tried to define bag on format "b numberOfBag", but this is not a bag on line: ', lineNumber);
  }

  numberOfbag = line[1];
  bagIds.push(numberOfbag);
  var vertices = line.slice(2, line.length - 1);
  vertices.forEach(function (v) {
    var g = cr.add({
      "group": "nodes",
      "bag": numberOfbag,
      //some nodes have sam dispalyed Text, so bagId adds attribute v(vertice)=> bagId *dot* v
      "data": {
        id: numberOfbag + "." + v,
        vertices: vertices,
        displayedText: v,
        colorText: buildColorNode(v),
        bag: numberOfbag,
        parent: numberOfbag
      }
    });
    g.style('background-color', colors[v]);
  });
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
    return ele.data('bag') == source;
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
 * Draw a edge between @source and @target with color @vertice .
 *      Example (for Bubble-draw): setColorEdge(s.data('id'), t.data('id'), s.data('displayedText')); 
 * @param {*id} source       id of bag if visual plain or id of node if visual with bubbles
 * @param {*id} target       id of bag if visual plain or id of nodes if visual with bubbles
 * @param {*vertice} vertice node number if visual plain or bagId if visual with bubbles
 */


function setColorEdge(source, target, vertice) {
  cr.add({
    data: {
      id: 'colorE:' + source + " " + target + ":" + vertice,
      source: source,
      //bagId
      target: target //bagId

    },
    style: {
      'line-color': colors[vertice % colors.length]
    }
  });
}

function printNodes() {
  cr.nodes().forEach(function (n) {
    console.log("print ", n.data('displayedText'));
  });
}