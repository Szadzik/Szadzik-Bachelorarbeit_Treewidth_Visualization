/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Set color by index.
 */
var colors = [ //change to hsl?
    '#FF3333', //red
    '#9933FF', //purple
    '#FF9933', //orange
    '#FFFF33', //yellow
    '#66CC00', //darkOlive
    '#FF3399', //rose
    '#3399FF', //blue
    '#33FF33', //green
    '#00CC66', //darkTurquoise
    '#CC00CC', //darkPink
    '#A0A0A0', //gray
    '#33FFFF', //cyan
    '#9999FF', //lightPurpleBlue,


    '#FF9999', //lightRed
    '#99CCFF', //lightBlue,
    '#6600CC', //darkPurple
    '#FFCC99', //lightorange
    '#FFFF99', //lightYellow
    '#CCFF99', //lightOlive
    '#00CC00', //darkGreen
    '#33FF99', //turquoise
    '#3333FF', //purpleBlue
    '#FF99FF', //lightPink,
    '#FF99CC', //lightRose
    '#E0E0E0', //lightGray
    '#99FFFF', //lightCyan


    '#CC0000', //darkRed
    '#0000CC', //darkPurpleBlue
    '#CC6600', //darkOrange
    '#CCCC00', //darkYellow
    '#99FF33', //olive
    '#99FFCC', //lightTurquoise
    '#FF33FF', //pink
    '#0066CC', //darkBlue
    '#CC99FF', //lightPurple
    '#CC0066', //darkRose
    '#606060', //darkGray
    '#00CCCC', //darkCyan
    '#99FF99', //lightGreen
];

function getColor(color) {
    return colors[color % colors.length];
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToRgb2(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}