## This work will show the visualization of the Treewidth with Cytoscape.js  

Online Link:

http://theorie.informatik.uni-bremen.de:3000/

### Example Files
Their are example files which can be used for this. You can find them in the directory "/example files"

## Important if you Clone this Repository
The folder paceAlgorithm is empty.
You need to add a pace algorithm by yourself or use my second repository that 
contains a fork of the PACE2017-TrackA with specific changes for a linux interface
and little changes on head spaces.    
``` https://github.com/Szadzik/PACE2017-TrackA  ```  
or use: ``` git clone https://github.com/Szadzik/PACE2017-TrackA  ``` 

So following folder structure follows: paceAlgorithm/Jdrasil/tw-exact   

This changes were for a middle class computer and can also work for you.

## Manual start  
### 1. Start with Server 
install Node.js with npm. 
Go in directory  "/TreewidthVisualization" and start a terminal and run one time "npm install".  
To start the apllication run "npm start" in terminal. Then insert "localhost:3000" in a browser.  

This variant and the online link support the upload of 2 files (.gr and .td) as well as one file upload of the format .dgf and .gr.

### 2.Start without anything
Go in directory "/TreewidthVisualization/public" and start index.html in a web-browser.

This variant support only the upload of 2 files. One .gr and one .td are required, that the user created self with the PACE algorithm.

#### Integrated PACE algorithm:
PACE2017-TrackA  

#### Modules:
Node.js + Express.js  
Cytoscape.js (and some extensions)
Zebra-Dialog.js/css    
wenk.css  
w3.css  
fontawesome.css

