/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Set the auto move rules for the bags (construct nodes).
 * If a bag gets moved by drag, all his containing nodes will be moved to.
 * @param {number} bagId id of bag (construct node)
 */
function autoMoveOptions(bagId) {
    //console.log("nodesmatch ", cr.$(`node.tree[bag = "${bagId}"]`), " an len ", cr.$(`node.tree[bag = "${bagId}"]`).length)
    //console.log("drag ", cr.$('node.construct' + `[id = "${bagId}"]`), " an len ", cr.$('node.construct' + `[id = "${bagId}"]`).length)
    cr.automove({
        nodesMatching: cr.$(`node.tree[bag = "${bagId}"]`), //specify nodes that should be automoved
        reposition: 'drag', //specify how a node's position should be updated
        dragWith: cr.$(`node.construct[id = "${bagId}"]`), //specify nodes that when dragged cause the matched nodes to move along,
        when: 'drag',
        meanIgnores: function(node) { return false; },
    });
}

/**
 * Set the @autoMoveOption on each bag (construct node)
 */
function setAutoMove() {
    cr.nodes('.construct').forEach(n => {
        autoMoveOptions(n.id());
    });
}