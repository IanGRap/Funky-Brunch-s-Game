// constructor for circle
function ScreenWipe(game, key){
    // sprite constructor
    Phaser.Sprite.call(this, game, 200, 200, key);
    this.scale.setTo(2,2);

    
}

// set inherited prototype
ScreenWipe.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
ScreenWipe.prototype.constructor = ScreenWipe;

ScreenWipe.prototype.update = function(){


};

