var ToTheMoon = function(game){
    
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

var index = 0;

ToTheMoonConversations = [
    function(){dialogue('Frankie, why aren\'t you ignoring me?', kX, kY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('I\'m a ghost! So I must be dead too.', gX, gY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('I just thought at least we could talk.', gX, gY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('Doctor Xperiment, it isn\'t cool for you to let someone die because you don\'t want to share.', aX, aY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('Yeah! Even Wolfy agrees!.', diX, diY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('Bork!', doX, doY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('Ugh, ok if it\'s really that important.', sX, sY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('Goldhelm, you can have a bandaid. My parents can always just buy more.', sX, sY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('I can\'t figure out why we\'re all having such a hard time getting along today!', diX, diY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('I know! We can ask the Council of Heroes! They run the land!', aX, aY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('Where do they live?', sX, sY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('On the moon! I saw it in a Seaspan.', aX, aY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('They all live together in a fancy castle and argue about how to use our rockets!', aX, aY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('What\'s a Seaspan?', diX, diY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('I don\'t know, but that\'s what my Mom calls it when she watches them.', aX, aY, 'speachR', ToTheMoonConversations[++index], 1);},
    function(){dialogue('Let\'s use my spaceship!', aX, aY, 'speachR', ToTheMoon.prototype.gamestart, 1);},
];

//Knight: Frankie, why aren't you ignoring me?
//Ghost: I'm a ghost! So I must be dead too, I just thought at least we could talk.
//Astronaut: Doctor Xperiment, it isn't cool for you to let someone die because you don't want to share.
//Dino: Yeah! Even Wolfy agrees!
//Dog: Bork!
//Scientist: Ugh, ok if it's really that important. Goldhelm, you can have a bandaid. My parents can always just buy more at the store. 
//Dino: I can't figure out why we're all having such a hard time getting along today!
//Scientist: Well our parents can't either, it seems like there's just a lot of problems that nobody really knows how to solve.
//Astronaut: I know! We can ask the Council of Heroes! They run the country!
//Scientist: Wouldn't it be the Congress of Heroes? And where do they even live?
//Astronaut: On the moon! I saw it in a Seaspan, they all live together in a fancy castle and argue about how to use our rockets!
//Dino: What's a Seaspan?
//Astronaut: I don't know, but that's what my Mom calls it when she watches them. Let's use my spaceship!


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
ToTheMoon.prototype = {

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

        var background = game.add.image(0, 95, 'village');
        game.world.scale.setTo(1);

        var crate = game.add.image(600, 400, 'medical');
        var gurney = game.add.image(728, 400, 'gurney');

        sX = game.world.width/4 + 128;
        doX = game.world.width/4 - 128;
        diX = game.world.width * (1/2) - 128;
        kX = game.world.width * (1/2);
        aX = game.world.width * (3/4) - 128;
        gX = game.world.width * (3/4) - 256;

        sY = game.world.height/2 - 128;
        doY = game.world.height/2;
        diY = game.world.height/2;
        kY = game.world.height/2;
        aY = game.world.height/2;
        gY = game.world.height/2 + 128;

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
                ToTheMoonConversations[index]();
            }
        }

        // set our world scale as needed
        //game.world.scale.set(worldScale);
    },

    gamestart : function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOutComplex(this.start,5000,3800,1.5);
    },

    start : function(){
        game.state.start('');
    }
}

