var WagonParents = function(game){
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

var scientistPositionX;
var parent1X;
var parent2X;
var scientistPositionY;
var parent1Y;
var parent2Y;

var index = 0;

wagonParentsConversations = [
    function(){dialogue('I can\'t believe you could say something like that!', parent1X, parent1Y, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('If we don\'t implement a carbon tax the oil industry will melt the ice caps!', parent1X, parent1Y, 'speachR', wagonParentsConversations[++index], 1);}, 
    function(){dialogue('I just don\'t think the science is all there yet to prove that it\'s man made!', parent2X, parent2Y, 'speachL', wagonParentsConversations[++index], 1);},   
    function(){dialogue('I\'m blaming you when the planet floods.', parent1X, parent1Y, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('Mom we\'re going exploring!', scientistPositionX, scientistPositionY, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('That\'s nice honey, have fun.', parent1X, parent1Y, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('Everyone, the world is flooding, we need to get to my boat!', scientistPositionX, scientistPositionY, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('And we\'re bringing my pet Wolfy! She\'s really nice.', scientistPositionX, scientistPositionY, 'speachR', WagonParents.prototype.gamestart, 1);},
];

//    function(){dialogue('Well let\'s not get stuck on that one topic, how do you feel about immigration?', parent2X, parent2Y, 'speachR', wagonParentsConversations[++index], 1);},


//function dialogue(phrase,x,y,direction,localfunct,scale)
//Parent: I can't believe you could say something like that! If we don't implement a carbon tax the oil industry will melt the ice caps!
//Parent2: I just don't think the science is all there yet to prove that it's man made!
//Parent: I'm blaming you when the planet floods. 
//Scientist: Mom we're going exploring!
//Parent: That's nice honey, have fun.
//Parent2: Well let's not get stuck on that one topic, how do you feel about immigration?
//Everyone, the world is flooding, we need to get to my boat! And we're bringing my pet Wolfy! She's really nice.


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
WagonParents.prototype = {

    //load in art assets
    preload: function(){
        game.load.audio('themestart',['assets/audio/main theme intro.mp3']);

        worldScale = 1;
        game.world.scale.set(worldScale);

  
    },

    create : function(){
        //Starts the music
        music = game.add.audio('themestart');
        music.play();
        music.loopFull();
        music.volume = 1;


        //skip stuff
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(skipwagonpadres);
        confirmskip = false;

        var background = game.add.image(-700, -900, 'background');
        var backgroundfront = game.add.image(-700, -900, 'backgroundfront');

        scientistPositionX = 1028;
        parent1X = 800;
        parent2X = 500;
        scientistPositionY = 250;
        parent1Y = 250;
        parent2Y = 250;

        var scientist = game.add.sprite(scientistPositionX - 128, scientistPositionY + 128, 'scientist');
        //scientist.scale.setTo(0.5, 0.5);
        var dino = game.add.sprite(550, 650, 'dino');
        //dino.scale.setTo(0.5, 0.5);
        var dog = game.add.sprite(1100, 500, 'dog');
        //dog.scale.setTo(0.5, 0.5);
        var knight = game.add.sprite(750, 600, 'knight');
        //knight.scale.setTo(0.5, 0.5);
        
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

        index = 0;
        start = true;
    },

    update : function(){

        //Zooming Functionality, write an if statement with scaletrigger's value as an id then change the value of scale trigger
        //when you want to start zooming
       //   /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DEBUG

        if(start){
            if (game.time.now - time > delay){ // Delay is up for writing the next character
                start = false;
                wagonParentsConversations[index]();
            }
        }

        // set our world scale as needed
        game.world.scale.set(worldScale);
    },

    gamestart : function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOutMusic(WagonParents.prototype.start,music);    
    },

    start : function(){
        game.state.start('Level2GlobalWarm');
    }
}


function levelGlobalWarmstart(){
    game.state.start('Level2GlobalWarm');
}

//Skip cutscene button
function skipwagonpadres(){
    if(confirmskip){
        WagonParents.prototype.gamestart();
    }else{
        var skipimg = game.add.sprite(670,600,'skipimg');
        confirmskip = true; 
    }
}

//enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//enter.onDown.add(skipintro);
//confirmskip = false;