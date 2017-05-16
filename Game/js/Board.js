//board constructor
function Board(game, columns, rows, tileSize, originX, originY, dialogue){
    //sprite constructor
    Phaser.Sprite.call(this, game, -200, -200, 'cubes');

    //reference to the cubes that set up our tile system essentially
    //set 2d array with dimensions rows x columns
    this.tiles = [rows];
    for(let r=0; r<rows; r++){
        this.tiles[r] = [columns];
    }

    // fill tiles with cubes
    var cube;
    for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
            //create cube
			cube = new Cube(game, 'cubes', (c * tileSize) + originX, (r * tileSize) + originY);
			game.add.existing(cube);
			//placeCube(c * 64, r * 64);
            // set the reference by dividing by the size of the cube
			this.tiles[r][c] = cube;
		}
	}

    // reference to dialogue system
    this.dialogue = dialogue;

    // the row and column we currently have highlighted
    this.currentRow = 0;
    this.currentColumn = 0;

    // the row and column of the circle we have selected, null otherwise
    this.selectedRow = null;
    this.selectedColumn = null;

    //get our input keys
    this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.l = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.r = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //this is weird, but essentially we are setting each key to call a function when pressed,
    //makes it so we don't have to worry about holding down the key
    this.spacebar.onDown.add(this.select, this);
    this.up.onDown.add(this.goUp, this);
    this.r.onDown.add(this.goRight, this);
    this.l.onDown.add(this.goLeft, this);
    this.down.onDown.add(this.goDown, this);

    //this makes the above part work
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
}

//set prototype and constructor
Board.prototype = Object.create(Phaser.Sprite.prototype);
Board.prototype.constructor = Board;

Board.prototype.update = function(){};

// called when we select a tile
Board.prototype.select = function(){
    //reference to the item on this tile, if there is one
    var temp = this.tiles[this.currentRow][this.currentColumn].item;
    //if we currently don't have an item selected
    if(this.selectedRow == null){
        //if the tile we are on does have an item
        if(temp != null){
            // make this item our selected item by storing the row and column it is on
            this.selectedRow = this.currentRow;
            this.selectedColumn = this.currentColumn;
            //set the item to active
            this.tiles[this.selectedRow][this.selectedColumn].item.activate();
        }
    //if we do have an item selected aka placing an item
    } else {
        //if the tile we are on does not have an item
        if(temp == null){
        	
            //Shows traits of the selected tile and its neighbors
            console.log("______________________");
            console.log("Placed Tile:");
           	//makes a temp var for the proposed object to move in
          	var proposed = this.tiles[this.selectedRow][this.selectedColumn].item;
          	proposed.showTraits();

          	let noConflicts = true;

            //Above
            if(this.currentRow != 0){
            	if(this.tiles[this.currentRow - 1][this.currentColumn].item != null){
            		console.log("Above Neighbor:");
            		// checks if there's a conflict of traits
            		let check = this.tiles[this.currentRow - 1][this.currentColumn].item.conflictCheck(proposed);
            		//if there's a conflict it makes it so the tile won't place and it console logs the error text which is stored in check[1]
            		if(check[0]){ 
            			noConflicts = false;
                        //display conflict text with UI
                        this.dialogue.addDialogue(proposed.name, this.tiles[this.currentRow - 1][this.currentColumn].item.conflictText[check[1]]);
            			console.log(this.tiles[this.currentRow - 1][this.currentColumn].item.conflictText[check[1]]);
            		}
          	  }
            }
            //Below
            if(this.currentRow != this.tiles.length-1){
	           	if(this.tiles[this.currentRow + 1][this.currentColumn].item != null){
	           		console.log("Below Neighbor:");
	           		// checks if there's a conflict of traits
            		let check = this.tiles[this.currentRow + 1][this.currentColumn].item.conflictCheck(proposed);
            		//if there's a conflict it makes it so the tile won't place and it console logs the error text which is stored in check[1]
            		if(check[0]){ 
            			noConflicts = false;
                        //display conflict text with UI
                        this.dialogue.addDialogue(proposed.name, this.tiles[this.currentRow + 1][this.currentColumn].item.conflictText[check[1]]);
            			console.log(this.tiles[this.currentRow + 1][this.currentColumn].item.conflictText[check[1]]);
            		}
	          		
	       	  	}
            }
            //Left
            if(this.currentColumn != 0){
            	if(this.tiles[this.currentRow][this.currentColumn - 1].item != null){
            		console.log("Left Neighbor:");
            		// checks if there's a conflict of traits
            		let check = this.tiles[this.currentRow][this.currentColumn - 1].item.conflictCheck(proposed);
            		//if there's a conflict it makes it so the tile won't place and it console logs the error text which is stored in check[1]
            		if(check[0]){ 
            			noConflicts = false;
                        //display conflict text with UI
                        this.dialogue.addDialogue(proposed.name, this.tiles[this.currentRow][this.currentColumn - 1].item.conflictText[check[1]]);
            			console.log(this.tiles[this.currentRow][this.currentColumn - 1].item.conflictText[check[1]]);
            		}
          	  }
            }
            //Right
            if(this.currentColumn != this.tiles[0].length - 1){
            	if(this.tiles[this.currentRow][this.currentColumn + 1].item != null){
            		console.log("Right Neighbor:");
            		// checks if there's a conflict of traits
            		let check = this.tiles[this.currentRow][this.currentColumn + 1].item.conflictCheck(proposed);
            		//if there's a conflict it makes it so the tile won't place and it console logs the error text which is stored in check[1]
            		if(check[0]){ 
            			noConflicts = false;
                        //display conflict text with UI
                        this.dialogue.addDialogue(proposed.name, this.tiles[this.currentRow][this.currentColumn + 1].item.conflictText[check[1]]);
            			console.log(this.tiles[this.currentRow][this.currentColumn + 1].item.conflictText[check[1]]);
            		}
          	  }
            }

            if(noConflicts){
	            //place our selected item on this tile
	            this.tiles[this.currentRow][this.currentColumn].place( this.tiles[this.selectedRow][this.selectedColumn].grab() );
	            //set the item we placed to no longer active
	            this.tiles[this.currentRow][this.currentColumn].item.activate();

	            //set references to our selected item to null
	            this.selectedRow = null;
	            this.selectedColumn = null;
	            if(this.checkTiles()){
	                game.state.start("WinScreen");
	            }
      		}
        } else {
            //this means we tired to place our selected item on a tile that already has an item
            console.log("thing here");
        }
    }
}

