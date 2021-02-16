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
function emptyDynamicSidebar(){
    $('#G-accordion1').empty();
    $('#T-accordion0').empty();
    $('#T-accordion1').empty();
}

/**
 * Disable and Enable the contents from
 * an accordion action by his id.
 * @param {Id} id 
 */
function accordionDropdown(id) {

    let dropDown = $('#' + id);

    if (!dropDown.hasClass("w3-show")) { //on open
        dropDown.addClass('w3-show');
       // dropDown[0].className.replace('fa-caret-down', 'fa-caret-up');
        dropDown.prev().css('text-decoration', 'underline white');
        dropDown.prev().css('background-color', '#6d7c8a');
        dropDown.css('padding-bottom', '30px');

        dropDown.addClass('shadow-dark-gray')
      
    } else {
        dropDown.removeClass('w3-show')
        dropDown.css('background-color', 'none');
       // dropDown[0].classList.replace('fa-caret-up', 'fa-caret-down');

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
    let degree = calculateTreeDegress();
    let minDeg = degree[0];
    let maxDeg = degree[degree.length-1];
    let rows = $('#treeProperties')[0].rows;
    rows[1].cells[1].innerHTML = treewidth;
    rows[2].cells[1].innerHTML = numberOfBags;
    rows[3].cells[1].innerHTML = nrVertices; //number vertice
    rows[4].cells[1].innerHTML = nrEdges; //number edges
    rows[5].cells[1].innerHTML = 'Degree: '+ maxDeg.degree + ' </br> Node: '+maxDeg.text +'</br> Id: '+ maxDeg.id;
    rows[6].cells[1].innerHTML = 'Degree: '+ minDeg.degree + ' </br> Node: '+minDeg.text +'</br> Id: '+ minDeg.id;
    rows[7].cells[1].innerHTML = treeClock.getTime;
    if(treeAlgoClock === undefined)
      //  rows[8].style.display = 'none'
        rows[8].setAttribute('hidden', true)
    else 
        rows[8].setAttribute('hidden', false)
       // rows[8].style.display = 'table-cell'
}

/**
 * Set the information [number of vertice, 
 * number of edges, max degree Vertice, min degree vertice, 
 * build time, algorithm time] from the graph.
 */
function setGraphProperties() {
    let degree = calculateGraphDegrees();
    let minDeg = degree[0];
    let maxDeg = degree[degree.length-1];
 
    let rows = $('#graphProperties')[0].rows;
    rows[1].cells[1].innerHTML = cy.nodes().length; //number vertice
    rows[2].cells[1].innerHTML = cy.edges().length; //number edges
    rows[3].cells[1].innerHTML = 'Degree: '+ maxDeg.degree + ' </br> Node: '+maxDeg.text +'</br> Id: '+ maxDeg.id;
    rows[4].cells[1].innerHTML = 'Degree: '+ minDeg.degree + ' </br> Node: '+minDeg.text +'</br> Id: '+ minDeg.id;
    rows[5].cells[1].innerHTML = graphClock.getTime;
    
}

/**
 * Creates dynamically the legend of nodes and egdes from the tree.
 */
function setTreeLegend() {
    
    console.log("in tree layout");
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
var colorNodeIcon =  function(color){
    return  '<i class="fa  fa-paint-brush " aria-hidden="true" ' +
            'style=";color:' + color + ';font-size:15px;"></i>'
}
/**
 * Sort a array of numbers. Small = 0, High = last
 * @param {Array} list 
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
    console.log("in create table graph")
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
 * @param {Boolean} isNode true = node table should be created, else edge table
 * @param {String} message title of table
 */
function createTableTree(isNode, message) {
    console.log("in create table graph")
    let section = $('#T-accordion1')[0];
    let title = document.createElement('p');
    title.innerHTML =  message;
    section.appendChild(title);

    let table; 

    if (isNode) {
        table = createTableBody(true);
        let list = cr.nodes('.tree').map(n => [n.data('id'), n.data('displayedText')]);
        sortTupleByNumber(list).forEach(tuple => {
            createInnerNodeTreeTable(table, tuple[0], tuple[1]); 
        });
    } else { //isEdge
        table = createTableBody(false);
        let list = cr.edges('.tree').map(n => n.data('id')); //maybe source and target??
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

    console.log("was ist bagIds ", bagIds);

    let headTable = document.createElement('th');
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

    let bagIdsSorted = sortByNumbers(bagIds);
    console.log("sorted bag is ", bagIdsSorted);
    bagIdsSorted.forEach(id =>{ //innerTable
        row = document.createElement('tr');
        bag = document.createElement('td');
        size = document.createElement('td');
        nodeElements = document.createElement('td');

        let text = document.createTextNode(id);
        bag.appendChild(text);

        let nodes = cr.nodes('.tree').filter(`[bag = "${id}"]`);
        text = document.createTextNode(nodes.length);  
        size.appendChild(text);
        console.log("was is tnodes ", nodes)

        let result = nodes.map(n=> n.data('displayedText') )
        console.log("was ist result ", result)
        text = document.createTextNode(result);
        nodeElements.appendChild(text);

        row.appendChild(bag);
        row.appendChild(size);
        row.appendChild(nodeElements);
        table.appendChild(row);
    });
    section.appendChild(table);
}
