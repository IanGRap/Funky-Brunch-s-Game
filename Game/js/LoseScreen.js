var LoseScreen = function(game){
    var press;
}

LoseScreen.prototype = {

    create : function(){
        //keyboard input
        this.press = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //display text that says you lost
        game.add.text(16, 16, "You lost! \nPress the spacebar to go back to the menu.", {fontSize: '32px', fill: 'Coral'});
    },

    update : function(){
        //check for spacebar press to go back to the main menu
        if(this.press.isDown){
            game.state.start('MainMenu');
        }
    }
}