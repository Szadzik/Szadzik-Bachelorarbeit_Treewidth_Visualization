"use strict";

var maxLayoutDuration = 1500;
var layoutPadding = 50;

var concentric = function concentric(node) {
  calculateCachedCentrality();
  return node.data('centrality');
};

var levelWidth = function levelWidth(nodes) {
  calculateCachedCentrality();
  var min = nodes.min(function (n) {
    return n.data('centrality');
  }).value;
  var max = nodes.max(function (n) {
    return n.data('centrality');
  }).value;
  return (max - min) / 5;
};

var calculateCachedCentrality = function calculateCachedCentrality() {
  var nodes = cy.nodes();

  if (nodes.length > 0 && nodes[0].data('centrality') == null) {
    var centrality = cy.elements().closenessCentralityNormalized();
    nodes.forEach(function (n) {
      return n.data('centrality', centrality.closeness(n));
    });
  }
};

var clusterList = [];

function makeClusters() {
  //bagIds
  var list = new Array();
  bagIds.forEach(function (b) {
    var l = new Array();
    list.push(l);
  });
  cr.nodes('.tree').forEach(function (n) {
    var index = bagIds.indexOf(n.data('bag')); // list[index].push(n.data('id'));

    list[index].push(n.id());
  });
  console.log("was ist arraylist ", list);
  return list;
} //let eulerSpace = 0;


var eulerSpace = 0;

function setEulerSpace() {
  eulerSpace = cr.nodes('.construct')[0].data('size') / 10000000;
  console.log("size euler", cr.nodes('.construct')[0].data('size'), " und reuchung ", eulerSpace);
}

var layouts = {
  breadthfirst: {
    name: 'breadthfirst',
    roots: cr.nodes("[id = \"".concat(root, "\"]")),
    animate: false
  },
  cise: {
    name: 'cise',
    clusters: function clusters(node) {
      console.log("bag cise ", node.data('bag'));
      var i = bagIds.indexOf(node.data('bag'));
      console.log("ist i in ids of bag ", i);
      return node.data('bag');
    },
    animate: false,
    ready: function ready() {
      console.log("cise is ready");
    },
    // on layoutready
    stop: function stop() {
      console.log("cise has stop");
    } // on layoutstop

  },
  ciseBubble: {
    name: 'cise',
    clusters: clusterList
  },
  ciseConstruct: {
    name: 'cise',
    clusters: function clusters(node) {
      if (node.hasClass('construct')) {
        console.log("node cise is construct with ", node.id());
        return node.id();
      }
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
    flow: 'tree'
  },
  cola: {
    name: 'cola',
    padding: layoutPadding,
    nodeSpacing: 12,
    edgeLengthVal: 45,
    maxSimulationTime: maxLayoutDuration,
    boundingBox: {
      // to give cola more space to resolve initial overlaps
      x1: 0,
      y1: 0,
      x2: 10000,
      y2: 10000
    },
    edgeLength: function edgeLength(e) {
      return eulerSpace * 1000000 * 2;
    }
  },
  concentric: {
    name: 'concentric',
    concentric: function concentric(node) {
      return node.degree();
    },
    levelWidth: function levelWidth(node) {
      return '#' + root;
    },
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
    minTemp: 1.0,
    animate: false
  },
  dagre: {
    name: 'dagre',
    padding: 30,
    animate: false,
    ranker: function ranker(node) {
      return node.degree();
    }
    /*ranker: function(node){
        if(node.hasClass('bag')){}
        else
            return node.degree();
    }*/

  },
  //https://www.eclipse.org/elk/reference.html
  elk: {
    name: 'elk',
    animate: false
  },
  elkMrTree: {
    name: 'elk',
    algorithm: 'mrtree'
  },
  elkDisco: {
    name: 'elk',
    algorithm: 'disco',
    componentLayoutAlgorithm: 'stress',
    type: 'UNDIRECTED'
  },
  elkForce: {
    name: 'elk',
    algorithm: 'force'
  },
  elkStress: {
    name: 'elk',
    algorithm: 'stress'
  },
  euler: {
    name: 'euler',
    animate: false,
    springCoeff: function springCoeff(edge) {
      return 0.00008 - eulerSpace;
    }
  },
  fcose: {
    name: 'fcose',
    animate: false
  },
  grid: {
    name: 'grid'
  },
  klay: {
    name: 'klay'
  },
  klayAuto: {
    name: 'klay',
    algorithm: 'de.cau.css.kieler.klay.layered',
    spacing: 10,
    layoutHierarchy: true,
    intCoordinates: true,
    direction: 'DOWN',
    edgeRouting: 'ORTHOGONAL'
  },
  random: {
    name: 'random'
  },
  preset: {
    name: 'preset',
    positions: function positions(node) {
      //or make collection?
      console.log("PRESET LAYOUT"); //if(node.data('bag') !== undefined){

      if (node.hasClass('bag')) {
        //fastet if check with class
        //    console.log("node has class bag and his text is ", node.data('displayedText'))
        return calucatePostionCircle(node.data('bag'));
      }
    }
  }
};