// constructor for circle
function ScreenWipe(game, key){
    // sprite constructor
    Phaser.Sprite.call(this, game, 0, 0, key);
    this.scale.setTo(4,6);
    this.anchor.setTo(0.5,0.5);
    this.angle = -45;
    this.alpha = 0;

    
}

// set inherited prototype
ScreenWipe.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
ScreenWipe.prototype.constructor = ScreenWipe;

ScreenWipe.prototype.update = function(){


};
ScreenWipe.prototype.animIn = function(){
    console.log("ANIMIN");
    this.alpha = 1;
    this.scale.setTo(4,6);
    //1440, 810,
    this.x = 700;
    this.y = 400;

    //Slide out of the way then hide
    var tween = game.add.tween(this).to( { x: -1440 , y: -900 },1300,"Linear",true,0);
    tween.onComplete.add(function(){         this.alpha = 0;       },this);    
}

ScreenWipe.prototype.animOut = function(nextFunc){
    console.log("here");   
    this.alpha = 1;
    this.scale.setTo(4,6);
    //1440, 810,
    this.x = 1440 + 1600;
    this.y = 810 + 1000;

    //Slides over the view then calls the next state
    var tween = game.add.tween(this).to( { x: 700, y: 400},1300,"Linear",true,0);
    tween.onComplete.add(function(){         nextFunc();       },this);    
}

ScreenWipe.prototype.animOutComplex = function(nextFunc,xpos,ypos,scale){
    console.log("here");   
    this.alpha = 1;
    this.scale.setTo(4+scale,6+scale);
    //1440, 810,
    this.x = xpos;
    this.y = ypos;

    //Slides over the view then calls the next state
    var tween = game.add.tween(this).to( { x: xpos - 3040, y: ypos - 1410},1300,"Linear",true,0);
    tween.onComplete.add(function(){         nextFunc();       },this);    
}