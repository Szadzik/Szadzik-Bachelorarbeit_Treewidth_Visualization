//TODO
const graphStyle = [{
    selector: 'node',
    style: {
        'shape': 'ellipse',
        'background-color': '#f1f1f1',
        'label': 'data(id)',
        'text-wrap': 'wrap',
        'text-halign': 'center',
        'text-valign': 'center',
        'text-wrap': 'wrap',
        'color': 'black',
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