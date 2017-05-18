var MainMenu = function(game){

}

MainMenu.prototype = {

    create : function(){
        //text for explaining rules and prompting the player to start
        this.press = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.f = game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.press.onDown.add(this.start, this);
        this.f.onDown.add(this.fullscreen, this);

        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.F);

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        game.add.text(16, 16, "Move all of the circles \nonto the green squares \nin 10 seconds. \nUse wasd to move \nand the spacebar to select. \nPress f anytime to toggle fullscreen.", {fontSize: '16px', fill: 'Coral'});
    },

    update : function(){
        
    },

    start : function(){
        game.state.start('TestLevel');
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