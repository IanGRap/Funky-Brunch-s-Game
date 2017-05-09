var WinScreen = function(game){
    var press;
}

WinScreen.prototype = {

    create : function(){
        //spacebar input
        this.press = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //Display text that says you won
        game.add.text(16, 16, "You won! \nPress the spacebar to go back to the menu.", {fontSize: '32px', fill: 'Coral'});
    },

    update : function(){
        //check for button press to go back to main menu
        if(this.press.isDown){
            game.state.start('MainMenu');
        }
    }
}