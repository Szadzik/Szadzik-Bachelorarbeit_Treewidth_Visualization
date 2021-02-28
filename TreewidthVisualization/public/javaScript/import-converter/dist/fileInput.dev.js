"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * This file handles the files input on upload and the server communication.
 */
var FileInput =
/*#__PURE__*/
function () {
  function FileInput() {
    _classCallCheck(this, FileInput);
  }
  /**
   * Is called if the upload button was pressed. 
   * It will check the number of files, names and the extensions.
   * When everything is valid, it will create and draw the graph and tree. 
   * @param {Event} evt Upload file event
   * @returns On failure or end
   */


  _createClass(FileInput, [{
    key: "handleFileInput",
    value: function handleFileInput(evt) {
      console.log("in file input ", evt);
      var files = evt[0].files;
      if (files.length === 0) return;
      var file = files[0];
      fileType = this.getFileExtension(file);

      try {
        if (files.length > 2) throw new Error('Please don´t select more then two  files.');
        spinner = loadSpin();
        console.log("after load dialog");

        if (files.length === 1) {
          console.log("in one files"); //let file = files[0];

          $('#output')[0].value = file.name;
          console.log("===", this.getFileExtension(file) === 'gr', " == ", console.log("extensionis ", this.getFileExtension(file)) == "gr");
          this.checkOneFile(file);
          this.handleServerCommunication(this.setAlgorithmChoice(), evt);
        } else {
          $('#output')[0].value = files[0].name + ", " + files[1].name;
          this.checkTwoFiles(files);
          this.loadGraphsFromFiles(evt);
        }
      } catch (err) {
        console.log("zebra dialog to dleete, ", $('.Zebra_Dialog'));
        spinner.close();
        alertErr(err.message);
      }
    }
    /**
     * The communicator between the server and user/client.
     * It get a file that is going to send to the server and 
     * the informazion choice, that defines the url of method 
     * from the server which is used for the communication.
     * @param {File} file A file of type [gr, td, dgf]
     * @param {String} choice tw_exact_terminal, tw_heuristic_terminal 
     *                  (tw_exact/heuristic_file is comming to maybe)
     */

  }, {
    key: "handleServerCommunication",
    value: function handleServerCommunication(choice, evt) {
      var _this = this;

      var file = evt[0].files[0];
      treeAlgoClock = new CLock();
      var formData = new FormData();
      formData.append('uploaded_input', file);
      fetch(choice, {
        method: 'POST',
        body: formData
      }).then(function (response) {
        return response.text();
      }) //json = files, text=string
      .then(function (body) {
        console.log(body);

        _this.loadGraphsFromFiles(evt);

        handleTreeCreation(body, true);
        return;
      })["catch"](function (error) {
        spinner.close();
        console.error(error);
      });
      console.log("after fetched");
    }
    /**
     * Check if two files are selected and 
     * one of them has the extension .td as well as .gr.
     * 
     * @param {File[]} files Some files
     */

  }, {
    key: "checkTwoFiles",
    value: function checkTwoFiles(files) {
      console.log("in check the two files");
      var boolGr = this.getFileExtension(files[0]) === 'gr' || this.getFileExtension(files[1]) === 'gr';
      var boolTd = this.getFileExtension(files[0]) === 'td' || this.getFileExtension(files[1]) === 'td';

      if (boolGr != boolTd) {
        throw new Error('When you select two files, make sure that the file extensions are: .gr and .td');
      }

      var boolName = this.getFileName(files[0]) === this.getFileName(files[1]);

      if (!boolName) {
        throw new Error('Please select a .gr and .td file with the same name, to ensure that they have the same context');
      }
    }
    /**
     * Check the given file has one of the types [gr, dgf].
     * If not then a error will occur.
     * @param {File} file File
     */

  }, {
    key: "checkOneFile",
    value: function checkOneFile(file) {
      var validExtensions = ['gr', 'dgf'];
      var boolValid = validExtensions.includes(this.getFileExtension(file));
      console.log("file extension is ", this.getFileExtension(file));

      if (!boolValid) {
        var message = 'When you select one file, make sure that it is a ' + '<span style=color:red> ' + '.dgf or .gr. ' + '</span>' + 'file';
        throw new Error(message);
      }
    }
    /**
     * Draws the graph and tree from the files of the input event.
     * @param {Event} evt Upload event from user that contains two files
     */

  }, {
    key: "loadGraphsFromFiles",
    value: function loadGraphsFromFiles(evt) {
      var _this2 = this;

      var files = evt[0].files;

      var _loop = function _loop(i) {
        var reader = new FileReader();

        reader.onerror = function (event) {
          alertErr('Failed to read file!\n\n' + reader.error);
          reader.abort();
          return;
        };

        var extension = _this2.getFileExtension(files[i]);

        reader.onload = function (event) {
          //text lines of the file
          var textLines = event.target.result.split('\n');

          if (extension !== 'gr') {
            handleTreeCreation(textLines);
          } else {
            //.td
            handleGraphCreation(textLines);
          }
        };

        reader.readAsText(files[i]);
      };

      for (var i = 0; i < files.length; i++) {
        _loop(i);
      }
    }
    /**
     * Set the attribute 'action' from the upload button to '/tw_exact_terminal' 
     * if the toggle is set on exact, else '/tw_heuristic_terminal'.
     * This is called, if one file was uploaded.
     */

  }, {
    key: "setAlgorithmChoice",
    value: function setAlgorithmChoice() {
      var isExact = $('#exact-toggle').hasClass('active') ? true : false;

      if (isExact) {
        $('#uploadFiles')[0].setAttribute('action', '/tw_exact_terminal');
        return '/tw_exact_terminal';
      } else {
        $('#uploadFiles')[0].setAttribute('action', '/tw_heuristic_terminal');
        return '/tw_heuristic_terminal';
      }
    }
    /**
     * Gets a file and return the name of the file without his extension and dot.
     * @param {File} file File
     * @returns{string} name of file 
     */

  }, {
    key: "getFileName",
    value: function getFileName(file) {
      var name = file.name.substring(0, file.name.lastIndexOf('.'));
      return name;
    }
    /**
     * Gets a file and return his extension type without dot.
     * @param {File} file File
     * @returns {String} extension
     */

  }, {
    key: "getFileExtension",
    value: function getFileExtension(file) {
      var extension = file.name.substring(file.name.lastIndexOf('.') + 1);
      return extension;
    }
  }]);

  return FileInput;
}();
/**
 * Add a eventlistener to the input button.
 */


document.addEventListener('DOMContentLoaded', function () {
  var $$ = function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  };

  (function (selector) {
    return document.querySelector(selector);
  });

  var fileInput = new FileInput();
  $('#files').change(function () {
    fileInput.handleFileInput($(this));
  });
});