var EndScreen = function(game){
	
}

EndScreen.prototype = {
	create : function(){
		this.button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.add.text(300, 300, "The End.\nPress SPACEBAR to go back to the main menu.", {font:'Architects Daughter', fill: 'white', fontSize: '30px'})
	},

	update : function(){
		if(this.button.isDown){
			game.state.start('MainMenu');
		}
	}
}