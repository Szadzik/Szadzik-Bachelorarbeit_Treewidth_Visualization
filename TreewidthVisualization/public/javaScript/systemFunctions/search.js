/**
 * @author Jeanette-Francine Szadzik <szadzik@uni-bremen.de>
 * Create the dynamic information content on search for the tree and graph.
 */
class Search{
    constructor(){}

    /**
     * Zoom to @node in the tree if isTree = true, else in the graph.
     * @param {Node} node a node of the graph or tree
     * @param {Boolean} isTree true = if node is from tree, false if from graph
     */
    static fit(node, isTree){
        if(isTree){
            cr.startBatch();
                cr.fit(node, 100); //define zoom 100 
                cr.elements().toggleClass('notTarget', true);
                cr.nodes(`[id = "${node.id()}"]`).toggleClass('notTarget', false);

                if(node.hasClass('construct'))//its a bag
                    cr.nodes('.tree').filter(`[bag = "${node.id()}"]`).toggleClass('notTarget', false);
                else //its a node
                    cr.nodes('.construct').toggleClass('notTarget', false);
                
            cr.endBatch();
        }
        else{
            cy.startBatch();
                cy.fit(node, 100); //define zoom 100
                cy.nodes().toggleClass('notTarget', true);
                cy.$('#'+node.id()).toggleClass('notTarget', false);
            cy.endBatch();
        }
    }
        
    /**
     * Remove the graph-search html element that was created by search
     */
    static removeGraphSearch(){
        $('#search-graphNode').remove();
    }

    /**
     * Remove the tree-search html elements that were created by search
     */
    static removeTreeSearch(){
        $('#search-treeContent').remove();
    }

    /**
     * Take the input/value from the search html of the graph
     * and create a table with content information a something was found.
     */
    static searchGraph(){
        let input = $('#graph-search')[0].value;
    
        if(input.length < 1){
            alertInformation("The input field is empty.")
            return;
        }
    
        let node = cy.nodes(`[id = "${input}"]`);
        if(node.length  === 0){
            alertErr("No vertice was found by the given input: " +input);
            return;
        }

        this.removeGraphSearch();
        let div = document.createElement('div');
        this.divContent(div, false);

        let close = this.closeButton(false);//add close button
        div.appendChild(close);

        this.createTitle(node, 'Vertice', div);
        let table = this.createNodeTableGraph(node);
        div.appendChild(table);
        $('#graph')[0].appendChild(div);

    }

    /**
     * Take the input/value from the search html of the tree
     * and create a table with content information if something were found.
     */
    static searchTree(){
        let input = $('#tree-search')[0].value;
    
        if(input.length < 1){
            alertInformation("The input field is empty.")
            return;
        }
        this.removeTreeSearch();
        let nodeId = cr.nodes('.tree').filter(`[id = "${input}"]`);
        let nodeDisplayedText = cr.nodes('.tree').filter(`[displayedText = "${input}"]`);
        let bag =cr.nodes('.construct').filter(`[id = "${input}"]`);

        let div = document.createElement('div');
        this.divContent(div, true);
        let close = this.closeButton(true);//add close button
        div.appendChild(close);
        //Create a table for bag, if bag was found by input. 
        //Try the same for node by id and nod by displayedText
        if(bag.length > 0){
            this.createTitle(bag, 'Bag', div);
            let table = this.createBagTable(bag);
            div.appendChild(table);
        }if(nodeId.length > 0){
            this.createTitle(nodeId, 'Node', div);
            let table = this.createNodeTableTree(nodeId);
            div.appendChild(table);
        }if(nodeDisplayedText.length > 0){
            this.createTitle(nodeDisplayedText, 'Node', div);
            let table = this.createNodeTableTree(nodeDisplayedText);
            div.appendChild(table);

        }if(nodeDisplayedText.length === 0 && bag.length === 0 && nodeId.length === 0){ //nothing found
            alertErr("No Bag or Node was found by the given input: " +input);
            return;
        }
        $('#tree')[0].appendChild(div);
    }
    
   /**
   * Set id by @isTree and style although with classes.
   * @param {Div} div a div html, which is going to be extended
   * @param {Boolean} isTree true if div is from tree, false if div from graph
   */
    static divContent(div, isTree){
        div.id = isTree? 'search-treeContent' : 'search-graphNode';
        div.classList.add('w3-container');
        div.classList.add('shadow-dark-gray');
        div.style.backgroundColor = '#485159';

    }

