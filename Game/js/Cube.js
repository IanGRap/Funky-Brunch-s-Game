// Ian Rapoport
// irapopor
// CMPM 120
// 1 May 2017
// Armada Assignment

// constructor for ship
function Cube(game, key, locationX, locationY){
    // sprite constructor
    Phaser.Sprite.call(this, game, locationX, locationY, key);

    this.animations.add('green', [0], 2, true);
    this.animations.add('greenHighlight', [3], 2, true);
    this.animations.add('red', [2], 2, true);
    this.animations.add('redHighlight', [5], 2, true);
    this.animations.play('green');

    this.inputEnabled = true;
    this.active = false;

    this.enableBody = true;

    this.item = null;

    this.charged = false;
}

// set inherited prototype
Cube.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Cube.prototype.constructor = Cube;

// update function
Cube.prototype.update = function(){
    //console.log('cube update');
};

Cube.prototype.activate = function(){
    if(this.active){
        this.active = false;
        if(this.charged){
            this.animations.play('red');
        } else {
            this.animations.play('green');
        }
    } else {
        this.active = true;
        if(this.charged){
            this.animations.play('redHighlight');
        } else {
            this.animations.play('greenHighlight');
        }
    }
};

Cube.prototype.place = function(circle){
    circle.x = this.x;
    circle.y = this.y;
    this.item = circle;
}

Cube.prototype.grab = function(){
    if(this.item != null){
        var temp = this.item;
        this.item = null;
        return temp;
    } else {
        return null;
    }
}

Cube.prototype.charge = function(){
    this.charged = true;
    this.animations.play('red');
}