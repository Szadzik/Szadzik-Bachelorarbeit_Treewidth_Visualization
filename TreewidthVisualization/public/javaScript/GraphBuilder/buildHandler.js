var layout; //the currently layout which is set
var prevLayout; //the previous layout which was set
var prevGraphLayout;
var prevGraphLayoutName;
var prevTreeLayoutName = ""; //the previous layout that was build for the tree
var numberOfBags;
var bagIds = new Array(); //array that contains all bagIds


/**
 * Calls all functions that are needed to create the Tree.
 * @param {array} lines Lines of file
 */
function handleTreeCreation(lines) {
    console.log("in handleTree");
    removeBubble(); //faster build on remove. Each frame caluclate the bubbles this cost too much time.
    removeTree(); 

    setBagDependencies(lines); 
    resizeConstructNodes();
    //calculateDegrees(); //degree properties
    //mapAngles(); //coordinate positions  
    setAutoMove(); //move options for mouse
    if (prevTreeLayoutName == "") { //set on truein setlayout
        handleTreeLayout('circle');
    } else { //TODO take the previous layout if it got changed
        handleTreeLayout(prevTreeLayoutName);
    }

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
    setGraphLayout('circle'); //customCise
   
    setGraphProperties();
    console.log("finished handleGraphCreation")
}


function calculateDegrees() {
    //TOD Omax,min
    let cC = calculateConstructDegress();
    let cT = calculateTreeDegress();
    let cG = calculateGraphDegrees();

    console.log("min Construct ", cC[0].id, " max ", cC[degrees.length - 1].id);
    console.log("min tree ", cT[0].id, " max ", cT[degrees.length - 1].id);
    console.log("min graph ", cG[0].id, " max ", cG[degrees.length - 1].id);
}

function calculateConstructDegress() {
    var degrees = cr.nodes('.construct').map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });

    return sortDegrees(degrees);
}

function calculateTreeDegress() {
    var degrees = cr.nodes('.tree').map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });

    return sortDegrees(degrees);
}

function calculateGraphDegrees() {
    console.log("cy", cy.nodes())
    var degrees = cy.nodes().map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });
    console.log("degrees sinf davor ", degrees)
    degrees= sortDegrees(degrees);
    console.log("degrees sinf ", degrees)
    return degrees;
}

/**
 * Sort nodes by grad. Last index = highest grad, first index = smallest grad.
 * @param {*} degrees 
 * @returns
 */
function sortDegrees(degrees) {
    degrees.sort(function(a, b) {
        return a.degree - b.degree;
    });
    return degrees[degrees.length - 1].id; //get node of highest degree
}

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

function removeGraph() {
    console.log("in remove all Graph");
    cy.elements().remove();
}



function printTreeNodes() {
    cr.nodes().forEach(n => {
        console.log("node: ", n.data('displayedText'));
    });
}

function printTreeEdges() {
    cr.nodes().forEach(n => {
        console.log("edge: ", n.data('displayedText'));
    });
}


function printGraphNodes() {
    cy.nodes().forEach(n => {
        console.log("vertice: ", n.data('displayedText'));
    });
}

function printGraphEdges() {
    cy.edges().forEach(n => {
        console.log("edge: ", n.data('displayedText'));
    });
}