/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Contains layouts for the tree.
 */
class TreeLayouts{
    constructor(){
        this.eulerSpace = 0;

        let maxLayoutDuration = 1500;
        let layoutPadding = 50;
        let concentric = function(node) {
            calculateCachedCentrality();
            return node.data('centrality');
        };

        /**
         * Use calculate centrality to calculate the level width.
         * @param {Nodes} nodes 
         */
        let levelWidth = function(nodes) {
            calculateCachedCentrality();
            let min = nodes.min(n => n.data('centrality')).value;
            let max = nodes.max(n => n.data('centrality')).value;
            return (max - min) / 5;
        };

        /**
         * Calculate centraility by node closeness
         */
        let calculateCachedCentrality = () => { //add property centrality
            let nodes = cr.nodes('.construct');
            if (nodes.length > 0 && nodes[0].data('centrality') == null) {
                let centrality = cr.elements().closenessCentralityNormalized();

                nodes.forEach(n => n.data('centrality', centrality.closeness(n)));
            }
        };
    
        this.layouts = {

            //IMPORTANT
            //Root won´t change value on call, 
            //so only the first setted value is root but this is wrong.
            //because of this, functions were declared that create a layout on call.
            breadthfirst: {
                name: 'breadthfirst',
                animate: false,
            },
            cise: {
                name: 'cise',
                clusters: function(node) {
                    //console.log("bag cise ", node.data('bag'))
                    let i = bagIds.indexOf(node.data('bag'))
                    //console.log("ist i in ids of bag ", i)
                    return node.data('bag');
                },
                animate: false,
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
            concentric: {
                name: 'concentric',
                concentric: function(node) {
                    return node.degree();
                },
                levelWidth: function(node) { return '#' + CytoscapeButtons.treePropertiesNode.bigBag.id() },
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
            concentricCentralityDegree: {
                name: 'concentric',
                padding: layoutPadding,
                animate: false,
                animationDuration: maxLayoutDuration,
                concentric: function(node){
                    return node.degree();
                },
                levelWidth: function(node){
                    return node.degree();
                }
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
            dagre2:{
                name: 'dagre',
                rankDir: 'BT',
                padding: 30,
                animate: false,
                ranker: function(node){
                    if(node.hasClass('bag')){}
                    else
                        return node.degree();
                }
            },
           
            dagre: {
                name: 'dagre',
                padding: 30,
                animate: false,
                //ranker: function(node) { return node.degree(); }
                ranker: function(node){
                    if(node.hasClass('bag')){}
                    else
                        return node.degree();
                }
            },
            euler: {
                name: 'euler',
                animate: false,
                springCoeff: edge => 0.00003 - this.eulerSpace,
                
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
            preset: {
                name: 'preset',
                positions: function(node) { //or make collection?
                    if (node.hasClass('bag')) { //fastet if check with class
                        return calucatePostionCircle(node.data('bag'))
                    }
                }
            },
        };

    }
  
 
    /**
     * Set the euler space by the node size/volume
     */
    setEulerSpace(){
        this.eulerSpace = cr.nodes('.construct')[0].data('size')/10000000;
    }

    
    /**
     * Delete all edges and nodes until the maxDegree node is found.
     * Than restore all delted nodes and edges so that all elements
     * are the same but the first node of the collection is
     * the node with maxDegree for different layout builds.
     * 
     * THIS IS NOT INTEGRATED, But this works and could be integrated
     */
    constructByDegree(){
        let id = bagDegrees[bagDegrees.length-1].id;
        let edges = cr.edges().remove();
        let collection = new Array();
        let notId = true;
        let index = 0;
        cr.nodes().forEach(n=>console.log("node davor", n.id()))
        while(notId){
            let node = cr.nodes()[index]
            if(id !== node.id()){
                console.log("id ",  node.id())
                let remove = node.remove()
                //let remove = n.remove()
                console.log("was ist removed ", remove)
                collection.push( remove );
            }
            
            else notId = false;
        }
  
        collection.forEach(n => console.log("node in collection ",n.id()))
        collection.forEach(n => n.restore())
        cr.nodes().forEach(n=>console.log("node nach add ", n.id()))
        edges.restore();
    }

    /**
     * Returns the Breathfirst layout with maxDegree as root
     */
    breadthfirstMaxDegree(){
        let options = {
            name: 'breadthfirst',
            roots: '#'+bagDegrees[bagDegrees.length-1].id
          };
          return  cr.makeLayout(options); //on construct does not work
    }

    /**
     * Returns the Breathfirst layout with the biggestBag as root
     */
    breadthfirstBiggestBag(){
        let options = {
            name: 'breadthfirst',
            roots: '#'+ CytoscapeButtons.treePropertiesNode.bigBag.id()
        }
        return cr.makeLayout(options); //on construct does not work
    }
    
}