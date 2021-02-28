"use strict";

//TODO
var graphStyle = [{
  selector: 'node',
  style: {
    'background-color': '#2B71E9',
    content: 'data(label)',
    shape: 'polygon',
    'shape-polygon-points': '0 1, 0.8660254037844386 0.5, 0.8660254037844386 -0.5, 0 -1, -0.8660254037844386 -0.5, -0.8660254037844386 0.5'
  }
}];
var defaultGraph = [{
  group: "nodes",
  data: {
    label: 'text0',
    id: 't0',
    cluserId: '1'
  }
}, {
  group: "nodes",
  data: {
    label: 'text1',
    id: 't1',
    cluserId: '1'
  }
}, {
  group: "nodes",
  data: {
    label: 'text2',
    id: 't2',
    cluserId: '1'
  }
}, {
  group: "nodes",
  data: {
    label: 'text3',
    id: 't3',
    cluserId: '2'
  }
}, {
  group: "nodes",
  data: {
    label: 'text4',
    id: 't4',
    cluserId: '2'
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
  style: graphStyle,
  elements: defaultGraph
});