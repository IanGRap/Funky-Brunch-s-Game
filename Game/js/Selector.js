function Selector(game, columns, rows){
    console.log('constructed');
    Phaser.Sprite.call(this, game, -200, -200, 'cubes');

    this.tiles = [rows];
    for(let r=0; r<rows; r++){
        this.tiles[r] = [columns];
    }

    this.row = 0;
    this.column = 0;

    this.selected = null;

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

Selector.prototype = Object.create(Phaser.Sprite.prototype);
Selector.prototype.constructor = Selector;

Selector.prototype.update = function(){
};

Selector.prototype.select = function(){
    var temp = this.tiles[this.row][this.column].grab();
    if(this.selected == null){
        if(temp != null){
            this.selected = temp;
            this.selected.activate();
        }
    } else {
        if(temp == null){
            this.tiles[this.row][this.column].place(this.selected);
            this.selected.activate();
            this.selected = null;
        } else {
            console.log("thing here");
            this.tiles[this.row][this.column].place(temp);
        }
    }
}

Selector.prototype.goUp = function(){
    this.tiles[this.row][this.column].activate();
    this.column--;
    if(this.column <0){
        this.column = 0;
    }
    this.tiles[this.row][this.column].activate();
}

Selector.prototype.goRight = function(){
    this.tiles[this.row][this.column].activate();
    this.row++;
    if(this.row >= this.tiles.length){
        this.row = this.tiles.length-1;
    }
    this.tiles[this.row][this.column].activate();
}

Selector.prototype.goLeft = function(){
    this.tiles[this.row][this.column].activate();
    this.row--;
    if(this.row <0){
        this.row = 0;
    }
    this.tiles[this.row][this.column].activate();
}

Selector.prototype.goDown = function(){
    this.tiles[this.row][this.column].activate();
    this.column++;
    if(this.column >= this.tiles[0].length){
        this.column = this.tiles[0].length-1;
    }
    this.tiles[this.row][this.column].activate();
}