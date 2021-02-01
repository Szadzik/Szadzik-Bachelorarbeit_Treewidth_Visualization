"use strict";

//var rView = document.getElementById("resetView");
//var rLayout = document.getElementById("resetLayout");
//"pan" to set view on specific point
function resetView() {
  console.log("resetView");
  cr.fit();
}
/**
 * Set the pre-standard layout 
 */


function resetTreeLayout() {
  //call baginformation to set construct nodes and then cast preset
  console.log("resetLayout");
  cr.nodes('.construct').forEach(function (b) {
    b.position(mapBagInformation.get(b.id()).startPosition);
  });
  setTreeLayout('preset');
}

function standardTreeLayout() {
  console.log("in standard layout of tree");
  handleTreeLayout('customCise');
}

function lockView() {}

function unLockView() {}

$('#resetView')[0].addEventListener('click', resetView, false);
$('#resetLayout')[0].addEventListener('click', resetTreeLayout, false);