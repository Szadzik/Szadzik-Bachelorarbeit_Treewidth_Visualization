var treewidth = 0;

function setColorNodes(line) {
    let numberOfbag = line[1];
    bagIds.push(numberOfbag);
    console.log("last element ", line[line.length], " index of empty ", line.indexOf(""));
//    let vertices = line.slice(2, line.length - 1);
    let vertices =  line.indexOf('')=== -1 ? line.slice(2, line.length) :line.slice(2, line.length-1);
   console.log("result vertice is ",vertices);
    console.log("vertices of bag are ", vertices);
    vertices.forEach(v => {
        cr.add({
            group: 'nodes',
            //some nodes have same dispalyed Text, so bagId adds attribute v(vertice)=> bagId *dot* v
            data: { id: numberOfbag + "." + v, displayedText: v, bag: numberOfbag, color: getColor(v) },
            classes: ['tree', 'bag', 'color']
        })
    });
}

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
 * @param {string} source       id of node from a bag
 * @param {string} target       id of node from a bag
 * @param {number} displayedText the displayedText from source and target,
 *                               which is need to color the edges like the nodes
 */
function setColorEdge(source, target, displayedText) {
   // console.log("farbe ", getColor(displayedText))
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
   	console.log("is server true? ", isFromServer); 
	console.log("was ist line in dep: ", lines);

	if(isFromServer)
		lines = lines.split(/\r?\n/);

    for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {

        let line = lines[lineNumber].split(/\s+/);

        try {
            console.log("line is ", line)
            switch (line[0]) {
                case '':
                    //console.log("line is empty");
                    break;
                case 'c':
                    break;
                case 's':
                    numberOfBags = line[2]; //maybe remove?
                    treewidth = line[3];  //TODO maybe-1??
                    console.log(" BAGS INSGESAMT ", numberOfBags)
                    break;
                case 'b':
                     console.log("in b ", lineNumber)
                    if (line.length <= 2) { // <= because of empty last index
                        let message = 'Tried to define a bag,but this is not a bag on textline: ' +
                            "lineNumber" + '.' + '</br>' + 'Be sure to follow the bag format: ' +
                            '"<b><span style=color:blue> b </span> <span style=color:red> n </span> <span style=color:green> k" </span> </b>' +
                            ', where n is <span style=color:red> the bag number </span> and <span style=color:green> k </span> ' +
                            'a <span style=color:green> list of nodes</span> (can be empty) of the  <span style=color:blue> bag </span> b. '
                        throw new Error(message);
                    }
		    let size = isFromServer ? line.length -2 : line.length-3;
                    setConstructNode(line[1], size); //set bag with id and his number of nodes
                    setColorNodes(line, lineNumber);
			console.log("size of ", size); 
                    break;
                default: //make edges
                    if (line.length < 2 && isFromServer || line.length < 3 && !isFromServer) { // <= because of empty last index
                        let message = 'Build Tree: Cannot create a loop edge on a node in line:' + lineNumber+ '. "\n" line code is '+line;
                        throw new Error(message);
                    }
                    //console.log("source ", line[0], " target ", line[1])
                    setConstructEdges(line[0], line[1]);
                    searchEdgeConnections(line);
            }
        } catch (err) {
            removeTree(); //TODO remove all created elements that got created before the error //maybe too much for big graphs?
            alertErr(err.message);
        }
    }
    console.log("was ist cr ", cr.nodes().length)
}


/**
 * Set the layout from @layout input.
 * @param {String} layout name of the laoyut from file layoutTable
 */
function handleTreeLayout(layout) {

    setTreeLayout(layout);
    
    if (layout !== 'preset') {
        cr.ready(function() {
            cr.stop();
            mapAngles();
            cr.startBatch();
            handleTreeLayout('preset');
            cr.endBatch();

        });
    }else if(layout === 'preset'){
        if($('#bubbleOptions')[0].children[1].value === 'active')
            drawConstructBubble();
        else if($('#bubbleOptions')[0].children[2].value === 'active')
            drawFullBubble();
        // child 0,none, does not need a query
    } 
}

/**
 * Set a layout by his string name
 * @param {String} layout name of the laoyut from file layoutTable
 */
function setTreeLayout(layout) {
    if (prevLayout) {
        prevLayout.stop();
    };

    if (layout != 'preset') {
        prevTreeLayoutName = layout;
    }

    let newLayout = cr.makeLayout(layouts[layout]);
    console.log("new llayout ", layouts[layout]);

    prevLayout = newLayout;

    newLayout.run().promiseOn('layoutstop');


    setTimeout(function() {
        newLayout.stop();
    }, 100);
}

