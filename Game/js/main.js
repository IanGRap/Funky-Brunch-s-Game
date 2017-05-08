var game = new Phaser.Game(320, 320, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload(){};
function create(){};
function update(){};

game.state.add('MainMenu', MainMenu);
game.state.add('TestLevel', TestLevel);
game.state.add('LoseScreen', LoseScreen);
game.state.add('WinScreen', WinScreen);

game.state.start('MainMenu');