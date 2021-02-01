"use strict";

var alertWidth = 500;

function alertErr(message) {
  new $.Zebra_Dialog(message, {
    type: "error",
    title: "Error",
    width: alertWidth
  });
}
/**
 * Remove all created elements that got created before the error 
 * @param {string} message 
 */


function alertErrBr(message) {
  new $.Zebra_Dialog(message, {
    type: "error",
    title: "Error",
    width: alertWidth,
    onClose: function onClose(caption, error) {
      console.log("caption ", caption);
      console.log("error ", error);
      removeAll();
    }
  });
}

function alertWarning(message) {
  new $.Zebra_Dialog(message, {
    type: "warning",
    title: "Warning",
    width: alertWidth
  });
}

function alertInformation(message) {
  new $.Zebra_Dialog(message, {
    type: "information",
    title: "Information",
    width: alertWidth
  });
}

function alertInformationDialog(title, message) {
  new $.Zebra_Dialog({
    source: {
      inline: message
    },
    title: title,
    width: alertWidth
  });
}

function alertIframe(link) {
  new $.Zebra_Dialog({
    type: false,
    // no icon
    custom_class: "iFrame",
    //remove default paddings
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