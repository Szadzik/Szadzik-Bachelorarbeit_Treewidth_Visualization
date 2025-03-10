"use strict";

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Creates and manages the sidebar with the dynamic contents
 * of the graph and tree information as well as properties.
 */

/**
 * Set all properties from graph and tree which
 * are displayed in the sidebar.
 */
function setSidebarProperties() {
  emptyDynamicSidebar();
  setGraphProperties();
  setGraphLegend();
  setBagTable();
  setTreeProperties();
  setTreeLegend();
}
/**
 * Remove all dynamically created children / content from the sidebar.
 */


function emptyDynamicSidebar() {
  $('#G-accordion1').empty();
  $('#T-accordion0').empty();
  $('#T-accordion1').empty();
  Search.removeGraphSearch();
  Search.removeTreeSearch();
}
/**
 * Disable and Enable the contents from
 * an accordion action by his id.
 * @param {Id} id id of html element
 */


function accordionDropdown(id) {
  var dropDown = $('#' + id);

  if (!dropDown.hasClass("w3-show")) {
    //on open
    dropDown.addClass('w3-show');
    dropDown.prev().css('text-decoration', 'underline white');
    dropDown.prev().css('background-color', '#6d7c8a');
    dropDown.css('padding-bottom', '30px');
    dropDown.addClass('shadow-dark-gray');
  } else {
    dropDown.removeClass('w3-show');
    dropDown.css('background-color', 'none');
    dropDown.prev().css('text-decoration', 'none');
    dropDown.prev().css('background-color', '');
    dropDown.css('background-color', '');
  }
}
/**
 * Set the information [treewidth, number of nodes, 
 * number of edges, max degree node, min degree node, 
 * build time, algorithm time] from the graph.
 */


function setTreeProperties() {
  var minDeg = treeDegrees[0];
  var maxDeg = treeDegrees[treeDegrees.length - 1];
  var rows = $('#treeProperties')[0].rows;
  var bigBagId = sortedTotalBagSize[sortedTotalBagSize.length - 1].id;
  var minBagId = sortedTotalBagSize[0].id;
  cr.startBatch();
  var bigBag = cr.nodes('.tree').filter("[bag = \"".concat(bigBagId, "\"]")).map(function (n) {
    return n.data('displayedText');
  });
  var minBag = cr.nodes('.tree').filter("[bag = \"".concat(minBagId, "\"]")).map(function (n) {
    return n.data('displayedText');
  });
  cr.endBatch();
  bigBag = 'Id: ' + bigBagId + '</br> Nodes: ' + bigBag;
  minBag = 'Id: ' + minBagId + '</br> Nodes:' + minBag;
  var singleNodes = cr.nodes('.tree').filter(function (ele, i, eles) {
    return ele.neighborhood('node').length === 0; //return all nodes that have no neighboor
  });
  rows[4].cells[0].innerHTML = colorNodeIcon('red') + "  " + 'Biggest Bag';
  rows[5].cells[0].innerHTML = colorNodeIcon('orange') + "  " + 'Smallest Bag';
  rows[6].cells[0].innerHTML = colorNodeIcon('blue') + "  " + 'Max Degree Bag';
  rows[7].cells[0].innerHTML = colorNodeIcon('yellow') + "  " + 'Min Degree Bag';
  rows[1].cells[1].innerHTML = treewidth;
  rows[2].cells[1].innerHTML = numberOfBags;
  rows[3].cells[1].innerHTML = nrVertices; //number vertice

  rows[4].cells[1].innerHTML = bigBag;
  rows[5].cells[1].innerHTML = minBag;
  rows[6].cells[1].innerHTML = 'Degree: ' + maxDeg.degree + ' </br> Node: ' + maxDeg.text + '</br> Id: ' + maxDeg.id;
  rows[7].cells[1].innerHTML = 'Degree: ' + minDeg.degree + ' </br> Node: ' + minDeg.text + '</br> Id: ' + minDeg.id;
  rows[8].cells[1].innerHTML = '';
  rows[9].cells[1].innerHTML = treeClock;
  rows[10].cells[1].innerHTML = treeLayoutClock;
  if (treeAlgoClock === undefined) rows[11].setAttribute('hidden', true);else rows[11].setAttribute('hidden', false);
  pTreeHTMLCell(rows[8].cells[1], singleNodes);
}
/**
 * Set the layout time new in the tree properties.
 * This should be used, if a layout is going to recast.
 */


function setlayoutTimeTree() {
  var rows = $('#treeProperties')[0].rows;
  rows[10].cells[1].innerHTML = treeLayoutClock;
}
/**
 * Create p Elements that are clickable interactions
 * to fit their element.
 * @param {Cell} cell A html table cell.
 * @param {Nodes} nodes List of nodes.
 */


