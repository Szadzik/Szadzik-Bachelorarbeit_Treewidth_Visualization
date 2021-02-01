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


let layouts = {
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
    dagre: {
        name: 'dagre',
        padding: 30,
        animate: false,
        ranker: function(node) { return node.degree(); },
        rankDir: 'LR' //TODO
    },
    treeBreadthfirst: {
        name: 'breadthfirst',
        roots: '#' + nodeMaxGrad,
        animate: false
    },
    normal: {
        name: 'cose',
        //infinite: true,
        fit: false,
        animate: false
    },
    cose: {
        name: 'cose'
    },
    klay: {
        name: 'klay'
    },
    euler: {
        name: 'euler'
    },
    grid: {
        name: 'grid'
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
    coseBilkent: {
        name: 'cose-bilkent'
    },
    random: {
        name: 'random'
    },

    cise: {
        name: 'cise',
        clusters: function(node) {
            return node.data('bagId');
        }
    },
    ciseBubble: {
        name: 'cise',
        clusters: function(node) {
            return node.data('bag');
        }
    },
    elk: {
        name: 'elk',
        animate: false
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
    coseBilkent: {
        name: 'cose-bilkent'
    },
    preset: {
        name: 'preset',
        positions: function(node) {

            return calucatePostionCircle(node.data('bag'))

        }
    }

};

var radius = 40;
var circleUmference = 2 * Math.PI * radius;
var mapDistance = new Map(); //distance for each bag
var mapLength = new Map(); //maps how many elements has each bag
var startX = 0;
var prevX = 0;
var startY = 0;


function mapAngles() {
    bagIds.forEach(b => {
        var collect = cr.nodes().filter(function(ele) { //all nodes of group source
            return ele.data('bag') == b;
        });
        var distance = 360 / collect.length;

        mapDistance.set(b, distance);
        mapLength.set(b, collect.length);
    });
}

function calucatePostionCircle(bag) {
    console.log("was ist inkomming bag ", bag);

    var p = mapLength.get(bag);
    var r = mapDistance.get(bag);
    var x = startX + radius * Math.cos(p * r);
    var y = startY + radius * Math.sin(p * r);
    console.log("p is: ", p, " r is: ", r, " x is: ", x, " y is: ", y);
    console.log("map le davor ", mapLength.get(bag))
    mapLength.set(bag, mapLength.get(bag) - 1);
    console.log("map le danach ", mapLength.get(bag))

    if (prevX > 130 && startX < 130) {
        startY = (startY + 130) % 600;
    }

    if (mapLength.get(bag) == 0) {
        prevX = startX;
        startX = (startX + 130) % 600;
    }





    return {
        x: x,
        y: y
    };
}