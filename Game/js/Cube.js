// constructor for cube
function Cube(game, key, locationX, locationY){
    // sprite constructor
    Phaser.Sprite.call(this, game, locationX, locationY, key);

    //animations for different cube colors
    this.animations.add('normal', [0], 2, true);
    this.animations.add('normalHighlight', [1, 0], 3, true);
    this.animations.add('green', [2], 2, true);
    this.animations.add('greenHighlight', [3, 2], 3, false);
    this.animations.add('normalcorrect',[4,0,4,0], 4, false);
    this.animations.add('greencorrect',[5,2,5,2], 3, false);
    this.animations.add('normalincorrect',[6,0,6,0], 3, false);
    this.animations.add('greenincorrect',[7,2,7,2], 3, false);
    this.animations.play('green');

    // reference to if this is the cube currently highlighted
    this.active = false;

    // I think we need this to be able to get reference to the cubes position
    this.enableBody = true;

    // Reference to the circle on this cube, null otherwise
    this.item = null;

    // if this cube is red and therefore a danger tile
    this.charged = false;
}

// set inherited prototype
Cube.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Cube.prototype.constructor = Cube;

Cube.prototype.update = function(){};

//called when this cube is the one being highlighted
Cube.prototype.activate = function(){
    //if this is already active, set it to not active
    if(this.active){
        this.active = false;
        //set to not selected animation based on whether or not this is a dangerous tile
        if(this.charged){
            this.animations.play('normal');
        } else {
            this.animations.play('green');
        }
        //set to selected animation based on whether or not this is a dangerous tile
    } else {
        this.active = true;
        if(this.charged){
            this.animations.play('normalHighlight');
        } else {
            this.animations.play('greenHighlight');
        }
    }
};

//Code for the correct and incorrect animation feedback
Cube.prototype.correct = function(){
    if(this.charged){
        this.animations.play('normalcorrect');
    }else{
        this.animations.play('greencorrect');
    }
}

Cube.prototype.incorrect = function(){
    console.log("incorrect");
    if(this.charged){  
        console.log("norm")
        this.animations.play('normalincorrect');
    }else{
        this.animations.play('greenincorrect');
    }
}

//place a circle on this tile and set that circle as the item
Cube.prototype.place = function(circle){
    circle.x = this.x;
    circle.y = this.y;
    this.item = circle;
}

//remove reference to the circle on this tile and return it, or return null
Cube.prototype.grab = function(){
    if(this.item != null){
        var temp = this.item;
        this.item = null;
        return temp;
    } else {
        return null;
    }
}

//set dangerous flag to true and change color to red
Cube.prototype.charge = function(){
    this.charged = true;
    this.animations.play('normal');
}