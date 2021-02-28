"use strict";

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Build a graph with all his vertices, edges and the selected layout
 * by lines/Strings.
 */
var nrVertices; //number of vertices in graph

var nrEdges; //number of edges in graph

var setNodes; //contains the vertices by their displayed text

/**
 * Draws the graph in cy-window by the information from @lines .
 * @param {String[]} lines lines from .gr file.
 * @returns -1 on error
 */

function setGraph(lines) {
  for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    var line = lines[lineNumber].split(/\s+/);
    var offset = fileType === 'dgf' ? 1 : 0;

    try {
      switch (line[0]) {
        case 'n':
        case '':
          break;

        case 'c':
          break;

        case 'p':
          if (fileType !== 'txt') {
            nrVertices = line[2];
            nrEdges = line[3];
          }

          break;

        default:
          //make nodes and edges
          var source = (Number(line[0]) + offset).toString(); //needs to be string for equal with tree

          var target = (Number(line[1]) + offset).toString();
          setNode(source);
          setNode(target);
          setEdge(source, target);
      }
    } catch (err) {
      removeGraph(); //TODO remove all created elements that got created before the error //maybe too much for big graphs?

      alertErr(err.message);
      return -1;
    }
  }

  if (nrVertices != cy.nodes().length && fileType !== 'txt') {
    //cant be checked on txt
    cy.nodes().forEach(function (e) {
      return console.log("node in cy is ", e);
    });
    alertErr("File is defect. Number of vertices is not right.");
    return -1;
  } else if (nrEdges != cy.edges().length) {
    alertErr("File is defect. Number of edges is not right.");
    return -1;
  }
}
/**
 * If the collection cy has not already the input node,
 * then add this node.
 * @param {String} node a non-decimal number as string
 */


function setNode(node) {
  // add node if not in collection 
  if (!cy.nodes("[id = \"".concat(node, "\"]")).data('id')) {
    //same like jquery format: cy.$("#"+node).data('id') 
    cy.add({
      group: "nodes",
      data: {
        id: node,
        displayedText: node,
        color: getColor(node)
      },
      classes: ['graph']
    });
  }
}
/**
 * Creates an edge between source and target.
 * If already an edge between target and source exist,
 * no edge will be created.
 * @param {String} node1 node id that is no decimal as string
 * @param {String} node2 node id that is no decimal as string
 * @returns return if no edge was created
 */


function setEdge(node1, node2) {
  //TODO check sourc target and back with td too
  var doubleEdgeId = "e: " + node2 + " " + node1;

  if (cy.edges("[id = \"".concat(doubleEdgeId, "\"]")).data('id')) {} else {
    cy.add({
      group: 'edges',
      data: {
        id: "e: " + node1 + " " + node2,
        source: node1,
        target: node2
      },
      classes: ['graph']
    });
  }
}
/**
 * Set the graph layout by @layout.
 * @param {String} layout layout name
 */


function setGraphLayout(layout) {
  graphLayoutClock = new CLock();
  cy.startBatch();

  if (prevGraphLayout) {
    prevGraphLayout.stop();
  }

  ;
  prevGraphLayoutName = layout; //name

  var newLayout = cy.makeLayout(graphLayout.layouts[layout]);
  prevGraphLayout = newLayout; //layout

  newLayout.run().promiseOn('layoutstop');
  cy.endBatch();
  graphLayoutClock = graphLayoutClock.getTime;
}