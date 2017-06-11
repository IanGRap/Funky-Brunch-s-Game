var End = function(game){
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

var diX;
var parentX;

var diY;
var parentY;

var index = 0;

EndConversations = [
    function(){dialogue('So, did you have fun at the party.', parentX, parentY, 'speachL', EndConversations[++index], 1);},
    function(){dialogue('No, everyone was fighting and we couldn\'t make anyone get along.', diX, diY, 'speachR', EndConversations[++index], 1);},
    function(){dialogue('We tried so hard.', diX, diY, 'speachR', EndConversations[++index], 1);},
    function(){dialogue('Awww, Sam it\'s okay.', parentX, parentY, 'speachL', EndConversations[++index], 1);},
    function(){dialogue('It is...?', diX, diY, 'speachR', EndConversations[++index], 1);},
    function(){dialogue('You aren\'t going to be able to solve everyone\'s problem in a day.', parentX, parentY, 'speachL', EndConversations[++index], 1);},
    function(){dialogue('But if you give it your best, you will make a difference.', parentX, parentY, 'speachL', EndConversations[++index], 1);},
    function(){dialogue('That makes it all worth it in the end.', parentX, parentY, 'speachL', EndConversations[++index], 1);},
    function(){dialogue('It does?', diX, diY, 'speachR', EndConversations[++index], 1);},
    function(){dialogue('Yep. And don\'t worry, you are still my little hero!', parentX, parentY, 'speachL', EndConversations[++index], 1);},
    function(){dialogue('...', diX, diY, 'speachR', EndConversations[++index], 1);},
    function(){dialogue('... Thanks Mom.', diX, diY, 'speachR', End.prototype.gamestart, 1);},
];

//Astronaut: Thanks for letting me on your boat! I think we'll have a lot of fun together!
//Knight: Well I suppose if the Doctor can vouch for you then you're ok to stay.
//Dino: Everyone is a stranger until you give them a chance to be your friend!
//Dog: Heckin Bork!
//Ghost tweens from transparent to opaque, appearing next to the boat
//Ghost: Boo.
//Dino: AAAH! Ghost!
//Scientist: Oh hi Frankie! 
//Ghost: I saw you all arguing from over by the sandbox and I didn't want to come over until you worked things out.
//Scientist: Yeah everyone seems to be angry these days and we don't know why.
//Ghost: Well I have an idea of how we might get some answers.
//Scientist: How?
//Ghost: If we bring an offering to the Idols of the garden temple, they might have an answer for us!
//Dino: How would you know that? 
//Ghost: I saw it on an episode of Legendary Mons.
//Astronaut: I love LMONS! Let's go!


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
End.prototype = {

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
        enter.onDown.add(skipEnd);
        confirmskip = false;
        
        //var background = game.add.image(-700, -900, 'background');
        //var backgroundfront = game.add.image(-700, -900, 'backgroundfront');


        diX = 900;
        diY = 400;

        parentX = 200;
        parentY = 300;

        //var scientist = game.add.sprite(sX - 128, sY + 128, 'scientist');
        //scientist.scale.setTo(0.5, 0.5);
        //var dino = game.add.sprite(diX - 128, diY + 128, 'dino');
        //dino.scale.setTo(0.5, 0.5);
        //var dog = game.add.sprite(doX - 128, doY + 128, 'dog');
        //dog.scale.setTo(0.5, 0.5);
        //var knight = game.add.sprite(kX - 128, kY + 128, 'knight');
        //knight.scale.setTo(0.5, 0.5);
        //var astronaut = game.add.sprite(aX - 128, aY + 128, 'astronaut');
        //astronaut.scale.setTo(0.5, 0.5);
        //var ghost = game.add.sprite(gX - 128, gY + 128, 'ghost');
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
                EndConversations[index]();
            }
        }

        // set our world scale as needed
        //game.world.scale.set(worldScale);
    },

    gamestart: function(){
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animOutMusic(End.prototype.start,music); 
        //wipe.animOutMusic(Wagonintrostart,5000,3800,music);    
    },

    start : function(){
        game.state.start('EndScreen');
    }
}

//Skip cutscene button
function skipEnd(){
    if(confirmskip){
        End.prototype.gamestart();
    }else{
        var skipimg = game.add.sprite(670,600,'skipimg');
        confirmskip = true; 
    }
}

