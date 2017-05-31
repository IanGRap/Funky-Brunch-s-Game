
function Dialogue(game){
    // sprite constructor
    Phaser.Sprite.call(this, game, 20,20, 'dino');
    this.music;
    this.gothrough = 0;
    this.once = false;

    this.sounds;
    this.play = false;
}

// set inherited prototype
Dialogue.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Dialogue.prototype.constructor = Dialogue;



Dialogue.prototype.update = function(){
    if(this.gothrough != this.sounds.length){
        if(this.play){
            this.play = false;
            this.music.play();
            this.once = true;
        }else{
            this.music.onStop.add(function(){            this.nextsound();         }, this);
        }
    }
}

Dialogue.prototype.nextsound = function(){
    if(this.once){
        this.once = false;
        console.log("Aight")
        this.gothrough ++;
        this.music = game.add.audio(this.sounds[this.gothrough]);
        this.play = true;
    }

}


//Pass this one an array of sounds you're looking to play. Ideally you'd call this in 2 instances, one for playing the correct sounds and one for playing the incorrect sounds
Dialogue.prototype.playsounds = function(locsounds){
    if(locsounds != null){
        this.gothrough = 0;

        this.sounds = locsounds;
        this.play = true;

        this.music = game.add.audio(this.sounds[this.gothrough]);
    }
}
















/*







var gothrough;
var music;
// constructor for circle
function Dialogue(game){

    Phaser.Sprite.call(this, game, 20, 20, 'cubes');

    // sprite constructor
    //Phaser.Group.call(this, game);
    //console.dir(this);

   // this.UI = this.create(0, game.world.height - width, key);

    //this.text = game.add.text(32, game.world.height-64, "", {fontSize: '20px', fill: 'Red'});



    this.upcomingSpeakers = [null, null, null];
    this.upcomingConversations = [null, null, null];

    this.maxTime = 5000;
    this.remainingTime = this.maxTime;

    this.displaying = false;
}

// set inherited prototype
Dialogue.prototype = Object.create(Phaser.Group.prototype);
// declare constructor
Dialogue.prototype.constructor = Dialogue;


Dialogue.prototype.update = function(){

    console.log("here we go");
    //music.onStop.add(function(){ gothrough++; }, this);


   /* this.remainingTime -= game.time.elapsed;
    if(this.displaying && this.remainingTime <= 0){
        console.log("removing text");
        this.displaying = false;
        this.text.text = '';
        this.checkNext();
    }
    
};


Dialogue.prototype.addDialogue = function(speaker, text){
    console.log("adding text");
    var i;
    for(i=0; i<this.upcomingSpeakers.length; i++){
        if(this.upcomingSpeakers[i] == null){
            console.log("inserting text at "+i);
            this.upcomingSpeakers[i] = speaker;
            this.upcomingConversations[i] = text;
            if(i == 0){
                this.checkNext();
            }
            break;
        }
    }
};

Dialogue.prototype.checkNext = function(){
    console.log("checking next");
    if(this.upcomingSpeakers[0] != null && !this.displaying){
        this.text.text = ""+this.upcomingSpeakers[0]+": "+this.upcomingConversations[0];
        for(let i=1; i<this.upcomingSpeakers.length; i++){
            this.upcomingSpeakers[i-1] = this.upcomingSpeakers[i];
            this.upcomingConversations[i-1] = this.upcomingConversations[i];
        }
        this.displaying = true;
        this.remainingTime = this.maxTime;
    }
};

// Reed's vars and functions for speach dialogue


//Pass this one an array of sounds you're looking to play. Ideally you'd call this in 2 instances, one for playing the correct sounds and one for playing the incorrect sounds
Dialogue.prototype.playsounds = function(sounds){
    gothrough = 0;

    if(gothrough < sounds.length){
        console.log("gothrough = " + gothrough);
        music = game.add.audio(sounds[gothrough]);
        music.play();

        //I can possibly itterate on the loop when the music stops?
    }


};

//music.onStop.add(function(){ themeLoop(); }, this);






*/