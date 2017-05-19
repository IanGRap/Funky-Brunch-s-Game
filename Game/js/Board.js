//global vars
var startX;
var startY;

var upb;
var downb;
var rightb;
var leftb;

var textup = "";
var textdown = "";
var textleft = "";
var textright = "";

var styleup;
var styledown;
var styleleft;
var styleright;

var hide = false;
 
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

	//sets the global orgin point for use in bubbles
    startX = originX;
    startY = originY;



    // reference to dialogue system
    this.dialogue = dialogue;

    // the row and column we currently have highlighted
    this.currentRow = 0;
    this.currentColumn = 0;

    // the row and column of the circle we have selected, null otherwise
    this.selectedRow = null;
    this.selectedColumn = null;

    



    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
/*
    //this makes the above part work
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.UP);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.RIGHT);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.LEFT);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.DOWN);

    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.F);
    */
}

//set prototype and constructor
Board.prototype = Object.create(Phaser.Sprite.prototype);
Board.prototype.constructor = Board;

Board.prototype.update = function(){
	//get our input keys
    this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.l = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.r = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.upArrow = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downArrow = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.lArrow = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rArrow = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


    this.f = game.input.keyboard.addKey(Phaser.Keyboard.F);
    this.h = game.input.keyboard.addKey(Phaser.Keyboard.H);


    //this is weird, but essentially we are setting each key to call a function when pressed,
    //makes it so we don't have to worry about holding down the key

    //Checks if it needs to use a key press for hiding
    if(hide == true){

	    this.up.onDown.add(this.hidebubbles, this);
	    this.r.onDown.add(this.hidebubbles, this);
	    this.l.onDown.add(this.hidebubbles, this);
	    this.down.onDown.add(this.hidebubbles, this);
	    this.upArrow.onDown.add(this.hidebubbles, this);
	    this.rArrow.onDown.add(this.hidebubbles, this);
	    this.lArrow.onDown.add(this.hidebubbles, this);
	    this.downArrow.onDown.add(this.hidebubbles, this);
	}else if(hide == false){
		this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


	    this.spacebar.onDown.add(this.select, this);

	    this.up.onDown.add(this.goUp, this);
	    this.r.onDown.add(this.goRight, this);
	    this.l.onDown.add(this.goLeft, this);
	    this.down.onDown.add(this.goDown, this);
	    this.upArrow.onDown.add(this.goUp, this);
	    this.rArrow.onDown.add(this.goRight, this);
	    this.lArrow.onDown.add(this.goLeft, this);
	    this.downArrow.onDown.add(this.goDown, this);

	    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);


	}
		
		this.f.onDown.add(this.fullscreen, this);


};

