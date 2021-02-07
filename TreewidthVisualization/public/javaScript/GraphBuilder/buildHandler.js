var layout; //the currently layout which is set
var prevLayout; //the previous layout which was set for the tree
var prevGraphLayout; //the previous layout which was set for the graph
var prevGraphLayoutName = "";//the previous layout that was build for the graph
var prevTreeLayoutName = ""; //the previous layout that was build for the tree
var numberOfBags; //total number of bags from the tree
var bagIds = new Array(); //array that contains all bagIds

/**
 * Calls all functions that are needed to create the Tree.
 * @param {array} lines Lines of file
 */
function handleTreeCreation(lines) {
    console.log("in handleTree");
    removeBubble(); //faster build on remove. Each frame caluclate the bubbles this cost too much time.
    removeTree(); 

    setBagDependencies(lines, false); 
    resizeConstructNodes();
    //calculateDegrees(); //degree properties

    setAutoMove(); //move options for mouse

    //TODO get by layout option
    if (prevTreeLayoutName === "") { //set on truein setlayout
        handleTreeLayout('circle');
    } else { //TODO take the previous layout if it got changed
        handleTreeLayout(prevTreeLayoutName);
    }

    setSidebarProperties();
    console.log("out of handleCreation")

}

/**
 * Calls are functions that are needed to create the Graph.
 * @param {array} lines Lines of file
 */
function handleGraphCreation(lines) {
    removeGraph();
    console.log("in handleTGraph");
    let result = setGraph(lines);
    if(result === -1) //TODO
        return;

    if (prevGraphLayoutName === "") { //set on truein setlayout
        setGraphLayout('circle');
    } else { //TODO take the previous layout if it got changed
        setGraphLayout(prevGraphLayoutName);
    }
    
   
    console.log("finished handleGraphCreation")
}


/**
 * Caluclate and sort a list of degrees from bags(construct graph).
 * @returns sorted list of degrees from bags
 */
var calculateConstructDegress = function () {
    let degrees = cr.nodes('.construct').map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });
    return sortDegrees(degrees);
}

/**
 * Caluclate and sort a list of degrees from tree nodes.
 * @returns sorted list of degrees from nodes
 */
var calculateTreeDegress = function() {
    let degrees = cr.nodes('.tree').map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });
    return sortDegrees(degrees);
}

/**
 * Caluclate and sort a list of degrees from graph vertices.
 * @returns sorted list of degrees from vertices
 */
var calculateGraphDegrees = function(){
    console.log("cy", cy.nodes())
    let degrees = cy.nodes().map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });
    console.log("degrees sinf davor ", degrees)
    degrees= sortDegrees(degrees);
    console.log("degrees sinf ", degrees)
    return degrees;
}

/**
 * Sort a list of degrees. Last index = highest grad, first index = smallest grad.
 * @param {Number[]} degrees 
 * @returns sorted degrees
 */
function sortDegrees(degrees) {
    let tmp = degrees.sort(function(a, b) {
        return a.degree - b.degree;
    });
    return tmp; 
}

function maxDegreeOf(sortedDegrees){
    console.log("alle degress sortiert ", sortedDegrees)
    return sortDegrees[sortDegrees.length-1];
}

function minDegreeOf(sortedDegrees){
    console.log("alle degress sortiert ", sortedDegrees)
    return sortDegrees[0];
}

/**
 * Remove the tree 
 */
function removeTree() {
    console.log("in remove all");
    try {
        cr.edges().remove();
        cr.nodes().remove();
    } catch (err) {
        console.log("catch ", err.message)
        console.log("was is noch an elementen vorhanden ", cr.elements().length, " nodes ", cr.nodes().length, " und ed ", cr.edges().length)
        if (cr.elements().length > 0) {
            removeAllTree();
        }
    }
}

/**
 * Remove the graph
 */
function removeGraph() {
    console.log("in remove all Graph");
    cy.elements().remove();
}


/**
 * Print all tree nodes in the console
 */
function printTreeNodes() {
    cr.nodes().forEach(n => {
        console.log("node: ", n.data('displayedText'));
    });
}

/**
 * Print all tree edges in the console
 */
function printTreeEdges() {
    cr.nodes().forEach(n => {
        console.log("edge: ", n.data('displayedText'));
    });
}

/**
 * Print all graph vertices in console
 */
function printGraphNodes() {
    cy.nodes().forEach(n => {
        console.log("vertice: ", n.data('displayedText'));
    });
}

/**
 * Print all graph edges in console
 */
function printGraphEdges() {
    cy.edges().forEach(n => {
        console.log("edge: ", n.data('displayedText'));
    });
}