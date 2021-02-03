"use strict";

var nrVertices;
var nrEdges;
var setNodes;

function setGraph(lines) {
  console.log("in set graph");

  for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    var line = lines[lineNumber].split(/\s+/);

    if (!Array.isArray(line)) {
      throw new Error("This is not a array");
    }

    if (line == null || line.length < 1) {
      //TODO test
      console.log("line is empty in first try");
      continue;
    } //  console.log("graph line ",line)


    try {
      switch (line[0]) {
        case '':
          //TODO remove?
          console.log("line is empty");
          break;

        case 'c':
          //comments
          break;

        case 'p':
          console.log("line ", line);
          console.log("number nodes: ", line[2], " number edges ", line[3]);
          nrVertices = line[2];
          nrEdges = line[3];
          break;

        default:
          //make nodes and edges
          if (line.length < 2) {
            // <= because of empty last index
            var message = 'Line has only one vertice. Cannot create a loop edge on a vertice in line:' + lineNumber;
            throw new Error(message);
          }

          setNode(line[0]);
          setNode(line[1]);
          setEdge(line[0], line[1]);
      }
    } catch (err) {
      removeGraph(); //TODO remove all created elements that got created before the error //maybe too much for big graphs?

      alertErr(err.message);
      return -1;
    }
  } //console.log("graph node length is ", cy.nodes().length, " length edges ", cy.edges().length)

}

function setNode(node) {
  //console.log("getby id ", node, " is ", cy.nodes(`[displayedText = "${node}"]`).data("displayedText"), " und mit id ", cy.nodes(`[id = "${node}"]`).data("displayedText"),)
  // console.log("mit dollar ", cy.$("#"+node).data("displayedText"), " un id ", cy.$("#"+node).data("id") , " und ",  cy.nodes(`[id = "${node}"]`).data('id')," verneint ",!cy.$("#"+node).data('id') )
  // add node if not in collection 
  if (!cy.nodes("[id = \"".concat(node, "\"]")).data('id')) {
    //same like jquery format: cy.$("#"+node).data('id') 
    cy.add({
      group: "nodes",
      data: {
        id: node,
        displayedText: node
      },
      classes: ['graph']
    });
  }
}

function tolist(temp) {
  if (!setNodes.includes(temp[0])) {
    setNodes.push(temp[0]);
  }

  if (!setNodes.includes(temp[1])) {
    setNodes.push(temp[1]);
  }

  var values = map.get(temp[0]);

  if (values === undefined) {
    //let z = new Array(temp[1]);
    map.set(temp[0], temp[1]);
  } else if (!values.includes(temp[1])) {
    console.log("in includes");
    var z = values + temp[1];
    map.set(temp[0], z);
  }
}

function setEdge(node1, node2) {
  //TODO check sourc target and back with td too
  var doubleEdgeId = "e: " + node2 + " " + node1;

  if (cy.edges("[id = \"".concat(doubleEdgeId, "\"]")).data('id')) {
    console.log("No double edges allowed. There is already an edge between " + node2 + " and " + node1);
    return;
  }

  var e = cy.add({
    group: 'edges',
    data: {
      id: "e: " + node1 + " " + node2,
      source: node1,
      target: node2
    },
    classes: ['graph']
  });
}

function setGraphLayout(layout) {
  if (prevGraphLayout) {
    prevGraphLayout.stop();
  }

  ;
  var newLayout = cy.makeLayout(layouts[layout]);
  console.log("new layout ", layouts[layout]);
  prevGraphLayout = newLayout;
  newLayout.run().promiseOn('layoutstop');
  setTimeout(function () {
    newLayout.stop();
  }, 100);
}