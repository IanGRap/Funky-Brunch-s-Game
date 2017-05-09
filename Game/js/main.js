// make the game
var game = new Phaser.Game(320, 320, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update});

// define functions for states
function preload(){};
function create(){};
function update(){};

// load in states
game.state.add('MainMenu', MainMenu);
game.state.add('TestLevel', TestLevel);
game.state.add('LoseScreen', LoseScreen);
game.state.add('WinScreen', WinScreen);

// start with Main Menu State
game.state.start('MainMenu');