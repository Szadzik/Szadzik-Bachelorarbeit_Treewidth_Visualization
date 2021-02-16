
class CytoscapeButtons{ //pan fit ..
    constructor() {}

    /**
     * Disable hide on the Tree(cr) or Graph(cy) window.
     * Remove the fullscreen of the previous only window and set to half.
     * @param {cr:String, cy:String} window cr = tree window, cy = graph window
     */
    static showWindow(window){
        if(window !== 'cy' && window !== 'cr'){
            console.error("showWindow was not cr or  cy ", window);
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
    
        console.log("was ist cy ", $('#cy-eye-show'))
        console.log("was ist cr ", $('#cr-eye-show'))
    }
 
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

    //////////////////////////////////////////////////// 
    // Graph 
    ///////////////////////////////////////////////////

    /**
     * Re-cast the last graph layout
     */
    static resetGraphLayout() {
        console.log("in reset graph layout");
        setGraphLayout(prevGraphLayoutName);
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
       handleTreeLayout('preset');
    }

    /**
     * Re-cast the last tree layout that was set.
     */
    static fullResetTreeLayout() {
        removeBubble();
        handleTreeLayout(prevTreeLayoutName);
    }

    
     /**
     * Change the layout of the tree by the value of 
     * the selected layout section.
     */
    static changeTreeLayout(){
        
        let layout =  $('#layout-cr').val();
        if(layout === prevTreeLayoutName)
            return;
    
        removeBubble();
        handleTreeLayout(layout);
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