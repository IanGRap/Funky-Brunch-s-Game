// constructor for cube
function Cube(game, key, locationX, locationY){
    // sprite constructor
    Phaser.Sprite.call(this, game, locationX, locationY, key);

    //animations for different cube colors
    this.animations.add('normal', [0], 2, true);
    this.animations.add('normalHighlight', [1], 3, true);
    this.animations.add('normalSelected', [0, 1], 3, true);
    this.animations.add('normalcorrect',[4,9,0], 4, false);
    this.animations.add('normalincorrect',[6,0], 2, false);

    this.animations.add('green', [2], 2, true);
    this.animations.add('greenHighlight', [3], 3, false);
    this.animations.add('greenSelected', [2, 3], 3, false);
    this.animations.add('greencorrect',[5,9,2], 4, false);  
    this.animations.add('greenincorrect',[7,2], 2, false);

    this.animations.add('blank', [8], 2, false);
    this.animations.add('blankHighlight', [1], 3, true);
    this.animations.add('blankSelected', [8, 1], 3, true);
    this.animations.add('blankcorrect',[4,8], 2, false);
    this.animations.add('blankincorrect',[6,8], 2, false);

    this.animations.play('green');

    // reference to if this is the cube currently highlighted
    this.active = false;

    // I think we need this to be able to get reference to the cubes position
    this.enableBody = true;

    // Reference to the circle on this cube, null otherwise
    this.item = null;

    // if this cube is red and therefore a danger tile
    this.charged = false;

    this.blank = false;

    this.selected = false;
}

// set inherited prototype
Cube.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Cube.prototype.constructor = Cube;

Cube.prototype.update = function(){};

//called when this cube is the one being highlighted
Cube.prototype.activate = function(){
    //if this is already active, set it to not active
    if( this.active && !this.selected){
        console.log('this is selected');
        this.active = false;
        //set to not selected animation based on whether or not this is a dangerous tile
        if(this.charged){
            this.animations.play('normal');
        } else if(this.blank){
            this.animations.play('blank');
        } else {
            this.animations.play('green');
        }
        //set to selected animation based on whether or not this is a dangerous tile
    } else if(!this.selected){
        console.log('this isn\'t currently selected');
        this.active = true;
        if(this.charged){
            this.animations.play('normalHighlight');
        } else if(this.blank){
            this.animations.play('blankHighlight');
        } else {
            this.animations.play('greenHighlight');
        }
    } else {
        this.active = false;
    }
};

//Code for the correct and incorrect animation feedback
Cube.prototype.correct = function(){
    if(this.charged){
        this.animations.play('normalcorrect');
    }else if(this.blank){
        this.animations.play('blankcorrect');
    }else{
        this.animations.play('greencorrect');
    }
}

Cube.prototype.incorrect = function(){
    console.log("incorrect");
    if(this.charged){  
        console.log("norm")
        this.animations.play('normalincorrect');
    }else if(this.blank){
        this.animations.play('blankincorrect');
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

Cube.prototype.setBlank = function(){
    this.blank = true;
    this.animations.play('blank');
}

Cube.prototype.select = function(){
    if(this.selected){
        this.selected = false;
        if(this.active){
            if(this.charged){
                this.animations.play('normalHighlight');
            } else if(this.blank){
                this.animations.play('blankHighlight');
            } else {
                this.animations.play('greenHighlight');
            }
        } else {
            if(this.charged){
                this.animations.play('normal');
            } else if(this.blank){
                this.animations.play('blank');
            } else {
                this.animations.play('green');
            }
        }
        
    } else {
        this.selected = true;
        if(this.charged){
            this.animations.play('normalSelected');
        } else if(this.blank){
            this.animations.play('blankSelected');
        } else {
            this.animations.play('greenSelected');
        }
    }
    //this.selected = !this.selected;
}