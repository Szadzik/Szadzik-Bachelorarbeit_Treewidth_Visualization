/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This code has the tap functions of the cr and cy window from cytoscape.
 * If a node of cy is selected, the node dependencies in cy will show up too.
 * The same for the different direction from cr to cy.
 * It it possible to select more nodes or bags with shift pressed.
 */

var startShiftCy = false;
var startShiftCr = false;
var startShiftBags = false;

/**
 * Set all Shifts taps to false.
 */
function falseShifts(){
    startShiftCr = false;
    startShiftCy = false;
    startShiftBags = false;
}

/**
 * Reset the shift contents in Tree and Graph
 */
function resetShifts(){
        falseShifts();
        cy.startBatch();
            cy.nodes().toggleClass('notTarget', true);
        cy.endBatch();

        cr.startBatch(); //all gray
            cr.elements().toggleClass('notTarget', true);
        cr.endBatch();
}

//////////////////////////////////////////////////////////////////////////////////
//// Graph
//////////////////////////////////////////////////////////////////////////////////

/**
 * Visual selected node and all the nodes with the same displayedText in group.
 * If the node was selected with shift pressed, plurality nodes can be selected
 */
cy.on('tap', 'node', function(evt) {
    if(checkArea(evt))
            return
    let text = evt.target.data('displayedText');
    $('#badge-node').html(text);
    $('#badge-id').html(evt.target.id());

    if(evt.originalEvent.shiftKey){ //ON Shift: allow plurality
        if(!startShiftCy){
            resetShifts();
            startShiftCy = true;
        }
      
        cy.startBatch();
            cy.nodes(`[id = "${text}"]`).toggleClass('notTarget', false);
        cy.endBatch();

        cr.startBatch(); 
            cr.nodes('.construct').toggleClass('notTarget', false);
            cr.nodes('.tree').filter(`[displayedText = "${text}"]`).toggleClass('notTarget', false);
            cr.edges('.tree').filter(`[nodeGroup = "${text}"]`).toggleClass('notTarget', false);
        cr.endBatch();

    }
    else{ //single node allowed
        cy.startBatch();
            cy.elements().toggleClass('notTarget', true);
            cy.nodes(`[id = "${text}"]`).toggleClass('notTarget', false);
        cy.endBatch();
        
        cr.startBatch();
            cr.elements('.tree').toggleClass('notTarget', true);
            cr.nodes('.construct').toggleClass('notTarget', false);
            cr.nodes('.tree').filter(`[displayedText = "${text}"]`).toggleClass('notTarget', false);
            cr.edges('.tree').filter(`[nodeGroup = "${text}"]`).toggleClass('notTarget', false);
        cr.endBatch();
    }
    
})

/**
 * Reset the click functions from tree and graph. Set standard by clicking on the empty field.
 */
cy.on('tap', function(evt) {
    if(checkArea(evt))
            return
    if (evt.target === cy) {
        falseShifts();
        cy.startBatch();
            cy.nodes().toggleClass('notTarget', false);
        cy.endBatch();

        cr.startBatch();
            cr.elements().toggleClass('notTarget', false);
            cr.nodes('.construct').toggleClass('highestDegree', false);
            cr.nodes('.construct').toggleClass('biggestBag', false);
            cr.nodes('.construct').toggleClass('smallestDegree', false);
            cr.nodes('.construct').toggleClass('smallestBag', false);
        cr.endBatch();

    }
});

/////////////////////////////////////////////////////////////// 
// Tree 
///////////////////////////////////////////////////

/**
 * Change the style of the selected bag. 
 * It will visual the bag and his nodes, rest content is grayscale.
 */
