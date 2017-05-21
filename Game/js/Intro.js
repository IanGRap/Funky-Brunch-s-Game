var Intro = function(game){
}

//Global variables for Camera Control
var worldScale = 1;
var camera;
var tween;
var scaletrigger = 0;

//Scene objects
var door;
var car;
var talking;

Intro.prototype = {

    //load in art assets
    preload: function(){
        //loads the main background image
        game.load.image('background','assets/introbackground.png');
        game.load.image('backgroundfront','assets/introbackgroundfront.png');
        //Load debug images and effects
        game.load.image('camera','assets/camera.png');
        game.load.image('fadeout','assets/fadeout.png');

        //Load's scene images
        game.load.image('car','assets/car.png');
        game.load.spritesheet('door','assets/door.png',275,403,3);
        //Load Speach Assets
        game.load.spritesheet('speachR','assets/speachR.png',381,157,3);
        game.load.spritesheet('speachL','assets/speachL.png',381,157,3);

    },

    create : function(){

        //Sets the background images
        var background = game.add.image(0,0,'background');
        var car = game.add.sprite(550,1090,'car');  
        car.scale.setTo(1,1.2);                    //REMOVE WHEN YOU GET PROPER ASSETS
        var backgroundfront = game.add.image(0,0,'backgroundfront');


        door = game.add.sprite(650,1060,'door');  
        door.scale.setTo(1,.9);                    //REMOVE WHEN YOU GET PROPER ASSETS
        //makes door animations
        door.animations.add('open',[0,1,2]);      


        //Fade in from black
        var fadeout = game.add.sprite(0,0,'fadeout');
        fadeout.scale.setTo(20,20);
        fadeout.alpha = 1;
        
        tween = game.add.tween(fadeout).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true);

        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DEBUG

    //Adds the speach bubble
    talking = new Speach(game, 'speachL', 200, 200,  "Now remember to have fun Sam");
    game.add.existing(talking);

    var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(function(){         talking.kill();   opendoorscene();          });

        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DEBUG




        //When the prevois tween is complete run [THIS FUNCTION]
        tween.onComplete.add(function(){         movedown1()         },this);    


       // var talking = new Speach(game,'speachR',400,400,"Why hello there");
        //game.add.existing(talking);


        //this.spacebar.onDown.add(this.confirmed, this);

        //talking.test();
        /*
        if(talking.next == 1){
            console.log("ASSD")
        }
        */
      
        //fadeout.animations.currentAnim.onComplete.add(function() {fadeout.visible = false;console.log("HEY");},game);


        //game.add.tween(newthoughtcompulsion).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);

        //pop.animations.currentAnim.onComplete.add(function() {pop.visible=false;},this);


        game.world.setBounds(0, 0, 4000, 4000);

        camera = game.add.sprite(700,500,'camera'); //-80
        camera.scale.setTo(0.5,0.5);


        game.camera.follow(camera);




    },

    update : function(){

        //Zooming Functionality, write an iff statement with scaletrigger's value as an id then change the value of scale trigger
        //when you want to start zooming
        if(scaletrigger == 1){
            if(worldScale < 1.3){
                worldScale += 0.0002;
            }
        }

        // set our world scale as needed
        game.world.scale.set(worldScale);
        //game.world.pivot.x += 1;
    }
}

// Chronological Scenes

function movedown1(){
    scaletrigger = 1;
    tween = game.add.tween(camera).to( { y: 1160, x: 700},20000,"Linear",true,0);
    //console.log("Hey there");

    //When the prevois tween is complete run [THIS FUNCTION]
    tween.onComplete.add(function(){             cartalk1();        },this);    

}

function cartalk1(){
    //Adds the speach bubble
    talking = new Speach(game, 'speachL', 300, 1000,  "Now remember to have fun Sam");
    game.add.existing(talking);

    var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(function(){         talking.kill();   opendoorscene();          });

}

function opendoorscene(){
    door.animations.play('open',4);

}