var Council = function(game){
    
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

var trumpX;
var trumpY;
var congressX;
var congressY;
var parentX;
var parentY;

var index = 0;

CouncilConversations = [
    function(){dialogue('See, I told you we\'d make it!', aX, aY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('The heroes here will be able to solve all our problems!', aX, aY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('I agree, if they are in charge of the country they have to figure out a solution.', sX, sY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('Hey Congress heroes! We have a lot of problems for you to fix', diX, diY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('Sorry kids but we actually have some problems of our own to work out here first.', congressX, congressY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('Like What?!?', diX, diY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('We can\'t figure out how to get along.', congressX, congressY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('Things have just gotten worse since we picked the new king of heroes.', congressX, congressY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('You don\'t know how to get along?!? You\'re the Congress of Heroes!', sX, sY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('Shhh, he\'s about to speak.', congressX, congressY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('I\'m the king and you all better listen to what I have to say.', trumpX, trumpY, 'speachL', CouncilConversations[++index], 1);},
    function(){dialogue('If you don\'t then you are no good to me!', trumpX, trumpY, 'speachL', CouncilConversations[++index], 1);},
    function(){dialogue('What? This is crazy!', gX, gY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('Hey kids. The party is wrapping up so get ready to leave', parentX, parentY, 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('Oh no! We\'re running out of time', diX, diY, 'speachR', Council.prototype.gamestart, 1);},
    /*function(){dialogue('', , , 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('', , , 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('', , , 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('', , , 'speachR', CouncilConversations[++index], 1);},
    function(){dialogue('', , , 'speachR', Council.prototype.gamestart, 1);},*/
];

//Astronaut: See, I told you we'd make it! I know we're all afraid of the world ending for a bunch of different reasons, but we can ask the heroes here to help solve the world's problems before it does!
//Scientist: I agree, if they are in charge of the country they must be smart enough to figure out a solution.
//Dino: Hey Congress heroes! We have a lot of problems for you to help work out!
//Congress: Well I'm sorry to disappoint you kids but we actually have some problems of our own to work out here on the moon before we can even think about helping the people of Earth!
//Dino: Like What?!?
//Congress: Well we can't figure out how to get along, and things have just gotten worse since we picked the new king of heroes, he's got a fiery tongue, that one. 
//Scientist: You don't know how to get along?!? You're the Congress of Heroes!
//Congress: Shh, stand back, here he comes, we have to listen!

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
Council.prototype = {

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

        var background = game.add.image(0, 95, 'council');
        game.world.scale.setTo(1);

        var trump = game.add.image(1440 - 256, 400, 'trump');
        trumpX = trump.x - 256;
        trumpY = trump.y - 128;

        var congress = [
            game.add.image(900, 700, 'congress'),
            game.add.image(400, 400, 'congress'),
            game.add.image(300, 50, 'congress'),
            game.add.image(1000, 150, 'congress'),
            game.add.image(700, 300, 'congress')

        ];

        congressX = congress[0].x + 128;
        congressY = congress[0].y - 128;

        parentX = 25;
        parentY = 425;

        sX = 1440/4 - 100;
        doX = 1440/4 - 200;
        diX = 1440/4 - 128;
        kX = 1440/4;
        aX = 1440/4 - 128;
        gX = 1440/4 - 200;

        sY = 810/2 - 256;
        doY = 810/2 - 300;
        diY = 810/2 + 64;
        kY = 810/2 + 25;
        aY = 810/2 - 64;
        gY = 810/2 + 175;

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
                CouncilConversations[index]();
            }
        }

        // set our world scale as needed
        //game.world.scale.set(worldScale);
    },

    gamestart : function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOutComplex(Council.prototype.start,5000,3800,1.5);
    },

    start : function(){
        game.state.start('Level8Congress');
    }
}

