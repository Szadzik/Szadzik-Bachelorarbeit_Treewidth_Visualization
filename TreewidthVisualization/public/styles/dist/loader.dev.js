"use strict";

var load = false; //has layout finished?

function endLoad() {
  if (load) {
    document.getElementById("loader").style.display = "none";
  }
}

function startLoad() {}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
} //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_loader
//https://www.w3schools.com/howto/howto_css_loader.asp