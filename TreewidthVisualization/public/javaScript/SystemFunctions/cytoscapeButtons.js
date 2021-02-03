
class CytoscapeButtons{ //pan fit ..
    constructor() {}

    /**
     * Reset the view of the cytoscape window cy or cr
     * @param {cr:String, cy:String} cytoscape cr = tree window, cy = graph window
     */
    static resetView(cytoscape) {
        if(cytoscape !== 'cr' && cytoscape !==  'cy'){
            console.error("resetView was not cr or  cy ", cytoscape);
            return;
        }
           
        if(cytoscape === 'cr'){
            cr.fit();
        }else{
            cy.fit();
        }
    }

    /**
     * Re-cast the last graph layout
     */
    static resetGraphLayout() {
        console.log("in reset graph layout");
        setGraphLayout(prevGraphLayoutName);
    }


    /**
     * Set the pre-standard contruct postion  by
     * calling the @mapBagInformation to set construct nodes 
     * follwed by re-casting the preset layout 
     */
    static simpleResetTreeLayout() {
        console.log("in reset tree Layout");
        cr.nodes('.construct').forEach(b => {
            b.position(mapBagInformation.get(b.id()).startPosition)
        });

        setTreeLayout('preset');
    }

    /**
     * Re-cast the last tree layout that was set.
     */
    static fullResetTreeLayout() {
        removeBubble();
        console.log("in standard layout of tree");
        handleTreeLayout(prevTreeLayoutName);
    }

}