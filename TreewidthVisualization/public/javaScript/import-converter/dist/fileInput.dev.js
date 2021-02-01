"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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


  _createClass(FileInput, null, [{
    key: "handleFileInput",
    value: function handleFileInput(evt) {
      var files = evt.target.files;
      if (files.length === 0) return;

      try {
        if (files.length > 2) {
          throw new Error('Please don´t select more then two  files.');
        } else if (files.length === 1) {
          console.log("in one files");
          var file = files[0];
          $('#output')[0].value = file.name;
          console.log("===", this.getFileExtension(file) === 'gr', " == ", console.log("extensionis ", this.getFileExtension(file)) == "gr");
          this.checkOneFile(file);

          if (this.getFileExtension(file) === 'txt') {//TODO
          }

          this.handleServerCommunication(files[0], this.setAlgorithmChoice()); //loadOneGraphFromFile();
        } else {
          console.log("in two files");
          $('#output')[0].value = files[0].name + ", " + files[1].name;
          console.log("DAVOR: this files ", this.files);
          console.log("DAVOR files ", files);
          this.checkTwoFiles(files);
          this.loadTwoGraphsFromFiles(evt);
        }
      } catch (err) {
        alertErr(err.message);
      }

      setSidebarProperties();
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
    value: function handleServerCommunication(file, choice) {
      console.log("in my function");
      console.log("choice is ", choice);
      var formData = new FormData();
      formData.append('uploaded_input', file);
      fetch(choice, {
        method: 'POST',
        body: formData
      }) // .then(res => console.log("res ", res))
      // .then(console.log("gesendet und for json response"))
      .then(function (response) {
        return response.text();
      }) //json = files, text=string
      .then(function (body) {
        console.log(body);
      })["catch"](function (error) {
        console.error(error);
      });
      console.log("has fetched"); //https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example#:~:text=Ajax%20file%20uploads&text=A%20JavaScript%20method%20must%20be,file%20upload%20was%20successful%3B%20and
      //https://attacomsian.com/blog/uploading-files-nodejs-express
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
     * Check the given file has one of the types [txt, gr, dgf].
     * If not then a error will occur.
     * @param {File} file File
     */

  }, {
    key: "checkOneFile",
    value: function checkOneFile(file) {
      var validExtensions = ['txt', 'gr', 'dgf'];
      var boolValid = validExtensions.includes(this.getFileExtension(file));
      console.log("file extension is ", this.getFileExtension(file));

      if (!boolValid) {
        var message = 'When you select one file, make sure that it is a ' + '<span style=color:red> ' + '.txt, .dgf or .gr. ' + '</span>' + 'file';
        throw new Error(message);
      }
    }
    /**
     * Draws the graph and tree from the files of the input event.
     * @param {Event} evt Upload event from user that contains two files
     */

  }, {
    key: "loadTwoGraphsFromFiles",
    value: function loadTwoGraphsFromFiles(evt) {
      var _this = this;

      var files = evt.target.files;
      console.log('in load twoGraphs from Files');

      var _loop = function _loop(i) {
        var reader = new FileReader();

        reader.onerror = function (event) {
          alertErr('Failed to read file!\n\n' + reader.error);
          reader.abort();
          return;
        };

        var extension = _this.getFileExtension(files[i]);

        reader.onload = function (event) {
          //text lines of the file
          var textLines = event.target.result.split('\n');

          if (extension === 'gr') {
            handleGraphCreation(textLines);
          } else {
            //.td
            handleTreeCreation(textLines);
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

document.addEventListener('DOMContentLoaded', function () {
  var $$ = function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  };

  (function (selector) {
    return document.querySelector(selector);
  });
});