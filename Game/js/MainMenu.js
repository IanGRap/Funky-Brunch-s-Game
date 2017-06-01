var MainMenu = function(game){

}
//Screenwipe var
var wipe;

MainMenu.prototype = {
    preload : function(){      
        game.load.image('menu','assets/menuplaceholder.png');
        game.load.image('wipe','assets/wipe.png');
        game.load.image('window', 'assets/tutorialWindow.png');
        game.load.image('fadeout','assets/fadeout.png');

        //Load Speach Assets
        game.load.spritesheet('speachR','assets/speachR.png',381,157,3);
        game.load.spritesheet('speachL','assets/speachL.png',381,157,3);

        //UI
        game.load.audio('dialogue',['assets/audio/dialogue.mp3']);
        game.load.spritesheet('cubes', 'assets/tilesV2128.png', 128, 128);

        //charcter images
        game.load.spritesheet('astronaut', 'assets/astronaught.png', 256, 256);
        game.load.spritesheet('scientist', 'assets/scientist.png', 256, 256);
        game.load.spritesheet('ghost', 'assets/ghost.png', 256, 256);
        game.load.spritesheet('knight', 'assets/knight.png', 256, 256);
        game.load.spritesheet('dino', 'assets/dinosaur.png',  256, 256);
        game.load.spritesheet('dog', 'assets/dog.png', 256, 256);

        //backround image
        game.load.image('river','assets/river.png');
        game.load.image('temple','assets/Temple.png');

        //scenery images
        game.load.image('boat','assets/Boat.png');

        //dialogue UI
        game.load.image('speachbubble','assets/speachbubble.png');

        //audio
        game.load.audio('tick',['assets/audio/tick.mp3']);
        game.load.audio('select',['assets/audio/select.mp3']);
        game.load.audio('placed',['assets/audio/placed.mp3']);
        game.load.audio('misplaced',['assets/audio/misplaced.mp3']);

        //character response audio
        game.load.audio('dinogood',['assets/audio/dinogood.mp3']);
        game.load.audio('dinobad',['assets/audio/dinobad.mp3']);
        game.load.audio('knightgood',['assets/audio/knightgood.mp3']);
        game.load.audio('knightbad',['assets/audio/knightbad.mp3']);

    },

    create : function(){
        var background = game.add.image(0,0,'menu');
        //text for explaining rules and prompting the player to start
        this.press = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.f = game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.press.onDown.add(this.start, this);
        this.f.onDown.add(this.fullscreen, this);

        //Screen Wipe Object Creation
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);

        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.F);

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        var text = game.add.text(650, 350, "Press Space to Start \n Press f to pay respects and go fullscreen \n use wsad or arrow keys to move and space to select", {fontSize: '25px',align: "center", fill: 'black'});
        text.anchor.setTo(0.5,0.5);

    },

    update : function(){
        
    },

    start : function(){
        wipe.animOut(this.nextstate);
    },
    nextstate : function(){
        game.state.start('WagonOutro');
        //game.state.start('Intro');
    },
    fullscreen : function(){
        console.log("fullscreen function");
        if(game.scale.isFullScreen){
            console.log("going normal");
            game.scale.stopFullScreen();
        } else {
            console.log("going full");
            game.scale.startFullScreen(false);
        }
    }

};