var BattlePre = function(game){
}

//Global variables for Camera Control
var worldScale = 1;
var camera;
var tween;
var scaletrigger = 0;
var time;
var delay;
var spacebar;
var music;
var wipe;

//Scene objects
var talking;
var funct;
var triggered = 0;
var dino;
var scientist;

var sX;
var doX;
var diX;
var kX;
var aX;
var gX

var sY;
var doY;
var diY;
var dY;
var aY;
var gY;

var index = 0;

battlePreConversations = [
    function(){dialogue('Bork Bork Bark, heckin Bork!', doX, doY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Wolfy\'s trying to say something! The ritual worked!', diX, diY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('No she isn\'t, Dogs can\'t talk.', kX, kY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('The ritual failed \'cause Frankie brought a fake magical monster!', kX, kY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Your monsters are the fakers!', gX, gY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('LMons is all about training hard and making friends.', gX, gY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('DMons are just scary and violent.', gX, gY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Well lets have a battle then to see whose Mons are best!', kX, kY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Let\'s do it, you\'ll be no match for my ghostly magic!', gX, gY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Ooh I\'m so scared of your flowery ghost sheet.', kX, kY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('You should be, it\'s how I generate my natural spectral powers!', gX, gY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Uh, you guys, I don\'t think we should fight with a sword like that.', sX, sY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Nonsense, it might be real but I\'m a master swordsman!', kX, kY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Yeah actually I think you should take it back to your parents.', diX, diY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('I don\'t want anyone to get hurt and that\'s too powerful.', diX, diY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('If he knows how to use it then why take it away?', aX, aY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Swords are cool.', aX, aY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('En Garde!', kX, kY, 'speachR', battlePreConversations[++index], 1);},
    function(){dialogue('Bork!', doX, doY, 'speachR', BattlePre.prototype.gamestart, 1);},
];

//Dog: Bork Bork Bark, heckin Bork!
//Dino: Wolfy's trying to say something! The ritual worked!
//Knight: No she isn't, Dogs can't talk. The ritual failed because Frankie brought a fake magical monster to the idols!
//Ghost: Your monsters are the fakers! LMONS is all about training hard and making friends. DMONS are just scary and violent.
//Knight: Well lets have a battle then to see whose Mons are best!
//Ghost: Let's do it, you'll be no match for my ghostly magic!
//Knight: Ooh I'm so scared of your flowery ghost sheet.
//Ghost: You should be, it's how I generate my natural spectral powers!
//Scientist: Uh, you guys, I don't think we should fight with a sword like that, it looks too dangerous...
//Knight: Nonsense, it might be real but I'm a master swordsman! I need it to fight off danger, I'll be careful with it.
//Dino: Yeah actually I think you should take it back to your parents, I don't want anyone to get hurt and that's too powerful.
//Astronaut: If he said he knows how to use it then who are we to take his sword away? Swords are cool.
//Dog: Bark Bark Bark!
//Knight: En Garde!
//Dog: Bork!


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Building Blocks for cutscenes
/*

- Do something when the previous tween is done
{ex tween}         tween = game.add.tween(fadeout).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true);

tween.onComplete.add(function(){         movedown1()         },this);    


- Dialogue that goes to the next function after
    dialogue("Come on Mom, you've got to call me Dino",900,1000,'speachR',cartalk3,1);




*/
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
BattlePre.prototype = {

    //load in art assets
    preload: function(){
        //loads the main background image

        //Load debug images and effects
        game.load.image('camera','assets/camera.png');
        game.load.image('fadeout','assets/fadeout.png');

        //Load's scene images


        //Load Speach Assets
        game.load.spritesheet('speachR','assets/speachR.png',381,157,3);
        game.load.spritesheet('speachL','assets/speachL.png',381,157,3);
        //Loads the Audio
        game.load.audio('dialogue',['assets/audio/dialogue.mp3']);

        //Loads fadeout asset
        game.load.image('wipe','assets/wipe.png');


    },

    create : function(){
        var background = game.add.image(0, 20, 'temple');
        background.scale.setTo(1, 1.1);

        sX = 1440 * (1/2);
        doX = 1440 * (1/2);
        gX = 1440 * (1/2) - 128;
        kX = 1440 * (1/2) - 128;
        aX = 1440 * (1/2) - 256;
        diX = 1440 * (1/2) - 256;

        sY = 205;
        doY = 205 + 128;
        gY = 205;
        kY = 205 + 128;
        aY = 205;
        diY = 205 + 128;

        var scientist = game.add.sprite(sX - 128, sY + 128, 'scientist');
        scientist.scale.setTo(0.5, 0.5);
        var dino = game.add.sprite(diX - 128, diY + 128, 'dino');
        dino.scale.setTo(0.5, 0.5);
        var dog = game.add.sprite(doX - 128, doY + 128, 'dog');
        dog.scale.setTo(0.5, 0.5);
        var knight = game.add.sprite(kX - 128, kY + 128, 'knight');
        knight.scale.setTo(0.5, 0.5);
        var astronaut = game.add.sprite(aX - 128, aY + 128, 'astronaut');
        astronaut.scale.setTo(0.5, 0.5);
        var ghost = game.add.sprite(gX - 128, gY + 128, 'ghost');
        ghost.scale.setTo(0.5, 0.5);
        
        var wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animIn();
        delay = 1500;
        time = game.time.now;
   

        game.world.setBounds(0, 0, 4000, 4000);

        //Camera That the window follows
        camera = game.add.sprite(700,500,'camera'); //-80
        camera.scale.setTo(0.5,0.5);

        game.camera.follow(camera);
        camera.alpha = 0;
        console.log("gonna do a conversation");

        start = true;
        index = 0;
    },

    update : function(){

        //Zooming Functionality, write an if statement with scaletrigger's value as an id then change the value of scale trigger
        //when you want to start zooming
       //   /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DEBUG
       if(scaletrigger == 1){
            if(worldScale < 1.3){
                worldScale += 0.0004;
            }
        }
       //    *///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DEBUG
        if(scaletrigger == 2){
            if(worldScale > 0.6){
                worldScale -= 0.0012;
            }
        }

        if(start){
            if (game.time.now - time > delay){ // Delay is up for writing the next character
                start = false;
                battlePreConversations[index]();
            }
        }

        // set our world scale as needed
        game.world.scale.set(worldScale);
    },

    gamestart : function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOutComplex(BattlePre.prototype.start,5000,3800,1.5); 
    },

    start : function(){
        game.state.start('temp');
    }

}
