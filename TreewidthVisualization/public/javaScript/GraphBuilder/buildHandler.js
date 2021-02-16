var layout; //the currently layout which is set
var prevLayout; //the previous layout which was set for the tree
var prevGraphLayout; //the previous layout which was set for the graph
var prevGraphLayoutName = "";//the previous layout that was build for the graph
var prevTreeLayoutName = ""; //the previous layout that was build for the tree
var numberOfBags; //total number of bags from the tree
var bagIds = new Array(); //array that contains all bagIds

var treeClock;
var treeAlgoClock;
var graphClock;
var onSet = 0; //if = 2 then stat setSidebarProperties
/**
 * Calls all functions that are needed to create the Tree.
 * @param {array} lines Lines of file
 */
function handleTreeCreation(lines, isFromServer) {
    console.log("in handleTree");
    removeBubble(); //faster build on remove. Each frame caluclate the bubbles this cost too much time.
    removeTree(); 

    treeClock = new CLock();
//    console.log("get time ", treeClock.getTime, " und normal time ", treeClock.time);

    setBagDependencies(lines, isFromServer); 
    resizeConstructNodes();
  
    setAutoMove(); //move options for mouse

    /*
    //TODO get by layout option
    if (prevTreeLayoutName === "") { //set on truein setlayout
      //  handleTreeLayout('circle');
      let selectedLayout = $('#layout-cr')[0].value;
      console.log("selected layout ",selectedLayout)
      handleTreeLayout(selectedLayout);
    } else { //TODO take the previous layout if it got changed
        handleTreeLayout(prevTreeLayoutName); //TODO remove
    }*/

    let selectedLayout = $('#layout-cr')[0].value;
    handleTreeLayout(selectedLayout);

    console.log("out of handleCreation")
    onSetCheck();
    
}

/**
 * Check if both graphs are ready to load sidebar
 */
function onSetCheck(){
    onSet++;
    if(onSet % 2 === 0){
        onSet = 0;
        setSidebarProperties();
        spinner.close();
    }
}

/**
 * Calls are functions that are needed to create the Graph.
 * @param {Array} lines Lines of file
 */
function handleGraphCreation(lines) {
    removeGraph();

    graphClock = new CLock();
    console.log("get time   und normal time ", graphClock.time);

    console.log("in handleTGraph");
    let result = setGraph(lines);
    if(result === -1) //TODO
        return;
/*
    if (prevGraphLayoutName === "") { //set on truein setlayout
        let selectedLayout = $('#layout-cy')[0].value;
        console.log("selected layout ",selectedLayout)
        setGraphLayout(selectedLayout);
        //setGraphLayout('circle');
    } else { //TODO take the previous layout if it got changed
        setGraphLayout(prevGraphLayoutName);
    }*/

    let selectedLayout = $('#layout-cy')[0].value;
    setGraphLayout(selectedLayout);

    onSetCheck();
    console.log("finished handleGraphCreation")
    return true;
}


/**
 * Caluclate and sort a list of degrees from bags(construct graph).
 * @returns sorted list of degrees from bags
 */
    function calculateConstructDegress () {
    let degrees = cr.nodes('.construct').map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });
    return sortDegrees(degrees);
}

/**
 * Caluclate and sort a list of degrees from tree nodes.
 * @returns sorted list of degrees from nodes
 */
    function calculateTreeDegress() {
    let degrees = cr.nodes('.tree').map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });
    console.log("was sind degrees ", degrees)
    return sortDegrees(degrees);
}

/**
 * Caluclate and sort a list of degrees from graph vertices.
 * @returns sorted list of degrees from vertices
 */
    function calculateGraphDegrees(){
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
            removeTree();
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
