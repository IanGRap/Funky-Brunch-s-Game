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

//audio
var tick;
var select;
var placed;
var misplaced;

//audio arrays for player specific feedback
var goodsound = [];
var badsound = [];

//Neds multiple vars to work I think
// goodtile[0] will give the index it is in the array. The others are full of cubes that would use the correct function to turn green
// we can pass this into dialogue and call the animation on that tile when the audio is played! HYPE!!
var goodtile = [];
var badtile = [];

 
//board constructor
function Board(game, columns, rows, tileSize, originX, originY, key){
    //group constructor
    Phaser.Group.call(this, game);

    //Sets dialogue system
    this.dialogue = new Dialogue(game);
    this.dialogue.playsounds([]);
    game.add.existing(this.dialogue);

    this.controlWindow = game.add.image(480, 810 + 180, key);
    this.controlWindow.anchor.setTo(1, 0);
    this.controlWindow.angle += 180;

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

    this.scale = tileSize;

	//sets the global orgin point for use in bubbles
    startX = originX;
    startY = originY;

    // reference to dialogue system
    //this.dialogue = dialogue;

    // the row and column we currently have highlighted
    this.currentRow = 0;
    this.currentColumn = 0;

    // the row and column of the circle we have selected, null otherwise
    this.selectedRow = null;
    this.selectedColumn = null;

    //sets the audio
    tick = game.add.audio('tick');
    select = game.add.audio('select');
    placed  = game.add.audio('placed');
    misplaced = game.add.audio('misplaced');

    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    this.controlsButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.controlsButton.onDown.add(this.controlsDisplay, this);
    this.displaying = false;
    this.controlsText = game.add.text(480 + 128, 810 - 64, "C: Controls", {fontSize: '30px', fill: 'white', font: 'Architects Daughter'});
    this.windowText = game.add.text(480 + 48, 810 + 48, "WASD and ARROW KEYS: Move Cursor\nENTER and SPACEBAR: Selected A Tile\nF: Toggle Fullscreen Mode\nC: Toggle this Display", {fontSize: '20px', fill: 'black', font: 'Architects Daughter'});

    this.blockedSound = game.add.audio('misplaced');
}

//set prototype and constructor
Board.prototype = Object.create(Phaser.Group.prototype);
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


    //this.f = game.input.keyboard.addKey(Phaser.Keyboard.F);
    this.h = game.input.keyboard.addKey(Phaser.Keyboard.H);

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
		//Special case for spacebar
		this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	    this.spacebar.onDown.add(this.select, this);
        this.enter.onDown.add(this.select, this)

	    this.up.onDown.add(this.goUp, this);
	    this.r.onDown.add(this.goRight, this);
	    this.l.onDown.add(this.goLeft, this);
	    this.down.onDown.add(this.goDown, this);
	    this.upArrow.onDown.add(this.goUp, this);
	    this.rArrow.onDown.add(this.goRight, this);
	    this.lArrow.onDown.add(this.goLeft, this);
	    this.downArrow.onDown.add(this.goDown, this);

	    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ENTER);

	}
		//Fullscreen code will always work regardless of placing tiles
		//this.f.onDown.add(this.fullscreen, this);

    if(this.displaying && this.controlWindow.y > 810){
        this.controlWindow.y -= 3;
        this.windowText.y -=3;
    }
};

