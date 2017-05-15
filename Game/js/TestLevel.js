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

        this.timer = 12500;

        // define a new board object
        this.board = new Board(game, 320/64, 320/64, 64, 128, 128);
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
        this.circles = [
            new Circle(game, 'red', 0, 0,  ["Conservative"],["Liberal"],["I don't want to stand with a LIBERAL"]),
            new Circle(game, 'red', 0, 0,  ["Liberal"],["Conservative"],["I don't want to stand with a CONSERVATIVE"]),
            new Circle(game, 'blue', 0, 0, ["Active"],["Lazy"],["I wish you weren't so LAZY"]),
            new Circle(game, 'blue', 0, 0, ["Lazy"],["Active"],["I don't feel like being ACTIVE"]),
            new Circle(game, 'green', 0, 0,["Extroverted"],["Shy"],["I want to talk but you're so SHY"]),
            new Circle(game, 'green', 0, 0,["Shy"],["Extroverted"],["I just need some space, you're realyl EXTROVERTED"])

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
        /*this.timer -= game.time.elapsed;
        if(this.timer <= 0){
            //if there are no circles on red tiles, you win
            if(this.board.checkTiles()){
                game.state.start('WinScreen');
            //else it is game over
            } else {
                //game.state.start('LoseScreen');
            }
        }*/
    }
};