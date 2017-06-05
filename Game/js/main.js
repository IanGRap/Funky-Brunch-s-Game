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

var music;

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
game.state.add('Tutorial', Tutorial);
game.state.add('Level2GlobalWarm',Level2GlobalWarm);
game.state.add('Level3Refugee',Level3Refugee);
game.state.add('Level4Religion',Level4Religion);
game.state.add('Level5GunControl',Level5GunControl);
game.state.add('Level6Healthcare',Level6Healthcare);
game.state.add('Level8Congress',Level8Congress);
game.state.add('Intro', Intro);
game.state.add('WagonIntro', WagonIntro);
game.state.add('WagonOutro', WagonOutro);
game.state.add('WagonParents', WagonParents);
game.state.add('RiverOutro', RiverOutro);
game.state.add('GhostIntro', GhostIntro);
game.state.add('MonTalk', MonTalk);
game.state.add('BattlePre', BattlePre);
game.state.add('BattlePost', BattlePost);
game.state.add('HealthCare', HealthCare);
game.state.add('ToTheMoon', ToTheMoon);
game.state.add('temp', Temp);

//start with Main Menu State
game.state.start('MainMenu');
//game.state.start('TestLevel2');


