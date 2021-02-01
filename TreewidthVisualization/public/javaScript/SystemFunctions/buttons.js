$("#resetBtn").click(() => {
        for (const graph of[klay, dagre]) {
            graph.remove('*');
            graph.add(data);
        }
        year = 2015;
        // Re-apply layout
        klay.layout(klayLayout).run();
        dagre.layout(dagreLayout).run();
    })
    //disable panning?
    //disable zoom?


$("#layout").change(function() {
    console.log("layout has change")
    layout = $("#layout").val();
    console.log(" type ", typeof(layout), " name of layout ", layout);
    if (layout == "nothing") {
        console.log("layout is nothing");
        return;
    }

    mapAngles();
    load = false;
    setLayout(layout, true);

});


window.onload = function() {


    $("#display-cy").click(function(evt) {
        console.log("eye-cy", evt.target);
        hide_cy();
        console.log("evt ", evt.target);
    });




}

$(document).ready(function() {


    var x = document.getElementById("cy-eye");
    x.addEventListener("click", myFunction, false);

    /*
    $('#cy-eye').click(function() {

        var n = (this).className;
        console.log("name of cy ", n, " und vy ");

        hideCytoscape('#cy-eye');
    })*/

});




function hideCytoscape(id) {
    var box = $(id);
    if (box.style.display === "block") {
        console.log("hide box of", id);
        box.style.display = "none";

    } else {
        console.log("show box of", id);
        box.style.display = "block";
    }
}
//TODO
function myFunction() {
    var x = document.getElementById("cy");
    if (x.style.display === "none") {
        console.log("in if");
        x.style.display = "block";
    } else {
        console.log("in else to hide");
        x.style.display = "none";

        var btn = document.createElement("button"); // Create a <button> element
        btn.innerHTML = "CLICK ME"; // Insert text
        btn.style.zIndex = 100;
        btn.style.position = "absolute"
        btn.style.height = "100px"
        btn.style.width = "100px"
        btn.style.backgroundColor = "red"
        $("#cr")[0].appendChild(btn);
        console.log("after append")
    }
}

/**
 * Set the Url of the attribute 'action' from the upload button
 * which definies, which method is going to be addressed on the server,
 * on upload.
 */
function setAlgorithmType() {
    let exactToggle = $("#exact-toggle");
    let heuristicToggle = $('#heuristic-toggle');

    if (exactToggle.hasClass('active') && heuristicToggle.hasClass('inactive')) {

        exactToggle[0].classList.replace("active", "inactive");
        heuristicToggle[0].classList.replace('inactive', 'active');

        exactToggle[0].firstElementChild.checked = false;
        heuristicToggle[0].firstElementChild.checked = true;

        $('#exact-text')[0].style.color = "gray";
        $('#heuristic-text')[0].style.color = "white";

    } else {

        exactToggle[0].classList.replace("inactive", "active");
        heuristicToggle[0].classList.replace('active', 'inactive');

        exactToggle[0].firstElementChild.checked = true;
        heuristicToggle[0].firstElementChild.checked = false;

        $('#exact-text')[0].style.color = "white";
        $('#heuristic-text')[0].style.color = "gray";
    }

}