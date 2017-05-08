var MainMenu = function(game){
    var press;
}

MainMenu.prototype = {

    create : function(){
        this.press = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.add.text(16, 16, "Move all of the circles onto the green squares in 10 seconds. \nUse wasd to move and the spacebar to select.", {fontSize: '32px', fill: 'Coral'});
    },

    update : function(){
        if(this.press.isDown){
            game.state.start('TestLevel');
        }
    }
}