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
var wipe;

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
var conversationsWagonOutro = [
    function(){dialogue('Wow Doc this yard is amazing! Looks like we\'ve got a cool adventure ahead!', dinoPositionX, dinoPositionY, 'speachR', conversationsWagonOutro[++index], 1);},
    function(){dialogue('Thanks, I\'ve got a lot of ideas about where we should explore.',  scientistPositionX, scientistPositionY, 'speachR', conversationsWagonOutro[++index], 1);},
    function(){dialogue('And Sir Goldhelm I feel much safer about this adventure with a knight.', dinoPositionX, dinoPositionY, 'speachR', conversationsWagonOutro[++index], 1);},
    function(){dialogue('Why thank you. Doc, I do have to say that this is an impressive carriage.', knightPositionX, knightPositionY, 'speachR', conversationsWagonOutro[++index], 1);},
    function(){dialogue('I\'m glad you think so. I\'m going to go tell my parents we\'re going exploring.',  scientistPositionX, scientistPositionY, 'speachR', conversationsWagonOutro[++index], 1);},
    function(){dialogue(' I\'ll be right back!',  scientistPositionX, scientistPositionY, 'speachR', WagonOutro.prototype.gamestart, 1);}
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
    },

    create : function(){
        console.log("WagonOutro Create");
        start = true;

        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(skipwagonout);
        confirmskip = false;

        var background = game.add.image(0,80,'village');
        background.scale.setTo(1,1.2);
        var wagon = game.add.image( -400, 50, 'wagon');
        wagon.scale.setTo(1.2,1.2);

        scientistPositionX = 270;
        knightPositionX = 590;
        dinoPositionX = 440;
        scientistPositionY = 100;
        knightPositionY = 100;
        dinoPositionY = 150;

        var scientist = game.add.sprite(scientistPositionX - 128, scientistPositionY + 128,'scientist');
        //scientist.scale.setTo(0.5, 0.5);
        var knight = game.add.sprite(knightPositionX - 128, knightPositionY + 128,'knight');
        //knight.scale.setTo(0.5, 0.5);
        var dino = game.add.sprite(dinoPositionX - 128, dinoPositionY + 128,'dino');
        //dino.scale.setTo(0.5, 0.5);


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
                console.log("dialogue begins with index "+index);
                console.log(""+conversationsWagonIntro[index]);
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
        wipe.animOutMusic(WagonOutro.prototype.start,music);
    },

    start : function(){
       game.state.start('WagonParents'); 
    }
}

//Skip cutscene button
function skipwagonout(){
    if(confirmskip){
        WagonOutro.prototype.gamestart();
    }else{
        var skipimg = game.add.sprite(670,600,'skipimg');
        confirmskip = true; 
    }
}

//enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//enter.onDown.add(skipintro);
//confirmskip = false;