// called when we select a tile
Board.prototype.select = function(){
   	
    //Defines the arrays used for the feedback on correct and incorrect tiles
    //Where the audio lives. It will contain the string of the audio to use
    goodsound = [];
    badsound = [];

    //An array for the Cube Reference Array that starts with the index the reader is on  
   	goodtile = [true];
	badtile = [false];

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

    //GET RID OF THIS LATER!! TESTING PURPOSES ONLY: It is used to make the bubbles small for now, but when we increase the scale it'll need to be bigger
    //upb.scale.setTo(.5, .5);
    //downb.scale.setTo(.5, .5);
    //leftb.scale.setTo(.5, .5);
    //rightb.scale.setTo(.5, .5);

    //hide 'em!
    upb.visible = false;
    downb.visible = false;
    leftb.visible = false;
    rightb.visible = false;
    

    //reference to the item on this tile, if there is one
    var temp = this.tiles[this.currentRow][this.currentColumn].item;
    if(this.tiles[this.currentRow][this.currentColumn].blocked){
        this.blockedSound.play();
        this.tiles[this.currentRow][this.currentColumn].incorrect();
        console.log('blocked');
    //if we currently don't have an item selected
    }else if(this.selectedRow == null){
        //if the tile we are on does have an item
        if(temp != null){
        	select.play();
            // make this item our selected item by storing the row and column it is on
            this.selectedRow = this.currentRow;
            this.selectedColumn = this.currentColumn;
            //set the item to active
            this.tiles[this.selectedRow][this.selectedColumn].item.activate(true);
            this.tiles[this.selectedRow][this.selectedColumn].select();

            this.tiles[this.currentRow][this.currentColumn].item.showTraitWindow();


	        // logs the traits of the selected circle
			Character.prototype.showTraits = function(){	console.log("Trait Array : " + this.traits);  		};

        }
    //if we do have an item selected aka placing an item
    } else {
        // the player is placing the character where they are located
        if(this.currentColumn == this.selectedColumn && this.currentRow == this.selectedRow){
            this.tiles[this.selectedRow][this.selectedColumn].item.activate();
            this.tiles[this.selectedRow][this.selectedColumn].select();
            this.tiles[this.currentRow][this.currentColumn].item.hideTraitWindow();
            this.tiles[this.currentRow][this.currentColumn].activate(true);
            this.selectedColumn = null;
            this.selectedRow = null;
            placed.play();
        //if the tile we are on does not have an item
        }else /*if(temp == null)*/{
        	
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
                 		this.tiles[this.currentRow - 1][this.currentColumn].incorrect();

                        //display conflict text with UI
                        //this.dialogue.addDialogue(proposed.name, this.tiles[this.currentRow - 1][this.currentColumn].item.conflictText[check[1]]);
            			let speach = this.tiles[this.currentRow - 1][this.currentColumn].item.conflictText[check[1]];
                      
                        // position and show bubble
                        upb.x = this.currentColumn * this.scale + startX + this.scale/2;
                        upb.y = startY + (this.currentRow - 1.6) * this.scale;
                        upb.visible = true;

                        //sends the bad audio for the character
                        badsound.push(this.tiles[this.currentRow - 1][this.currentColumn].item.badsound);
                        badtile.push(this.tiles[this.currentRow - 1][this.currentColumn]);

                        //Makes style for text with wordwrap so the text stays on the speach bubble
                       	styleup = { font: "22px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 150, align: "center"};    
                        //draws the text over the sprite
					    textup = game.add.text(upb.x,upb.y-10,speach,styleup);
					    textup.anchor.set(0.5);

					//When there is no conflict for Above
            		}else{
            			if(!(this.tiles[this.selectedRow][this.selectedColumn] == this.tiles[this.currentRow - 1][this.currentColumn])){
            				//this.tiles[this.currentRow - 1][this.currentColumn].correct();
            				//sends the good audio to the character
            				goodsound.push(this.tiles[this.currentRow - 1][this.currentColumn].item.goodsound);
            				goodtile.push(this.tiles[this.currentRow - 1][this.currentColumn]);  //The index of the tile we had above :D

            			}
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
            			this.tiles[this.currentRow + 1][this.currentColumn].incorrect();

                        //display conflict text with UI
                        //this.dialogue.addDialogue(proposed.name, this.tiles[this.currentRow + 1][this.currentColumn].item.conflictText[check[1]]);
            			let speach = this.tiles[this.currentRow + 1][this.currentColumn].item.conflictText[check[1]];
            			
                        // position and show bubble
                        downb.x = this.currentColumn * this.scale + startX + this.scale/2;
                        downb.y = startY + (this.currentRow + 2.7) * this.scale;
                        downb.visible = true;

                        //sends the bad audio for the character
                        badsound.push(this.tiles[this.currentRow + 1][this.currentColumn].item.badsound);
                        badtile.push(this.tiles[this.currentRow + 1][this.currentColumn]);


                       	//Makes style for text with wordwrap so the text stays on the speach bubble
                       	styledown = { font: "22px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 150, align: "center"};    
                        //draws the text over the sprite
					    textdown = game.add.text(downb.x,downb.y + 15,speach,styledown);
					    textdown.anchor.set(0.5);
            		}else{
                    	if(!(this.tiles[this.selectedRow][this.selectedColumn] == this.tiles[this.currentRow + 1][this.currentColumn])){
            				//this.tiles[this.currentRow + 1][this.currentColumn].correct();
            				//sends the good sounds for the character
            				goodsound.push(this.tiles[this.currentRow + 1][this.currentColumn].item.goodsound);
            				goodtile.push(this.tiles[this.currentRow + 1][this.currentColumn]);

            			}
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
            			this.tiles[this.currentRow][this.currentColumn - 1].incorrect();

                        //display conflict text with UI
                        //this.dialogue.addDialogue(proposed.name, this.tiles[this.currentRow][this.currentColumn - 1].item.conflictText[check[1]]);
            			let speach = this.tiles[this.currentRow][this.currentColumn - 1].item.conflictText[check[1]];
            		
                        // position and show bubble
                        leftb.x = (this.currentColumn - 1) * this.scale + startX - this.scale/2;
                        leftb.y = startY + this.currentRow * this.scale + this.scale/2;
                        leftb.visible = true;

                        //Sends the bad audio for the character
                        badsound.push(this.tiles[this.currentRow][this.currentColumn - 1].item.badsound);
                        badtile.push(this.tiles[this.currentRow][this.currentColumn - 1]);

                        //Makes style for text with wordwrap so the text stays on the speach bubble
                       	styleleft = { font: "20px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 80, align: "center"};    
                        //draws the text over the sprite
					    textleft = game.add.text(leftb.x - 20,leftb.y,speach,styleleft);
					    textleft.anchor.set(0.5);
            		}else{
            			if(!(this.tiles[this.selectedRow][this.selectedColumn] == this.tiles[this.currentRow][this.currentColumn - 1])){
            				//this.tiles[this.currentRow][this.currentColumn - 1].correct();

            				//sends the good audio for the character
            				goodsound.push(this.tiles[this.currentRow][this.currentColumn - 1].item.goodsound);
            				goodtile.push(this.tiles[this.currentRow][this.currentColumn - 1]);


            			}
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
            			this.tiles[this.currentRow][this.currentColumn + 1].incorrect();

                        //display conflict text with UI
                        //this.dialogue.addDialogue(proposed.name, this.tiles[this.currentRow][this.currentColumn + 1].item.conflictText[check[1]]);
            			let speach = this.tiles[this.currentRow][this.currentColumn + 1].item.conflictText[check[1]];
            			
                        // position and show bubble
                        rightb.x = (this.currentColumn + 2) * this.scale + startX + this.scale/2;
                        rightb.y = startY + this.currentRow * this.scale + this.scale/2;
                        rightb.visible = true;

                        //sends the bad audio for the character
                        badsound.push(this.tiles[this.currentRow][this.currentColumn + 1].item.badsound);
                        badtile.push(this.tiles[this.currentRow][this.currentColumn + 1]);


                        //Makes style for text with wordwrap so the text stays on the speach bubble
                       	styleright = { font: "20px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 90, align: "center"};    
                        //draws the text over the sprite
					    textright = game.add.text(rightb.x + 20,rightb.y,speach,styleright);
					    textright.anchor.set(0.5);
            		}else{
            			if(!(this.tiles[this.selectedRow][this.selectedColumn] == this.tiles[this.currentRow][this.currentColumn + 1])){
            				//this.tiles[this.currentRow][this.currentColumn + 1].correct();
            				//sends the goodsound for the character
            				goodsound.push(this.tiles[this.currentRow][this.currentColumn + 1].item.goodsound);
            				goodtile.push(this.tiles[this.currentRow][this.currentColumn + 1]);

            			}
            		}
          	  }
            }

            if(noConflicts){

            	//plys the collected good sounds
            	this.dialogue.playsounds(goodsound, goodtile);

            	this.tiles[this.selectedRow][this.selectedColumn].item.hideTraitWindow();
            	placed.play();
                console.log("no conflict");
                let t = null;
                //check if there is a character on the current tile and we are therefore swaping characters
                if(this.tiles[this.currentRow][this.currentColumn].item != null){
                	this.setDisplay();
                    t = this.tiles[this.currentRow][this.currentColumn].grab();
                }
	            //place our selected item on this tile
	           	//this.tiles[this.SelectedRow][this.selectedColumn].item.hideTraitWindow();
	            this.tiles[this.currentRow][this.currentColumn].place( this.tiles[this.selectedRow][this.selectedColumn].grab() );
	            //set the item we placed to no longer active
	            this.tiles[this.currentRow][this.currentColumn].item.activate(false);

                //if there ended up being a character on the tile, put that character in previous position
                if(t != null){
                    this.tiles[this.selectedRow][this.selectedColumn].place( t );
                }

                this.tiles[this.selectedRow][this.selectedColumn].select();
	            //set references to our selected item to null
	            this.selectedRow = null;
	            this.selectedColumn = null;
	            this.setDisplay();
      		} else {

      			console.log("badsound = " + badsound + ", badtile = " + badtile);
      			//plays the audio for all the accumulated bad sounds
      			this.dialogue.playsounds(badsound, badtile);
      			this.conflict();
                //make our currently selected character unselected
                /*proposed.activate();
                this.selectedRow = null;
                this.selectedColumn = null;*/
            }
        }
        /*} else {
            //this means we tired to place our selected item on a tile that already has an item
            console.log("thing here");
        }*/
        	//Starts the process of hiding the bubbles after they've been shown
    		hide = true;
    }
}

Board.prototype.conflict = function(){
    misplaced.play();
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
                } else if (outline[r][c] == 2){
                    this.tiles[r][c].setBlank();
                } else if (outline[r][c] == 3){
                    this.tiles[r][c].setBlank();
                    this.tiles[r][c].blocked = true;
                }
            }
        }

        //set our cursor to the origin with no item selected
        this.currentRow = 0;
        this.currentColumn = 0;
        this.selectedRow = null;
        this.selectedColumn = null;
        this.tiles[0][0].activate(true);
        this.setDisplay();
    }
}

