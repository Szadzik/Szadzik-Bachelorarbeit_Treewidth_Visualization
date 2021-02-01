//unbind bind
/**
 * Visual bag and his nodes
 */
cr.on('tap', 'node.construct', function(evt) {

    document.getElementById('myBadge').innerHTML = evt.target.id();
    cr.startBatch();
    cr.elements('.notTarget').toggleClass('notTarget', false)

    let id = evt.target.id();
    cr.nodes('.tree').filter(`[bag != "${id}"]`).toggleClass('notTarget', true)
    cr.edges(`[bag != "${id}"]`).toggleClass('notTarget', true)
    cr.nodes('.construct').filter(`[id != "${id}"]`).toggleClass('notTarget', true)
        //cr.animate('queue', false); //cast animate to push element on top view by render
    cr.endBatch();
});


/**
 * Visual selected node and all the nodes with the same displayedText
 */
cr.on('tap', 'node.tree', function(evt) {
    document.getElementById('myBadge').innerHTML = evt.target.id();
    cr.startBatch();
    let text = evt.target.data('displayedText')
    cr.elements('.notTarget').toggleClass('notTarget', false)
    cr.nodes('.tree').filter(`[displayedText != "${text}"]`).toggleClass('notTarget', true)
    cr.edges('.tree').filter(`[nodeGroup != "${text}"]`).toggleClass('notTarget', true)
    cr.endBatch();
})

/**
 * reset the click functions and layout to standard by clicking on the empty field.
 */
cr.on('tap', function(evt) {
    if (evt.target === cr) {
        cr.startBatch();
        cr.elements('.notTarget').toggleClass('notTarget', false);
        // cr.animate('queue', false);
        cr.endBatch();
    }
})