// Ian Rapoport
// irapopor
// CMPM 120
// 1 May 2017
// Armada Assignment

var selector;

var circles;
var current = 0;
var timer = 10000;

var obstacles = [
	[
		[0, 0, 1, 1, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0]
	],
	[
		[0, 0, 0, 0, 0],
		[0, 1, 1, 0, 0],
		[0, 0, 1, 1, 0],
		[0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0]
	],
	[
		[0, 1, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 1, 1, 0],
		[0, 0, 0, 1, 0]
	]
]

// preload function
function preload(){
	// cube sprite
	game.load.spritesheet('cubes', 'assets/protoCubes.png', 64, 64);
	game.load.spritesheet('red', 'assets/red.png', 64, 64);
	game.load.spritesheet('blue', 'assets/blue.png', 64, 64);
	game.load.spritesheet('green', 'assets/green.png', 64, 64);
}

// create function
function create(){
	this.selector = new Selector(game, game.world.height/64, game.world.width/64);
	game.add.existing(this.selector);

	var cube;
	for(let c=0; c<game.world.height; c+=64){
		for(let r=0; r<game.world.width; r+=64){
			cube = new Cube(game, 'cubes', c, r);
			game.add.existing(cube);
			//placeCube(c/64, r/64);
			this.selector.tiles[c/64][r/64] = cube;
		}
	}

	this.selector.tiles[0][0].activate();

	this.circles = [
		new Circle(game, 'red', 0, 0),
		new Circle(game, 'red', 0, 0),
		new Circle(game, 'blue', 0, 0),
		new Circle(game, 'blue', 0, 0),
		new Circle(game, 'green', 0, 0),
		new Circle(game, 'green', 0, 0)
	];

	for(let i=0; i<this.circles.length; i++){
		game.add.existing(this.circles[i]);
	};

	this.selector.tiles[0][0].place(this.circles[0]);
	this.selector.tiles[0][1].place(this.circles[1]);
	this.selector.tiles[0][2].place(this.circles[2]);
	this.selector.tiles[0][3].place(this.circles[3]);
	this.selector.tiles[0][4].place(this.circles[4]);
	this.selector.tiles[1][0].place(this.circles[5]);

	//setTiles();
}

// update function (need it to call ship update function)
function update(){
	timer -= game.time.elapsed;
	/*if(timer <= 0){
		reset(this.selector);
	}*/
}

function reset(){
	var cube;
	for(let c=0; c<game.world.height; c+=64){
		for(let r=0; r<game.world.width; r+=64){
			cube = new Cube(game, 'cubes', c, r);
			game.add.existing(cube);
			this.selector.tiles[c/64][r/64] = cube;
		}
	}
	setTiles();
}

function setTiles(){
	for(let r=0; r<this.selector.tiles.length; r++){
		for(let c=0; c<this.selector.tiles.length; c++){
			if(this.obstacles[this.current][r][c] == 0){
				this.selector.tiles[r][c].charge();
			}
		}
	}
	this.current++;
}

function makeSelector(){
	this.selector = new Selector(game, game.world.height/64, game.world.width/64);
	game.add.existing(this.selector);
}

function placeCube(column, row){
	var cube = new Cube(game, 'cubes', column*64, row*64);
	game.add.existing(cube);
	console.log(""+this.selector.tiles[column][row]);
	this.selector.tiles[column][row] = cube;
	console.log(""+this.selector.tiles[column][row]);
}

var game = new Phaser.Game(320, 320, Phaser.AUTO, '', { preload: preload, create: create, update: update});