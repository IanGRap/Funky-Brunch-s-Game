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
var music;
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
    function(){dialogue('I just don\'t think the science is all there yet to prove that it\'s man made!', parent2X, parent2Y, 'speachR', wagonParentsConversations[++index], 1);},   
    function(){dialogue('I\'m blaming you when the planet floods.', parent1X, parent1Y, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('Mom we\'re going exploring!', scientistPositionX, scientistPositionY, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('That\'s nice honey, have fun.', parent1X, parent1Y, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('Well let\'s not get stuck on that one topic, how do you feel about immigration?', parent2X, parent2Y, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('Everyone, the world is flooding, we need to get to my boat!', scientistPositionX, scientistPositionY, 'speachR', wagonParentsConversations[++index], 1);},
    function(){dialogue('And we\'re bringing my pet Wolfy! She\'s really nice.', scientistPositionX, scientistPositionY, 'speachR', gamestart, 1);},
];

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
        var background = game.add.image(-700, -900, 'background');
        var backgroundfront = game.add.image(-700, -900, 'backgroundfront');

        scientistPositionX = 1028;
        parent1X = 800;
        parent2X = 600;
        scientistPositionY = 325;
        parent1Y = 250;
        parent2Y = 250;

        var scientist = game.add.sprite(scientistPositionX - 128, scientistPositionY + 128, 'scientist');
        scientist.scale.setTo(0.5, 0.5);
        var dino = game.add.sprite(700, 700, 'dino');
        dino.scale.setTo(0.5, 0.5);
        var dog = game.add.sprite(1100, 500, 'dog');
        dog.scale.setTo(0.5, 0.5);
        var knight = game.add.sprite(850, 750, 'knight');
        knight.scale.setTo(0.5, 0.5);
        
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
                wagonParentsConversations[index]();
            }
        }

        // set our world scale as needed
        game.world.scale.set(worldScale);
    }
}


function gamestartparents(){
    //Screen Wipe Object Creation
    wipe = new ScreenWipe(game,'wipe');
    game.add.existing(wipe);
    wipe.animOutComplex(levelGlobalWarmstart,5000,3800,1.5);
}

function levelGlobalWarmstart(){
    game.state.start('Level2GlobalWarm');
}

//Function to do the work on the Speach js file
//To use you need ["string"],[#],[#],['speachL' or 'speachR'] [function to go to after speach plays]
function dialogue(phrase,x,y,direction,localfunct,scale){
    //Adds the speach bubble
    talking = new Speach(game, direction, x, y, phrase,scale);
    game.add.existing(talking);

    funct = localfunct;
    triggered = 1;

    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(check);
}

function check(){
    if(talking.writing){
        //space bar to make the delay between characters immediate
        talking.delay = .0001;
    }else if(talking.writing == false){
        if(triggered==1){
            //gets rid of current bubble
            talking.kill();  
            game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
            triggered = 0;
            //Next scene
            funct();
         }
    }   
}
