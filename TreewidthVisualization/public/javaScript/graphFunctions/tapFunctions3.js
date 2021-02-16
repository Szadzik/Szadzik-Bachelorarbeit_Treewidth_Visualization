//////////////////////////////////////////////////////////////////////////////////
//// Tree
//////////////////////////////////////////////////////////////////////////////////

var startShiftCy = false;
var startShiftCr = false;
var startShiftBags = false;

/**
 * Change style og bag in select. Visual bag and his nodes, 
 * rest content is grayscale.
 */
cr.on('tap', 'node.construct', function(evt) {
    $('#badge-node').html(evt.target.data('displayedText'));
    $('#badge-id').html(evt.target.id());
    let id = evt.target.id();
    if(evt.originalEvent.shiftKey){ //ON Shift: allow plurality
        if(!startShiftBags){
            resetShifts();
            startShiftBags = true;
        }
        cr.startBatch();
            cr.nodes('.construct').filter(`[id = "${id}"]`).toggleClass('notTarget', true);
        cr.endBatch();

    }else{ //no shift, only one bag is selected
        falseShifts();
        cr.startBatch();
            cr.elements('.notTarget').toggleClass('notTarget', false);
            cr.nodes('.tree').filter(`[bag != "${id}"]`).toggleClass('notTarget', true);
            cr.edges(`[bag != "${id}"]`).toggleClass('notTarget', true);
            cr.nodes('.construct').filter(`[id != "${id}"]`).toggleClass('notTarget', true);
        cr.endBatch();
        
    }   
        //cr.animate('queue', false); //cast animate to push element on top view by render
        
});


/**
 * Visual selected node and all the nodes with the same displayedText
 */
cr.on('tap', 'node.tree', function(evt) {

    let text = evt.target.data('displayedText');
    $('#badge-node').html(text);
    $('#badge-id').html(evt.target.id());

    cr.startBatch();
        cr.elements('.notTarget').toggleClass('notTarget', false);
        cr.nodes('.tree').filter(`[displayedText != "${text}"]`).toggleClass('notTarget', true);
        cr.edges('.tree').filter(`[nodeGroup != "${text}"]`).toggleClass('notTarget', true);
    cr.endBatch();

    cy.startBatch();
        cy.nodes(`[id = "${text}"]`).toggleClass('');
    cy.endBatch();
})

/**
 * Reset the click functions from tree and graph. Set standard by clicking on the empty field.
 */
cr.on('tap', function(evt) {
    if (evt.target === cr) {
        falseShifts
        cr.startBatch();
            cr.elements('.notTarget').toggleClass('notTarget', false);
            // cr.animate('queue', false);
        cr.endBatch();

        cy.startBatch();
            cy.elements().toggleClass('notTarget', false);
        cy.endBatch();
    }
})



//////////////////////////////////////////////////////////////////////////////////
//// Graph
//////////////////////////////////////////////////////////////////////////////////

/**
 * Change style of selected node, rest content is grayscale.
 */
cy.on('tap', 'node', function(evt) {
    
    let text = evt.target.data('displayedText');
    $('#badge-node').html(text);
    $('#badge-id').html(evt.target.id());

    if(evt.originalEvent.shiftKey){ //ON Shift: allow plurality
        console.log("tap und shift gleichzeitig");

        if(!startShiftCy) { //empty all taps before shift
            console.log("set shift true")
            resetShifts();
            startShiftCy = true;
          //  startShiftCr = false;
          //  cy.elements().toggleClass('notTarget', true);
          //  cr.elements('.notTarget').toggleClass('notTarget', true);
        }
        
        cy.startBatch();
            cy.nodes(`[id = "${text}"]`).toggleClass('notTarget', false);
        cy.endBatch();

        cr.startBatch(); //tree dependencies
            //cr.elements('.notTarget').toggleClass('notTarget', false);
            cr.nodes('.tree').filter(`[displayedText = "${text}"]`).toggleClass('notTarget', false);
            cr.edges('.tree').filter(`[nodeGroup = "${text}"]`).toggleClass('notTarget', false);
        cr.endBatch();
    }
    else{ //single node allowed
        falseShifts();
        cr.startBatch();
            cr.elements('.notTarget').toggleClass('notTarget', false);
            cr.nodes('.tree').filter(`[displayedText != "${text}"]`).toggleClass('notTarget', true);
            cr.edges('.tree').filter(`[nodeGroup != "${text}"]`).toggleClass('notTarget', true);
        cr.endBatch();

        cy.startBatch();
            cy.elements().toggleClass('notTarget', true);
            cy.nodes(`[id = "${text}"]`).toggleClass('notTarget', false);
        cy.endBatch();
    }
    
})

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
        cr.startBatch(); //all gray
            cr.elements().toggleClass('notTarget', true);
        cr.endBatch();

        cy.startBatch();
            cy.elements().toggleClass('notTarget', true);
        cy.endBatch();
}

/**
 * Reset the click functions from tree and graph. Set standard by clicking on the empty field.
 */
cy.on('tap', function(evt) {
    if (evt.target === cy) {
        startShiftCr = false;
        startShiftCy = false;
        cr.startBatch();
            cr.elements('.notTarget').toggleClass('notTarget', false); //is not target, so go behind/gray.
        cr.endBatch();

        cy.startBatch();
            cy.elements().toggleClass('notTarget', false);
        cy.endBatch();
    }
})


/*
document.addEventListener('click', logKey);

function logKey(evt) {
    console.log(`The shift key is pressed: ${evt.shiftKey}`)

}*/