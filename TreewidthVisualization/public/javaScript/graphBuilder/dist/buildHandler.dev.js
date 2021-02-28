"use strict";

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This file handles the graph and tree creation by lines/Strings.
 * It also manage the layout and clock properties of the graph and tree.
 */
var layout; //the currently layout which is set

var prevLayout; //the previous layout which was set for the tree

var prevGraphLayout; //the previous layout which was set for the graph

var prevGraphLayoutName = ""; //the previous layout that was build for the graph

var prevTreeLayoutName = ""; //the previous layout that was build for the tree

var numberOfBags; //total number of bags from the tree

var bagIds = new Array(); //array that contains all bagIds

var treeClock; //time how long cytoscape needs to build the tree

var treeAlgoClock; //time how long the server/pace-algoirthm needs to build the tree

var graphClock; //time how long cytoscape needs to build the graph

var graphLayoutClock; //time how long cytoscape needs to build the graph layout

var treeLayoutClock; //time how long cytoscape needs to build the tree layout

var onSet = 0; //if = 2 (both graphs are loaded) then stat setSidebarProperties

var treeDegrees; //degrees of nodes in tree

var graphDegrees; //degrees of nodes in graph

var bagDegrees; //degrees of bags in tree

var fileType;
/**
 * Calls all functions that are needed to create the Tree.
 * @param {Array} lines Lines of file
 */

function handleTreeCreation(lines, isFromServer) {
  removeBubble(); //faster build on remove. Each frame caluclate the bubbles this cost too much time.

  removeTree();
  treeClock = new CLock();
  treeLayout = new TreeLayouts();
  setBagDependencies(lines, isFromServer);
  resizeConstructNodes();
  setAutoMove(); //move options for mouse

  treeClock = treeClock.getTime;
  treeLayout.setEulerSpace(); //option for euler layout

  var selectedLayout = $('#layout-cr')[0].value;
  handleTreeLayout(selectedLayout, false);
  sortedTotalBagSize = mapTotalNumberSize();
  onSetCheck();
}
/**
 * Check if both graphs are ready to load sidebar
 */


function onSetCheck() {
  onSet++;

  if (onSet % 2 === 0) {
    cr.animate('queue', false);
    onSet = 0; //take bag and tree degrees to handleTreeLayout() and 
    //add treeLayout.constructByDegree() to recieve a 
    //different build with maxDegree as first node in collection
    //with some layouts

    bagDegrees = calculateConstructDegress();
    treeDegrees = calculateTreeDegress();
    graphDegrees = calculateGraphDegrees();
    setSidebarProperties();
    CytoscapeButtons.setTreeBagProperties();
    spinner.close();
  }
}
/**
 * Calls are functions that are needed to create the Graph.
 * @param {Array} lines Lines of file
 */


function handleGraphCreation(lines) {
  removeGraph();
  graphClock = new CLock();
  var result = setGraph(lines);
  if (result === -1) //TODO
    return;
  graphClock = graphClock.getTime;
  var selectedLayout = $('#layout-cy')[0].value;
  graphLayout = new GraphLayouts();
  setGraphLayout(selectedLayout);
  onSetCheck();
}
/**
 * Caluclate and sort a list of degrees from bags(construct graph).
 * @returns sorted list of degrees from bags
 */


function calculateConstructDegress() {
  var degrees = cr.nodes('.construct').map(function (ele) {
    return {
      id: ele.data('id'),
      degree: ele.degree(),
      text: ele.data('displayedText')
    };
  });
  return sortDegrees(degrees);
}
/**
 * Caluclate and sort a list of degrees from tree nodes.
 * @returns sorted list of degrees from nodes
 */


function calculateTreeDegress() {
  var degrees = cr.nodes('.tree').map(function (ele) {
    return {
      id: ele.data('id'),
      degree: ele.degree(),
      text: ele.data('displayedText')
    };
  });
  return sortDegrees(degrees);
}
/**
 * Caluclate and sort a list of degrees from graph vertices.
 * @returns sorted list of degrees from vertices
 */


function calculateGraphDegrees() {
  var degrees = cy.nodes().map(function (ele) {
    return {
      id: ele.data('id'),
      degree: ele.degree(),
      text: ele.data('displayedText')
    };
  });
  degrees = sortDegrees(degrees);
  return degrees;
}
/**
 * Sort a list of degrees. Last index = highest grad, first index = smallest grad.
 * @param {Number[]} degrees 
 * @returns sorted degrees
 */


function sortDegrees(degrees) {
  var tmp = degrees.sort(function (a, b) {
    return a.degree - b.degree;
  });
  return tmp;
}
/**
 * Remove the tree 
 */


function removeTree() {
  try {
    cr.edges().remove();
    cr.nodes().remove();
  } catch (err) {
    if (cr.elements().length > 0) {
      removeTree();
    }
  }
}
/**
 * Remove the graph
 */


function removeGraph() {
  cy.elements().remove();
}
/**
 * Print all tree nodes in the console
 */


function printTreeNodes() {
  cr.nodes().forEach(function (n) {
    console.log("node: ", n.data('displayedText'));
  });
}
/**
 * Print all tree edges in the console
 */


function printTreeEdges() {
  cr.nodes().forEach(function (n) {
    console.log("edge: ", n.data('displayedText'));
  });
}
/**
 * Print all graph vertices in console
 */


function printGraphNodes() {
  cy.nodes().forEach(function (n) {
    console.log("vertice: ", n.data('displayedText'));
  });
}
/**
 * Print all graph edges in console
 */


function printGraphEdges() {
  cy.edges().forEach(function (n) {
    console.log("edge: ", n.data('displayedText'));
  });
}