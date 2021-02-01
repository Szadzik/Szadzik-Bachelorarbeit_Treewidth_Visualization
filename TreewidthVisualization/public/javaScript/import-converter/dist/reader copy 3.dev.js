"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var nodeMaxGrad = ""; //node id of the node with the highest grad

var layout; //the currently layout which is set

var prevLayout; //the previous layout which was set

var start = true;
var loadButton = document.getElementById('load');
var numberOfBags;
var bagIds = new Array(); //array that contains all bagIds

var prevLayoutNameTd = "";
var prevLayoutNameGr = "";
var mapNumberContent;
var presetActive = false;
var countStop = 0;
var collectionColorNodes;
document.addEventListener('DOMContentLoaded', function () {
  var $$ = function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  };

  (function (selector) {
    return document.querySelector(selector);
  });

  loadButton.addEventListener('change', handleLoad, false);
  document.querySelector("#layout");
});

function handleLoad() {
  console.log("in handleLoad");
  var file = this.files[0];
  readTdFile(file);
}

function readTdFile(file) {
  console.log("in read");

  if (path === undefined || path.length < 1) {} else {
    removeBubble();
  }

  removeAll();
  checkLoadFileExtension(file);
  var reader = new FileReader();

  reader.onerror = function (event) {
    alert("Failed to read file!\n\n" + reader.error);
    reader.abort();
  };

  reader.onload = function (event) {
    console.log("in onload");
    var lines = this.result.split('\n');
    setBagDependencies(lines); //create node and edges from line

    resizeConstructNodes(); //resize nodes

    mapAngles(); //map with information

    if (prevLayoutNameTd == "") {
      setLayout("customCise", true);
    } else {
      setLayout(prevLayoutNameTd, true);
    }
  };

  reader.readAsText(file);
}

function setBagDependencies(lines) {
  for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    var line = lines[lineNumber].split(/\s+/);

    if (!Array.isArray(line)) {
      throw new Error("This is not a array");
    }

    switch (line[0]) {
      case '':
        console.log("line is empty");
        break;

      case 'c':
        break;

      case 's':
        numberOfBags = line[2];
        break;

      case 'b':
        console.log("in b ", lineNumber);

        if (line.length < 2) {
          alert('Tried to define bag, but this is not a bag on line: ', lineNumber);
          throw new Error('Tried to define bag on format "b numberOfBag", but this is not a bag on line: ', lineNumber);
        }

        setConstructNode(line[1], line.length - 3);
        setColorNodes(line, lineNumber);
        break;

      default:
        //make edges
        if (line.length < 2) {
          alert('Tried to define bag, but this is not a bag on line: ', lineNumber);
          throw new Error('Tried to define bag on format "b numberOfBag", but this is not a bag on line: ', lineNumber);
        } //console.log("sorce ", line[0], " target ", line[1])


        setConstructEdges(line[0], line[1]);
        searchEdgeConnections(line);
    }
  }
}

function removeTreeGraph() {
  collectionColorNodes = cr.nodes('.color').remove();
  collectionColorEdges = cr.edges('.color').remove();
}

function removeAll() {
  try {
    if (cr.edges().length > 0) {
      cr.edges().remove();
    }

    if (cr.nodes().length > 0) {
      cr.nodes().remove();
    }
  } catch (err) {
    console.log("catch ", err.message);
    console.log("was is noch an elementen vorhanden ", cr.elements().length, " nodes ", cr.nodes().length, " und ed ", cr.edges().length);

    if (cr.elements().length > 0) {
      removeAll();
    }
  }
} ////////////////////////////////////////////////////////////////


function getFileName(file) {
  var name = file.name.substring(0, file.name.lastIndexOf('.'));
  return name;
}
/**
 * Gets a file and return his extension type
 * @param {file} file File
 * @return {String} extension
 */


function getFileExtension(file) {
  var fileName = file.name;
  var extension = fileName.substring(fileName.lastIndexOf('.') + 1);
  console.log("extension is: ", extension, " from file ", fileName);
  return extension;
}

function checkNewFileExtension(file) {
  var extension = getFileExtension(file);

  if (extension != 'txt' || extension != 'dgf' | extension != 'gr') {
    alert("Please choose a valid file format like .txt, .dgf or .gr if you load a NEW Graph.");
  }
}

function checkLoadFileExtension(file) {
  var extension = getFileExtension(file);

  if (extension != 'td') {
    alert("Please choose a .td file.");
  }
}

$("#layout").change(function () {
  console.log("layout has change");
  layout = $("#layout").val();
  console.log(" type ", _typeof(layout), " name of layout ", layout);

  if (layout == "nothing") {
    console.log("layout is nothing");
    return;
  }

  mapAngles();
  setLayout(layout, true);
});
/**
 * Set the layout from @layout input.
 * @param {string} layout name of the laoyut from file layoutTable
 * @param {boolean} boolIsTd true = 1st iteration: set the new layout, 
 *                          false = 2nd iteration: set preset layout
 */

function setLayout(layout, boolIsTd) {
  if (prevLayout) {
    prevLayout.stop();
  }

  ;
  var newLayout = cr.makeLayout(layouts[layout]);
  console.log("new llayout ", layouts[layout]);
  prevLayout = newLayout;
  newLayout.run().promiseOn('layoutstop');
  setTimeout(function () {
    newLayout.stop();
  }, 100);

  if (boolIsTd) {
    cr.ready(function () {
      cr.stop();
      setLayout('preset', false);
    });
  } else {
    cr.ready(function () {
      cr.stop();
      drawConstructBubble();
    });
  }
}