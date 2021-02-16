//https://www.sitepoint.com/14-jquery-modal-dialog-boxes/
//no html hidden function, only call function

spinner =""; //The Zebra_Dialog element from loadSping()

/**
 * Empty gray body, that is blocking user interaction.
 * Text message of body = "Loading..." 
 */
function loadSpin(){ 
    return new $.Zebra_Dialog( {
        title: "Loading...",
        type: false,
        backdrop_close: false,
        buttons: false,
        custom_class: 'spin',
        show_close_button: false,
        keyboard: false,
    });
} 

var alertWidth = 500;

/**
 * Alert box for error
 */
function alertErr(message) {
    new $.Zebra_Dialog(
        message, {
            type: "error",
            title: "Error",
            width: alertWidth
        });
}

/**
 * Remove all created elements of cr that got created before the error occured
 * @param {string} message 
 */
function alertErrBr(message) {
    new $.Zebra_Dialog(
        message, {
            type: "error",
            title: "Error",
            width: alertWidth,
            onClose: function(caption, error) {
                console.log("caption ", caption);
                console.log("error ", error);
                removeTree();
            }
        });
}

/**
 * Alert box for warnings.
 * @param {string} message 
 */
function alertWarning(message) {
    console.err("ALERT ERROR ",message);
    new $.Zebra_Dialog(
        message, {
            type: "warning",
            title: "Warning",
            width: alertWidth
        });

}

/**
 * Alert box for informations
 * @param {string} message 
 */
function alertInformation(message) {
    new $.Zebra_Dialog(
        message, {
            type: "information",
            title: "Information",
            width: alertWidth
        });
}

/**
 * Alert box with iframe content
 */
function alertIframe(link) {
    new $.Zebra_Dialog({
        type: false, // no icon
        custom_class: "iFrame", //remove default paddings
        source: {
            iframe: {
                src: link
            }
        },
        title: "Visualize external content",
        width: 800,
        height: 800
    });
}

/**
 * Alert box for dialogs
 */
function alertDialog(file) {
    new $.Zebra_Dialog({
        source: {
            inline: file
        },
        title: "Content loaded from an element on the page",
        width: 600
    });
}


/**
 * Alert box for dialogs style2
 */
function alertDialog2() {
    new $.Zebra_Dialog({
        source: {
            inline: $("#boxcontent").html()
        },
        title: "Content loaded from an element on the page",
        width: 600
    });
}
