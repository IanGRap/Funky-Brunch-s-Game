var WagonOutro = function(game){
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

var scientistPositionX;
var knightPositionX;
var dinoPositionX;
var scientistPositionY;
var knightPositionY;
var dinoPositionY;

var index = 0;

//function dialogue(phrase,x,y,direction,localfunct,scale)
var conversationsWagonOutro = [
    function(){dialogue('Wow Doc this yard is amazing, looks like we\'ve got a cool adventure ahead of us!', dinoPositionX, dinoPositionY, 'speachR', conversationsWagonOutro[++index], 1);},
    function(){dialogue('Thanks, I\'ve got a lot of ideas about where we should explore.',  scientistPositionX, scientistPositionY, 'speachL', conversationsWagonOutro[++index], 1);},
    function(){dialogue('And Sir Goldhelm I feel much safer about this adventure with a knight.', dinoPositionX, dinoPositionY, 'speachR', conversationsWagonOutro[++index], 1);},
    function(){dialogue('Why thank you. Doc, I do have to say that this is an impressive carriage.', knightPositionX, knightPositionY, 'speachR', conversationsWagonOutro[++index], 1);},
    function(){dialogue('I\'m glad you think so. I\'m going to go tell my parents we\'re going exploring.',  scientistPositionX, scientistPositionY, 'speachL', conversationsWagonOutro[++index], 1);},
    function(){dialogue(' I\'ll be right back!',  scientistPositionX, scientistPositionY, 'speachL', WagonOutro.prototype.gamestart, 1);}
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
WagonOutro.prototype = {

    //load in art assets
    preload: function(){
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
        start = true;
        var background = game.add.image(0,80,'background');
        background.scale.setTo(1,1.2);

        scientistPositionX = game.world.width/4 - 300;
        knightPositionX = game.world.width * (1/2) + 20;
        dinoPositionX = game.world.width * (3/4) - 88;
        scientistPositionY = game.world.height/2 - 100;
        knightPositionY = game.world.height/2 - 150;
        dinoPositionY = game.world.height/2;

        scientist = game.add.sprite(game.world.width/4,game.world.height/2,'scientist');
        knight = game.add.sprite(game.world.width * (1/2) - 128, game.world.height/2,'knight');
        dino = game.add.sprite(game.world.width * (3/4) - 258,game.world.height/2+20,'dino');


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

        index = 0;
        start = true;
    },

    update : function(){

        if(start){
            if (game.time.now - time > delay){ // Delay is up for writing the next character
                start = false;
                conversationsWagonOutro[index]();
            }
        }

        // set our world scale as needed
        game.world.scale.set(worldScale);
    },

    gamestart: function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOutComplex(WagonOutro.prototype.start,5000,3800,1.5);
    },

    start : function(){
       game.state.start('WagonParents'); 
    }
}





