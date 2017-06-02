function TutorialBoard(game, columns, rows, tileSize, originX, originY, key){
	Board.call(this, game, columns, rows, tileSize, originX, originY, key);
	this.window = game.add.image(228, 810, key);
	this.window.anchor.setTo(0.5, 0.5);
	this.window.angle += 180;
	this.cursorMoves = 0;
	this.inputs = 0;
	this.movePrompt = "Use WASD or the ARROW KEYS \nto move your cursor around.\nN: Next";
	this.selectPrompt = "Use the SPACEBAR or ENTER to select a \ncharacter and then choose where to place \nthem. Your goal is to get everyone onto\n the green spaces. N: Next";
	this.conflictPrompt = "Some characters have conflicting feelings. \nYou need to keep them from being next to \neach other in order to get everyone on \nthe green tiles. N: Next";
	this.controlsPrompt = "Press C at any time to review the controls.\nPress N to restart this tutorial\nPress T to hide the tutorial.";
	this.tutorialPrompt = "T: Tutorial";
	this.holdText = "";
	this.moveDisplayed = true;
	this.selectDisplayed = false;
	this.conflictsDisplayed = false;
	this.controlsDisplayed = false;
	this.tutorialDisplayed = true;
	this.tutorialText = game.add.text(this.window.x - 198, this.window.y - 48, this.movePrompt, {fontSize: "20px", fill: "black", font: 'Architects Daughter'});
	this.promptText = game.add.text(this.window.x - 198, this.window.y - 64, "", {fontSize: "30px", fill: "white", font: 'Architects Daughter'});

	this.N = game.input.keyboard.addKey(Phaser.Keyboard.N);
	this.N.onDown.add(this.next, this);
	game.input.keyboard.removeKeyCapture(Phaser.Keyboard.N);

	this.T = game.input.keyboard.addKey(Phaser.Keyboard.T);
	this.T.onDown.add(this.activate, this);
	game.input.keyboard.removeKeyCapture(Phaser.Keyboard.T);

	this.activate();
}

TutorialBoard.prototype = Object.create(Board.prototype);
TutorialBoard.constructor = TutorialBoard;


/*TutorialBoard.prototype.goLeft = function(){
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
}*/

TutorialBoard.prototype.update = function(){
	Board.prototype.update.call(this);
	if(this.window.y > 810 - 90){
		this.window.y -= 3;
		this.tutorialText.y -= 3;
	}
}

TutorialBoard.prototype.resetDisplay = function(){
	this.window.y = 720 + 180;
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

TutorialBoard.prototype.next = function(){
	if(this.tutorialDisplayed){
		if (this.moveDisplayed){
			this.moveDisplayed = false;
			this.selectDisplayed = true;
			this.tutorialText.text = this.selectPrompt;
		} else if (this.selectDisplayed){
			this.selectDisplayed = false;
			this.conflictsDisplayed = true;
			this.tutorialText.text = this.conflictPrompt;
		} else if (this.conflictsDisplayed){
			this.conflictsDisplayed = false;
			this.controlsDisplayed = true;
			this.tutorialText.text = this.controlsPrompt;
		} else {
			this.controlsDisplayed = false;
			this.moveDisplayed = true;
			this.tutorialText.text = this.movePrompt;
		}
		this.resetDisplay();
	}
	
}