// called when we select a tile
Board.prototype.select = function(){

	//Sets the scale so it will work with differntly sized boards (YEEEE)
    var scale = 64;


    //error array for clearing text
    var messages = ["","","",""];


    if(hide){
	    upb.visible = false;
		downb.visible = false;
		rightb.visible = false;
		leftb.visible = false;

		textup.visible = false;
		textdown.visible = false;
		textleft.visible = false;
		textright.visible = false;

		hide = false;
	}	



    //Word Wrap code example from previous game for reference
    /*
    //draws the text over the sprite
    var text = game.add.text(0,-10,this.text,style);
    text.anchor.set(0.5);
    this.addChild(text);
    */

    //var style = { font: "22px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 133, align: "center"};    


    //declares variables for bubbles
    upb = game.add.sprite(200,200,'speachbubble');
    upb.anchor.setTo(0.5,0.5);
    upb.angle = 0;

    downb = game.add.sprite(400,200,'speachbubble');
    downb.anchor.setTo(0.5,0.5);
    downb.angle = 180;


    leftb = game.add.sprite(200,400,'speachbubble');
    leftb.anchor.setTo(0.5,0.5);
    leftb.angle = 270;

    rightb = game.add.sprite(400,400,'speachbubble'); 
    rightb.anchor.setTo(0.5,0.5);
    rightb.angle = 90;

    //GET RID OF THIS LATER!! TESTING PURPOSES ONLY
    upb.scale.setTo(.5, .5);
    downb.scale.setTo(.5, .5);
    leftb.scale.setTo(.5, .5);
    rightb.scale.setTo(.5, .5);

    //hide 'em!
    upb.visible = false;
    downb.visible = false;
    leftb.visible = false;
    rightb.visible = false;
    

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
        // the player is placing the character where they are located
        if(this.currentColumn == this.selectedColumn && this.currentRow == this.selectedRow){
            this.tiles[this.selectedRow][this.selectedColumn].item.activate();
            this.selectedColumn = null;
            this.selectedRow = null;
        //if the tile we are on does not have an item
        }else if(temp == null){
        	
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
            			let speach = this.tiles[this.currentRow - 1][this.currentColumn].item.conflictText[check[1]];

                      
                        // position and show bubble
                        upb.x = this.currentColumn * scale + startX + scale/2;
                        upb.y = startY + (this.currentRow - 1.6) * scale;
                        upb.visible = true;

                        //Makes style for text with wordwrap so the text stays on the speach bubble
                       	styleup = { font: "14px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 90, align: "center"};    
                        //draws the text over the sprite
					    textup = game.add.text(upb.x + 2,upb.y,speach,styleup);
					    textup.anchor.set(0.5);
    
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
            			let speach = this.tiles[this.currentRow + 1][this.currentColumn].item.conflictText[check[1]];
            			
                        // position and show bubble
                        downb.x = this.currentColumn * scale + startX + scale/2;
                        downb.y = startY + (this.currentRow + 2.7) * scale;
                        downb.visible = true;

                       	//Makes style for text with wordwrap so the text stays on the speach bubble
                       	styledown = { font: "15px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 100, align: "center"};    
                        //draws the text over the sprite
					    textdown = game.add.text(downb.x,downb.y + 5,speach,styledown);
					    textdown.anchor.set(0.5);
    


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
            			let speach = this.tiles[this.currentRow][this.currentColumn - 1].item.conflictText[check[1]];
            		
                        // position and show bubble
                        leftb.x = (this.currentColumn - 1) * scale + startX - scale/2;
                        leftb.y = startY + this.currentRow * scale + scale/2;
                        leftb.visible = true;

                        //Makes style for text with wordwrap so the text stays on the speach bubble
                       	styleleft = { font: "15px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 80, align: "center"};    
                        //draws the text over the sprite
					    textleft = game.add.text(leftb.x - 5,leftb.y,speach,styleleft);
					    textleft.anchor.set(0.5);

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
            			let speach = this.tiles[this.currentRow][this.currentColumn + 1].item.conflictText[check[1]];
            			
                        // position and show bubble
                        rightb.x = (this.currentColumn + 2) * scale + startX + scale/2;
                        rightb.y = startY + this.currentRow * scale + scale/2;
                        rightb.visible = true;

                        //Makes style for text with wordwrap so the text stays on the speach bubble
                       	styleright = { font: "14px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 90, align: "center"};    
                        //draws the text over the sprite
					    textright = game.add.text(rightb.x + 15,rightb.y,speach,styleright);
					    textright.anchor.set(0.5);


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
      		} else {
                //make our currently selected character unselected
                proposed.activate();
                this.selectedRow = null;
                this.selectedColumn = null;
            }
        } else {
            //this means we tired to place our selected item on a tile that already has an item
            console.log("thing here");
        }
    	//this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
/*
    	spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	let x = true;
    	while(x){
    		if(spacebar.onDown){
    			console.log("HI MOM");
    			rightb.visible = false;

    			x = false;	
    		}
    	}
*/
    	  //  this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	  //    this.spacebar.onDown.add(this.select, this);

    	//		if(score==12&&cursors.down.isDown&&spawn2==0){

    		hide = true;

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

Board.prototype.fullscreen = function(){
    if(game.scale.isFullScreen){
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

Board.prototype.hidebubbles = function(){
	
	upb.visible = false;
	downb.visible = false;
	rightb.visible = false;
	leftb.visible = false;

	textup.visible = false;
	textdown.visible = false;
	textleft.visible = false;
	textright.visible = false;

	hide = false;
	
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