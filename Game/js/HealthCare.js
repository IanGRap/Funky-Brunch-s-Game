var HealthCare = function(game){
    
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

healthCareConversations = [
    function(){dialogue('Goldhelm, have a seat on this medical bed while I look through a Doctor\'s kit.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Ow... Ow... Ow... Ow...', kX, kY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Well at least you might have a cool battle scar later!', aX, aY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Where\'s the cut?', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Right here on my finger. It\'s bleeding a little bit.', kX, kY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Goldhelm I don\'t know how to say this, but I can\'t help you.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('What? I thought you had band-aids in there?', kX, kY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('I only have two and they\'re my favorite Vindicators team bandaids.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('They have all of the heroes on them and everything.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('But I\'m hurt!', kX, kY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('That\'s not my fault.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('You\'ve been mean and rowdy this whole time.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('I don\'t owe you squat.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Hey aren\'t you the Doctor? Shouldn\'t you fix him?', diX, diY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('I\'m a Doctor of science, not medicine, and I don\'t feel like it.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('C\'mon Doc, sharing is caring.', aX, aY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Since he\'s hurt, he\'ll probably die.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Then we won\'t have to deal with his meanness anymore.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('I\'m gonna die?', kX, kY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('You\'re already dead! Everyone, ignore the spirit of Sir Goldhelm.', sX, sY, 'speachR', healthCareConversations[++index], 1);},
    function(){dialogue('Nooo!', kX, kY, 'speachR', gamestart, 1);},
];

//Scientist: Goldhelm, have a seat on this medical bed while I look through a Doctor's kit.
//Knight: Ow... Ow... Ow... Ow...
//Astronaut: Well at least you might have a cool battle scar later!
//Scientist: Where's the cut?
//Knight: Right here on my finger. It's bleeding a little bit.
//Scientist: Hmmm... Goldhelm I don't know how to say this... but I can't help you.
//Knight: What? I thought you had band-aids in there?
//Scientist: Well I only have two left and they're my favorite Vindicators team bandaids with all of the heroes on them and everything.
//Knight: But I'm hurt! 
//Scientist: That's not my fault, you've been mean and rowdy this whole time, I don't owe you squat.
//Dino: Hey aren't you the Doctor? Shouldn't you fix him?
//Scientist: I'm a Doctor of science, not medicine, and I don't feel like it.
//Astronaut: C'mon Doc, sharing is caring.
//Scientist: Since he's hurt, he'll probably die, and then we won't have to deal with his meanness anymore.
//Knight: I'm gonna die?
//Scientist: You're already dead! Everyone, ignore the spirit of Sir Goldhelm.
//Knight: Nooo!


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
HealthCare.prototype = {

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
        gX = game.world.width * (3/4) - 128;

        sY = game.world.height/2;
        doY = game.world.height/2 + 128;
        diY = game.world.height/2;
        kY = game.world.height/2 + 128;
        aY = game.world.height/2;
        gY = game.world.height/2 + 128;
        
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
        healthCareConversations[index]();
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

function next(){
    this.conversations[++index]();
}
