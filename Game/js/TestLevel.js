var TestLevel = function(game){

    //reference to the board object
    var board;
    //array of the circles on the board
    var circles;
    //timer for when the puzzle needs to be completed (In milliseconds)
    var timer;

    //layouts of board layouts, 1 is green 0 is red
    var obstacles;
};

TestLevel.prototype = {
    
    //load in art assets
    preload: function(){
        // cube sprite
        game.load.spritesheet('cubes', 'assets/protoCubes.png', 64, 64);
        game.load.spritesheet('red', 'assets/red.png', 64, 64);
        game.load.spritesheet('blue', 'assets/blue.png', 64, 64);
        game.load.spritesheet('green', 'assets/green.png', 64, 64);
    },

    create: function(){
        this.obstacles = [
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
        ];

        this.timer = 10000;

        // define a new board object
        this.board = new Board(game, game.world.height/64, game.world.width/64, 64);
        game.add.existing(this.board);

        //make 6 circles, 2 of each color
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

        // set the starting location for the circles
        this.board.tiles[0][0].place(this.circles[0]);
        this.board.tiles[0][1].place(this.circles[1]);
        this.board.tiles[0][2].place(this.circles[2]);
        this.board.tiles[0][3].place(this.circles[3]);
        this.board.tiles[0][4].place(this.circles[4]);
        this.board.tiles[1][0].place(this.circles[5]);

        // pass one of the obstacles for the board object
        this.board.setTiles(this.obstacles[Math.floor(Math.random() * 3)]);
    },


    update: function(){
        // decrease timer
        this.timer -= game.time.elapsed;
        if(this.timer <= 0){
            //if there are no circles on red tiles, you win
            if(this.board.check()){
                game.state.start('WinScreen');
            //else it is game over
            } else {
                game.state.start('LoseScreen');
            }
        }
    }
};