    /**
     * Create the title of a table
     * @param {Node} node Node
     * @param {String} message a String: "Vertice", "Node" or "Bag". 
     * @param {Div} div a div html, which is going to be extended
     */
    static createTitle(node, message, div){
        let title = document.createElement('p');
        title.innerHTML = 'Information about '+ message + ' ' + node.id()+':';
        title.style.cssText = ' margin-top: 1.2em';
        
        div.appendChild(title);
    }

    /**
     * Create a html table with specific values for a node of the graph.
     * Values: id, degree and alterative min/max degree.
     * @param {Node} node the searched node
     */
    static createNodeTableGraph(node){
        let table = document.createElement('table');
        table = this.createRowId(table, node, false);
        this.setTableStyle(table);
       
        let degree = node.neighborhood('node').length;
        let add ='';
        if(degree === graphDegrees[0]){
            add += '</br> Smallest Degree in Graph'
        }else if(degree === graphDegrees[graphDegrees.length -1]){
             add += '</br> Highest Degree in Graph'
        }

        table = this.createRow('Degree', degree+add, table);
        return table; 
    }

    /**
     * Set the stlye of a given table element
     * @param {Table} table html table
     */
    static setTableStyle(table){
        table.classList.add('w3-table');
        table.style.cssText = 'margin: 0 0 3.2em 0; table-layout: fixed'
    }

    /**
     * Create a html table with specific values for a bag of the tree.
     * Values: id, degree and alternative max/min/Degree, biggest bag
     * and mallest bag.
     * @param {Node} node the searched bag
     */
    static createBagTable(node){
        let table = document.createElement('table');
        this.setTableStyle(table);
        table = this.createRowId(table, node, true);
        let degree = node.neighborhood('node').length;
        let add ='';
        let properties = CytoscapeButtons.treePropertiesNode;
        if(degree === properties.minDegree.id())
            add += '</br> Smallest Degree Bag';
        if(degree === properties.maxDegree.id())
            add += '</br> Highest Degree Bag';
        if (node.id() === properties.minBag.id())
            add += '</br> Smallest Bag';
        if(node.id() === properties.bigBag.id())
            add += '</br> Biggest Bag';
        

        cr.startBatch();
            let nodes = cr.nodes('.tree').filter(`[bag = "${node.id()}"]`);
        cr.endBatch();
        console.log("nodes batch ", nodes, " in inner ")
        this.createRow('Degree', degree+add, table);

        let td = document.createElement('td');
        td = document.createElement('td');
        pTreeHTMLCell(td, nodes);
        this.createRowAppend('Nodes inside', td , table);

        this.createRow('Number of Nodes', mapBagInformation.get(node.id()).totalNumber, table);
        return table;
    }
    

 
    /**
     * Create a html table with specific values for a node of the tree.
     * Values: id, displayed nr., in bag, path size
     * @param {Node} node the searched node
     */
    static createNodeTableTree(node){
        cr.startBatch();
        let bags = cr.nodes('.tree').filter(`[displayedText = "${node.data('displayedText')}"]`).map(b => b.data('bag'));
        cr.endBatch();

        let pathSize = bags.length;
        let table = document.createElement('table');
        let color = colorNodeIcon(getColor( node.data('displayedText') ));

        this.setTableStyle(table);
        this.createRow('Color', color, table);
        //this.createRowId(table, node, true);
        this.createRow('Displayed Nr.', node.data('displayedText'), table);
        this.createRowBag(bags, table);
        this.createRow('Path size', pathSize, table);

        return table;
    }

    ////////////////////////////////////////////////////
    // Row
    ///////////////////////////////////////////////////

    /**
     * A row with 2 elements: first and cell.
     * Cell will be appended.
     * @param {String} first The first element of the row
     * @param {Td} cell A html table cell
     * @param {Table} table Table which is going to contain the row
     */
    static createRowAppend(first, cell, table){
        let row = document.createElement('tr');
        let td = document.createElement('td');

        td.innerHTML = first;
        row.appendChild(td);
        console.log("vor cell", cell)
        row.appendChild(cell);
        table.appendChild(row);
        return table;
    }
    /**
     * A row with 2 elements: first and second.
     * Second will be innerHTML.
     * @param {String} first The first element of the row
     * @param {String} second The second element of the row
     * @param {Table} table Table which is going to contain the row
     */
    static createRow(first, second, table){
        let row = document.createElement('tr');
        let td = document.createElement('td');
        let tdAnswer = document.createElement('td');

        td.innerHTML = first;
        tdAnswer.innerHTML = second;
        row.appendChild(td);
        row.appendChild(tdAnswer);
  
        table.appendChild(row);

        return table;
    }

