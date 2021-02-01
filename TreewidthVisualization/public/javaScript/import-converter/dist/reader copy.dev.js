"use strict";

var layout; //the currently layout which is set

var prevLayout; //the previous layout which was set

var cy = cytoscape({
  container: document.getElementById('cr')
});
var loadButton = document.getElementById('load');
var bb = cy.bubbleSets({
  zIndex: -1
});
var path;
document.addEventListener('DOMContentLoaded', function () {
  var $$ = function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  };

  (function (selector) {
    return document.querySelector(selector);
  });

  loadButton.addEventListener('change', handleLoad, false);
});

function handleLoad() {
  var file = this.files[0];
  readFile(file);
}

function readFile(file) {
  if (path === undefined || path.length < 1) {} else {
    removeBubble();
  }

  removeAll();
  var reader = new FileReader();

  reader.onerror = function (event) {
    alert("Failed to read file!\n\n" + reader.error);
    reader.abort();
  };

  reader.onload = function (event) {
    var lines = this.result.split('\n');
    setDependencies(lines);
    setLayout("grid", true);
  };

  reader.readAsText(file);
}

function setDependencies(lines) {
  for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    var line = lines[lineNumber].split(/\s+/);

    if (!Array.isArray(line)) {
      throw new Error("This is not a array");
    }

    switch (line[0]) {
      case '':
        console.log("line is empty");
        break;

      case 's':
        break;

      case 'b':
        //add nodes
        cy.add({
          data: {
            id: line[1]
          },
          classes: 'construct'
        });
        break;

      default:
        //add edges
        source = line[0];
        target = line[1];
        cy.add({
          group: "edges",
          data: {
            id: source + " " + target,
            source: source,
            target: target
          },
          classes: 'construct'
        });
    }
  }
}

function removeAll() {
  try {
    cy.edges().remove();
    cy.nodes().remove();
  } catch (err) {
    console.log("catch ", err.message);
    console.log("rest data: ", cy.elements().length, " nodes: ", cy.nodes().length, " edges: ", cy.edges().length);

    if (cy.elements().length > 0) {
      removeAll();
    }
  }
}

function removeBubble() {
  cy.ready(function () {
    bb.removePath(path);
  });
}

function addBubble() {
  bb = cy.bubbleSets();
  path = bb.addPath(cy.nodes('.construct'), cy.edges(), null, {
    style: {
      stroke: "red"
    }
  });
}
/**
 * Set the layout from @layout input.
 * @param {string} layout name of the laoyut from layouts
 * @param {boolean} boolIsTd true = 1st iteration: set the new layout, 
 *                          false = 2nd iteration: set preset layout
 */


function setLayout(layout, boolIsTd) {
  if (prevLayout) {
    prevLayout.stop();
  }

  ;
  var newLayout = cy.makeLayout(layouts[layout]);
  prevLayout = newLayout;
  newLayout.run().promiseOn('layoutstop');
  setTimeout(function () {
    newLayout.stop();
  }, 100);

  if (boolIsTd) {
    cy.ready(function () {
      cy.stop();
      setLayout('preset', false);
    });
  } else {
    cy.ready(function () {
      cy.stop();
      addBubble();
    });
  }
}

var layouts = {
  euler: {
    name: 'euler'
  },
  grid: {
    name: 'grid'
  },
  cose: {
    name: 'cose'
  },
  preset: {
    name: 'preset'
  }
};