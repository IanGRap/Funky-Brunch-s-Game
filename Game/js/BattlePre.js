var BattlePre = function(game){
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

//Dog: Bork Bork Bark, heckin Bork!
//Dino: Wolfy's trying to say something! The ritual worked!
//Knight: No she isn't, Dogs can't talk. The ritual failed because Frankie brought a fake magical monster to the idols!
//Ghost: Your monsters are the fakers! LMONS is all about training hard and making friends. DMONS are just scary and violent.
//Knight: Well lets have a battle then to see whose Mons are best!
//Ghost: Let's do it, you'll be no match for my ghostly magic!
//Knight: Ooh I'm so scared of your flowery ghost sheet.
//Ghost: You should be, it's how I generate my natural spectral powers!
//Scientist: Uh, you guys, I don't think we should fight with a sword like that, it looks too dangerous...
//Knight: Nonsense, it might be real but I'm a master swordsman! I need it to fight off danger, I'll be careful with it.
//Dino: Yeah actually I think you should take it back to your parents, I don't want anyone to get hurt and that's too powerful.
//Astronaut: If he said he knows how to use it then who are we to take his sword away? Swords are cool.
//Dog: Bark Bark Bark!
//Knight: En Garde!
//Dog: Bork!
var conversations = [
    function(){dialogue('Bork Bork Bark, heckin Bork!', doX, doY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Wolfy\'s trying to say something! The ritual worked!', diX, diY, 'speachR', conversations[++index], 1);},
    function(){dialogue('No she isn\'t, Dogs can\'t talk.', kX, kY, 'speachR', conversations[++index], 1);},
    function(){dialogue('The ritual failed \'cause Frankie brought a fake magical monster!', kX, kY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Your monsters are the fakers!', gX, gY, 'speachR', conversations[++index], 1);},
    function(){dialogue('LMons is all about training hard and making friends.', gX, gY, 'speachR', conversations[++index], 1);},
    function(){dialogue('DMons are just scary and violent.', gX, gY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Well lets have a battle then to see whose Mons are best!', kX, kY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Let\'s do it, you\'ll be no match for my ghostly magic!', gX, gY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Ooh I\'m so scared of your flowery ghost sheet.', kX, kY, 'speachR', conversations[++index], 1);},
    function(){dialogue('You should be, it\'s how I generate my natural spectral powers!', gX, gY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Uh, you guys, I don\'t think we should fight with a sword like that.', sX, sY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Nonsense, it might be real but I\'m a master swordsman!', kX, kY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Yeah actually I think you should take it back to your parents.', diX, diY, 'speachR', conversations[++index], 1);},
    function(){dialogue('I don\'t want anyone to get hurt and that\'s too powerful.', diX, diY, 'speachR', conversations[++index], 1);},
    function(){dialogue('If he knows how to use it then why take it away?', aX, aY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Swords are cool.', aX, aY, 'speachR', conversations[++index], 1);},
    function(){dialogue('En Garde!', kX, kY, 'speachR', conversations[++index], 1);},
    function(){dialogue('Bork!', doX, doY, 'speachR', gamestart, 1);},
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
BattlePre.prototype = {

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
        console.log("gonna do a conversation");
        conversations[index]();
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

// Chronological Scenes

function movedown1(){
    scaletrigger = 1;
    tween = game.add.tween(camera).to( { y: 1160, x: 700},17000,"Linear",true,0);
    //console.log("Hey there");

    //starts the timer for the car moving into the shot
    time = game.time.now;
    delay = 7000;
    carmove = true;

    //When the prevois tween is complete run [THIS FUNCTION]
    tween.onComplete.add(function(){             cartalk1();        },this);    

}

function cartalk1(){
    //Adds the speach bubble
    themeIntro();
    dialogue("Have a good time with your\nfriends Sam!",400,1000,'speachL',cartalk2,1);
}
function cartalk2(){
    dialogue("Come on Mom, you've got to call me Dino",900,1000,'speachR',cartalk3,1);
}
function cartalk3(){
    dialogue("Alright honey, I'll be inside if you need anything",400,1000,'speachL',dinowalking,1);
}
function dinowalking(){
    dino = game.add.sprite(670,1200,'dino');
    dino.scale.setTo(0.8,0.8);
    dino.animations.add('stand', [0], 2, true);
    dino.animations.add('walk', [0,1,0,2], 2, true);
    dino.animations.play('walk',3);

    door.kill();
    door = game.add.sprite(650,1130,'door');  
    door.scale.setTo(1,.9);                    //REMOVE WHEN YOU GET PROPER ASSETS
    //makes door animations
    door.animations.add('open',[0,1,2]);  

    //Sets a delay for the door opening
    time = game.time.now;
    delay = 3000;
    doormove = true;   

    tween = game.add.tween(dino.scale).to({x:1.4,y:1.4},5000,"Linear",true,0);
    //When the prevois tween is complete run [THIS FUNCTION]
    tween.onComplete.add(function(){             closedoorscene();        },this);    


}
function closedoorscene(){
    dino.kill();
    dino = game.add.sprite(670,1200,'dino');
    dino.scale.setTo(1.4,1.4);
    dino.animations.add('stand', [0], 2, true);
    dino.animations.add('walk', [0,1,0,2], 2, true);
    dino.animations.play('stand',3);

    door.animations.add('close',[2,1,0]);  
    door.animations.play('close',4);
    door.animations.currentAnim.onComplete.add(function(){       walkright();     },this);
}

function walkright(){
    //Starts phase 2 zooming
    scaletrigger = 2;
    var tweencam = game.add.tween(camera).to( { x: 1430, y: 1350},9000,"Linear",true,0);


    //Starts the dino walking to the right
    dino.animations.play('walk',3);
    tween = game.add.tween(dino).to({x:1300,y: 1340},9000,"Linear",true,0);
    tween.onComplete.add(function(){         dino.animations.play('stand',3);      kidschat1();       },this);    
}

function kidschat1(){
    dialogue("Hey Dino,  glad you could make it to the party.",1950,1200,'speachR',kidschat2,1.8);
}
function kidschat2(){
    dialogue("No problem Doc, where's everyone at?",700,1100,'speachL',kidschat3,1.8);
}
function kidschat3(){
    dialogue("They're inside with their parents right now. Anyways, want to play a game?",1950,1200,'speachR',gamestart,1.8);
}

function gamestart(){
    //Screen Wipe Object Creation
    wipe = new ScreenWipe(game,'wipe');
    game.add.existing(wipe);
    wipe.animOutComplex(level1start,5000,3800,1.5);
}

function level1start(){
    game.state.start('Tutorial');
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

