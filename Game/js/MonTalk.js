var MonTalk = function(game){
}

//Global variables for Camera Control
var worldScale = 1;
var camera;
var tween;
var scaletrigger = 0;
var time;
var delay;
var spacebar;
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

var monTalkConversations = [
    function(){dialogue('Here, in front of the Idol,', gX, gY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('I offer my favorite Legendary Mon, Pyrochilla!', gX, gY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('...', gX, gY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('I don\'t think anything is happening.', gX, gY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('Maybe we didn\'t do something right.', gX, gY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('I think these markings might have something to do with it!', diX, diY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('I drew those last week...', sX, sY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('But maybe you didn\'t know they were magical when you drew them.', diX, diY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('We should stand on them!', diX, diY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('You\'re all wrong, LMons are just a copy of Dungeon Mons.', kX, kY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('They are the real magical creatures to collect.', kX, kY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('My older brothers said so.', kX, kY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('Yeah actually I\'m more of a DMONS Dino myself.', diX, diY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('So let\'s just stand on these magical tiles and see what happens then!', sX, sY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('I\'m gonna offer my Cantankerous Void Dancer instead.', kX, kY, 'speachR', monTalkConversations[++index], 1);},
    function(){dialogue('Bork!', doX, doY, 'speachR', MonTalk.prototype.gamestart, 1);},
];

//Ghost: Here, in front of the Idol, I offer my favorite Legendary Mon, Pyrochilla! ...
//hmm, I don't think anything is happening, maybe we didn't do something right.
//Dino: I think these markings on these tiles might have something to do with it!
//Scientist: I drew those last week...
//Dino: But maybe you didn't know they were magical when you drew them, we should stand on them!
//Knight: You're all wrong, Legendary Mons are just a copy of Dungeon Mons, which are the real magical creatures to collect. My older brothers said so.
//Dino: Yeah actually I'm more of a DMONS Dino myself, always have been.
//Scientist: So let's just stand on these magical tiles and see what happens then!
//Knight: I'll be offering my Cantankerous Void Dancer to the Idol instead of that dumb LMON Pyrochilla.
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
MonTalk.prototype = {

    //load in art assets
    preload: function(){
        //loads the main background image

        //Load debug images and effects
        game.load.image('camera','assets/camera.png');
        game.load.image('fadeout','assets/fadeout.png');

        //Load's scene images
        game.load.image('temple','assets/Temple.png');

        //Load Speach Assets
        game.load.spritesheet('speachR','assets/speachR.png',381,157,3);
        game.load.spritesheet('speachL','assets/speachL.png',381,157,3);
        //Loads the Audio
        game.load.audio('dialogue',['assets/audio/dialogue.mp3']);
        game.load.audio('desertsands',['assets/audio/desertsands.mp3']);


        //Loads fadeout asset
        game.load.image('wipe','assets/wipe.png');

            game.world.scale.setTo(1);
    },

    create : function(){
        music = game.add.audio('desertsands');
        music.play();
        music.loopFull();
        music.volume = 1;

        //skip code
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(skipMonTalk);
        confirmskip = false;

        var background = game.add.image(0, 20, 'temple');
        background.scale.setTo(1, 1.1);

        sX = 300;
        doX = 200;
        diX = 500;
        kX = 592;
        aX = 900;
        gX = 952;

        sY = 200;
        doY = 400;
        diY = 220;
        kY = 448;
        aY = 120;
        gY = 348;

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
        
        //Fade in from black
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
        //tween = game.add.tween(fadeout).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true);

        //When the prevois tween is complete run [THIS FUNCTION]
        //tween.onComplete.add(function(){         conversations[0]         },this);    

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
                console.log('starting dialogue');
                start = false;
                monTalkConversations[0]();
            }
        }

        // set our world scale as needed
        //game.world.scale.set(worldScale);
    },

    gamestart : function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOut(MonTalk.prototype.start); 
    },

    start :function(){
        game.state.start('Level4Religion');
    }
}


//Skip cutscene button
function skipMonTalk(){
    if(confirmskip){
        MonTalk.prototype.gamestart();
    }else{
        var skipimg = game.add.sprite(670,600,'skipimg');
        confirmskip = true; 
    }
}

//enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//enter.onDown.add(skipintro);
//confirmskip = false;
