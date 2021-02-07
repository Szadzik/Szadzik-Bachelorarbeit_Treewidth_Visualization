
class FileInput {
    constructor() {}

    /**
     * Is called if the upload button was pressed. 
     * It will check the number of files, names and the extensions.
     * When everything is valid, it will create and draw the graph and tree. 
     * @param {Event} evt Upload file event
     * @returns On failure or end
     */
    static handleFileInput(evt) {
        let files = evt.target.files; 
        if (files.length === 0)
            return;

        try {
            if (files.length > 2){
                throw new Error('Please don´t select more then two  files.'); 
            }else if (files.length === 1) {
                console.log("in one files")

                let file = files[0];
                $('#output')[0].value = file.name;
                console.log("===", this.getFileExtension(file) === 'gr', " == ", console.log("extensionis ", this.getFileExtension(file)) == "gr")

                this.#checkOneFile(file);
                if (this.getFileExtension(file) === 'txt') {
                    //TODO
                }
                let b = this.handleServerCommunication(files[0], this.#setAlgorithmChoice());
                console.log("was ist b: ",b)
                //loadOneGraphFromFile();

            } 
            else {
                
                $('#output')[0].value = files[0].name + ", " + files[1].name;
                this.#checkTwoFiles(files);
                this.#loadTwoGraphsFromFiles(evt);
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
static  handleServerCommunication(file, choice) {

        console.log("in my function");
        console.log("choice is ", choice);

        let formData = new FormData();
        formData.append('uploaded_input', file);

        let result = fetch(choice, {
                method: 'POST',
                body: formData
            })
            // .then(res => console.log("res ", res))
            // .then(console.log("gesendet und for json response"))
            .then(response => response.text()) //json = files, text=string
            .then(body => {
                console.log(body);
                return body;
               // this.#loadGraphsAfterCommunication(body);
            })

        .catch(error => {
            console.error(error)
        })
        console.log("after fetched");
        //https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example#:~:text=Ajax%20file%20uploads&text=A%20JavaScript%20method%20must%20be,file%20upload%20was%20successful%3B%20and
        //https://attacomsian.com/blog/uploading-files-nodejs-express
    }

    /**
     * Check if two files are selected and 
     * one of them has the extension .td as well as .gr.
     * 
     * @param {File[]} files Some files
     */
    static #checkTwoFiles(files) {
        console.log("in check the two files")
        let boolGr = this.getFileExtension(files[0]) === 'gr' || this.getFileExtension(files[1]) === 'gr';
        let boolTd = this.getFileExtension(files[0]) === 'td' || this.getFileExtension(files[1]) === 'td';

        if (boolGr != boolTd) {
            throw new Error('When you select two files, make sure that the file extensions are: .gr and .td');
        }

        let boolName = this.getFileName(files[0]) === this.getFileName(files[1]);
        if (!boolName) {
            throw new Error('Please select a .gr and .td file with the same name, to ensure that they have the same context')
        }
    }

    /**
     * Check the given file has one of the types [txt, gr, dgf].
     * If not then a error will occur.
     * @param {File} file File
     */
    static #checkOneFile(file) {
        const validExtensions = ['txt', 'gr', 'dgf'];
        let boolValid = validExtensions.includes(this.getFileExtension(file));
        console.log("file extension is ", this.getFileExtension(file))
        if (!boolValid) {
            let message = 'When you select one file, make sure that it is a ' +
                '<span style=color:red> ' + '.txt, .dgf or .gr. ' + '</span>' + 'file';
            throw new Error(message);
        }
    }

    /**
     * Draws the graph and tree from the files of the input event.
     * @param {Event} evt Upload event from user that contains two files
     */
    static #loadTwoGraphsFromFiles(evt) {
        let files = evt.target.files;
        //console.log('in load twoGraphs from Files');

        for (let i = 0; i < files.length; i++) {

            let reader = new FileReader();
        
            reader.onerror = function(event) {
                alertErr('Failed to read file!\n\n' + reader.error);
                reader.abort();
                return;
            };
            let extension =  this.getFileExtension(files[i])

            reader.onload = function(event) {
                //text lines of the file
                let textLines = event.target.result.split('\n');
               
                if(extension === 'gr'){
                    handleGraphCreation(textLines);
                }else{ //.td
                    handleTreeCreation(textLines); 
                }
            };
            reader.readAsText(files[i]);
        }
    }

    static #loadGraphsAfterCommunication(treeString) {
        console.log('loadGraphsAfterCommunication');
        
            //let extension =  this.getFileExtension(files[i])

            //reader.onload = function(event) {
                //text lines of the file
                
               // if(extension === 'gr'){
      //              let textLines = event.target.result.split('\n');
        //            console.log("was sind textlines")
          //          handleGraphCreation(textLines);
               // }else{ //.td
                    handleTreeCreation(treeString); 
               // }
//            };
    //        reader.readAsText(files[i]);
  //      
    }

    /**
     * Set the attribute 'action' from the upload button to '/tw_exact_terminal' 
     * if the toggle is set on exact, else '/tw_heuristic_terminal'.
     * This is called, if one file was uploaded.
     */
    static #setAlgorithmChoice() {
        let isExact = $('#exact-toggle').hasClass('active') ? true : false;

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
    static getFileName(file) {
        let name = file.name.substring(0, file.name.lastIndexOf('.'));
        return name;
    }

    /**
     * Gets a file and return his extension type without dot.
     * @param {File} file File
     * @returns {String} extension
     */
    static getFileExtension(file) {
        let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
        return extension;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let $$ = selector => Array.from(document.querySelectorAll(selector));
    selector => document.querySelector(selector);
});
