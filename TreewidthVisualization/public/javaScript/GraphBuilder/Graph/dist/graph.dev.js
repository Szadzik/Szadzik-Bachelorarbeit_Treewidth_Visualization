"use strict";

var _style;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Create the cytoscape <cy> graph all the defined styles.
 */
var graphStyle = [{
  selector: 'node',
  style: (_style = {
    'shape': 'ellipse',
    'label': 'data(id)',
    'text-wrap': 'wrap',
    'text-halign': 'center',
    'text-valign': 'center'
  }, _defineProperty(_style, "text-wrap", 'wrap'), _defineProperty(_style, 'color', 'white'), _defineProperty(_style, 'background-color', 'data(color)'), _defineProperty(_style, 'border-style', 'solid'), _defineProperty(_style, 'border-width', 0.5), _defineProperty(_style, 'border-color', 'black'), _defineProperty(_style, 'text-outline-color', 'black'), _defineProperty(_style, 'text-outline-width', 1), _style)
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
},
/** If this element is nor part of the same displayedText of the selected vertice, 
 * then he will displayed in non-trivial grey with light opacity  
 * (adds class on tap) */
{
  selector: '.notTarget',
  style: {
    'background-color': 'white',
    'background-opacity': 0.5
  }
}, {
  selector: 'edge.notTarget',
  style: {
    'opacity': 0.5
  }
}];
var cy = window.cy = cytoscape({
  container: $('#cy'),
  style: graphStyle
});