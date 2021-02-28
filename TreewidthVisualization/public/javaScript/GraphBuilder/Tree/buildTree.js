/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Build a tree with his nodes, bags, edges and layout.
 */
var treewidth = 0;

/**
 * Get a string that contains information about a bag
 * and all his nodes that will be created with an id that contains
 * the bag id. => bagID + '.' + nodeID. and a displayedText
 * that which is going to displayed in view. So there will be
 * different nodes with the same displayedText but different id.
 * @param {String} line A string that contains bag information
 */
function setColorNodes(line) {
    let numberOfbag = line[1]; //String
    bagIds.push(numberOfbag);

    let vertices =  line.indexOf('')=== -1 ? line.slice(2, line.length) :line.slice(2, line.length-1);
    
    vertices.forEach(v => {
        cr.add({
            group: 'nodes',
            //some nodes have same dispalyed Text, so bagId adds attribute v(vertice)=> bagId *dot* v
            data: { id: numberOfbag + "." + v, displayedText: v, bag: numberOfbag, color: getColor(v) },
            classes: ['tree', 'bag']
        })
    });
}

/**
 * Get a string that contains the information
 * about the source and target of 2 bags on which
 * an edge is drawn.
 * With this, it will search all
 * @param {String} line Source bag and target bag.
 */
function searchEdgeConnections(line) {
    let source = line[0];
    let target = line[1];

    let collectSource = cr.nodes().filter(function(ele) { //all nodes of group source
        return ele.data('bag') == source; //ele.bag?
    });
    let collectTarget = cr.nodes().filter(function(ele) { // nodes of group target
        return ele.data('bag') == target;
    });

    collectSource.forEach(s => {
        collectTarget.forEach(t => {
            if (s.data('displayedText') == t.data('displayedText')) {

                setColorEdge(s.data('id'), t.data('id'), s.data('displayedText'));
            }
        })
    });
}

/**
 * Draw a edge between @source and @target .
 * @param {String} source       id of node from a bag
 * @param {String} target       id of node from a bag
 * @param {String} displayedText the displayedText from source and target,
 *                               which is need to color the edges like the nodes
 */
function setColorEdge(source, target, displayedText) {
    cr.add({
        group: 'edges',
        classes: ['tree', 'bag', 'color'],
        data: {
            id: 'colorE:' + source + " " + target , //+ ":" + displayedText
            source: source,
            target: target,
            color: getColor(displayedText),
            nodeGroup: displayedText
        }
    });
}

/**
 * Creates the tree by creating nodes and edges.
 * @param {String[]} lines A string that defines the tree by .td format.
 * @param {Boolean} isFromServer true = tree string from server, 
 *              false = tree string from two uploaded files
 */
function setBagDependencies(lines, isFromServer) {

	if(isFromServer)
		lines = lines.split(/\r?\n/);

    for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        let line = lines[lineNumber].split(/\s+/);

        try {
           // console.log("line is ", line)
            switch (line[0]) {
                case '':
                case 'c':
                    break;
                case 's':
                    numberOfBags = line[2]; 
                    treewidth = line[3];  
                    break;
                case 'b':
                    if (line.length <= 2) { // <= because of empty last index
                        let message = 'Tried to define a bag, but this is not a bag on textline: '
                            + lineNumber + '.' + '</br>' + 'Be sure to follow the bag format: ' +
                            '"<b><span style=color:blue> b </span> <span style=color:red> id </span> <span style=color:green> V_k" </span> </b>' +
                            ', where id is <span style=color:red> the bag id </span> and <span style=color:green> V_k </span> ' +
                            'a <span style=color:green> list of nodes</span> (can be empty) of the  <span style=color:blue> bag </span> b. '
                        throw new Error(message);
                    }
		            let size = isFromServer ? line.length -2 : line.length-3;
                    setConstructNode(line[1], size); //set bag with id and his number of nodes
                    setColorNodes(line, lineNumber);
                    break;
                default: //make edges
                    if (line.length < 2 ) { // <= because of empty last index
                        let message = 'Build Tree: Cannot create a loop edge on a node in line:' + lineNumber+ '.  line code is '+line;
                        throw new Error(message);
                    }
                    setConstructEdges(line[0], line[1]);
                    searchEdgeConnections(line);
            }
        } catch (err) {
            alertErr(err.message);
        }
    }
}


/**
 * Set the layout from @layout input.
 * @param {String} layout name of the layout 
 * from @layouts in treeLayouts
 * @param {Boolean} rePoseNodes if true the button repose 
 *          nodes was clicked, so no time must be calculated.
 */
function handleTreeLayout(layout, rePoseNodes) {
    //here an extra equal with preset, so that the clock work
    //on reload buttons.
    if(layout !== 'preset'){
        treeLayoutClock = new CLock();
    }
      
    setTreeLayout(layout);

    if (layout !== 'preset') {
  
        cr.ready(function() {
            cr.stop();
            mapAngles();
            cr.startBatch();
                handleTreeLayout('preset', false);
            cr.endBatch();

        });
    }else if(layout === 'preset'){
        
        if($('#bubbleOptions')[0].children[1].value === 'active')
            drawConstructBubble();
        else if($('#bubbleOptions')[0].children[2].value === 'active')
            drawFullBubble();
        // child 0,none, does not need a query
        if(!rePoseNodes)
            treeLayoutClock = treeLayoutClock.getTime;
       // cr.animate('queue', false); 
    } 
}

/**
 * Set a layout by his string name
 * @param {String} layout name of the laoyut from file layoutTable
 */
function setTreeLayout(layout){
    if(prevLayout){
        prevLayout.stop();
    }
    let layoutName = layout === 'preset' ? layout : layout.substring(2, layout.length);
    let layoutType = layout[0];
    let newLayout;
    
    if(layout !== 'preset'){
        prevTreeLayoutName = layout;
    }

    //breathfirst layout needs to be created on running time
    if(layout === 'BTD'){
         newLayout = treeLayout.breadthfirstMaxDegree();
    }else if(layout === 'BTB')
        newLayout = treeLayout. breadthfirstBiggestBag();

    //layout runs on all nodes (some layout can only this)
    else if(layoutType === 'a' || layout === 'preset'){
        newLayout = cr.makeLayout(treeLayout.layouts[layoutName]);
    //layout runs on bags/construct (not all layouts can do this)
    }else if(layoutType === 'c'){
        newLayout = cr.nodes('.construct').makeLayout(treeLayout.layouts[layoutName]);
    }

    console.log("new llayout ", treeLayout.layouts[layoutName]);
    
    prevLayout = newLayout; //HERE
    
    newLayout.run().promiseOn('layoutstop');
    
    
    setTimeout(function() {
        newLayout.stop();
    }, 100);
}
