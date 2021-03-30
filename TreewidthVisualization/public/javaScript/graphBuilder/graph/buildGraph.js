/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Build a graph with all his vertices, edges and the selected layout
 * by lines/Strings.
 * In cytoscape exist only the elements nodes and edges.
 * So inside the code, vertices and nodes are more or less similiar.
 */

var nrVertices; //number of vertices in graph
var nrEdges; //number of edges in graph
var setNodes; //contains the vertices by their displayed text


/**
 * Draws the graph in cy-window by the information from @lines .
 * @param {String[]} lines lines from .gr file.
 * @returns -1 on error
 */
function setGraph(lines) {
    for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        let line = lines[lineNumber].split(/\s+/);

        line= line.filter(function (el) { //remove empty strings
            return el != null && el != "";
          });
       if(!line || line.length === 0)
           continue

        if(line[0] === 'e'){
            line.shift(); //remove first char e
        }
        
        try {
            switch (line[0]) {
                case 'n':
                    break;
                case 'c': 
                    break;
                case 'p':
                        nrVertices = line[2];
                        nrEdges = line[3];
                    break;
                default: //make nodes and edges
            
                    let source = line[0];  
                    let target = line[1];
                    setNode(source);
                    setNode(target);
                    setEdge(source, target);
            }
       
        } catch (err) {//maybe add remove graph on error?
            alertErr(err.message);
            return -1;
        }
    }
}


/**
 * If the collection cy has not already the input node,
 * then add this node.
 * @param {String} node a non-decimal number as string
 */
function setNode(node) {

    // add node if not in collection 
    if (!cy.nodes(`[id = "${node}"]`).data('id')) { //same like jquery format: cy.$("#"+node).data('id') 
    
        cy.add({
            group: "nodes",
            data: {
                id: node,
                displayedText: node,
                color: getColor(node)
            },
            classes: ['graph']
        });
    }
}


/**
 * Creates an edge between source and target.
 * If already an edge between target and source exist,
 * no edge will be created.
 * @param {String} node1 node id that is no decimal as string
 * @param {String} node2 node id that is no decimal as string
 * @returns return if no edge was created
 */
function setEdge(node1, node2) { //TODO check sourc target and back with td too
    let doubleEdgeId = "e: "+node2 + " "+ node1;

    if(cy.edges(`[id = "${doubleEdgeId}"]`).data('id')){
       
    }else{
        cy.add({
            group: 'edges',
            data: {
                id: "e: " + node1 + " " + node2,
                source: node1,
                target: node2,
                displayedText: node1 + " - " + node2
            },
            classes: ['graph'],
        });
    }
}

/**
 * Set the graph layout by @layout.
 * @param {String} layout layout name
 */
function setGraphLayout(layout) {
    graphLayoutClock = new CLock();
    cy.startBatch();
        if (prevGraphLayout) {
            prevGraphLayout.stop();
        };
        prevGraphLayoutName = layout;//name
        let newLayout = cy.makeLayout(graphLayout.layouts[layout]);
        prevGraphLayout = newLayout;//layout
        newLayout.run().promiseOn('layoutstop');

    cy.endBatch();
    graphLayoutClock = graphLayoutClock.getTime;
}

