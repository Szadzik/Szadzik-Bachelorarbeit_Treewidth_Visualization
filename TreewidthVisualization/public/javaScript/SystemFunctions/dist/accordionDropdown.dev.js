"use strict";

function setSidebarProperties() {
  setGraphProperties();
  setGraphLegend();
}
/**
 * Disable and Enable the contents from
 * an accordion action by his id.
 * @param {Id} id 
 */


function accordionDropdown(id) {
  var dropDown = $('#' + id);

  if (!dropDown.hasClass("w3-show")) {
    //on open
    dropDown.addClass('w3-show');
    dropDown[0].classList.replace('fa-caret-down', 'fa-caret-up');
    dropDown.prev().css('text-decoration', 'underline white');
    dropDown.prev().css('background-color', '#6d7c8a');
    dropDown.css('padding-bottom', '30px');
    dropDown.addClass('shadow-dark-gray'); // dropDown.children()[0].classList.add('shadow-dark-gray')

    console.log("first child ", dropDown.firstChild);
    console.log("f children ", dropDown.children());
  } else {
    dropDown.removeClass('w3-show');
    dropDown.css('background-color', 'none');
    dropDown[0].classList.replace('fa-caret-up', 'fa-caret-down');
    dropDown.prev().css('text-decoration', 'none');
    dropDown.prev().css('background-color', '');
    dropDown.css('background-color', '');
  }
}
/**
 * Set the information [treewidth, number of vertice, 
 * number of edges, max degree Vertice, min degree vertice, 
 * build time, algorithm time] from the graph.
 */


function setGraphProperties() {
  var rows = $('#graphProperties')[0].rows;
  rows[1].cells[1].innerHTML = treewidth;
  rows[2].cells[1].innerHTML = cy.nodes().length; //number vertice

  rows[3].cells[1].innerHTML = cy.edges().length; //number edges

  rows[4].cells[1].innerHTML = "TODO";
  rows[5].cells[1].innerHTML = "TODO";
}
/**
 * Creates dynamically the legend of vertices and egdes from the graph.
 */


function setGraphLegend() {
  createTable(true, 'List of Vertices');
  createTable(false, 'List of Edges');
}

function createTable(isNode, message) {
  var legend = $('#G-accordion1')[0]; //////////////////////////////////////////////////////////// 
  // Vertices 
  ///////////////////////////////////////////////////

  var title = document.createElement('p');
  var table = document.createElement('table');
  var tr = document.createElement('tr');
  var th = document.createElement('th');
  var th2 = document.createElement('th');
  title.innerHTML = message;
  table.classList.add('w3-table');
  table.style.marginBottom = "25px";
  th.innerHTML = 'Color';
  th2.innerHTML = 'Id';
  tr.style.borderBottom = '1px solid white';
  legend.appendChild(title);
  tr.appendChild(th);
  tr.appendChild(th2);
  table.appendChild(tr);

  if (isNode) {
    cy.nodes().forEach(function (node) {
      createInnerTable(table, node, true);
    });
  } else {
    //isEdge
    console.log("in else");
    cy.edges().forEach(function (edge) {
      createInnerTable(table, edge, false);
    });
  }

  legend.appendChild(table);
}

function createInnerTable(table, element, needColor) {
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  var td1 = document.createElement('td');
  var color = needColor ? getColor(element) : 'gray';
  td.innerHTML = '<i class="fa  fa-paint-brush " aria-hidden="true" ' + 'style=";color:' + color + ';font-size:15px;"></i>';
  tr.style.borderBottom = "1px solid white";
  td1.style.maxWidth = '180px';
  td1.style.wordWrap = 'break-word';
  var text = document.createTextNode(element.data('id'));
  td1.appendChild(text);
  tr.appendChild(td);
  tr.appendChild(td1);
  table.appendChild(tr);
}
/*
let input = document.createElement('input');
input.setAttribute('disabled', true);
input.style.cssText ="width:95%; background-color:inherit; color:white; border:none; text-align:center"
input.value = node.data('id');
*/