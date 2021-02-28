/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Creates the cytoscape <cr> tree and all the styles
 * that were defined for it.
 */

const treeStyle = [{
        selector: 'node',
        style: {
            'shape': 'ellipse',
            'label': 'data(id)',
            'text-wrap': 'wrap',
            'text-halign': 'center',
            'text-valign': 'center',
            'text-wrap': 'wrap',
            'color': 'white',
            'text-outline-color': 'black',
            'text-outline-width': 1
        }
    },

    /** Default style for edges between nodes */
    {
        selector: 'edge',
        style: {
            'curve-style': 'haystack',
            "opacity": 0.666,
        }
    },

    /** Default node stlye of the construct Graph */
    {
        selector: 'node.construct',
        style: {
            'background-color': 'pink',
            'z-compound-depth': 'bottom',
            'label': '',
            //'background-opacity':0
        }
    },

    /**Hides the edges of the construct Graph (adds class on preset layout) */
    {
        selector: 'edge.construct',
        style: {
            'display': 'none'
        }
    },


    /** Change the color of a selected node (on mouse click) */
    {
        selector: 'node:selected',
        style: {
            'border-width': 2,
            'border-color': 'black',
            'color': 'black'
        }
    },

    /** Change the color of a selected node (on mouse click) */
    {
        selector: 'edge:selected',
        style: {
            'width': 10,
            'opacity':1,
        }
    },

    /**Default edge style of the ColorGraph/tree
     * Each edge has his custom color
     */
    {
        selector: 'edge.tree',
        style: {
            'z-index': 110,
            'line-color': 'data(color)',
        }
    },
    /** Default node stlye of the ColorGraph/tree.
     * Each node has his custom color */
    {
        selector: 'node.tree',

        style: {
            'label': 'data(displayedText)',
            'z-index': 111,
            'z-compound-depth:': 'top',
            'background-color': 'data(color)',
            'border-style': 'solid', //TODO maybe standard?
            'border-width': 0.5,
            'border-color': 'black',
        }
    },


    /** If this element is nor part of the same displayedText of the selected node, 
     * then he will displayed in non-trivial grey with light opacity  
     * (adds class on tap) */
    {
        selector: '.notTarget',
        style: {
            'background-color': 'grey',
          //  'line-color': 'grey',
          //  'opacity': 20, //background oppacity?

            'background-opacity': 0.5,
            'opacity': 0.5,
        }
    }, {
        selector: 'edge.notTarget',
        style: {
            'display': 'none'
        }
    },
    /** Style of node with the highest connection grad of edges */
    {
        selector: '.highestDegree',
        style: {
            'background-color': 'blue',
            'border-color': 'blue'
        }
    },

    /** Style of node with the smallest connection grad of edges */
    {
        selector: '.smallestDegree',
        style: {
            'background-color': 'yellow',
            'border-color': 'yellow'
        }
    },

    /** Style of node from the biggest bag (adds class on selection) */
    {
        selector: '.biggestBag',
        style: {
            'background-color': 'red',
            'border-color': 'red'
        }
    },
    {
        selector: '.smallestBag',
        style: {
            'background-color': 'orange',
            'border-color': 'orange'
        }
    }
];

const cr = window.cr = cytoscape({
    container: $('#cr'),
    style: treeStyle
});