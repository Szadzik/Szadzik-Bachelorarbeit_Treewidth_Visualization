
/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Contains layouts for the graph.
 */
class GraphLayouts{
    constructor(){
      
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
        let calculateCachedCentrality = () => {//add property centrality
            let nodes = cy.nodes();

            if (nodes.length > 0 && nodes[0].data('centrality') == null) {
                let centrality = cy.elements().closenessCentralityNormalized();

                nodes.forEach(n => n.data('centrality', centrality.closeness(n)));
            }
        };

        let  highestDegree = function(){
            console.log("in heigh degree")
            return graphDegrees[graphDegrees.length-1].id;
        }
 
    
        this.layouts = {
        
            breadthfirst: {
                name: 'breadthfirst',
                roots: highestDegree,
              //  roots: cy.nodes(`[id = "${highestDegree}"]`),
                animate: false
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
                //animate: true,
                animationDuration: 500,
                ready: undefined,
                stop: undefined
    
            },
            colaTree: {
                name: 'cola',
                flow: 'tree'
            },
            cola: {
                name: 'cola',
                padding: layoutPadding,
                nodeSpacing: 12,
                edgeLengthVal: 45,
                maxSimulationTime: maxLayoutDuration,
                boundingBox: { // to give cola more space to resolve initial overlaps
                    x1: 0,
                    y1: 0,
                    x2: 10000,
                    y2: 10000
                },
               
            },
            colaTree: {
                name: 'cola',
                flow: 'tree',
                
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
                padding:layoutPadding,
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
                quality: 'draft',
                animate: 'false' //Just show the end result,

            },

            coseBilkentProof: {
                name: 'cose-bilkent',
                quality: 'proof',
                animate: 'false' //Just show the end result,

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
                rankDir: 'BT',
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
            random: {
                name: 'random'
            },
        };

    }
  

    setEulerSpace(){
        eulerSpace = cr.nodes('.construct')[0].data('size')/10000000;
        console.log("size euler", cr.nodes('.construct')[0].data('size'), " und reuchung ", eulerSpace)
    }
    
}