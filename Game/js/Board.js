function Board(game, columns, rows, tileSize){
    Phaser.Sprite.call(this, game, -200, -200, 'cubes');

    this.tiles = [rows];
    for(let r=0; r<rows; r++){
        this.tiles[r] = [columns];
    }

    var cube;
    for(let r=0; r<game.world.height; r+=tileSize){
		for(let c=0; c<game.world.width; c+=tileSize){
			cube = new Cube(game, 'cubes', c, r);
			game.add.existing(cube);
			//placeCube(c/64, r/64);
			this.tiles[c/64][r/64] = cube;
		}
	}

    this.currentRow = 0;
    this.currentColumn = 0;
    this.selectedRow = null;
    this.selectedColumn = null;

    this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);

    this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);

    this.l = game.input.keyboard.addKey(Phaser.Keyboard.A);

    this.r = game.input.keyboard.addKey(Phaser.Keyboard.D);

    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.spacebar.onDown.add(this.select, this);
    this.up.onDown.add(this.goUp, this);
    this.r.onDown.add(this.goRight, this);
    this.l.onDown.add(this.goLeft, this);
    this.down.onDown.add(this.goDown, this);

    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
}

Board.prototype = Object.create(Phaser.Sprite.prototype);
Board.prototype.constructor = Board;

Board.prototype.update = function(){
};

Board.prototype.select = function(){
    var temp = this.tiles[this.currentRow][this.currentColumn].item;
    if(this.selectedRow == null){
        if(temp != null){
            this.selectedRow = this.currentRow;
            this.selectedColumn = this.currentColumn;
            this.tiles[this.selectedRow][this.selectedColumn].item.activate();
        }
    } else {
        if(temp == null){
            this.tiles[this.currentRow][this.currentColumn].place( this.tiles[this.selectedRow][this.selectedColumn].grab() );
            this.tiles[this.currentRow][this.currentColumn].item.activate();
            this.selectedRow = null;
            this.selectedColumn = null;
        } else {
            console.log("thing here");
        }
    }
}

Board.prototype.setTiles = function(outline){
    for(let r=0; r<this.tiles.length; r++){
		for(let c=0; c<this.tiles[0].length; c++){
			if(outline[r][c] == 0){
				this.tiles[r][c].charge();
			}
		}
	}
    this.currentRow = 0;
    this.currentColumn = 0;
    this.selectedRow = null;
    this.selectedColumn = null;
    this.tiles[0][0].activate();
}

Board.prototype.check = function(){
    for(let r=0; r<this.tiles.length; r++){
		for(let c=0; c<this.tiles[0].length; c++){
			if(this.tiles[r][c].charged && this.tiles[r][c].item != null){
                return false;
            }
		}
	}
    return true;
}

Board.prototype.goUp = function(){
    this.tiles[this.currentRow][this.currentColumn ].activate();
    this.currentColumn --;
    if(this.currentColumn  <0){
        this.currentColumn  = 0;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate();
}

Board.prototype.goRight = function(){
    this.tiles[this.currentRow][this.currentColumn ].activate();
    this.currentRow++;
    if(this.currentRow >= this.tiles.length){
        this.currentRow = this.tiles.length-1;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate();
}

Board.prototype.goLeft = function(){
    this.tiles[this.currentRow][this.currentColumn ].activate();
    this.currentRow--;
    if(this.currentRow <0){
        this.currentRow = 0;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate();
}

Board.prototype.goDown = function(){
    this.tiles[this.currentRow][this.currentColumn ].activate();
    this.currentColumn ++;
    if(this.currentColumn  >= this.tiles[0].length){
        this.currentColumn  = this.tiles[0].length-1;
    }
    this.tiles[this.currentRow][this.currentColumn ].activate();
}