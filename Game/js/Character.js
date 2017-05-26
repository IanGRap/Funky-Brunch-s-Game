// constructor for circle
function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits){
    // sprite constructor
    Phaser.Sprite.call(this, game, locationX, locationY, key);

    //DEBUG>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DEBUG
    this.scale.setTo(2,2);

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

    this.name = name;

    this.traitTracker = visibleTraits;

    this.displaying = false;
    this.displayText;
    this.updateDisplay();
    
    this.displayStats = game.add.text(1200, 256, this.displayText, {fontSize: '30px', fill: 'Red'});
    this.displayStats.anchor.setTo(0.5,0.5);

    this.displaySprite = game.add.sprite(1200, 128, key);
    this.displaySprite.anchor.setTo(0.5,0.5);
    this.displaySprite.scale.setTo(2,2);

}

// set inherited prototype
Character.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Character.prototype.constructor = Character;

Character.prototype.updateDisplay = function(){
        console.log("HERES THE DISPLAY TEXT " + this.displayText);

    this.displayText = ""+this.name;
    for(let i=0; i<this.traits.length; i++){
        if(this.traitTracker[i] != false){

            this.displayText += "\n"+this.traits[i];

        } else {
            this.displayText += "\n???";
        }
    }
}

Character.prototype.revealTrait = function(trait){
    for(let i=0; i<this.traits.length; i++){
        if(this.traits[i] == trait){
            this.traitTracker[i] = true;
            break;
        }
    }
}

Character.prototype.update = function(){
    if(this.displaying){
        this.updateDisplay();
        this.displayStats.text = this.displayText;
        this.displaySprite.alpha = 1;
    } else {
        this.displayStats.text = "";
        this.displaySprite.alpha = 0;
    }
};

Character.prototype.activate = function(){
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
Character.prototype.showTraits = function(){
	console.log("Trait Array : " + this.traits);
};

//Checks for Conflicts Among Traits    input : (other circle object)
Character.prototype.conflictCheck = function(other){
	for(let i = 0; i < this.conflicts.length; i++){
		console.log(this.traits[i]);
		for(let j = 0; j < other.traits.length; j++){
			if(this.conflicts[i] == other.traits[j]){
                other.revealTrait(other.traits[j]);
                this.revealTrait(this.traits[i]);
				return [true,i];
			}
		}
	}
	return[false,null];
}

