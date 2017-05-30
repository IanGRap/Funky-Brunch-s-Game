function TutorialBoard(game, columns, rows, tileSize, originX, originY){
	Board.call(this, game, columns, rows, tileSize, originX, originY);
	this.tutorialText = game.add.text(originX - 64, originY - 96, "Use WASD or the ARROW KEYS to move your cursor around.", {fontSize: "20px", fill: "red"});
	this.cursorMoves = 0;
	this.inputs = 0;
	this.selectPrompt = "Use the SPACEBAR or ENTER to select a character \nand then choose where to place them. \nYour goal is to get everyone onto the green spaces.";
	this.conflictPrompt = "Some characters have conflicting feelings. \nYou need to keep them from being next to each other \nin order to get everyone on the green tiles.";
	this.controlsPrompt = "Press C at any time to review the controls.";
	this.selectDisplayed = false;
	this.conflictsDisplayed = false;
	this.controlsDisplayed = false;
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
	if(!this.conflictsDisplayed){
		this.conflictsDisplayed = true;
		this.tutorialText.text = this.conflictPrompt;
		this.cursorMoves = 0;
	}
}

TutorialBoard.prototype.checkCursorMoves = function(){
	this.cursorMoves++;
	if(!this.selectDisplayed && this.cursorMoves >= 3){
		this.selectDisplayed = true;
		this.tutorialText.text = this.selectPrompt;
	} else if(this.conflictsDisplayed && this.cursorMoves >= 5){
		this.tutorialText.text = this.controlsPrompt;
	}
}