//take in a2d array that oultines the colors of our board
Board.prototype.setTiles = function(outline){
    //cycle through all of our tiles and the indicies of the input array
    if(outline.length != this.tiles.length || outline[0].length != this.tiles[0].length){
        console.log("argument for setTiles() has different dimension than board");
    } else {
        for(let r=0; r<this.tiles.length; r++){
            for(let c=0; c<this.tiles[0].length; c++){
                //if the input array has a 0 at this location set the corresponding tile to red
                if(outline[r][c] == 0){
                    this.tiles[r][c].charge();
                }
            }
        }

        //set our cursor to the origin with no item selected
        this.currentRow = 0;
        this.currentColumn = 0;
        this.selectedRow = null;
        this.selectedColumn = null;
        this.tiles[0][0].activate();
    }
}

// go through every tile and check and see if any of themare red but also have an item on them at the end of the timer
Board.prototype.checkTiles = function(){
    for(let r=0; r<this.tiles.length; r++){
		for(let c=0; c<this.tiles[0].length; c++){
            // if this tile is red but has an item return false
			if(this.tiles[r][c].charged && this.tiles[r][c].item != null){
                return false;
            }
		}
	}
    // if no tiles are red and have an item on them, return true
    return true;
}

//these functions are mapped to keyboard presses and change our currently highlighted tile by changing our currently highlighted row and column
Board.prototype.goLeft = function(){
    this.tiles[this.currentRow][this.currentColumn ].activate();
    this.currentColumn --;
    if(this.currentColumn  <0){
        this.currentColumn  = 0;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate();
}

Board.prototype.goDown = function(){
    this.tiles[this.currentRow][this.currentColumn ].activate();
    this.currentRow++;
    if(this.currentRow >= this.tiles.length){
        this.currentRow = this.tiles.length-1;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate();
}

Board.prototype.goUp = function(){
    this.tiles[this.currentRow][this.currentColumn ].activate();
    this.currentRow--;
    if(this.currentRow <0){
        this.currentRow = 0;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate();
}

Board.prototype.goRight = function(){
    this.tiles[this.currentRow][this.currentColumn ].activate();
    this.currentColumn ++;
    if(this.currentColumn  >= this.tiles[0].length){
        this.currentColumn  = this.tiles[0].length-1;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate();
}