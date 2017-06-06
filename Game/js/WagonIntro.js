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
var wipe;
var start = true;

//Scene objects
var talking;
var funct;
var triggered = 0;

var scientistPositionX;
var knightPositionX;
var dinoPositionX;
var scientistPositionY;
var knightPositionY;
var dinoPositionY;

var index = 0;

//function dialogue(phrase,x,y,direction,localfunct,scale)
var conversationsWagonIntro = [
    function(){console.log("index is "+index);dialogue('Dino, this is Sir...', scientistPositionX, scientistPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('Actually for introduction\'s sake, my name is Dinosaurus.', dinoPositionX, dinoPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('Ok... Sir Goldhelm, this is my friend Dinosaurus from school.', scientistPositionX, scientistPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('Glad to make your acquaintance.', knightPositionX, knightPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('Anyhow, our parents should be busy for a while, let\'s go on an adventure!', scientistPositionX, scientistPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('The world has been pretty scary lately.', dinoPositionX, dinoPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('It needs heroes!', knightPositionX, knightPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('That\'s right! Now climb aboard my horsecar!', scientistPositionX, scientistPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('Doctor, this is clearly a horse drawn carriage, please use the correct play terminology', knightPositionX, knightPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('C\'mon Mr knight we\'re just playing a game, settle down.', scientistPositionX, scientistPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('It\'s Sir Goldhelm!', knightPositionX, knightPositionY, 'speachR', conversationsWagonIntro[++index], 1);},
    function(){console.log("index is "+index);dialogue('RAWWWRERRR!', dinoPositionX, dinoPositionY, 'speachR', WagonIntro.prototype.gamestart, 1);},
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
        game.world.scale.setTo(1);
    },

    create : function(){
		//music = game.add.audio('themeloop');
	    //music.play();
	    //music.loopFull();
	    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(skipwagon);
        confirmskip = false;

    	console.log("In wagon intro")
    	var background = game.add.image(0,80,'village');
    	background.scale.setTo(1,1.2);

        scientistPositionX = 500;
        knightPositionX = 700;
        dinoPositionX = 900;
        scientistPositionY = 550;
        knightPositionY = 550;
        dinoPositionY = 550;

        var wagon = game.add.image(-250, 115, 'wagon');

        var scientist = game.add.sprite(scientistPositionX - 128, scientistPositionY + 128,'scientist');
        scientist.scale.setTo(0.5, 0.5);
        var knight = game.add.sprite(knightPositionX - 128, knightPositionY + 128,'knight');
        knight.scale.setTo(0.5, 0.5);
        var dino = game.add.sprite(dinoPositionX - 128, dinoPositionY + 128,'dino');
        dino.scale.setTo(0.5, 0.5);

        

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
            console.log("start is true");
            if (game.time.now - time > delay){ // Delay is up for writing the next character
                console.log("dialogue begins");
                start = false;
                conversationsWagonIntro[index]();
            }
        }

        // set our world scale as needed
        game.world.scale.set(worldScale);
    },

    gamestart : function (){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOut(WagonIntro.prototype.start);    
    },

    start : function(){
       game.state.start('MainMenu'); 
    }
}

function startTutorial(){
    wipe = new ScreenWipe(game,'wipe');
    game.add.existing(wipe);
    wipe.animOut(WagonIntro.prototype.start);   
}

function TutorialStarting(){
    game.state.start('Tutorial');
}
function skipwagon(){
    if(confirmskip){
        startTutorial();
    }else{
        var skipimg = game.add.sprite(670,600,'skipimg');
        confirmskip = true; 
    }
}

//enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//enter.onDown.add(skipintro);





