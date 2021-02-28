# This work will show the visualization of the Treewidth by Cytoscape  

Online Link:

http://theorie.informatik.uni-bremen.de:3000/

## Example Files
Their are example files which can be used for this. You can find them in the directory "/example files"

## Important if you Clone this Repository
The folder paceAlgorithm is empty.
You need to add a pace algorithm by yourself or use my second repository that 
contains a fork of the PACE2017-TrackA with specific changes for a linux interface
and little changes on head spaces.    
https://github.com/Szadzik/PACE2017-TrackA   or use: git clone https://github.com/Szadzik/PACE2017-TrackA.git     

This changes were for a middle class computer and can also work for you.
Maybe or maybe not, you need to change the head space in the " tw-exact or tw-heuristic file in the PACE2017-TrackA ".

In contrast, if you want to use a different paceAlgorithm, you need to change the algorithm names in the files:
" tw-exact.js and tw-heuristic.js ", in the TreewidthVisualization folder.

## Manual start  
# 1. Start with Server 
install Node.js with npm. 
Go in directory  "/TreewidthVisualization" and start a terminal and run one time "node install".  
To start the apllication run "npm start" in terminal.  

This variant and the online link support the upload of 2 files (.gr and .td) as well as one file upload of the format .dgf, .txt and .gr.

# 2.Start without anything
Go in directory "/TreewidthVisualization/public" and start index.html in a web-browser.

This variant support only the upload of 2 files. One .gr and one .td are required, that the user created self with the PACE algorithm.

## Integrated PACE algorithm:
Pace2017-TrackA   

## Modules:
Node.js  
Cytoscape.js    
Zebra-Dialog.js  
wenk.css  
w3.css  

