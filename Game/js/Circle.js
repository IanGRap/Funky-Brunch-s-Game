// constructor for circle
function Circle(game, key, locationX, locationY,traits,conflicts,conflictText){
    // sprite constructor
    Phaser.Sprite.call(this, game, locationX, locationY, key);

    // animations for circle being highlighted
    this.animations.add('nonactive', [0], 2, true);
    this.animations.add('active', [1], 2, true);

    //trait arrays set
    this.traits = traits;
    this.conflicts = conflicts;
    this.conflictText = conflictText;

    //this.inputEnabled = true;
    //reference for if this is the circle currently being selected
    this.active = false;

    //reference for circle position
    this.enableBody = true;
}

// set inherited prototype
Circle.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Circle.prototype.constructor = Circle;

Circle.prototype.update = function(){};

Circle.prototype.activate = function(){
    // set animations based on if this is selected circle
    if(this.active){
        this.active = false;
        this.animations.play('nonactive');
    } else {
        this.active = true;
        this.animations.play('active');
    }
};

//logs the traits of the selected circle
Circle.prototype.showTraits = function(){
	console.log("Trait Array : " + this.traits);
};

//Checks for Conflicts Among Traits    input : (other circle object)
Circle.prototype.conflictCheck = function(other){
	for(let i = 0; i < this.conflicts.length; i++){
		console.log(this.traits[i]);
		for(let j = 0; j < other.traits.length; j++){
			if(this.conflicts[i] == other.traits[j]){
				return [true,i];
			}
		}
	}
	return[false,null];
}

