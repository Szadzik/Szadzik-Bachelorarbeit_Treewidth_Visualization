
 var map = new Map();
 
 //document.getElementById('file').onchange = function(){
 
   var file = this.files[0];
   var reader = new FileReader();
 
   reader.onerror = function(event) {
     alert("Failed to read file!\n\n" + reader.error);
     reader.abort(); 
   };
   
   reader.onload = function(progressEvent){
     if(checkNewFileExtension(file) == -1){
         return;
     }
     
     var lines = this.result.split('\n'); //put each line of file in list @list
     
     for(var line = 1; line < lines.length; line++){ //for each line put each element in list @setNodes
          var temp = lines[line].split(/\s+/); 
          if(!setNodes.includes(temp[0])){
             setNodes.push(temp[0]);
      }
      if(!setNodes.includes(temp[1])){
         setNodes.push(temp[1]);
      } 
 
      let values = map.get(temp[0]);
          if(values === undefined){
         //let z = new Array(temp[1]);
         map.set(temp[0], temp[1]);
      }else if( !values.includes(temp[1]) ){
         console.log("in includes");
         let z = values+temp[1];
         map.set(temp[0], z);
     
      }
             //for (var [key, value] of map.entries()) {
             //console.log(key + " = " + value);
             //}
     
        };
 

 // some time later...
 setTimeout(function(){
   layout.stop();
 }, 100);
 
   reader.readAsText(file);
  
 };
 
 /**
  * Gets a file and return his extension type
  * @param {file} file File
  * @return {String} extension
  */
 function getFileExtension(file){
      let fileName = file.name;
      let extension = fileName.substring(fileName.lastIndexOf('.')+1);
      console.log("extension is: ", extension, " from file ", fileName);
      return extension;
 }
 
 function checkNewFileExtension(file){
     let extension = getFileExtension(file);
     if( extension != 'dgf'){
         alert("Please choose a valid file format like .dgf if you load a NEW Graph." );
     } return -1;
 }

