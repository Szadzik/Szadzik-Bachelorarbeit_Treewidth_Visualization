"use strict";

var _style;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultTree = [{
  "group": "nodes",
  data: {
    id: 'c',
    displayedText: 'c'
  },
  classes: ['tree']
}, {
  "group": "nodes",
  data: {
    id: 'd',
    displayedText: "d"
  },
  classes: ['tree']
}, {
  "group": "edges",
  "data": {
    id: 'cd',
    source: 'c',
    target: 'd'
  }
}];
var treeStyle = [{
  selector: 'node',
  style: (_style = {
    'shape': 'ellipse',
    'background-color': '#f1f1f1',
    'label': 'data(id)',
    'text-wrap': 'wrap',
    'text-halign': 'center',
    'text-valign': 'center'
  }, _defineProperty(_style, "text-wrap", 'wrap'), _defineProperty(_style, 'color', 'white'), _defineProperty(_style, 'text-outline-color', 'black'), _defineProperty(_style, 'text-outline-width', 1), _style)
},
/** Default style for edges between nodes */
{
  selector: 'edge',
  style: {
    'curve-style': 'haystack',
    "opacity": 0.666
  }
},
/** Default node stlye of the construct Graph */
{
  selector: 'node.construct',
  style: {
    'background-color': 'pink',
    'z-compound-depth': 'bottom',
    'label': '' //   'background-opacity': 1 //TODO

  }
},
/**Hides the edges of the construct Graph (adds class on preset layout) */
{
  selector: 'edge.construct',
  style: {
    'display': 'none'
  }
},
/** Change the color of a selected node (on mouse click) */
{
  selector: 'node:selected',
  style: {
    'border-width': 2,
    'border-color': 'black',
    'color': 'black'
  }
},
/**Default edge style of the ColorGraph/tree
 * Each edge has his custom color
 */
{
  selector: 'edge.tree',
  style: {
    'z-index': 110,
    'line-color': 'data(color)'
  }
},
/** Default node stlye of the ColorGraph/tree.
 * Each node has his custom color */
{
  selector: 'node.tree',
  style: {
    'label': 'data(displayedText)',
    'z-index': 111,
    'z-compound-depth:': 'top',
    'background-color': 'data(color)',
    'border-style': 'solid',
    'border-width': 0.5,
    'border-color': 'black'
  }
},
/** Only show text with color and no node-shape (on toggle) */
{
  selector: 'node.styleLabel',
  style: {
    'background-opacity': 0,
    'border-width': 0
  }
},
/** Shows the node shape in color and the displayedText in non-color (on toggle) */
{
  selector: 'node.styleNode',
  style: {
    'background-opacity': 100,
    'border-width': 0.5
  }
},
/** If this element is nor part of the same value/displayed Text of the selected node, 
 * then he will displayed in non-trivial grey with light opacity  
 * (adds class on tap) */
{
  selector: '.notTarget',
  style: _defineProperty({
    'background-color': 'grey',
    'line-color': 'grey',
    'opacity': 20,
    //background oppacity?
    'background-opacity': 0.5
  }, "opacity", 0.5)
}, {
  selector: 'edge.notTarget',
  style: {
    'display': 'none'
  }
},
/** Style of node with the highest connection grad of edges */
{
  selector: 'node.highestGrad',
  style: {
    'background-color': 'red',
    'border-color': 'red'
  }
},
/** Style of node from the biggest bag (adds class on selection) */
{
  selector: 'node.biggestBag',
  style: {
    'background-color': 'red',
    'border-color': 'red'
  }
}];
var cr = window.cr = cytoscape({
  container: $('#cr'),
  elements: defaultTree,
  style: treeStyle
});