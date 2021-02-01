"use strict";

var _style;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//TODO
var graphStyle = [{
  selector: 'node',
  style: (_style = {
    'shape': 'ellipse',
    'background-color': '#f1f1f1',
    'label': 'data(id)',
    'text-wrap': 'wrap',
    'text-halign': 'center',
    'text-valign': 'center'
  }, _defineProperty(_style, "text-wrap", 'wrap'), _defineProperty(_style, 'color', 'black'), _style)
},
/** Default style for edges between nodes */
{
  selector: 'edge',
  style: {
    'curve-style': 'haystack'
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
}];
var defaultGraph = [{
  group: "nodes",
  data: {
    id: 't0',
    displayedText: '1'
  }
}, {
  group: "nodes",
  data: {
    id: 't1',
    displayedText: '1'
  }
}, {
  group: "nodes",
  data: {
    id: 't2',
    displayedText: '1'
  }
}, {
  group: "nodes",
  data: {
    id: 't3',
    displayedText: '2'
  }
}, {
  group: "nodes",
  data: {
    id: 't4',
    displayedText: '2'
  }
}, {
  group: "edges",
  data: {
    id: '01',
    source: 't0',
    target: 't1'
  }
}, {
  group: "edges",
  data: {
    id: '12',
    source: 't1',
    target: 't2'
  }
}, {
  group: "edges",
  data: {
    id: '34',
    source: 't3',
    target: 't4'
  }
}];
var cy = window.cy = cytoscape({
  container: $('#cy'),
  elements: defaultGraph,
  style: graphStyle
});