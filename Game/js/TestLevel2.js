var TestLevel2 = function(game){

    //reference to the board object
    var board;
    //array of the circles on the board
    var characters;
    //timer for when the puzzle needs to be completed (In milliseconds)
    var timer;

    //layouts of board layouts, 1 is green 0 is red
    var obstacles;  
};

TestLevel2.prototype = {
    
    //load in art assets
    preload: function(){
        //fixes aftermath of intro
        game.world.scale.set(1);

        // cube sprite
        game.load.spritesheet('cubes', 'assets/tilesV2128.png', 128, 128);
        //charcter images
        game.load.spritesheet('astronaut', 'assets/astronaughtimg.png', 64, 64);
        game.load.spritesheet('scientist', 'assets/scientistimg.png', 64, 64);
        game.load.spritesheet('ghost', 'assets/ghostimg.png', 64, 64);
        game.load.spritesheet('knight', 'assets/knightimg.png', 64, 64);
        game.load.spritesheet('dino', 'assets/dinoimg.png', 64, 64);
        game.load.spritesheet('dog', 'assets/dogimg.png', 64, 64);
        //backround image
        game.load.image('river','assets/river.png');
        game.load.image('boat','assets/Boat.png');
        //dialogue UI
        game.load.image('dialogue', 'assets/dialoguePlaceholder.png');
        game.load.image('speachbubble','assets/speachbubble.png');
        //audio
        game.load.audio('tick',['assets/audio/tick.mp3']);
        game.load.audio('select',['assets/audio/select.mp3']);
        game.load.audio('placed',['assets/audio/placed.mp3']);
        game.load.audio('misplaced',['assets/audio/misplaced.mp3']);





    },

    create: function(){

        //loads background image
        river = game.add.image(700,400,'river');
        river.scale.setTo(1.3,2.5);
        river.anchor.setTo(0.5,0.5);
        river.angle = 90;

        var boat = game.add.image(-100,120,'boat');
        boat.scale.setTo(2.7,2.7);
        //add dialogue system
        //this.dialogue = new Dialogue(game, 'dialogue', 96);
        //game.add.existing(this.dialogue);


        this.obstacles = [
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ]
        ];

        this.timer = 12500;

        // define a new board object
        this.board = new Board(game, 5, 5, 128, 128, 128);
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
        this.characters = [
            new Character(game, 'dog', 0, 0,  ["Dog"],["Allergies"],["Bork Bork, GRRRRR"], 'Dog', dogTraits),
            new Character(game, 'scientist', 0, 0,  ["Silly","Fraidy Cat"],["Serious","Spooky"],["Why so SERIOUS?","You're scaring me!"], 'Scientist', docTraits),
            new Character(game, 'knight', 0, 0, ["Serious","Fantasy"],["Silly","Sci-Fi"],["I don't want to play with someone so SILLY","I wanted to play fantasy"], 'Knight', knightTraits),
            new Character(game, 'dino', 0, 0, ["Serious","Noise"],["Silly","Quite"],["I don't want to play with someone so SILLY","I want to make noise but you're QUIET"], 'Dinosaur', dinoTraits),
            new Character(game, 'ghost', 0, 0,["Allergies","Spooky"],["Dog","Fraidy Cat"],["Achoo, I think I'm allergic to Dogs", "Boo! You're scared!"], 'Ghost', ghostTraits),
            new Character(game, 'astronaut', 0, 0,["Quiet","Sci-Fi"],["Noise","Fantasy"],["You're too NOISY!","I wanted to play Sci-Fi"], 'Astronaut', astronautTraits)

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
        if(this.board.checkTiles()){
            game.state.start("TestLevel2");
        }
    }
};