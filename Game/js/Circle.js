// Ian Rapoport
// irapopor
// CMPM 120
// 1 May 2017
// Armada Assignment

// constructor for ship
function Circle(game, key, locationX, locationY){
    // sprite constructor
    Phaser.Sprite.call(this, game, locationX, locationY, key);

    this.animations.add('nonactive', [0], 2, true);
    this.animations.add('active', [1], 2, true);

    this.inputEnabled = true;
    this.active = false;

    this.enableBody = true;
}

// set inherited prototype
Circle.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Circle.prototype.constructor = Circle;

// update function
Circle.prototype.update = function(){
    
};

Circle.prototype.activate = function(){
    if(this.active){
        this.active = false;
        this.animations.play('nonactive');
    } else {
        this.active = true;
        this.animations.play('active');
    }
};