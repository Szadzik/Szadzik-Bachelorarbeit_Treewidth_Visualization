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
    createTableTree('branch', 'List of Branches');
    setTreeProperties();
    setTreeLegend();
}

/**
 * Remove all dynamically created children / content from the sidebar.
 */
function emptyDynamicSidebar(){
    $('#G-accordion1').empty();
    $('#T-accordion0').empty();
    $('#T-accordion1').empty();
    Search.removeGraphSearch();
    Search.removeTreeSearch();
}

function newSiteHTML(title, text){
    
    return '<!DOCTYPE html>'
    +'<html lang="en-US">'
    +'<meta charset="utf-8"/>'
    +' <head>'
    +    '<link type="image/png" rel="icon" type="image/png" href="assets/icons/png/icon29.png" sizes="32x32">'
    +    '<link type="text/css" rel="stylesheet" href="styles/w3.css">'
    +    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>'
    +'</head>'
    +'<body>'    
    +    '<header class="w3-black w3-container w3-dark-gray ; w3-sans-serif; header-bar" >'
    +        '<a href="#" class="w3-show-block nav-title" style="float: left">'+title+'</a>'
    +    '</header>'
    +    '<div style="bottom:0;display: inline-block; width: 100%;  height:95%; overflow:unset; position: absolute; margin-left: 1em"'
    +        'class="w3-text-black" id="graphContentHTML">'
    +       text
    +    '</div>'
    +'</body>'
    +'</html>'

}
/**
 * Text of graph
 */
function graphInfromation(){

    let text = "";
    graphText.forEach(line => {
        text += line + "</br>";
    });

    var opened = window.open("");
    opened.document.write(newSiteHTML("Graph Information", text));
}

/**
 * Text of tree
 */
function treeInformation(){

    let text = "";
    treeText.forEach(line => {
        text += line + "</br>";
    });

    var opened = window.open("");
    opened.document.write(newSiteHTML("Tree Information", text));
}

/**
 * Disable and Enable the contents from
 * an accordion action by his id.
 * @param {Id} id id of html element
 */