function pTreeHTMLCell(cell, nodes) {
  var index = 0;
  nodes.forEach(function (b) {
    var displayText = b.data('displayedText');
    ++index;
    var p = document.createElement('p');
    Search.pFitStyle(p);
    p.innerHTML = index === nodes.length ? displayText : displayText + ", ";
    p.addEventListener('click', function () {
      Search.fit(b, true);
    });
    cell.appendChild(p);
  });
}
/**
 * Set the information [number of vertice, 
 * number of edges, max degree Vertice, min degree vertice, 
 * build time, algorithm time] from the graph.
 */


function setGraphProperties() {
  var minDeg = graphDegrees[0];
  var maxDeg = graphDegrees[graphDegrees.length - 1];
  var rows = $('#graphProperties')[0].rows;
  rows[1].cells[1].innerHTML = cy.nodes().length; //number vertice

  rows[2].cells[1].innerHTML = cy.edges().length; //number edges

  rows[3].cells[1].innerHTML = 'Degree: ' + maxDeg.degree + ' </br> Node: ' + maxDeg.text + '</br> Id: ' + maxDeg.id;
  rows[4].cells[1].innerHTML = 'Degree: ' + minDeg.degree + ' </br> Node: ' + minDeg.text + '</br> Id: ' + minDeg.id;
  rows[5].cells[1].innerHTML = graphClock;
  rows[6].cells[1].innerHTML = graphLayoutClock;
}
/**
 * Set the layout time new in the graph properties.
 * This should be used, if a layout is going to recast.
 */


function setLayoutTimeGraph() {
  var rows = $('#graphProperties')[0].rows;
  rows[6].cells[1].innerHTML = graphLayoutClock;
}
/**
 * Creates dynamically the legend of nodes and egdes from the tree.
 */


function setTreeLegend() {
  createTableTree(true, 'List of Nodes');
  createTableTree(false, 'List of Edges');
}
/**
 * Creates dynamically the legend of vertices and egdes from the graph.
 */


function setGraphLegend() {
  createTableGraph(true, 'List of Vertices');
  createTableGraph(false, 'List of Edges');
}
/**
 * Creates an html icon (fa-paint-brush) with the input color
 * @param {Color} color a color (hex, rgb ...)
 * @returns icon with color
 */


var colorNodeIcon = function colorNodeIcon(color) {
  return '<i class="fa  fa-paint-brush " aria-hidden="true" ' + 'style=";color:' + color + ';font-size:15px;"></i>';
};
/**
 * Sort a array of numbers. Small = 0, High = last
 * @param {Number[]} list list of numbers
 * @returns sorted array
 */


function sortByNumbers(list) {
  return list.sort(function (a, b) {
    return a - b;
  });
}
/**
 * Sort an Array that contains array tuple by the second index.
 * Small = 0, High = last
 * @param {[[]]} list 
 * @returns sorted Array
 */


function sortTupleByNumber(list) {
  return list.sort(function (a, b) {
    return a[1] - b[1];
  });
}
/**
 * Create the property table of the sidebar for the graph.
 * @param {Boolean} isNode true = node table, false = edge table
 * @param {String} message title of table
 */


function createTableGraph(isNode, message) {
  var section = $('#G-accordion1')[0];
  var title = document.createElement('p');
  title.innerHTML = message;
  section.appendChild(title);
  var table = createTableBody(false);

  if (isNode) {
    var list = cy.nodes().map(function (n) {
      return n.data('id');
    });
    sortByNumbers(list).forEach(function (node) {
      createInnerTable(table, node, true);
    });
  } else {
    //isEdge
    var _list = cy.edges().map(function (n) {
      return n.data('id');
    });

    sortByNumbers(_list).forEach(function (edge) {
      createInnerTable(table, edge, false);
    });
  }

  section.appendChild(table);
}
/**
 * Create the construct table for the sidebar.
 * If the input @isTree is true, then 3 coloumns with[icon, nr., id] are created,
 * else 2 coloumns with [icon, id] are created.
 * @param {Boolean} isTree 
 * @returns html table
 */


function createTableBody(isTree) {
  var table = document.createElement('table');
  var row = document.createElement('tr');
  var icon = document.createElement('th');
  var id = document.createElement('th');
  table.classList.add('w3-table');
  table.style.marginBottom = "25px";
  table.style.tableLayout = "fixed";
  icon.innerHTML = 'Color';
  id.innerHTML = 'Id';
  row.style.borderBottom = '1px solid white';
  row.appendChild(icon);

  if (isTree) {
    var nr = document.createElement('th');
    nr.innerHTML = 'Nr.';
    row.appendChild(nr);
  }

  row.appendChild(id);
  table.appendChild(row);
  return table;
}
/**
 * Build the node or edge table from the tree sidebar. 
 * @param {Boolean} isNode true = node table should be created, else edge table
 * @param {String} message title of table
 */


