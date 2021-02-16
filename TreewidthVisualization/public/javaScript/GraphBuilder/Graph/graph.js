//TODO
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

const defaultGraph = [

    { group: "nodes", data: { id: 't0', displayedText: '1' } },
    { group: "nodes", data: { id: 't1', displayedText: '1' } },
    { group: "nodes", data: { id: 't2', displayedText: '1' } },
    { group: "nodes", data: { id: 't3', displayedText: '2' } },
    { group: "nodes", data: { id: 't4', displayedText: '2' } },


    { group: "edges", data: { id: '01', source: 't0', target: 't1' } },
    { group: "edges", data: { id: '12', source: 't1', target: 't2' } },
    { group: "edges", data: { id: '34', source: 't3', target: 't4' } }

];

const cy = window.cy = cytoscape({
    container: $('#cy'),
    elements: defaultGraph,
    style: graphStyle
});