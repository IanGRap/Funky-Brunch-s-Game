// make the game
var game = new Phaser.Game(1440, 810, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update});

// define functions for states
function preload(){};
function create(){};
function update(){};

// load in states
game.state.add('MainMenu', MainMenu);
game.state.add('TestLevel', TestLevel);
game.state.add('LoseScreen', LoseScreen);
game.state.add('WinScreen', WinScreen);
game.state.add('Intro', Intro);

//start with Main Menu State
game.state.start('Intro');

//game.state.start('MainMenu');


