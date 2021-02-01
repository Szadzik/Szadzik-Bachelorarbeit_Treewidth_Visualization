//TODO
var path;
var bb = cr.bubbleSets({ zIndex: -1 });

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
 * Draw the bubble on all nodes and edges
 */
function drawBubbleFull() {
    cr.ready(() => {

        const bb = cr.bubbleSets();

        console.log("BB ", bb.getPaths())

        bbPath = bb.addPath(cr.nodes(), cr.edges(), null, {
            style: {
                //   fill: 'rgba(255, 0, 0, 0)',
                stroke: "red",
                //  strokeDasharray: '5, 5, 5'
            }
        });
        console.log("BB after ", bb.getPaths())
        console.log(bbPath)
    });

}


function drawConstructBubble() {

    bb = cr.bubbleSets();

    console.log("BB ", bb.getPaths())

    path = bb.addPath(cr.nodes('.construct'), cr.edges(), null, {
        style: {
            stroke: "red",
        }
    });
    console.log("BB after ", bb.getPaths())
    console.log("path ", path)


}

function getBB() {
    // let n = cr.nodes('.construct')[0]; //take first node
    //n.map(d => d.scratch("_bb"))
    let n = cr.scratch('_bb');
    console.log("was ist cratch of n ", n)
}


/**
 * Remove the bubble from the construct graph
 */
function removeBubble() {
    bb.removePath(path);
    //  path.remove();
}


const bbStyle = {
    fillStyle: "steelblue"
};