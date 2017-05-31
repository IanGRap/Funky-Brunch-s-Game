var MainMenu = function(game){

}
//Screenwipe var
var wipe;

MainMenu.prototype = {
    preload : function(){
        game.load.image('menu','assets/menuplaceholder.png');
        game.load.image('wipe','assets/wipe.png');
        game.load.image('window', 'assets/tutorialWindow.png');
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
        game.state.start('Tutorial');
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