/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Creates buttons functions for the html buttons to interact with cytoscape.
 */

 class CytoscapeButtons{ 
    constructor() {          
        this.treePropertiesNode;//contains nodes of maxDegree/minDegree/largestBag
    }

    /**
     * Set the properties maxDegree, minDegree and largestBag 
     * of the tree.
     */
    static setTreeBagProperties(){
        this.treePropertiesNode = {maxDegree: '', minDegree: '', bigBag: '', minBag: ''};
        //bigbag
        let id = sortedTotalBagSize[sortedTotalBagSize.length-1].id;
        cr.startBatch();
            let bag = cr.nodes('.construct').filter(`[id = "${id}"]`);
        cr.endBatch();
        this.treePropertiesNode.bigBag = bag;

        //minBag
        id = sortedTotalBagSize[0].id;
        cr.startBatch();
            bag = cr.nodes('.construct').filter(`[id = "${id}"]`);
        cr.endBatch();
        this.treePropertiesNode.minBag = bag;

        //maxDegree
        id = bagDegrees[bagDegrees.length-1].id;
        cr.startBatch();
            let mD = cr.nodes('.construct').filter(`[id = "${id}"]`);
        cr.endBatch();
        this.treePropertiesNode.maxDegree = mD;

        //minDegree
        id = bagDegrees[0].id;
        cr.startBatch();
            mD = cr.nodes('.construct').filter(`[id = "${id}"]`);
        cr.endBatch();
        this.treePropertiesNode.minDegree = mD;
    }

    /**
     * Change style of biggest Bag by his id.
     */
    static selectLargestBag(){
        let id = this.treePropertiesNode.bigBag.id();
        let bag = this.treePropertiesNode.bigBag;

        // avoid non-coloring if bags are the same
        if(id === this.treePropertiesNode.minDegree.id())
            bag.toggleClass('smallestDegree', false)
        else if( id === this.treePropertiesNode.maxDegree.id())
            bag.toggleClass('highestDegree', false);
        else 
            bag.toggleClass('smallestBag', false);

        bag.toggleClass('largestBag',true);
    }

    /**
     * Change style of smallest Bag by his id.
     */
    static selectSmallestBag(){
        let id = this.treePropertiesNode.minBag.id();
        let bag = this.treePropertiesNode.minBag;

         // avoid non-coloring if bags are the same
        if(id === this.treePropertiesNode.minDegree.id())
            bag.toggleClass('smallestDegree', false)
        else if(id === this.treePropertiesNode.maxDegree.id())
            bag.toggleClass('largestBag',false);
        else 
            bag.toggleClass('highestDegree',false);

        bag.toggleClass('smallestBag',true);
    }

    /**
     * Change style of bag with max degree by his id.
     */
    static selectMaxDegreeConstruct(){
        let id = this.treePropertiesNode.maxDegree.id();
        let mD = this.treePropertiesNode.maxDegree;

       // avoid non-coloring if bags are the same
        if(id === this.treePropertiesNode.bigBag.id())
            mD.toggleClass('largestBag', false);
        else if(id === this.treePropertiesNode.minDegree.id())
            mD.toggleClass('smallestDegree', false);
        else 
            mD.toggleClass('smallestBag', false);
        
        mD.toggleClass('highestDegree', true);
    }

    /**
     * Change style of bag with min degree by his id.
     */
    static selectMinDegreeConstruct(){
        let id = this.treePropertiesNode.minDegree.id();
        let mD = this.treePropertiesNode.minDegree;

       // avoid non-coloring if bags are the same
        if(id === this.treePropertiesNode.maxDegree.id())
            mD.toggleClass('highestDegree', false);
        else if(id === this.treePropertiesNode.bigBag.id())
            mD.toggleClass('largestBag', false);
        else 
            mD.toggleClass('smallestBag', false);

        mD.toggleClass('smallestDegree', true);
    }
    
    /////////////////////////////////////////////////////////
    
    /**
     * Disable hide on the Tree(cr) or Graph(cy) window.
     * Remove the fullscreen of the previous only window and set to half.
     * @param {cr:String, cy:String} window cr = tree window, cy = graph window
     */
    static showWindow(window){
        if(window !== 'cy' && window !== 'cr'){
            console.log("showWindow was not cr or  cy ", window);
            return;
        }
            
        if(window === 'cy'){
            $('#cy-eye-show').attr('hidden', true);
            $('#cy').show();
            $('#cr').removeClass('cytoscape-maxHeight');
            $('#cr').addClass('cytoscape-minHeight');
        }else{
            $('#cr-eye-show').attr('hidden', true);
            $('#cr').show();
            $('#cy').removeClass('cytoscape-maxHeight');
            $('#cy').addClass('cytoscape-minHeight');
        }
    }
 
    /**
     * Hide the Tree(cr) or Graph(cy) window based on the input.
     * If a window is already hidden, then a second hidden window is not allowed.
     * If a window is hidden, the other window will take the place for his window.
     * @param {cr:String, cy:String} window cr = tree window, cy = graph window
     */
    static hideWindow(window) {
        //if cy is selected and cr is not already hidden then hide cy
        if(window === 'cy' && $('#cr-eye-show').attr('hidden') ){
            $('#cy-eye-show').attr('hidden', false);
            $('#cy').hide();
            $('#cr').removeClass('cytoscape-minHeight');
            $('#cr').addClass('cytoscape-maxHeight');
    
        //if cr is selected and cy is not already hidden then hide cr
        }else if(window === 'cr' && $('#cy-eye-show').attr('hidden') ){
            $('#cr-eye-show').attr('hidden' ,false);
            $('#cr').hide();
            $('#cy').removeClass('cytoscape-minHeight');
            $('#cy').addClass('cytoscape-maxHeight');

        }
    }
 
     /////////////////////////////////////////////////////////

    /**
     * Set the Url of the attribute 'action' from the upload button
     * which definies, which method is going to be addressed on the server,
     * on upload.
     */
    static setAlgorithmType() {
        let exactToggle = $("#exact-toggle");
        let heuristicToggle = $('#heuristic-toggle');
    
        if (exactToggle.hasClass('active') && heuristicToggle.hasClass('inactive')) {
    
            exactToggle[0].classList.replace("active", "inactive");
            heuristicToggle[0].classList.replace('inactive', 'active');
    
            exactToggle[0].firstElementChild.checked = false;
            heuristicToggle[0].firstElementChild.checked = true;
    
            $('#exact-text')[0].style.color = "gray";
            $('#heuristic-text')[0].style.color = "white";
    
        } else {
    
            exactToggle[0].classList.replace("inactive", "active");
            heuristicToggle[0].classList.replace('active', 'inactive');
    
            exactToggle[0].firstElementChild.checked = true;
            heuristicToggle[0].firstElementChild.checked = false;
    
            $('#exact-text')[0].style.color = "white";
            $('#heuristic-text')[0].style.color = "gray";
        }
    }

     /////////////////////////////////////////////////////////
     
    /**
     * Reset the view of the cytoscape window cy or cr
     * @param {cr:String, cy:String} cytoscape cr = tree window, cy = graph window
     */
    static resetView(cytoscape) {
        if(cytoscape !== 'cr' && cytoscape !==  'cy'){
           // console.log("resetView was not cr or  cy ", cytoscape);
            return;
        }
           
        if(cytoscape === 'cr'){
            cr.fit();
        }else{
            cy.fit();
        }
    }

    //////////////////////////////////////////////////// 
    // Graph 
    ///////////////////////////////////////////////////

    /**
     * Re-cast the last graph layout.
     * This is for cytoscape window buttons
     */
    static resetGraphLayout() {
        setGraphLayout(prevGraphLayoutName);
        setLayoutTimeGraph();
    }

    /**
     * Change the layout of the graph by the value of 
     * the selected layout section.
     */
    static changeGraphLayout(){
        let layout =  $('#layout-cy').val();
        if(layout === prevGraphLayoutName)
            return;
    
        console.log("change layout of graph");
        setGraphLayout(layout);
        setLayoutTimeGraph();
    }

    ////////////////////////////////////////////////////
    // Tree
    ///////////////////////////////////////////////////

    /**
     * Changes the visibility on click to none or visible
     * of the span with id #recastOptions
     */
    static recastButtonOptions(){
        if($('#recastOptions')[0].style.display === 'none')
            $('#recastOptions')[0].style.display = 'inline-block'
        else 
            $('#recastOptions')[0].style.display = 'none';
    }

   /**
     * Set the pre-standard contruct postion  by
     * calling the @mapBagInformation to set construct nodes 
     * follwed by re-casting the preset layout 
     */
    static simpleNodeResetTreeLayout() {
       removeBubble();
       mapAngles() ;
       handleTreeLayout('preset', true);
    }

    /**
     * Re-cast the last tree layout that was set.
     * This is for cytoscape window buttons.
     */
    static fullResetTreeLayout() {
        removeBubble();
        handleTreeLayout(prevTreeLayoutName, false);
        setlayoutTimeTree();
    }

    
     /**
     * Change the layout of the tree by the value of 
     * the selected layout section.
     * Don´t recast if the layout is the same as before.
     */
    static changeTreeLayout(){
        
        let layout =  $('#layout-cr').val();
        if(layout === prevTreeLayoutName)
            return;
    
        removeBubble();
        handleTreeLayout(layout, false);
        //sidebar update layout clock
        setlayoutTimeTree();
    }

    /**
     * Changes the visibility on click to none or visible
     * of the span with id #bubbleOptions
     */
    static bubbleButtonOptions(){
        if($('#bubbleOptions')[0].style.display === 'none')
            $('#bubbleOptions')[0].style.display = 'inline-block'   
        else 
            $('#bubbleOptions')[0].style.display = 'none';
    }


    /**
     * Set the bubble layout from the tree to none.
     */
    static noneBubble(){
        if(this.switchBubble(0))
            removeBubble();
    }

    /**
     * Set the bubble layout from the tree only 
     * on the construct/bags.
     */
    static simpleBubble(){
        if(this.switchBubble(1)){
            removeBubble();
            drawConstructBubble();
        }
    }

    /**
     * Set the bubble layout from the tree 
     * on all elements.
     */
    static highBubble(){
   
        if(this.switchBubble(2)){
            removeBubble();
            drawFullBubble();
        }      
        
    }
       
    /**
     * Check if the selected button is already active. If yes then return false,
     * else change the button value to active and the rest inactive.
     * The style is changed via css.
     * @param {Number} index Which index is selected
     */
    static switchBubble(index){

        if($('#bubbleOptions')[0].children[index].value === 'active'){
            console.log("is already active")
            return false;
        }
           

        for(var i = 0; i <  $('#bubbleOptions')[0].children.length; i++){
            if(index === i){
                $('#bubbleOptions')[0].children[i].setAttribute('value', 'active')
                console.log("set index ",index, " and i ", i)
            } 
            else {
                $('#bubbleOptions')[0].children[i].setAttribute('value', 'inactive')
            }      
        }
        return true;
    }
}