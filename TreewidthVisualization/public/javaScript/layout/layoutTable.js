var nodeMaxGrad = "";
let maxLayoutDuration = 1500;
let layoutPadding = 50;
let concentric = function(node) {
    calculateCachedCentrality();

    return node.data('centrality');
};
let levelWidth = function(nodes) {
    calculateCachedCentrality();

    let min = nodes.min(n => n.data('centrality')).value;
    let max = nodes.max(n => n.data('centrality')).value;


    return (max - min) / 5;
};
let calculateCachedCentrality = () => {
    let nodes = cy.nodes();

    if (nodes.length > 0 && nodes[0].data('centrality') == null) {
        let centrality = cy.elements().closenessCentralityNormalized();

        nodes.forEach(n => n.data('centrality', centrality.closeness(n)));
    }
};

function calculateNodeMaxGrad() {
    //sort node on grad (in and out edges). Last = highest grad, first = smallest grad.
    var degrees = cr.nodes().map(function(ele) {
        return { id: ele.data('id'), degree: ele.degree(), text: ele.data('displayedText') };
    });

    degrees.sort(function(a, b) {
        return a.degree - b.degree;
    });
    nodeMaxGrad = degrees[degrees.length - 1].id; //get node of highest degree
}

let layouts = {
    breadthfirst: {
        name: 'breadthfirst',
        roots: '#' + nodeMaxGrad,
        animate: false
    },
    cise: {
        name: 'cise',
        clusters: function(nodes) {
            return cr.nodes('.construct');
        }
    },
    ciseBubble: {
        name: 'cise',
        clusters: function(node) {
            return node.data('bag');
        }
    },
    circle: {
        name: 'circle',
        fit: true,
        padding: 30,
        boundingBox: undefined,
        avoidOverlap: true,
        radius: undefined,
        startAngle: 10 * Math.PI,
        counterclockwise: true,
        sort: undefined,
        animate: true,
        animationDuration: 500,
        ready: undefined,
        stop: undefined

    },
    colaS: {
        name: 'cola',
        fit: false,
        flow: 'tree'
    },
    cola: {
        name: 'cola',
        padding: layoutPadding,
        nodeSpacing: 12,
        edgeLengthVal: 45,
        animate: true,
        randomize: true,
        maxSimulationTime: maxLayoutDuration,
        boundingBox: { // to give cola more space to resolve initial overlaps
            x1: 0,
            y1: 0,
            x2: 10000,
            y2: 10000
        },
        edgeLength: function(e) {
            /*	let w = e.data('weight');

            	if( w == null ){
            	  w = 0.5;
            	}*/

            return 0.45;
        }
    },
    concentric: {
        name: 'concentric',
        concentric: function(node) {
            return node.degree();
        },
        levelWidth: function(node) { return '#' + nodeMaxGrad },
        // equidistant: 'true',
        minNodeSpacing: 1
    },
    concentricCentrality: {
        name: 'concentric',
        padding: layoutPadding,
        animate: false,
        animationDuration: maxLayoutDuration,
        concentric: concentric,
        levelWidth: levelWidth
    },
    concentricHierarchyCentrality: {
        name: 'concentric',
        padding: layoutPadding,
        animate: false,
        animationDuration: maxLayoutDuration,
        concentric: concentric,
        levelWidth: levelWidth,
        sweep: Math.PI * 2 / 3,
        clockwise: true,
        startAngle: Math.PI * 1 / 6
    },
    cose: {
        name: 'cose',
        animate: 'false' //Just show the end result
    },

    /**cose-bilkent: cose with better result but has higher costs */
    coseBilkent: {
        name: 'cose-bilkent',
        animate: 'false' //Just show the end result
    },
    coseBilkentDraft: {
        name: 'cose-bilkent',
        animate: 'false', //Just show the end result
        quality: 'draft'
    },

    coseBilkentProof: {
        name: 'cose-bilkent',
        animate: 'false', //Just show the end result
        quality: 'proof' //numIter: 2
    },

    coseE: {
        name: "cose",
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
    },
    customCise: {
        name: 'cise'
    },
    dagre: {
        name: 'dagre',
        padding: 30,
        animate: false,
        ranker: function(node) { return node.degree(); }
    },

    elk: {
        name: 'elk',
        animate: false
    },
    euler: {
        name: 'euler'
    },
    grid: {
        name: 'grid'
    },
    klay: {
        name: 'klay'
    },
    normal: {
        name: 'cose',
        //infinite: true,
        fit: false,
        animate: false
    },

    random: {
        name: 'random'
    },




    preset: {
        name: 'preset',
        /*
        positions: function(node) {
            return calucatePostionCircle(node.data('bag'))
        }*/
        positions: function(node) { //or make collection?
            if (node.hasClass('bag')) {
            //    console.log("node has class bag and his text is ", node.data('displayedText'))
                return calucatePostionCircle(node.data('bag'))
            }
        }
    },
};