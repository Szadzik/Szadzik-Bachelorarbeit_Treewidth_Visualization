// https: //jqueryui.com/autocomplete/
$("#tags").autocomplete({
source: availableTags
});


  $("#autocomplete").autocomplete({
                source: cy.elements().id(),
                onSelect: function (suggestion) {
                    alert("You selected: " + suggestion.value + ", " + suggestion.data);
                }
            });
