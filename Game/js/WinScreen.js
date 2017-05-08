var WinScreen = function(game){
    var press;
}

WinScreen.prototype = {

    create : function(){
        this.press = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.add.text(16, 16, "You won! \nPress the spacebar to go back to the menu.", {fontSize: '32px', fill: 'Coral'});
    },

    update : function(){
        if(this.press.isDown){
            game.state.start('MainMenu');
        }
    }
}