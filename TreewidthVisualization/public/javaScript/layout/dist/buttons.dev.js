"use strict";

$("#resetBtn").click(function () {
  for (var _i = 0, _arr = [klay, dagre]; _i < _arr.length; _i++) {
    var graph = _arr[_i];
    graph.remove('*');
    graph.add(data);
  }

  year = 2015; // Re-apply layout

  klay.layout(klayLayout).run();
  dagre.layout(dagreLayout).run();
}); //disable panning?
//disable zoom?