function createTableTree(isNode, message) {
  var section = $('#T-accordion1')[0];
  var title = document.createElement('p');
  title.innerHTML = message;
  section.appendChild(title);
  var table;

  if (isNode) {
    table = createTableBody(true);
    var list = cr.nodes('.tree').map(function (n) {
      return [n.data('id'), n.data('displayedText')];
    });
    sortTupleByNumber(list).forEach(function (tuple) {
      createInnerNodeTreeTable(table, tuple[0], tuple[1]);
    });
  } else {
    //isEdge
    table = createTableBody(false);

    var _list2 = cr.edges('.tree').map(function (n) {
      return n.data('id');
    }); //maybe source and target??


    sortByNumbers(_list2).forEach(function (edge) {
      createInnerTable(table, edge, false);
    });
  }

  section.appendChild(table);
}
/**
 * Gets a table to fill which will be extended by node or edge information.
 * @param {Table} table a html table element to fill up.
 * @param {Node/Edge} element one node or one edge
 * @param {Boolean} needColor color of node/edge
 */


function createInnerTable(table, element, needColor) {
  var row = document.createElement('tr');
  var icon = document.createElement('td');
  var id = document.createElement('td');
  var color = needColor ? getColor(element) : 'gray';
  icon.innerHTML = colorNodeIcon(color);
  var text = document.createTextNode(element);
  id.appendChild(text);
  row.appendChild(icon);
  row.appendChild(id);

  if (needColor) {
    //add fit option with clickable
    var ele = cy.$('#' + element);
    row.addEventListener('click', function () {
      Search.fit(ele, false);
    });
    row.classList.add('fit');
  }

  table.appendChild(row);
}
/**
 * The inner body of the node table from the tree
 * @param {Table} table html table, which is going to be extended
 * @param {String} iD id of a node 
 * @param {Number} displayedText displayedText of a node
 */


function createInnerNodeTreeTable(table, iD, displayedText) {
  var row = document.createElement('tr');
  var icon = document.createElement('td');
  var id = document.createElement('td');
  var displayT = document.createElement('td');
  icon.innerHTML = colorNodeIcon(getColor(displayedText));
  row.appendChild(icon);
  var text = document.createTextNode(displayedText);
  displayT.appendChild(text);
  text = document.createTextNode(iD); //add fit option with clickable

  row.addEventListener('click', function () {
    var n = cr.nodes("[id= \"".concat(iD, "\"]"));
    Search.fit(n, true);
  });
  row.classList.add("fit");
  id.appendChild(text);
  row.appendChild(displayT);
  row.appendChild(id);
  table.appendChild(row);
}
/**
 * Creates dynamically the bag content as table.
 * The columns are [bag, size, nodes inside]
 */


function setBagTable() {
  var section = $('#T-accordion0')[0];
  var title = document.createElement('p');
  var table = document.createElement('table');
  var row = document.createElement('tr');
  var bag = document.createElement('td');
  var size = document.createElement('td');
  var nodeElements = document.createElement('td');
  table.classList.add('w3-table');
  table.style.marginBottom = "25px";
  table.style.tableLayout = "fixed";
  title.innerHTML = 'List of Bags';
  section.appendChild(title);
  var headTable = document.createElement('th');
  headTable.innerHTML = 'Id';
  headTable.style.maxWidth = "30px";
  row.appendChild(headTable);
  headTable = document.createElement('th');
  headTable.innerHTML = 'Size';
  row.appendChild(headTable);
  headTable = document.createElement('th');
  headTable.innerHTML = 'Nodes Inside';
  row.appendChild(headTable);
  table.appendChild(row);
  var bagIdsSorted = sortByNumbers(bagIds);
  bagIdsSorted.forEach(function (id) {
    //innerTable
    row = document.createElement('tr');
    bag = document.createElement('td');
    size = document.createElement('td');
    nodeElements = document.createElement('td');
    var text = document.createTextNode(id);
    bag.appendChild(text);
    cr.startBatch();
    var nodes = cr.nodes('.tree').filter("[bag = \"".concat(id, "\"]"));
    cr.endBatch();
    text = document.createTextNode(nodes.length);
    size.appendChild(text);
    var result = nodes.map(function (n) {
      return n.data('displayedText');
    });
    text = document.createTextNode(result);
    nodeElements.appendChild(text);
    row.appendChild(bag);
    row.appendChild(size);
    row.appendChild(nodeElements); //add fit option with clickable

    row.addEventListener('click', function () {
      Search.fit(cr.$('#' + id), true);
    });
    row.classList.add('fit');
    table.appendChild(row);
  });
  section.appendChild(table);
}