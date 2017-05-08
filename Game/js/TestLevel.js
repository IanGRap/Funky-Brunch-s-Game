var TestLevel = function(game){

    var board;
    var circles;
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
    ];
};

TestLevel.prototype = {
    
    preload: function(){
        // cube sprite
        game.load.spritesheet('cubes', 'assets/protoCubes.png', 64, 64);
        game.load.spritesheet('red', 'assets/red.png', 64, 64);
        game.load.spritesheet('blue', 'assets/blue.png', 64, 64);
        game.load.spritesheet('green', 'assets/green.png', 64, 64);
    },

    create: function(){
        this.board = new Board(game, game.world.height/64, game.world.width/64, 64);
        game.add.existing(this.board);

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

        this.board.tiles[0][0].place(this.circles[0]);
        this.board.tiles[0][1].place(this.circles[1]);
        this.board.tiles[0][2].place(this.circles[2]);
        this.board.tiles[0][3].place(this.circles[3]);
        this.board.tiles[0][4].place(this.circles[4]);
        this.board.tiles[1][0].place(this.circles[5]);

        this.board.setTiles(obstacles[Math.floor(Math.random() * 3)]);
    },

    update: function(){
        timer -= game.time.elapsed;
        if(timer <= 0){
            if(this.board.check()){
                game.state.start('WinScreen');
            } else {
                game.state.start('LoseScreen');
            }
        }
    }
};