function accordionDropdown(id) {

    let dropDown = $('#' + id);

    if (!dropDown.hasClass("w3-show")) { //on open
        dropDown.addClass('w3-show');
    
        dropDown.prev().css('text-decoration', 'underline white');
        dropDown.prev().css('background-color', '#6d7c8a');
        dropDown.css('padding-bottom', '30px');

        dropDown.addClass('shadow-dark-gray')
      
    } else {
        dropDown.removeClass('w3-show')
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
    
    let minDeg = bagDegrees[0];
    let maxDeg = bagDegrees[bagDegrees.length-1];
    let rows = $('#treeProperties')[0].rows;
    let bigBagId = sortedTotalBagSize[sortedTotalBagSize.length -1].id;
    let minBagId;
    let idx = 0;
    while(sortedTotalBagSize[idx].size === 0){
        idx += 1;
    }
    minBagId = sortedTotalBagSize[idx].id;

    cr.startBatch();
        let bigBag = cr.nodes('.tree').filter(`[bag = "${bigBagId}"]`).map(n => n.data('displayedText'));
        let minBag = cr.nodes('.tree').filter(`[bag = "${minBagId}"]`).map(n => n.data('displayedText'));
        let maxDegContent = cr.nodes('.tree').filter(`[bag = "${maxDeg.text}"]`).map(n => n.data('displayedText'));
        let minDegContent = cr.nodes('.tree').filter(`[bag = "${minDeg.text}"]`).map(n => n.data('displayedText'));
    cr.endBatch();

    let treewidth = minBag.length;
    bigBag = 'Id: '+ bigBagId + '</br> Vertices: ' + bigBag;
    minBag = 'Id: '+ minBagId + '</br> Vertices: ' + minBag;
    let singleNodes = cr.nodes('.tree').filter(function(ele, i, eles){
        return ele.neighborhood('node').length === 0; //return all nodes that have no neighboor
    });
  
    rows[5].cells[0].innerHTML =  colorNodeIcon('red') + "  " + 'Largest Bag';
    rows[6].cells[0].innerHTML =  colorNodeIcon('orange') + "  " + 'Smallest Bag';
    rows[7].cells[0].innerHTML =  colorNodeIcon('blue') + "  " + 'Max Degree Bag';
    rows[8].cells[0].innerHTML =  colorNodeIcon('yellow') + "  " + 'Min Degree Bag';

    rows[1].cells[1].innerHTML = treeDecompostion;
    rows[2].cells[1].innerHTML = treeDecompostion;
    rows[3].cells[1].innerHTML = numberOfBags;
    rows[4].cells[1].innerHTML = nrVertices; //number vertice
    rows[5].cells[1].innerHTML = bigBag;
    rows[6].cells[1].innerHTML = minBag;
    rows[7].cells[1].innerHTML = 'Id: '+ maxDeg.id + '</br> Degree: '+ maxDeg.degree + ' </br> Vertices: '+ maxDegContent;//TODO
    rows[8].cells[1].innerHTML = 'Id: '+ minDeg.id + '</br> Degree: '+ minDeg.degree + ' </br> Vertices: '+ minDegContent;//TODO
    rows[9].cells[1].innerHTML ='';
    rows[10].cells[1].innerHTML = treeClock;
    rows[11].cells[1].innerHTML = treeLayoutClock;
   
    if(treeAlgoClock === undefined)
        rows[12].cells[1].innerHTML = "undefined";
    else {
        rows[12].cells[1].innerHTML = treeAlgoClock;
    }

    pTreeHTMLCell(rows[9].cells[1], singleNodes);
}

/**
 * Set the layout time new in the tree properties.
 * This should be used, if a layout is going to recast.
 */
function setlayoutTimeTree(){
    let rows = $('#treeProperties')[0].rows;
    rows[11].cells[1].innerHTML = treeLayoutClock;
}

/**
 * Create p Elements that are clickable interactions
 * to fit their element.
 * @param {Cell} cell A html table cell.
 * @param {Nodes} nodes List of nodes.
 */
function pTreeHTMLCell(cell, nodes){
        let index = 0;
        nodes.forEach(b => {
            let displayText = b.data('displayedText');
            ++index;
            let p = document.createElement('p');
            Search.pFitStyle(p);
  
            p.innerHTML = index === nodes.length ? displayText :displayText+ ", ";
            p.addEventListener('click', function(){
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
    let minDeg = graphDegrees[0];
    let maxDeg = graphDegrees[graphDegrees.length-1];
 
    let rows = $('#graphProperties')[0].rows;
    rows[1].cells[1].innerHTML = cy.nodes().length; //number vertice
    rows[2].cells[1].innerHTML = cy.edges().length; //number edges
    rows[3].cells[1].innerHTML = 'Degree: '+ maxDeg.degree + ' </br> Vertex: '+maxDeg.text +'</br> Id: '+ maxDeg.id;
    rows[4].cells[1].innerHTML = 'Degree: '+ minDeg.degree + ' </br> Vertex: '+minDeg.text +'</br> Id: '+ minDeg.id;
    rows[5].cells[1].innerHTML = graphClock;
    rows[6].cells[1].innerHTML = graphLayoutClock;
}

/**
 * Set the layout time new in the graph properties.
 * This should be used, if a layout is going to recast.
 */
function setLayoutTimeGraph(){
    let rows = $('#graphProperties')[0].rows;
    rows[6].cells[1].innerHTML = graphLayoutClock;
}

/**
 * Creates dynamically the legend of nodes and egdes from the tree.
 */
function setTreeLegend() {
    createTableTree('node', 'List of Vertices');
    createTableTree('edge', 'List of Edges');
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
var colorNodeIcon =  function(color){
    return  '<i class="fa  fa-paint-brush " aria-hidden="true" ' +
            'style=";color:' + color + ';font-size:15px;"></i>'
}

/**
 * Sort a array of numbers. Small = 0, High = last
 * @param {Number[]} list list of numbers
 * @returns sorted array
 */
function sortByNumbers(list){
    return list.sort(function(a, b) {
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
    return list.sort(function(a, b) {
        return a[1] - b[1];
    });
}

/**
 * Create the property table of the sidebar for the graph.
 * @param {Boolean} isNode true = node table, false = edge table
 * @param {String} message title of table
 */
function createTableGraph(isNode, message) {
    let section = $('#G-accordion1')[0];
    let title = document.createElement('p');
    title.innerHTML = message;
    section.appendChild(title);

    let table = createTableBody(false);
    if (isNode) {
        let list = cy.nodes().map(n => n.data('id'));
        sortByNumbers(list).forEach(node => {
            createInnerTable(table, node, true); 
        });
    } else { //isEdge
        let list = cy.edges().map(n => n.data('id'));
        sortByNumbers(list).forEach(edge => {
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
function createTableBody(isTree){
    let table = document.createElement('table');
    let row = document.createElement('tr');
    let icon = document.createElement('th');
    let id = document.createElement('th');

    table.classList.add('w3-table');
    table.style.marginBottom = "25px";
    table.style.tableLayout ="fixed";

    icon.innerHTML = 'Color';
    id.innerHTML = 'Id';
    row.style.borderBottom = '1px solid white';

    row.appendChild(icon);
    
    if(isTree){
        let nr = document.createElement('th');
        nr.innerHTML = 'Nr.'
        row.appendChild(nr);
    }
    
    row.appendChild(id);
    table.appendChild(row);

    return table;
}

/**
 * Build the node or edge table from the tree sidebar. 
 * @param {String} content should be node, branch or edge
 * @param {String} message title of table
 */
function createTableTree(content, message) {
    let section = content === "branch" ? $('#T-accordion0')[0] : $('#T-accordion1')[0];
    let title = document.createElement('p');
    title.innerHTML =  message;
    section.appendChild(title);

    let table; 

    if (content === 'node') {
        table = createTableBody(true);
        let list = cr.nodes('.tree').map(n => [n.data('id'), n.data('displayedText')]);
        sortTupleByNumber(list).forEach(tuple => {
            createInnerNodeTreeTable(table, tuple[0], tuple[1]); 
        });
    } else if(content === 'edge') { //isEdge
        table = createTableBody(false);
        let list = cr.edges('.tree').map(n => n.data('id')); //maybe source and target??
        sortByNumbers(list).forEach(edge => {
            createInnerTable(table, edge, false); 
        });
    } else if(content === 'branch'){
        table = createTableBody(false);
        let list = cr.edges('.construct').map(n => n.data('id')); //maybe source and target??
        sortByNumbers(list).forEach(edge => {
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
    let row = document.createElement('tr');
    let icon = document.createElement('td');
    let id = document.createElement('td');

    let color = needColor ? getColor(element) : 'gray';
    icon.innerHTML = colorNodeIcon(color);
    
    let text = document.createTextNode(element);
    id.appendChild(text);
    row.appendChild(icon);
    row.appendChild(id);
    
    if(needColor){ //add fit option with clickable
        let ele = cy.$('#'+element);
        row.addEventListener('click', function(){
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
    let row = document.createElement('tr');
    let icon = document.createElement('td');
    let id = document.createElement('td');
    let displayT = document.createElement('td');

    icon.innerHTML = colorNodeIcon(getColor(displayedText));
   
    row.appendChild(icon);
    let text = document.createTextNode(displayedText);
    displayT.appendChild(text);
    text = document.createTextNode(iD);

    //add fit option with clickable
    row.addEventListener('click', function(){
        let n = cr.nodes(`[id= "${iD}"]`);
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
function setBagTable(){
    let section = $('#T-accordion0')[0] ;
    let title = document.createElement('p');
    let table = document.createElement('table');
    let row = document.createElement('tr');
    let bag = document.createElement('td');
    let size = document.createElement('td');
    let nodeElements = document.createElement('td');

    table.classList.add('w3-table');
    table.style.marginBottom = "25px";
    table.style.tableLayout ="fixed";

    title.innerHTML = 'List of Bags';
    section.appendChild(title);

    let headTable = document.createElement('th');
    headTable.innerHTML = 'Id';
    headTable.style.maxWidth = "30px";
    row.appendChild(headTable);
    headTable = document.createElement('th');
    headTable.innerHTML = 'Size';
    row.appendChild(headTable);
    headTable = document.createElement('th');
    headTable.innerHTML = 'Vertices Inside';
    row.appendChild(headTable);

    table.appendChild(row);

    let bagIdsSorted = sortByNumbers(bagIds);

    bagIdsSorted.forEach(id =>{ //innerTable
        row = document.createElement('tr');
        bag = document.createElement('td');
        size = document.createElement('td');
        nodeElements = document.createElement('td');

        let text = document.createTextNode(id);
        bag.appendChild(text);

        cr.startBatch();
        let nodes = cr.nodes('.tree').filter(`[bag = "${id}"]`);
        cr.endBatch();
        text = document.createTextNode(nodes.length);  
        size.appendChild(text);


        let result = nodes.map(n=> n.data('displayedText') )
        text = document.createTextNode(result);
        nodeElements.appendChild(text);

        row.appendChild(bag);
        row.appendChild(size);
        row.appendChild(nodeElements);

         //add fit option with clickable
        
        row.addEventListener('click', function(){
            Search.fit(cr.$('#'+id), true);
        });
        row.classList.add('fit');
        
        table.appendChild(row);
        
    });
    section.appendChild(table);
}
