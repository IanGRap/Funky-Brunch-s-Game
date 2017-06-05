var BattlePost = function(game){
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

var battlePostConversations = [
    function(){dialogue('AAaAaah! Ouch!', kX, kY, 'speachR', battlePostConversations[++index], 1);},
    function(){dialogue('AAh I\'m sorry I didn\'t think my magic would hurt you!', gX, gY, 'speachR', battlePostConversations[++index], 1);},
    function(){dialogue('AAaaah, no I accidentally cut myself!', kX, kY, 'speachR', battlePostConversations[++index], 1);},
    function(){dialogue('I knew something like this would happen, we have to go back to the village!', sX, sY, 'speachR', battlePostConversations[++index], 1);},
    function(){dialogue('What about the idols?', diX, diY, 'speachR', battlePostConversations[++index], 1);},
    function(){dialogue('I don\'t think they\'re paying attention right now.', sX, sY, 'speachR', battlePostConversations[++index], 1);},
    function(){dialogue('We gotta get some medicine.', sX, sY, 'speachR', BattlePost.prototype.gamestart, 1);},
];

//Knight: AAaAaah! Ouch! 
//Ghost: AAh I'm sorry I didn't think my magic would hurt you!
//Knight: AAaaah, no I accidentally cut myself!
//Scientist: I knew something like this would happen, we have to go back to the village!
//Dino: What about the idols? 
//Scientist: I don't think they're paying attention right now, let alone caring which monsters we collect. We need to go back!


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
BattlePost.prototype = {


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

        var background = game.add.image(0, 95, 'temple');
        game.world.scale.setTo(1);

        console.log("post battle");
        sX = game.world.width/4 - 128;
        doX = game.world.width/4 - 128;
        diX = game.world.width * (1/2) - 128;
        kX = game.world.width * (1/2) - 128;
        aX = game.world.width * (3/4) - 128;
        gX = game.world.width * (3/4) - 128;

        sY = game.world.height/2;
        doY = game.world.height/2 + 128;
        diY = game.world.height/2;
        kY = game.world.height/2 + 128;
        aY = game.world.height/2;
        gY = game.world.height/2 + 128;

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
                battlePostConversations[index]();
            }
        }

        // set our world scale as needed
        //game.world.scale.set(worldScale);
    },

    gamestart : function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOutComplex(level1start,5000,3800,1.5);
    },

    start : function(){
        game.state.start('HealthCare');
    }
}




