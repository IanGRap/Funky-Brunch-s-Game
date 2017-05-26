// make the game
var game = new Phaser.Game(1440, 810, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update});

// define functions for states
function preload(){};
function create(){};
function update(){};

// persistent arrays tracking which traits of the characters are discovered
var dinoTraits = [];
var ghostTraits = [];
var dogTraits = [];
var docTraits = [];
var knightTraits = [];
var astronautTraits = [];
var dinoConflicts = [];
var ghostConflicts = [];
var dogConflicts = [];
var docConflicts = [];
var knightConflicts = [];
var astronautConflicts = [];

var stats = [
	dinoTraits,
	ghostTraits,
	dogTraits,
	docTraits,
	knightTraits,
	astronautTraits,
	dinoConflicts,
	ghostConflicts,
	dogConflicts,
	docConflicts,
	knightConflicts,
	astronautConflicts
];

for(let i=0; i<stats.length; i++){
	stats[i].length = 10;
	for(let j=0; j<stats[i].length; j++){
		stats[i][j] = false;
	}
}

// load in states
game.state.add('MainMenu', MainMenu);
game.state.add('TestLevel', TestLevel);
game.state.add('TestLevel2', TestLevel2);
game.state.add('LoseScreen', LoseScreen);
game.state.add('WinScreen', WinScreen);
game.state.add('Intro', Intro);
game.state.add('Tutorial', Tutorial);

//start with Main Menu State
game.state.start('MainMenu');
//game.state.start('TestLevel2');


