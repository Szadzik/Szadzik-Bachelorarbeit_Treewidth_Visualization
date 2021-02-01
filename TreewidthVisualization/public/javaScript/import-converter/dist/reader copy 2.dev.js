"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var nodeMaxGrad = ""; //node id of the node with the highest grad

var layout; //the currently layout which is set

var prevLayout; //the previous layout which was set

var prevLayoutName; //the name of the previous layout 1st iteration (so not preset). 

var start = true; //var loadButton = document.getElementById('load');

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

  $('#load').bind('change', handleLoad); //loadButton.addEventListener('change', handleLoad, false);
  //document.querySelector( "#layout" ).addEventListener("change", myfunction());});

  document.querySelector("#layout");
});

function throwError(message) {
  alert(message);
  throw new Error(message);
}

function handleLoad() {
  console.log("in handleLoad");
  var file = this.files[0];
  readTdFile(file);
}

function readTdFile(file) {
  console.log("in read");
  startClock();
  console.log("start Time");
  printDiffTime();

  if (path === undefined || path.length < 1) {} else {
    removeBubble();
  }

  removeAll();
  console.log("after after after");
  checkLoadFileExtension(file);
  var reader = new FileReader();

  reader.onerror = function (event) {
    alert("Failed to read file!\n\n" + reader.error);
    reader.abort();
  };

  reader.onload = function (event) {
    console.log("in onload");
    var lines = this.result.split('\n'); //put each line of file in list @list

    setBagDependencies(lines); //calculateNodeMaxGrad(); //TODO 

    resizeConstructNodes();
    mapAngles();
    setAutoMove();

    if (prevLayoutNameTd == "") {
      //set on truein setlayout
      setLayout("customCise", true);
    } else {
      //TODO should save layout on new load
      setLayout(prevLayoutNameTd, true);
    }

    console.log("before schrazuclisfgjösokg");
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
        //console.log("line is empty");
        break;

      case 'c':
        break;

      case 's':
        numberOfBags = line[2]; //maybe remove?
        //console.log(" BAGS INSGESAMT ", numberOfBags)

        break;

      case 'b':
        // console.log("in b ", lineNumber)
        if (line.length <= 2) {
          //<= because of empty last index like string in c++
          var message = 'Tried to define a bag,but this is not a bag on line: ' + lineNumber + '.' + '</br>' + 'Be sure to follow the bag format: ' + '"<b><span style=blue:red> b </span> <span style=color:red> n </span> <span style=green:red> k" </span> </b>' + ', where n is <span style=color:red> the bag number </span> and <span style=green:red> k </span> ' + 'a list of nodes (can be empty) of the bag <span style=color:blue> b </span>. ';
          throw new Error(message);
        }

        console.log("line number is ", lineNumber, " und lengt ", line.length, " line0 ", line[0], " line1 ", line[1], " length in: ", line.length);
        setConstructNode(line[1], line.length - 3);
        setColorNodes(line);
        break;

      default:
        //make edges
        if (line.length < 2) {
          var _message = 'Tried to define a bag,but this is not a bag on line: ' + lineNumber + '.' + '</br>' + 'Be sure to follow the bag format: ' + '"<b><span style=blue:red> b </span> <span style=color:red> n </span> <span style=green:red> k" </span> </b>' + ', where n is <span style=color:red> the bag number </span> and <span style=green:red> k </span> ' + 'a list of nodes (can be empty) of the bag <span style=color:blue> b </span>. ';

          throw new Error(_message);
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
  console.log("in remove all");

  try {
    cr.edges().remove();
    cr.nodes().remove();
  } catch (err) {
    console.log("catch ", err.message);
    console.log("was is noch an elementen vorhanden ", cr.elements().length, " nodes ", cr.nodes().length, " und ed ", cr.edges().length);

    if (cr.elements().length > 0) {
      removeAll();
    }
  }
}

function removeAll2() {
  cr.elements().remove();
}

function removeAll3() {
  cr.nodes().remove();
  cr.edges().remove();
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
    throwError("Please choose a valid file format like .txt, .dgf or .gr if you load a NEW Graph.");
  }

  alert("read klappt");
}

function checkLoadFileExtension(file) {
  var extension = getFileExtension(file);

  if (extension != 'td') {
    alert("Please choose a .td file.");
  }
} //layouts:

/*
$("#layout").click(function() {

	layout = $("#layout").val();
	console.log( " type " ,typeof(layout), " name of layout ", layout);
	//console.log("array ", layouts[layout]);
	
	layout = cr.layout(layouts[layout]);
	layout.run();
      
});*/
//first button


$("#layout").change(function () {
  console.log("layout has change");
  layout = $("#layout").val();
  console.log(" type ", _typeof(layout), " name of layout ", layout);

  if (layout == "nothing") {
    console.log("layout is nothing");
    return;
  }

  mapAngles();
  load = false;
  setLayout(layout, true);
});
/**
 * Set the layout from @layout input.
 * @param {string} layout name of the laoyut from file layoutTable
 * @param {boolean} boolIsTd true = 1st iteration: set the new layout, 
 *                          false = 2nd iteration: set preset layout
 */

function setLayout(layout, boolIsTd) {
  console.log("prelayout ", prevLayout); //console.log("array ", layouts[layout]);

  if (prevLayout) {
    prevLayout.stop();
  }

  ;

  if (boolIsTd) {
    prevLayoutNameTd = layout;
  } else {
    prevLayoutNameGr = layout;
  }

  var newLayout = cr.makeLayout(layouts[layout]);
  console.log("new llayout ", layouts[layout]);
  prevLayout = newLayout; //cr.elements('bagId');

  newLayout.run().promiseOn('layoutstop');
  setTimeout(function () {
    newLayout.stop();
  }, 100);

  if (boolIsTd) {
    cr.ready(function () {
      cr.stop();
      cr.startBatch();
      setLayout('preset', false);
      cr.endBatch();
    });
  } else {
    cr.ready(function () {
      cr.stop();
      drawConstructBubble();
      printDiffTime();
    });
  }
  /*
      newLayout.on('layoutstop', function() {
          console.log("stop layout");
          if (layout == 'preset') {
              presetActive = true;
              printDiffTime();
              drawConstructBubble();
          }
      });*/

}
/*
//one: kein wiederholte function bei click des selben knotens, once:nur einmal
cy.$('node').one('tap', function(e) {
    var ele = e.target;
    console.log('tapped ' + ele.id());
}); */

/*
function myfunction(){
	layout = $("#layout").val();
	console.log( " type " ,typeof(layout), " name of layout ", layout);
	//console.log("array ", layouts[layout]);
	if(prevLayout){
		console.log("in if");
		prevLayout.stop();
	}
	prevLayout = cr.makeLayout(layouts[layout]);
	layout = prevLayout;
	console.log("vor run");
	//layout = cr.layout(layouts[layout]);
	layout.run();
}*/

/*
let $layout = $('#layout');

let getLayout = name => Promise.resolve( layouts[ name ] );
let applyLayout = layout => {
  if( prevLayout ){
	prevLayout.stop();
  }

  let l = prevLayout = cr.makeLayout( layout );

  return l.run().promiseOn('layoutstop');
}
let applyLayoutFromSelect = () => Promise.resolve( $layout.value ).then( getLayout ).then( applyLayout );
*/
//let $layout = $('#layout');