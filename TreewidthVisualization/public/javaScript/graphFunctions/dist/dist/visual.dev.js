"use strict"; //var rView = document.getElementById("resetView");
//var rLayout = document.getElementById("resetLayout");
//"pan" to set view on specific point

function resetView() {
  console.log("resetView");
  cr.fit();
}
/**
 * Set the pre-standard layout 
 */


function resetLayout() {
  //call baginformation to set construct nodes and then cast preset
  console.log("resetLayout");
  cr.nodes('.construct').forEach(function (b) {
    b.position(mapBagInformation.get(b.id()).startPosition);
  });
  makeLayout('preset');
}

function setNodesToBagPosition() {
  console.log("set nodes to bag Position");
  setLayout('preset', false);
}

$('#resetView')[0].addEventListener('click', resetView, false);
$('#resetLayout')[0].addEventListener('click', resetLayout, false);