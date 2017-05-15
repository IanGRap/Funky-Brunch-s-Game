// constructor for circle
function Dialogue(game, key, width){
    this.text = game.add.text(32, game.world.height-64, "", {fontSize: '32px', fill: 'Red'});

    // sprite constructor
    Phaser.Sprite.call(this, game, 0, game.world.height, key);

    //this.anchor.setTo(0, 1);

    let l = game.world.width / width;

    this.scale.setTo(l, 1);

    this.upcomingSpeakers = [null, null, null];
    this.upcomingConversations = [null, null, null];

    this.maxTime = 5000;
    this.remainingTime = this.maxTime;

    this.displaying = false;
}

// set inherited prototype
Dialogue.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Dialogue.prototype.constructor = Circle;

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

Dialogue.prototype.update = function(){
    this.remainingTime -= game.time.elapsed;
    if(this.displaying && this.remainingTime <= 0){
        console.log("removing text");
        this.displaying = false;
        this.text.text = '';
        this.checkNext();
    }
};

