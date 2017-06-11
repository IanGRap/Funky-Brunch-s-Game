var TimeToGo = function(game){
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
var gX;
var parentX;

var sY;
var doY;
var diY;
var dY;
var aY;
var gY;
var parentY;

var index = 0;

timeToGoConversations = [
    function(){dialogue('Alright Sam, I\'m walking to the car now!', parentX, parentY, 'speachR', timeToGoConversations[++index], 1);},
    function(){dialogue('But we didn\'t solve anything...', diX, diY, 'speachR', timeToGoConversations[++index], 1);},
    function(){dialogue('We lost... we\'re some bad heroes.', gX, gY, 'speachR', timeToGoConversations[++index], 1);},
    function(){dialogue('Whatever. I don\'t even want to play anymore.', kX, kY, 'speachR', timeToGoConversations[++index], 1);},
    function(){dialogue('Sam, come on.', parentX, parentY, 'speachR', timeToGoConversations[++index], 1);},
    function(){dialogue('Okay... bye I guess.', diX, diY, 'speachR', TimeToGo.prototype.gamestart, 1);},
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
TimeToGo.prototype = {

    //load in art assets
    preload: function(){
        game.world.scale.setTo(1);
        game.load.audio('themestart',['assets/audio/main theme intro.mp3']);

    },

    create : function(){
        music = game.add.audio('themestart');
        music.play();
        music.loopFull();
        music.volume = 1;


        //skip code
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(skipTimeToGo);
        confirmskip = false;
        
        var background = game.add.image(-700, -900, 'background');
        var backgroundfront = game.add.image(-700, -900, 'backgroundfront');

        sX = 650;
        doX = 360 - 128;
        diX = 1440 * (1/2) - 128;
        kX = 425;
        aX = 850;
        gX = 1440 * (3/4) - 128;
        parentX = 625;

        sY = 275;
        doY = 450;
        diY = 405 + 100;
        kY = 300;
        aY = 250;
        gY = 405 + 100;
        parentY = 150;

        var scientist = game.add.sprite(sX - 128, sY + 128, 'scientist');
        //scientist.scale.setTo(0.5, 0.5);
        var dino = game.add.sprite(diX - 128, diY + 128, 'dino');
        //dino.scale.setTo(0.5, 0.5);
        var dog = game.add.sprite(doX - 128, doY + 128, 'dog');
        //dog.scale.setTo(0.5, 0.5);
        var knight = game.add.sprite(kX - 128, kY + 128, 'knight');
        //knight.scale.setTo(0.5, 0.5);
        var astronaut = game.add.sprite(aX - 128, aY + 128, 'astronaut');
        //astronaut.scale.setTo(0.5, 0.5);
        var ghost = game.add.sprite(gX - 128, gY + 128, 'ghost');
        //ghost.scale.setTo(0.5, 0.5);
        
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
                timeToGoConversations[index]();
            }
        }

        // set our world scale as needed
        //game.world.scale.set(worldScale);
    },

    gamestart: function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOutMusic(TimeToGo.prototype.start,music); 
        //wipe.animOutMusic(Wagonintrostart,5000,3800,music);    
    },

    start : function(){
        game.state.start('End');
    }
}

//Skip cutscene button
function skipTimeToGo(){
    if(confirmskip){
        TimeToGo.prototype.gamestart();
    }else{
        var skipimg = game.add.sprite(670,600,'skipimg');
        confirmskip = true; 
    }
}

