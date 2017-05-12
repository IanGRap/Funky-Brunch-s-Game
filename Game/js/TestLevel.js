var TestLevel = function(game){

    //reference to the board object
    var board;
    //array of the circles on the board
    var circles;
    //timer for when the puzzle needs to be completed (In milliseconds)
    var timer;

    //layouts of board layouts, 1 is green 0 is red
    var obstacles;

    var dialogue;

    var testTimer;

    var f;
};

TestLevel.prototype = {
    
    //load in art assets
    preload: function(){
        // cube sprite
        game.load.spritesheet('cubes', 'assets/protoCubes.png', 64, 64);
        game.load.spritesheet('red', 'assets/red.png', 64, 64);
        game.load.spritesheet('blue', 'assets/blue.png', 64, 64);
        game.load.spritesheet('green', 'assets/green.png', 64, 64);
        game.load.image('dialogue', "assets/dialoguePlaceholder.png");
    },

    create: function(){
        this.f = true;

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

        this.testTimer = 5000;

        this.timer = 12500;

        // define a new board object
        this.board = new Board(game, 320/64, 320/64, 64, 128, 128);
        game.add.existing(this.board);

        //make 6 circles, 2 of each color
        this.circles = [
            new Circle(game, 'green', 0, 0),
            new Circle(game, 'green', 0, 0),
            new Circle(game, 'green', 0, 0),
            new Circle(game, 'green', 0, 0),
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

        this.dialogue = new Dialogue(game, 'dialogue', 96);
        game.add.existing(this.dialogue);
    },


    update: function(){
        this.testTimer -= game.time.elapsed;
        if(this.testTimer <= 0 && this.f){
            this.dialogue.addDialogue('Ian', 'Here\'s what Ian has to say');
            this.dialogue.addDialogue('Jerkface', 'Boring');
            this.dialogue.addDialogue('Ian', 'You\'re boring you douche');
            this.f = false;
            //this.testTimer = 5000;
        }
    }
};