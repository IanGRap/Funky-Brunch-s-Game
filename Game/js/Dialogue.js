
function Dialogue(game){
    // sprite constructor
    Phaser.Sprite.call(this, game, 20,20, 'dino');
    this.music;
    this.gothrough = 0;
    this.tilecount = 0;
    this.once = false;

    this.sounds;
    this.play = false;
    this.tiles;
}

// set inherited prototype
Dialogue.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Dialogue.prototype.constructor = Dialogue;



Dialogue.prototype.update = function(){
    if(this.gothrough < this.sounds.length){
        if(this.play){

            //starts the audio for the given character
            this.play = false;
            this.music.play();
            this.once = true;

            //starts the animation for the character's tile. If statement to see if it's good or bad
            if(this.tiles[0]){
                this.tiles[this.tilecount].correct();
            }else{
                this.tiles[this.tilecount].incorrect();
            }



        }else{
            this.music.onStop.add(function(){            this.nextsound();         }, this);
        }
    }
}

Dialogue.prototype.nextsound = function(){
    if(this.once){

        this.once = false;
        this.gothrough ++;

        this.tilecount++;

        this.music = game.add.audio(this.sounds[this.gothrough]);
        this.play = true;
    }

}


//Pass this one an array of sounds you're looking to play. Ideally you'd call this in 2 instances, one for playing the correct sounds and one for playing the incorrect sounds
Dialogue.prototype.playsounds = function(locsounds, loctiles){

        this.tiles = loctiles;
        this.gothrough = 0;
        this.tilecount = 1;

        this.sounds = locsounds;
        this.play = true;

        this.music = game.add.audio(this.sounds[this.gothrough]);

}