      /**
     * This row is special for the categoy id.
     * So it look like: Id and node.id with fit function.
     * @param {Table} table Table which is going to contain the row
     * @param {Node} node Node that is represented and get a clickable interaction with fit.
     * @param {Boolean} isTree true = if node from tree, false = if node from graph
     */
    static createRowId(table, node, isTree){
        let row = document.createElement('tr');
        let td = document.createElement('td');
        let tdAnswer = document.createElement('td');

        td.innerHTML = 'Id';
        row.appendChild(td);
        
        let p = document.createElement('p');
        this.pFitStyle(p);
        p.innerHTML = node.id();
        p.addEventListener('click', function(){
            Search.fit(node, isTree);
        });
        tdAnswer.appendChild(p);
        row.appendChild(tdAnswer);
  
        table.appendChild(row);

        return table;
    }

    /**
     * A Special row for the bags from the tree.
     * With this, the displayed bags numbers a clickable for fit.
     * @param {Nodes} bags list of bags
     * @param {Table} table html table
     */
    static createRowBag(bags, table){
        let row = document.createElement('tr');
        let td = document.createElement('td');

        td.innerHTML = 'Displayed in Bags ';
        let tdAnswer = this.pElementsForFit(bags, true);
        row.appendChild(td);
        row.appendChild(tdAnswer);
        table.appendChild(row);
    }

    ////////////////////////////////////////////////////
    // p
    ///////////////////////////////////////////////////
    /**
     * Set the style of the html elment p for
     * clickable interactions. Color = blue and on hover white
     * with blue background.
     * @param {p} p 
     */
    static pFitStyle(p){
        p.style.cssText = ' margin:0; padding:0; display:inline-block;'
                        +' word-wrap: break-word; overflow-wrap: break-word;';
        p.classList.add('fitBag');
        p.classList.add('w3-text-cyan'); //or w3-text-light-blue
    }

    /**
     * Creates clickable p html elements
     * that fit to a node.
     * @param {Nodes} nodes list of nodes that should be fit
     * @param {Boolean} isTree true = if from tree, false = if from graph
     */
    static pElementsForFit(nodes, isTree){
        let td = document.createElement('td');
        let index = 0;
        nodes.forEach(b => {
            ++index;
            let p = document.createElement('p');
            this.pFitStyle(p);
  
            p.innerHTML = index === nodes.length ? b : b + ", ";
            p.addEventListener('click', function(){
                let n;
                if(!isTree){
                    cy.startBatch();
                    n = cy.nodes(`[id = "${b}"]`);
                    cy.endBatch();
                }
                else if(b.indexOf('.')){ //bag
                    cr.startBatch();
                    n = cr.nodes('.construct').filter(`[id = "${b}"]`);
                    cr.endBatch();
                }
                else {
                    cr.startBatch();
                    n = cr.nodes('.tree').filter(`[id = "${b}"]`);
                    cr.endBatch();
                }
                    
                Search.fit(n, isTree);
            });
            td.appendChild(p);      
        });
        return td;
    }

    ////////////////////////////////////////////////////
    // Buttons 
    ///////////////////////////////////////////////////

    /**
     * Create a close button that will delete
     *  all searched content from tree or graph
     * @param {Boolean} isTree true = if from tree, false if from graph
     */
    static closeButton(isTree){
        let btn = document.createElement('span');
        let icon = '<i class="fa fa-close " data-wenk="Close Search" data-wenk-pos="left"'
          +'style="color:red; margin-top: 0.5em; margin-bottom:-1em; right:0;'   
          + 'float:right; font-size:18px;"'
          +'></i>';
        btn.innerHTML = icon;
        btn.style.cssText = 'cursor: pointer';

        btn.addEventListener('click', function(){
            if(isTree)
                Search.removeTreeSearch();
            else Search.removeGraphSearch();
        });
        return btn;
    }

    /**
     * Create a clickable icon that fit/zoom to @node.
     * @param {Node} node a node of tree or graph. 
     * @param {Boolean} isTree true = tree, false = graph
     */
    static createZoomButton(node, isTree){
        let btn = document.createElement('span');
        let icon = '<i class="fa fa-map-marker " aria-hidden="true" ' +
                'style=";color: #2196F3;'   
                + 'font-size:16px';
               
        btn.innerHTML = icon;
        btn.classList.add("fit");
       
        btn.addEventListener('click',function(){
            this.fit(node, isTree);
        })

        return btn;
    }
}