// go through every tile and check and see if any of themare red but also have an item on them at the end of the timer
Board.prototype.checkTiles = function(){
    for(let r=0; r<this.tiles.length; r++){
		for(let c=0; c<this.tiles[0].length; c++){
            // if this tile is red but has an item return false
			if( (this.tiles[r][c].charged || this.tiles[r][c].blank) && this.tiles[r][c].item != null){
                return false;
            }
		}
	}
    // if no tiles are red and have an item on them, return true
    return true;
}

/*Board.prototype.fullscreen = function(){
    if(game.scale.isFullScreen){
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}*/

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
	tick.play();
    this.setDisplay();
    this.tiles[this.currentRow][this.currentColumn ].activate(false);
    this.currentColumn --;
    if(this.currentColumn  <0){
        this.currentColumn  = 0;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate(true);
    this.setDisplay();
}

Board.prototype.goDown = function(){
	tick.play();
    this.setDisplay();
    this.tiles[this.currentRow][this.currentColumn ].activate(false);
    this.currentRow++;
    if(this.currentRow >= this.tiles.length){
        this.currentRow = this.tiles.length-1;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate(true);
    this.setDisplay();
}

Board.prototype.goUp = function(){
	tick.play();
    this.setDisplay();
    this.tiles[this.currentRow][this.currentColumn ].activate(false);
    this.currentRow--;
    if(this.currentRow <0){
        this.currentRow = 0;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate(true);
    this.setDisplay();
}

Board.prototype.goRight = function(){
	tick.play();
    this.setDisplay();
    this.tiles[this.currentRow][this.currentColumn ].activate(false);
    this.currentColumn ++;
    if(this.currentColumn  >= this.tiles[0].length){
        this.currentColumn  = this.tiles[0].length-1;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate(true);
    this.setDisplay();
}

Board.prototype.setDisplay = function(){
    if(this.tiles[this.currentRow][this.currentColumn ].item != null){
        this.tiles[this.currentRow][this.currentColumn ].item.displaying = !this.tiles[this.currentRow][this.currentColumn ].item.displaying;
    }
}

Board.prototype.controlsDisplay = function(){
    if(this.displaying){
        this.controlsText.text = "C: Controls";
        this.controlWindow.y = 810 + 180;
        this.windowText.y = 810 + 48;
    } else {
        this.controlsText.text = "";
    }
    this.displaying = !this.displaying;
}