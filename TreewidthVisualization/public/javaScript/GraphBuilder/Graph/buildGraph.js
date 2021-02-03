var nrVertices; //number of vertices in graph
var nrEdges; //number of edges in graph
var setNodes; //contains the vertices by their displayed text

/**
 * Drwas the graph in cy-window by the information from @lines .
 * @param {String[]} lines lines from .gr file.
 * @returns -1 on error
 */
function setGraph(lines) {
    console.log("in set graph wit lines ",lines)
    for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        let line = lines[lineNumber].split(/\s+/);

        try {
            switch (line[0]) {
                case '': 
                    console.log('line ', lineNumber, ' is empty');
                    break;
                case 'c': //comments
                    break;
                case 'p':
                    //console.log("number nodes: ", line[2], " number edges ", line[3])
                    nrVertices = line[2];
                    nrEdges = line[3];
                    break;
                default: //make nodes and edges
                    //console.log("in default to set graph varaibles with line ",line)
                    console.log("type default param ", typeof(line[0]))

                    if (line.length < 2) { // <= because of empty last index
                        let message = 'Line has only one vertice. Cannot create a loop edge on a vertice in line:' + lineNumber;
                        throw new Error(message);
                    }
                    setNode(line[0]);
                    setNode(line[1]);
                    setEdge(line[0], line[1]);
            }
       
        } catch (err) {
            removeGraph(); //TODO remove all created elements that got created before the error //maybe too much for big graphs?
            alertErr(err.message);
            return -1;
        }
    }
        if(nrVertices != cy.nodes().length){
            cy.nodes().forEach(e => console.log("node in cy is ", e))
            alertErr("File is defect. Number of vertices is not right.");
            return -1;
        }else if(nrEdges != cy.edges().length){
            alertErr("File is defect. Number of edges is not right.");
            return -1;
        }
    //console.log("graph node length is ", cy.nodes().length, " length edges ", cy.edges().length)
}


/**
 * If the collection cy has not already the input node,
 * then add this node.
 * @param {Number} node 
 */
function setNode(node) {
  
    //console.log("getby id ", node, " is ", cy.nodes(`[displayedText = "${node}"]`).data("displayedText"), " und mit id ", cy.nodes(`[id = "${node}"]`).data("displayedText"),)
   // console.log("mit dollar ", cy.$("#"+node).data("displayedText"), " un id ", cy.$("#"+node).data("id") , " und ",  cy.nodes(`[id = "${node}"]`).data('id')," verneint ",!cy.$("#"+node).data('id') )
   
    // add node if not in collection 
    if (!cy.nodes(`[id = "${node}"]`).data('id')) { //same like jquery format: cy.$("#"+node).data('id') 
    
        cy.add({
            group: "nodes",
            data: {
                id: node,
                displayedText: node
            },
            classes: ['graph']
        });
    }
}


/**
 * Creates an edge between source and target.
 * If already an edge between target and source exist,
 * no edge will be created.
 * @param {Number} node1 Source
 * @param {Number} node2 Target
 * @returns return if no edge was created
 */
function setEdge(node1, node2) { //TODO check sourc target and back with td too
    let doubleEdgeId = "e: "+node2 + " "+ node1;

    if(cy.edges(`[id = "${doubleEdgeId}"]`).data('id')){
        console.log("No double edges allowed. There is already an edge between "+ node2 +" and "+node1 )
        return;
    }

    let e = cy.add({
        group: 'edges',
        data: {
            id: "e: " + node1 + " " + node2,
            source: node1,
            target: node2,
        },
        classes: ['graph'],
    });
}

/**
 * Set the graph layout by @layout .
 * @param {String} layout layout name
 */
function setGraphLayout(layout) {
   
    cy.startBatch();
        if (prevGraphLayout) {
            prevGraphLayout.stop();
        };

        prevGraphLayoutName = layout;//name

        let newLayout = cy.makeLayout(layouts[layout]);
        console.log("new layout from graph ", layouts[layout]);

        prevGraphLayout = newLayout;//layout
        

        newLayout.run().promiseOn('layoutstop');

/*
        setTimeout(function() {
            newLayout.stop();
        }, 100);*/
    cy.endBatch();
}