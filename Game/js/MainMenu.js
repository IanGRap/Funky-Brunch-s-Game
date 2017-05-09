var MainMenu = function(game){

    var press;

}

MainMenu.prototype = {

    create : function(){
        //text for explaining rules and prompting the player to start
        this.press = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.add.text(16, 16, "Move all of the circles \nonto the green squares \nin 10 seconds. \nUse wasd to move \nand the spacebar to select.", {fontSize: '16px', fill: 'Coral'});
    },

    update : function(){
        // if spacebar pressed, go to test level
        if(this.press.isDown){
            game.state.start('TestLevel');
        }
    }

};