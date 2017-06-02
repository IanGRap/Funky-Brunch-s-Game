var Temp = function(game){
	
}

Temp.prototype = {
	create : function(){
		this.button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.add.text(300, 300, "To Be Continued.\nPress SPACEBAR to go back to the main menu.", {font:'Architects Daughter', fill: 'white', fontSize: '30px'})
	},

	update : function(){
		if(this.button.isDown){
			game.state.start('MainMenu');
		}
	}
}