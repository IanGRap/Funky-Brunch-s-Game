// constructor for Speach
function Speach(game, key, locationX, locationY, dialogue,scale){
    // sprite constructor
    Phaser.Sprite.call(this, game, locationX, locationY, key);

    // animations for circle being highlighted
    this.animations.add('passive', [0], 2, true);
    this.animations.add('active', [1,2], 2, true);
    this.scale.setTo(scale,scale);

    // Variables for character scroll effect
    this.next = 0;
    this.time = game.time.now;
    this.writing = true;
    this.delay = 40;
    this.dialogue = dialogue;

    boop = game.add.audio('dialogue');


    //Makes style for text with wordwrap so the text stays on the speach bubble
    this.style = { font: "24px Architects Daughter", fill: "#000000", wordWrap: true, wordWrapWidth: 330, align: "left"};    

    //Adjusts the text style depending on whether the bubble is left or right
    if(key == 'speachL'){
        this.style = { font: "24px Architects Daughter", fill: "#000000", wordWrap: true, wordWrapWidth: 330, align: "left"};
    }

    if(key == 'speachR'){
        this.style = { font: "24px Architects Daughter", fill: "#000000", wordWrap: true, wordWrapWidth: 330, align: "left"};    
    }

    //Sets the line spacing to a bit tighter

    //Adds the text on top of the bubble
    this.text = game.add.text(25,10,"",this.style);
    this.text.lineSpacing = -8;
    //Binds the text to the bubble
    this.addChild(this.text);
}

var boop;
// set inherited prototype
Speach.prototype = Object.create(Phaser.Sprite.prototype);
// declare constructor
Speach.prototype.constructor = Speach;

Speach.prototype.update = function(){
    if(this.writing){
        if (game.time.now - this.time > this.delay){ // Delay is up for writing the next character
            //When timer is up write next character
            if(this.next < this.dialogue.length){
                boop.play();
                this.text.text = this.text.text.concat(this.dialogue.charAt(this.next));
                this.next++;
                this.time = game.time.now;
               // game.time.events.add(2,function(){ this.next += 1;}, this);

            }else{
               this.writing = false; 
               this.animations.play('active',3);
            }
        }
    }

};

