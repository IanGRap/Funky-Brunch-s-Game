var Intro = function(game){
}

//Global variables for Camera Control
var worldScale = 1;
var camera;
var tween;
var scaletrigger = 0;
var time;
var delay;
var spacebar;
var enter;
var wipe;
var clouds;
var confirmskip = false;

//Scene objects
var door;
var doormove = false;
var car;
var carmove = false;
var talking;
var funct;
var triggered = 0;
var dino;
var scientist;

Intro.prototype = {

    //load in art assets
    preload: function(){
        //Load's scene images
        game.load.image('car','assets/car.png');
        game.load.spritesheet('dinowalk','assets/dinowalk.png',256,256,3);
        game.load.spritesheet('door','assets/door.png',275,403,3);
        //Loads the Audio
        game.load.audio('intro',['assets/audio/sunrise song.mp3']);
        game.load.audio('themestart',['assets/audio/main theme intro.mp3']);
        game.load.audio('themeloop',['assets/audio/main theme loop.mp3']);
        game.load.audio('dialogue',['assets/audio/dialogue.mp3']);

        //Loads fadeout asset
        game.load.image('wipe','assets/wipe.png');


    },

    create : function(){
        //DEBUG
        //worldScale = .4;

        //Starts the music
        introSong();
        
        //Starts the skip function
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(skipintro);

        //Sets the background images
        var background = game.add.image(0,0,'background');

        clouds = game.add.tileSprite(-100,130,2800,800,'clouds');

        //treeline0 = this.add.tileSprite(0,250,1800,228,'treeline');


        car = game.add.sprite(-300,1090,'car');  
        car.scale.setTo(1,1.2);                    //REMOVE WHEN YOU GET PROPER ASSETS
        var backgroundfront = game.add.image(0,0,'backgroundfront');


        door = game.add.sprite(650,1130,'door');  
        door.scale.setTo(1,.9);                    //REMOVE WHEN YOU GET PROPER ASSETS
        //makes door animations
        door.animations.add('open',[0,1,2]);      

        //Places the kids in the scene
        //scientist
        scientist = game.add.sprite(1740,1440,'scientist');
        //scientist.scale.setTo(1.5,1.5);
        //scientist.animations.add('bubble',[0,1],2,true);
        //scientist.animations.play('bubble',4);

        //Fade in from black
        var fadeout = game.add.sprite(0,0,'fadeout');
        fadeout.scale.setTo(20,20);
        fadeout.alpha = 1;
        
        tween = game.add.tween(fadeout).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true);

        //When the prevois tween is complete run [THIS FUNCTION]
        tween.onComplete.add(function(){         movedown1()         },this);    

        game.world.setBounds(0, 0, 4000, 4000);

        //Camera That the window follows
        camera = game.add.sprite(700,500,'camera'); //-80
        camera.scale.setTo(0.5,0.5);

        game.camera.follow(camera);
        camera.alpha = 0;

        var wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animIn();
    },

    update : function(){

        //For cloud scrolling
        clouds.tilePosition.x += .2;

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

        //Timimng
        //Delay for car entering
        if(carmove){
            if (game.time.now - time > delay){ // Delay is up for writing the next character

                game.add.tween(car).to( { x:550 },8000,"Linear",true,0);
                carmove = false;
            }
        }
        if(doormove){
            if (game.time.now - time > delay){ // Delay is up for writing the next character
                door.animations.play('open',4);
                doormove = false;
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
    dialogue("Come on Mom, you've got to call me Dinosaurus",900,1000,'speachR',cartalk3,1);
}
function cartalk3(){
    dialogue("Alright honey, I'll be inside if you need anything",400,1000,'speachL',dinowalking,1);
}
function dinowalking(){
    dino = game.add.sprite(670,1200,'dinowalk');
    dino.scale.setTo(0.5,0.5);
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

    tween = game.add.tween(dino.scale).to({x:1,y:1},5000,"Linear",true,0);
    //When the prevois tween is complete run [THIS FUNCTION]
    tween.onComplete.add(function(){             closedoorscene();        },this);    


}
function closedoorscene(){
    dino.kill();
    dino = game.add.sprite(670,1200,'dinowalk');
    //dino.scale.setTo(1.4,1.4);
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
    dialogue("Hey Dino, glad you could make it to the costume party.",1950,1200,'speachR',kidschat2,1.8);
}
function kidschat2(){
    dialogue("Of course Doc, where's everyone at?",700,1100,'speachL',kidschat3,1.8);
}
function kidschat3(){
    console.log("well it's here");
    dialogue("Most kids are inside with their parents.",1950,1200,'speachR',kidschat4,1.8);
}

function kidschat4(){
    console.log("well it's here");
    dialogue("There's a lot of grown up talk going on.",1950,1200,'speachR',kidschat5,1.8);
}


function kidschat5(){
    console.log("well it's BRAHHH");
    dialogue("My cousin has a cool knight costume, he'll be out soon.\n Want to play with us?",1950,1200,'speachR',gamewagonstart,1.8);
}

function gamewagonstart(){
    enter = null;
    //Screen Wipe Object Creation
    wipe = new ScreenWipe(game,'wipe');
    game.add.existing(wipe);
    wipe.animOutComplex(Wagonintrostart,5000,3800,1.5);
    //wipe.animOutMusic(Wagonintrostart,5000,3800,music);

}

function Wagonintrostart(){
    console.log("Jumping over to wagon");
    worldScale = 1;
    game.world.scale.set(worldScale);
    game.state.start('WagonIntro');
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
        talking.delay = .00001;
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
    music.volume = 1;


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

function skipintro(){
    if(confirmskip){
        gamewagonstart();
    }else{
        var skipimg = game.add.sprite(670,600,'skipimg');
        confirmskip = true; 
    }
}
