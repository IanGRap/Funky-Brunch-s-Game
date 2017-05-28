var Tutorial = function(game){

    //reference to the board object
    var board;
    //array of the circles on the board
    var characters;

    //layouts of board layouts, 1 is green 0 is red
    var obstacles;  
};

//Wipe var
var wipe;
var do1 = true;

Tutorial.prototype = {
    
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
        //Wipe
        game.load.image('wipe','assets/wipe.png');

    },

    create: function(){

        console.log("tutorial starting");

        //loads background image
        river = game.add.image(700,400,'river');
        river.scale.setTo(1.3,2.5);
        river.anchor.setTo(0.5,0.5);
        river.angle = 90;

        var boat = game.add.image(-100,120,'boat');
        boat.scale.setTo(2.7,2.7);
        //add dialogue system
        this.dialogue = new Dialogue(game, 'dialogue', 96);
        game.add.existing(this.dialogue);


        this.obstacles = [
                [2, 0, 0, 0, 2],
                [2, 1, 1, 1, 0]
        ];

        // define a new board object
        this.board = new Board(game, 5, 2, 128, 128, 128);
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]    

        var dinoAttributes = ["chill"];
        var dinoConflicts = [];
        var dinoText = [];
        var knightAttributes = ["serious"];
        var knightConflicts = ["silly"];
        var knightText = ["I need a party that plays SERIOUSLY"];
        var scientistAttributes = ["silly"];
        var scientistConflicts = ["serious"];
        var scientistText = ["I want someone silly"];

        this.characters = [
            new Character(game, 'scientist', 0, 0,  scientistAttributes, scientistConflicts, scientistText, 'Scientist', docTraits),
            new Character(game, 'knight', 0, 0, knightAttributes, knightConflicts, knightText, 'Knight', knightTraits),
            new Character(game, 'dino', 0, 0, dinoAttributes, dinoConflicts, dinoText, 'Dinosaur', dinoTraits)
        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[0][0].place(this.characters[0]);
        this.board.tiles[1][2].place(this.characters[1]);
        this.board.tiles[1][4].place(this.characters[2]);

        // pass one of the obstacles for the board object
        this.board.setTiles(this.obstacles);

        //Screen Wipe Object Creation
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animIn();

    },

    update: function(){
        if(this.board.checkTiles()){
            if(do1){
                do1 = false;
                wipe.animOut(this.nextlevel);
            }
        }
    },
    nextlevel: function(){
        game.state.start("TestLevel2");
    }
};