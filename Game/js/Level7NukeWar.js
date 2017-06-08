var TestLevel2 = function(game){

    //jake has edited this file to test implemenatation of the actual moonfall rocket nuclear war level

    //reference to the board object
    var board;
    //array of the circles on the board
    var characters;
    //timer for when the puzzle needs to be completed (In milliseconds)
    var timer;

    //layouts of board layouts, 1 is green 0 is red
    var obstacles;  
};

//Screen wipe effect
var wipe;
var do1 = true;

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
        game.load.image('traitwindow', 'assets/traitwindow.png')

        //audio
        game.load.audio('tick',['assets/audio/tick.mp3']);
        game.load.audio('select',['assets/audio/select.mp3']);
        game.load.audio('placed',['assets/audio/placed.mp3']);
        game.load.audio('misplaced',['assets/audio/misplaced.mp3']);
        //Wipe Image
        game.load.image('wipe','assets/wipe.png');
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
                [2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 2, 2],
                [2, 1, 1, 1, 1, 1, 1],
                [2, 0, 0, 0, 0, 2, 2],
                [2, 2, 2, 2, 2, 2, 2]
            ]
         
        ];

        this.timer = 12500;

        // define a new board object
        this.board = new Board(game, 7, 7, 128, 128, 128);
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
       //function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits,traitwindow){


        this.characters = [
            new Character(game, 'dino', 0, 0, ["Panicked"],["Excited", "Focused"],["You're EXCITED by mass destruction?", "How can you be FOCUSED right now?"], 'Dinosaur', dinoTraits,'traitwindow'),
            new Character(game, 'scientist', 0, 0,  ["Calm"],["Panicked"],["Don't be PANICKED, we're safe!"], 'Scientist', docTraits,'traitwindow'),
            new Character(game, 'knight', 0, 0, ["Excited"],["Panicked", "Focused"],["I'm not PANICKED, we'll win", "FOCUS up! I want a good view of the explosion"], 'Knight', [true],'traitwindow'),
            new Character(game, 'dog', 0, 0,  ["Loud"],["Focused"],["BORK BORK"], 'Dog', [true],'traitwindow'),
            new Character(game, 'astronaut', 0, 0,["Focused"],["Panicked", "Loud", "Excited"],["DON'T PANIC", "Wolfy you're too LOUD", "EXCITED is distracting"], 'Astronaut', astronautTraits,'traitwindow')
            new Character(game, 'ghost', 0, 0,["Panicked"],["Excited", "Focused"],["EXCITED by war? Gross.", "FOCUS, FOCUS, FOCUS!"], 'Ghost', ghostTraits,'traitwindow'),
         
        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[3][4].place(this.characters[0]);
        this.board.tiles[4][3].place(this.characters[1]);
        this.board.tiles[2][3].place(this.characters[2]);
        this.board.tiles[4][5].place(this.characters[3]);
        this.board.tiles[6][4].place(this.characters[4]);
        this.board.tiles[2][5].place(this.characters[5]);

        // pass one of the obstacles for the board object
        this.board.setTiles(this.obstacles[0]);

        //Screen Wipe Object Creation
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animIn();
        do1 = true;
    },


    update: function(){
        if(this.board.checkTiles()){
            if(do1){
                console.log("IN")
                do1 = false;
                wipe.animOut(this.nextlevel);
            }
        }
    },
    nextlevel: function(){
        game.state.start("TestLevel2");
    }
};