cr.on('tap', 'node.construct', function(evt) {
    if(checkArea(evt))
            return
    $('#badge-node').html(evt.target.data('displayedText'));
    $('#badge-id').html(evt.target.id());
    let id = evt.target.id();
    let bagNodes = cr.nodes('.tree').filter(`[bag = "${id}"]`);
    let text = evt.target.data('id');

    if(evt.originalEvent.shiftKey){ //ON Shift: allow plurality
        //startShiftBags == false if first bag is selcted with shift.
        //startShiftBags == true if a node was selected before with shift
        if(startShiftCy){}
        else if(!startShiftBags){
            resetShifts();
            startShiftBags = true;
            console.log("tap und shift gleichzeitig");

            cr.startBatch()
                cr.nodes('.construct').toggleClass('notTarget', true);
            cr.endBatch();
        }
        cy.startBatch(); //show the nodes of tree in graph in color
            //visual all nodes from the bag in the graph
            bagNodes = bagNodes.map(m=> m.data('displayedText'));
            bagNodes.forEach(node =>{
                cy.nodes(`[id = "${node}"]`).toggleClass('notTarget', false);
            });
        cy.endBatch();

        cr.startBatch(); 
            cr.nodes('.construct').filter(`[id = "${text}"]`).toggleClass('notTarget', false);
            cr.nodes('.tree').filter(`[bag = "${text}"]`).toggleClass('notTarget', false);
        cr.endBatch();


    }else{ //no shift, only one bag is selected
        
        cy.startBatch(); //show the nodes of tree in graph in color
            cy.elements().toggleClass('notTarget', true);
            bagNodes = bagNodes.map(m=> m.data('displayedText'));
            bagNodes.forEach(node =>{
                cy.nodes(`[id = "${node}"]`).toggleClass('notTarget', false);
            });

        cy.endBatch();
        
        cr.startBatch();
            cr.elements().toggleClass('notTarget', true);
            cr.nodes('.construct').filter(`[id = "${text}"]`).toggleClass('notTarget', false);
            cr.nodes('.tree').filter(`[bag = "${text}"]`).toggleClass('notTarget', false);
        cr.endBatch();
        
    }   
        //cr.animate('queue', false); //cast animate to push element on top view by render
        
});

/**
 * Visual selected node and all the nodes with the same displayedText in group.
 * If the node was selected with shift pressed, plurality nodes can be selected
 */
cr.on('tap', 'node.tree', function(evt) {
    if(checkArea(evt))
        return
    let text = evt.target.data('displayedText');
    $('#badge-node').html(text);
    $('#badge-id').html(evt.target.id());

    if(evt.originalEvent.shiftKey){
        if(!startShiftCr ){//select nodes with sh
            console.log("shift gleichzeitig on node tree")
            resetShifts();
            startShiftCr = true;
            cr.startBatch(); 
                cr.nodes('.construct').toggleClass('notTarget', false);
            cr.endBatch();
        }
        
        cy.startBatch();
            cy.nodes(`[id = "${text}"]`).toggleClass('notTarget', false);
        cy.endBatch();

        cr.startBatch(); 
            cr.nodes('.tree').filter(`[displayedText = "${text}"]`).toggleClass('notTarget', false);
            cr.edges('.tree').filter(`[nodeGroup = "${text}"]`).toggleClass('notTarget', false);
        cr.endBatch();
    }
    else{//Visual the group content of the selcted node 
        cy.startBatch();
            cy.nodes().toggleClass('notTarget', true);
            cy.nodes(`[id = "${text}"]`).toggleClass('notTarget', false);
        cy.endBatch();

        cr.startBatch();
            cr.elements('.tree').toggleClass('notTarget', true);
            cr.nodes('.construct').toggleClass('notTarget', false);

            cr.nodes('.tree').filter(`[displayedText = "${text}"]`).toggleClass('notTarget', false);
            cr.edges('.tree').filter(`[nodeGroup = "${text}"]`).toggleClass('notTarget', false);
        cr.endBatch();
    }
    
})

/**
 * Reset the click functions from tree and graph. Set standard by clicking on the empty field.
 */
cr.on('tap', function(evt) {
    if(checkArea(evt))
            return
    if (evt.target === cr) {
       falseShifts();
        cr.startBatch();
            cr.elements().toggleClass('notTarget', false);
            cr.nodes('.construct').toggleClass('highestDegree', false);
            cr.nodes('.construct').toggleClass('biggestBag', false);
            cr.nodes('.construct').toggleClass('smallestDegree', false);
            cr.nodes('.construct').toggleClass('smallestBag', false);
        cr.endBatch();

        cy.startBatch();
            cy.elements().toggleClass('notTarget', false);
        cy.endBatch();

        disableExtendingButtons(evt);
        
    }
})

/**
 * Disable the view of extending buttons 
 * if tree field (cr) is clicked on which is 
 * not a extending button from layout or bubble
 * @param {Event} evt An event in cytoscape window
 */
function disableExtendingButtons(evt){
    let e = evt.originalEvent.target.localName;

    if(e !=='button' && e !== 'span' && e!== 'i'){
        $('#bubbleOptions')[0].style.display = 'none'; //disable buttons from bubble
        $('#recastOptions')[0].style.display = 'none'; //disable buttons from recast
    }
 
}

/**
 * Check if the selected are has a button
 * @param {Event} evt An event in cytoscape window
 * @returns true = is button/space/i area, else false
 */
function checkArea(evt){
    let e = evt.originalEvent.target.localName;
    if(e ==='button' || e === 'span' || e === 'i')
        return true;
}
