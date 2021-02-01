var input = document.getElementById("searchNode");
input.addEventListener("keyup", function(event) {
    if (event.key === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});

//Todo autocomplete