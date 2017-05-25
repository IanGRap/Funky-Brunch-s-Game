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

        game.add.text(16, 16, "Position your fellow kids so you can all get along", {fontSize: '16px', fill: 'Coral'});
    },

    update : function(){
        
    },

    start : function(){
        game.state.start('testLevel2');
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