function Fullscreen(game){
	Phaser.Group.call(this, game);
	var f = game.input.keyboard.addKey(Phaser.Keyboard.F);
	f.onDown.add(this.activate, this);
	game.input.keyboard.removeKeyCapture(Phaser.Keyboard.F);
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
}

Fullscreen.prototype = Object.create(Phaser.Group.prototype);
Fullscreen.prototype.constructor = Fullscreen;

Fullscreen.prototype.activate = function(){
	if(game.scale.isFullScreen){
		console.log('stopping fullscreening');
        game.scale.stopFullScreen();
    } else {
    	console.log('fullscreening');
        game.scale.startFullScreen(false);
    }
}