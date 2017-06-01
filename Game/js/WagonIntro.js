var WagonIntro = function(game){
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
var start = true;

//Scene objects
var talking;
var funct;
var triggered = 0;
var dino;
var scientist;
var knight;

var scientistPositionX;
var knightPositionX;
var dinoPositionX;
var scientistPositionY;
var knightPositionY;
var dinoPositionY;

var index = 0;

//function dialogue(phrase,x,y,direction,localfunct,scale)
var conversationsWagonIntro = [
    function(){dialogue('Dino, this is Sir...', scientistPositionX, scientistPositionY, 'speachL', conversationsWagonIntro[++index], 1);},
    function(){dialogue('Actually for introduction\'s sake, my name is Dinosaurus.', dinoPositionX, dinoPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){dialogue('Ok... Sir Goldhelm, this is my friend Dinosaurus from school.', scientistPositionX, scientistPositionY, 'speachL', conversationsWagonIntro[++index], 1);},
    function(){dialogue('Glad to make your acquaintance.', knightPositionX, knightPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){dialogue('Anyhow, our parents should be busy for a while, let\'s go on an adventure!', scientistPositionX, scientistPositionY, 'speachL', conversationsWagonIntro[++index], 1);},
    function(){dialogue('The world has been pretty scary lately.', dinoPositionX, dinoPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){dialogue('It needs heroes!', knightPositionX, knightPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){dialogue('That\'s right! Now climb aboard my horsecar!', scientistPositionX, scientistPositionY, 'speachL', conversationsWagonIntro[++index], 1);},
    function(){dialogue('Doctor, this is clearly a horse drawn carriage, please use the correct play terminology', knightPositionX, knightPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){dialogue('C\'mon Mr knight we\'re just playing a game, settle down.', scientistPositionX, scientistPositionY, 'speachL', conversationsWagonIntro[++index], 1);},
    function(){dialogue('It\'s Sir Goldhelm!', knightPositionX, knightPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){dialogue('RAWWWRERRR!', dinoPositionX, dinoPositionY, 'speachR', starttutorial, 1);},
];

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
WagonIntro.prototype = {

    //load in art assets
    preload: function(){
    	game.world.scale.set(1);

        //loads the main background image

        //Load debug images and effects
        game.load.image('camera','assets/camera.png');
        game.load.image('fadeout','assets/fadeout.png');

        //Loads scene images
        game.load.image('background','assets/WagonScene.png');

        //Loads the character sprites
        game.load.image('scientist','assets/Scientist.png');
        game.load.image('knight','assets/knight.png');
        game.load.image('dino','assets/Dinosaur.png');

        //Load Speach Assets
        game.load.spritesheet('speachR','assets/speachR.png',381,157,3);
        game.load.spritesheet('speachL','assets/speachL.png',381,157,3);
        //Loads the Audio
        game.load.audio('dialogue',['assets/audio/dialogue.mp3']);

        //Loads fadeout asset
        game.load.image('wipe','assets/wipe.png');


    },

    create : function(){
    	console.log("In wagon intro")
    	var background = game.add.image(0,80,'background');
    	background.scale.setTo(1,1.2);

        scientistPositionX = 1440/4 - 300;
        knightPositionX = 1440 * (1/2) + 20;
        dinoPositionX = 1440 * (3/4) - 88;
        scientistPositionY = 810/2 - 100;
        knightPositionY = 810/2 - 150;
        dinoPositionY = 810/2;

        scientist = game.add.sprite(1440/4,810/2,'scientist');
        knight = game.add.sprite(1440 * (1/2) - 128, 810/2,'knight');
        dino = game.add.sprite(1440* (3/4) - 258,810/2+20,'dino');


        //Screen Wipe Object Creation
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
        //conversationsWagonIntro[index]();
    },

    update : function(){
        if(start){
            if (game.time.now - time > delay){ // Delay is up for writing the next character
                start = false;
                conversationsWagonIntro[index]();
            }
        }

        // set our world scale as needed
        game.world.scale.set(worldScale);
    }
}

function starttutorial(){
    //Screen Wipe Object Creation
    wipe = new ScreenWipe(game,'wipe');
    game.add.existing(wipe);
    wipe.animOutComplex(runtutorial,5000,3800,1.5);
}

function runtutorial(){
    game.state.start('Tutorial');
}