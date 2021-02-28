/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Create the cytoscape <cy> graph all the defined styles.
 */
const graphStyle = [{
    selector: 'node',
    style: {
        'shape': 'ellipse',
        'label': 'data(id)',
        'text-wrap': 'wrap',
        'text-halign': 'center',
        'text-valign': 'center',
        'text-wrap': 'wrap',
        'color': 'white',
        'background-color': 'data(color)', //'background-color': '#f1f1f1',
        'border-style': 'solid', //TODO maybe standard?
        'border-width': 0.5,
        'border-color': 'black',
        'text-outline-color': 'black',
        'text-outline-width': 1
    }
},

/** Default style for edges between nodes */
{
    selector: 'edge',
    style: {
        'curve-style': 'haystack'
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

    /** If this element is nor part of the same displayedText of the selected vertice, 
     * then he will displayed in non-trivial grey with light opacity  
     * (adds class on tap) */
    {
        selector: '.notTarget',
        style: {
            'background-color': 'white',
            'background-opacity': 0.5, 
        }
    }, {
        selector: 'edge.notTarget',
        style: {
            'opacity': 0.5,
        }
    },
];


const cy = window.cy = cytoscape({
    container: $('#cy'),
    style: graphStyle
});