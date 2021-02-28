/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Create a bubble around the tree.
 */
var path; //path of bubblset
var bb = cr.bubbleSets({ zIndex: -1 }); //Bubbleset

function drawBubbles() {

    cr.ready(() => {

        const bb = cr.bubbleSets({
            interactive: true,
            zIndex: 100
        })

        //list of (bag-)Ids
        const bags = Array.from(new Set(cr.elements().map(el => el.data('bag'))))

        bags.forEach(bag => {
            const nodes = cr.nodes(`[bag = "${bag}"]`)
            const { node } = bb.addPath(nodes, null, null, {
                virtualEdges: true,
                style: {
                    fill: 'rgba(255, 0, 0, 0)',
                    stroke: 'black',
                    strokeDasharray: '5, 5, 5'
                }

            });
        });
    });


}

/**
 * Draw the bubble from he tree only on all nodes 
 * and edges. This makes the layout simple.
 */
function drawFullBubble() {
    cr.ready(() => {

        bb = cr.bubbleSets();

        console.log("BB ", bb.getPaths())

        path = bb.addPath(cr.nodes(), cr.edges(), null, {
            style: {
                //   fill: 'rgba(255, 0, 0, 0)',
                stroke: "red",
                //  strokeDasharray: '5, 5, 5'
            }
        });
        console.log("BB after ", bb.getPaths())
        console.log("path ", path)
    });

}

/**
 * Draw the bubble from he tree only on the construct nodes 
 * and edges. This makes the layout simple.
 */
function drawConstructBubble() {

    bb = cr.bubbleSets();

    //console.log("BB ", bb.getPaths())

    path = bb.addPath(cr.nodes('.construct'), cr.edges(), null, {
        style: {
            stroke: "red",
        }
    });
    //console.log("BB after ", bb.getPaths())


}

/**
 * Remove the bubble from the construct graph
 */
function removeBubble() {
    bb.removePath(path);
    //  path.remove();
}

/**
 * A different style for the bubbleset
 */
const bbStyle = {
    fillStyle: "steelblue"
};