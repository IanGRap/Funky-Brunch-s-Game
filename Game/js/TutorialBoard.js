function TutorialBoard(game, columns, rows, tileSize, originX, originY, key){
	Board.call(this, game, columns, rows, tileSize, originX, originY, key);
	this.window = game.add.image(game.world.width/3 - 252, game.world.width/2 + 90, key);
	this.window.anchor.setTo(0.5, 0.5);
	this.window.angle += 180;
	this.cursorMoves = 0;
	this.inputs = 0;
	this.movePrompt = "Use WASD or the ARROW KEYS \nto move your cursor around.";
	this.selectPrompt = "Use the SPACEBAR or ENTER to select a \ncharacter and then choose where to place \nthem. Your goal is to get everyone onto\n the green spaces.";
	this.conflictPrompt = "Some characters have conflicting feelings. \nYou need to keep them from being next to \neach other in order to get everyone on \nthe green tiles.";
	this.controlsPrompt = "Press C at any time to review the controls.\nPress R to restart this tutorial\nPress T to hide the tutorial";
	this.tutorialPrompt = "T: Tutorial";
	this.holdText = "";
	this.selectDisplayed = false;
	this.conflictsDisplayed = false;
	this.controlsDisplayed = false;
	this.tutorialDisplayed = true;
	this.tutorialText = game.add.text(this.window.x - 198, this.window.y - 48, this.movePrompt, {fontSize: "20px", fill: "black", font: 'Architects Daughter'});
	this.promptText = game.add.text(this.window.x - 198, this.window.y - 64, "", {fontSize: "30px", fill: "white", font: 'Architects Daughter'});

	this.R = game.input.keyboard.addKey(Phaser.Keyboard.R);
	this.R.onDown.add(this.restart, this);
	game.input.keyboard.removeKeyCapture(Phaser.Keyboard.R);

	this.T = game.input.keyboard.addKey(Phaser.Keyboard.T);
	this.T.onDown.add(this.activate, this);
	game.input.keyboard.removeKeyCapture(Phaser.Keyboard.T);
}

TutorialBoard.prototype = Object.create(Board.prototype);
TutorialBoard.constructor = TutorialBoard;


TutorialBoard.prototype.goLeft = function(){
	Board.prototype.goLeft.call(this);
	this.checkCursorMoves();
}

TutorialBoard.prototype.goRight = function(){
	Board.prototype.goRight.call(this);
	this.checkCursorMoves();
}

TutorialBoard.prototype.goUp = function(){
	Board.prototype.goUp.call(this);
	this.checkCursorMoves();
}

TutorialBoard.prototype.goDown = function(){
	Board.prototype.goDown.call(this);
	this.checkCursorMoves();
}

TutorialBoard.prototype.conflict = function(){
	Board.prototype.conflict.call(this);
	if(!this.conflictsDisplayed && this.tutorialDisplayed){
		this.conflictsDisplayed = true;
		this.tutorialText.text = this.conflictPrompt;
		this.cursorMoves = 0;
		this.resetDisplay();
	}
}

TutorialBoard.prototype.checkCursorMoves = function(){
	if(this.tutorialDisplayed){
			this.cursorMoves++;
		if(!this.selectDisplayed && this.cursorMoves >= 3){
			this.selectDisplayed = true;
			this.tutorialText.text = this.selectPrompt;
			this.resetDisplay();
		} else if(this.conflictsDisplayed && this.cursorMoves >= 5 && !this.controlsDisplayed){
			this.tutorialText.text = this.controlsPrompt;
			this.controlsDisplayed = true;
			this.resetDisplay();
		}
	}
}

TutorialBoard.prototype.restart = function(){
	if(this.controlsDisplayed && this.tutorialDisplayed){
		this.cursorMoves = 0;
		this.selectDisplayed = false;
		this.conflictsDisplayed = false;
		this.controlsDisplayed = false;
		this.tutorialText.text = this.movePrompt;
		this.resetDisplay();
	}
}

TutorialBoard.prototype.update = function(){
	Board.prototype.update.call(this);
	if(this.window.y > game.world.height - 90){
		this.window.y -= 3;
		this.tutorialText.y -= 3;
	}
}

TutorialBoard.prototype.resetDisplay = function(){
	this.window.y = game.world.width/2 + 180;
	this.tutorialText.y = this.window.y - 48;
}

TutorialBoard.prototype.activate = function(){
	if(this.tutorialDisplayed){
		this.window.alpha = 0;
		this.holdText = this.tutorialText.text;
		this.promptText.text = this.tutorialPrompt;
		this.tutorialText.text = "";
	} else {
		this.window.alpha = 1;
		this.tutorialText.text = this.holdText;
		this.promptText.text = "";
	}
	this.tutorialDisplayed = !this.tutorialDisplayed;
}


