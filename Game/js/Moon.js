var Moon = function(game){
    
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

MoonConversations = [
    function(){dialogue('Blastofffffffffe!', aX, aY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('How long until we reach the Moon Congress castle?.', sX, sY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('Not more than a few more moments, just hold on.', aX, aY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('Why do you think they need so many rockets?', diX, diY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('Actually I think they said missiles, not rockets.', sX, sY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('And probably just to fly the moon around to fight bad guys.', sX, sY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('I don\'t think using the moon to fight bad guys is a good idea.', diX, diY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('It\'s really big and could fall down and destroy the whole planet!', diX, diY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('Well if it destroyed the planet it would probably just kill all the bad guys.', sX, sY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('Wait everybody I can see the moon in the sky right now! We\'re all gonna die!', gX, gY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('That\'s nonsense! Everybody needs the earth.', sX, sY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('Everyone settle down back there, I need a calm environment to fly properly!', sX, sY, 'speachR', MoonConversations[++index], 1);},
    function(){dialogue('Bork Bork Bork Bork Bork Bork Bork!', doX, doY, 'speachR', Moon.prototype.gamestart, 1);},
];

//Astronaut: Blastofffffffffe!
//Scientist: Captain Blastoffe how long until we reach the Moon Congress castle?
//Astronaut: Not more than a few more moments, just hold on, I'm not done flying yet.
//Dino: Why do you think they need so many rockets?
//Astronaut: Actually I think they said missiles, not rockets. And probably just to fly the moon around to fight bad guys.
//Dino: Wait is that why the moon is in a different spot every night?
//Scientist: It should be scientifically possible.
//Dino: I don't think using the moon to fight bad guys is a good idea, it's really big and could fall down and destroy the whole planet!
//Knight: Well if it destroyed the planet it would probably just kill all the bad guys that deserve it, and that would be good right?
//Ghost: Wait everybody I can see the moon in the sky right now! We're all gonna die!
//Scientist: That's nonsense! Everybody needs the earth, they wouldn't just crash into it and destroy everything to fight bad guys!
//Astronaut: Everyone settle down back there, I need a calm environment to fly properly!
//Dog: Bork Bork Bork Bork Bork Bork Bork!


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
Moon.prototype = {

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
		game.load.audio('finalfrontier',['assets/audio/finalfrontier.mp3']);

        //Loads fadeout asset
        game.load.image('wipe','assets/wipe.png');


    },

    create : function(){
    	//skip code
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(skipmoon);
        confirmskip = false;

        //Starts the music
        music = game.add.audio('finalfrontier');
        music.play();
        music.loopFull();
        music.volume = 1;
        

        var background = game.add.image(0, 95, 'space');
        game.world.scale.setTo(1);

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
                MoonConversations[index]();
            }
        }

        // set our world scale as needed
        //game.world.scale.set(worldScale);
    },

    gamestart : function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOut(this.start);
    },

    start : function(){
        game.state.start('Level8Congress');
    }
}

//Skip cutscene button
function skipmoon(){
    if(confirmskip){
        Moon.prototype.gamestart();
    }else{
        var skipimg = game.add.sprite(670,600,'skipimg');
        confirmskip = true; 
    }
}
