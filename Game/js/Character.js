var displayName;

// constructor for circle
function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits,traitwindow){
    // sprite constructor
    Phaser.Sprite.call(this, game, locationX, locationY, key);

    //DEBUG>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DEBUG
    this.scale.setTo(0.5,0.5);

    // animations for circle being highlighted
    this.animations.add('nonactive', [0], 2, true);
    this.animations.add('active', [0], 2, true);

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
    this.diplayName;
    // Variable for tweening the alpha on selected
    this.toAlpha = 0; 
    this.currentAlpha = 0;

    //Variables for locked in location
    this.lockedy = 0;
    this.lockedyloc = 0;


    this.traitTracker = visibleTraits;

    this.displaying = false;
    this.displayText = "";
    this.updateDisplay();

    this.lockedin = false;

    //this.lockeddisplaytext;


    // ----- Display highlighted traits -----

    //Background trait window
    this.displayWindow = game.add.sprite(1200, 0, traitwindow);
    this.displayWindow.anchor.setTo(0.5,0);
    this.displayWindow.scale.setTo(1,1);
    
    //Separated name from traits
    this.displayName = game.add.text(1200, 170, this.name, {fontSize: '30px', fill: 'Black'});
    this.displayName.anchor.setTo(0.5,0.5);

    // Display traits
    this.displayStats = game.add.text(1200, 200, this.displayText, {fontSize: '30px', fill: 'Black'});
    this.displayStats.anchor.setTo(0.5,0.5);

    //Display character icon
    this.displaySprite = game.add.sprite(1200, 80, key);
    this.displaySprite.anchor.setTo(0.5,0.5);
    this.displaySprite.scale.setTo(0.5,0.5);


    // ----- Display selected objects. Hopefully will slide in. Fingers crossed -----

    //Background trait window
    this.lockeddisplayWindow = game.add.sprite(1200, 800, traitwindow);
    this.lockeddisplayWindow.anchor.setTo(0.5,0);
    this.lockeddisplayWindow.scale.setTo(1, 1);
    this.lockeddisplayWindow.alpha = 0;

    
    //Separated name from traits
    this.lockeddisplayName = game.add.text(1200, 970, this.name, {fontSize: '30px', fill: 'Black'});
    this.lockeddisplayName.anchor.setTo(0.5,0.5);
    this.lockeddisplayName.alpha = 0;

    // Display traits
    this.lockeddisplayStats = game.add.text(1200, 1000, this.displayText, {fontSize: '30px', fill: 'Black'});
    this.lockeddisplayStats.anchor.setTo(0.5,0.5);
    this.lockeddisplayStats.alpha = 0;

    //Display character icon
    this.lockeddisplaySprite = game.add.sprite(1200, 880, key);
    this.lockeddisplaySprite.anchor.setTo(0.5,0.5);
    this.lockeddisplaySprite.scale.setTo(0.5,0.5);
    this.lockeddisplaySprite.alpha = 0;

}

// set inherited prototype
Character.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Character.prototype.constructor = Character;

Character.prototype.updateDisplay = function(){

    this.displayText = "";
    for(let i=0; i<this.traits.length; i++){
        if(this.traitTracker[i] != false){

            this.displayText += "\n*  "+this.traits[i];

        } else {
            this.displayText += "\n*  ???";
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
    this.updateDisplay();
}

Character.prototype.update = function(){

    if(this.displaying){
        this.updateDisplay();
        this.displayStats.text = this.displayText;
        //this.displaySprite.alpha = 1;
        //this.displayWindow.alpha = 1;
        this.displayName.text = this.name;
        this.toAlpha = 1;

    } else {
        this.displayName.text = "";
        this.displayStats.text = "";
        //this.displaySprite.alpha = 0;
        //this.displayWindow.alpha = 0;
        this.toAlpha = 0;

    }

    //Checks if you have a locked in selection
    if(this.lockedin){
        this.lockeddisplayStats.text = this.lockeddisplayText;
        //console.log("LOCKED IN BABY")
        this.lockedyto = 1;
    }else{
        this.lockedyto = 0;
    }


    if(this.toAlpha == 0){

        if(this.currentAlpha >= 0){
            this.currentAlpha -= .07;
            if(this.currentAlpha < 0){ this.currentAlpha = 0;};
            this.displayName.text.alpha = this.currentAlpha;
            this.displayStats.text.alpha = this.currentAlpha;
            this.displaySprite.alpha = this.currentAlpha;
            this.displayWindow.alpha = this.currentAlpha;
        }
    }else if(this.toAlpha == 1){
        if(this.currentAlpha <= 1){
            this.currentAlpha += .1;
            if(this.currentAlpha > 1){ this.currentAlpha = 1;};
            this.displayName.text.alpha = this.currentAlpha;
            this.displayStats.text.alpha = this.currentAlpha;
            this.displaySprite.alpha = this.currentAlpha;
            this.displayWindow.alpha = this.currentAlpha;
        }
    }

    //console.log("lockedyto "+ this.lockedyto);
    if(this.lockedyto == 0){

        //console.log("in");
        if(this.lockedyloc > 0){    //When you select a character it drops down from that location
            this.lockedyloc -= 1.5;

            this.lockeddisplayName.alpha = 1;
            this.lockeddisplayStats.alpha = 1;
            this.lockeddisplaySprite.alpha = 1;
            this.lockeddisplayWindow.alpha = 1;

            this.lockeddisplayName.y += 12;
            this.lockeddisplayStats.y += 12;
            this.lockeddisplaySprite.y += 12;
            this.lockeddisplayWindow.y += 12;
        }
    }else if(this.lockedyto == 1){  //When you deselect the locked in char

        if(this.lockedyloc < 50){
            this.lockedyloc += 1.5;

            this.lockeddisplayName.alpha = 1;
            this.lockeddisplayStats.alpha = 1;
            this.lockeddisplaySprite.alpha = 1;
            this.lockeddisplayWindow.alpha = 1;


            this.lockeddisplayName.y -= 12;
            this.lockeddisplayStats.y -= 12;
            this.lockeddisplaySprite.y -= 12;
            this.lockeddisplayWindow.y -= 12;
        }
    }

    this.lockeddisplayStats.text = this.displayText;
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

//logs the traits of the selected circle
Character.prototype.showTraitWindow = function(){
    console.log("DISPLAY TEXT: " + this.displayText);
    this.lockeddisplayText = this.displayText;
    this.lockedin = true;
}
Character.prototype.hideTraitWindow = function(){

    this.lockedin = false;
};