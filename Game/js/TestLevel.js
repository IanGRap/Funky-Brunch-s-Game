var TestLevel = function(game){

    //reference to the board object
    var board;
    //array of the circles on the board
    var characters;
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
        //charcter images
        game.load.spritesheet('astronaut', 'assets/astronaughtimg.png', 64, 64);
        game.load.spritesheet('scientist', 'assets/scientistimg.png', 64, 64);
        game.load.spritesheet('ghost', 'assets/ghostimg.png', 64, 64);
        game.load.spritesheet('knight', 'assets/knightimg.png', 64, 64);
        game.load.spritesheet('dino', 'assets/dinoimg.png', 64, 64);
        game.load.spritesheet('dog', 'assets/dogimg.png', 64, 64);
        //backround image
        game.load.image('river','assets/river.png');
        //dialogue UI
        game.load.image('dialogue', 'assets/dialoguePlaceholder.png');
    },

    create: function(){

        //loads background image
        game.add.image(0,0,'river');

        //add dialogue system
        this.dialogue = new Dialogue(game, 'dialogue', 96);
        game.add.existing(this.dialogue);


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
        this.board = new Board(game, 320/64, 320/64, 64, 128, 128, this.dialogue);
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
        this.characters = [
            new Character(game, 'dog', 0, 0,  ["Conservative"],["Liberal"],["I don't want to stand with a LIBERAL"], 'Dog'),
            new Character(game, 'scientist', 0, 0,  ["Liberal"],["Conservative"],["I don't want to stand with a CONSERVATIVE"], 'Scientist'),
            new Character(game, 'knight', 0, 0, ["Active"],["Lazy"],["I wish you weren't so LAZY"], 'Knight'),
            new Character(game, 'dino', 0, 0, ["Lazy"],["Active"],["I don't feel like being ACTIVE"], 'Dinosaur'),
            new Character(game, 'ghost', 0, 0,["Extroverted"],["Shy"],["I want to talk but you're so SHY"], 'Ghost'),
            new Character(game, 'astronaut', 0, 0,["Shy"],["Extroverted"],["I just need some space, you're really EXTROVERTED"], 'Astronaut')

        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[0][0].place(this.characters[0]);
        this.board.tiles[0][1].place(this.characters[1]);
        this.board.tiles[0][2].place(this.characters[2]);
        this.board.tiles[0][3].place(this.characters[3]);
        this.board.tiles[0][4].place(this.characters[4]);
        this.board.tiles[1][0].place(this.characters[5]);

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