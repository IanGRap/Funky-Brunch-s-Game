var RiverOutro = function(game){
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
var sY;
var doY;
var diY;
var dY;
var aY;

var index = 0;

riverOutroConversations = [
    function(){dialogue('Even if you don\'t believe me, the world is still ending.', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Well, it might flood but I just don\'t think it\'s our job to worry about it.', diX, diY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('We all made it on board, so let\'s just focus on finding new lands to adventure in.', kX, kY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Bork!', doX, doY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Hey, over here!', aX, aY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Steven? I mean, Captain Blastoffe, what are you doing here?', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('My parents are arguing about something so I thought I\'d come next door.', aX, aY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Do I smell french fries?', aX, aY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Oh yes there\'s a BBQ going on in the village.', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('The adults are all arguing about something there too.', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('We\'re on an adventure to figure out where the problems are coming from.', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Climb aboard!', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Hold on, he wasn\'t invited to join our party. ', kX, kY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Does that matter?.', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('The Captain is clearly hungry and needs someone to play with right now.', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('I don\'t think we can trust him.', kX, kY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Your parents didn\'t say he could come over.', kX, kY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Please, I really can\'t go back home right now.', aX, aY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('We can make some room for you Captain.', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('Dino, help me move these boxes.', sX, sY, 'speachR', riverOutroConversations[++index], 1);},
    function(){dialogue('There should be snacks somewhere in here that we can share.', sX, sY, 'speachR', gamestartRefugee, 1);},
];

//Scientist: Even if you don't believe me, the world is still ending.
//Dino: Well, it might flood but I just don't think it's our job to worry about it.
//Knight: We all made it on board, so let's just focus on finding new lands to adventure in.
//Dog: Bork!
//Astronaut: Hey, over here!
//Scientist: Steven? I mean, Captain Blastoffe, what are you doing here?
//Astronaut: My parents are arguing about something so I thought I'd come next door. Do I smell french fries?
//Scientist: Oh yes there's a BBQ going on in the village, the adults are all arguing about something there too. We're on an adventure through the backyard to figure out where the problems are coming from. Climb aboard!
//Knight: Hold on, he wasn't invited to join our party. 
//Scientist: Does that matter? The Captain is clearly hungry and needs someone to play with right now.
//Knight: I don't think we can trust him, I don't think he should be here if your parents didn't already say he could come over. 
//Astronaut: Please, I really can't go back home right now.
//Scientist: We can make some room for you Captain. Dino, help me move these boxes, there should be snacks somewhere in here that we can share. 


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
RiverOutro.prototype = {

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

        sX = game.world.width/4 - 128;
        doX = game.world.width/4 - 128;
        diX = game.world.width * (1/2) - 128;
        kX = game.world.width * (1/2) - 128;
        aX = game.world.width * (3/4) - 128;

        sY = game.world.height/2;
        doY = game.world.height/2 + 128;
        diY = game.world.height/2;
        kY = game.world.height/2 + 128;
        aY = game.world.height/2 - 128;
        
        //Fade in from black
        var fadeout = game.add.sprite(0,0,'fadeout');
        fadeout.scale.setTo(20,20);
        fadeout.alpha = 1;
        
        //tween = game.add.tween(fadeout).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true);

        //When the prevois tween is complete run [THIS FUNCTION]
        //tween.onComplete.add(function(){         conversations[0]         },this);    

        game.world.setBounds(0, 0, 4000, 4000);

        //Camera That the window follows
        camera = game.add.sprite(700,500,'camera'); //-80
        camera.scale.setTo(0.5,0.5);

        game.camera.follow(camera);
        camera.alpha = 0;
        console.log("gonna do a conversation");
        riverOutroConversations[index]();
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

        // set our world scale as needed
        game.world.scale.set(worldScale);
    }
}


function gamestartRefugee(){
    //Screen Wipe Object Creation
    wipe = new ScreenWipe(game,'wipe');
    game.add.existing(wipe);
    wipe.animOutComplex(levelRefugeestart,5000,3800,1.5);
}

function levelRefugeestart(){
    game.state.start('Level3Refugee');
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

//Music Flow
function introSong(){
    //start audio
    music = game.add.audio('intro');
    music.play();

    //Jump to next song when over
   // music.onStop.add(function(){ themeIntro(); }, this);
}

function themeIntro(){
    music = game.add.audio('themestart');
    music.play();

    //jump to loop version when over
    music.onStop.add(function(){ themeLoop(); }, this);
}

function themeLoop(){
    //plays and loops
    music = game.add.audio('themeloop');
    music.play();
    music.loopFull();
}

