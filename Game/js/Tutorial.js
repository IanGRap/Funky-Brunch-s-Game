var Tutorial = function(game){

    //reference to the board object
    var board;
    //array of the circles on the board
    var characters;

    //layouts of board layouts, 1 is green 0 is red
    var obstacles;  

    var fullscreen;
};

//Wipe var
var wipe;
var do1 = true;


Tutorial.prototype = {
    
    //load in art assets
    preload: function(){
        //fixes aftermath of intro
        game.world.scale.set(1);
        //Correct sounds
        game.load.audio('correct',['assets/audio/yep.mp3']);
        //Wipe
        game.load.image('wipe','assets/wipe.png');

    },

    create: function(){



        console.log("tutorial starting");

        //loads background image
        var background = game.add.image(0,0,'village');
        //river.scale.setTo(1.3,2.5);
        //river.anchor.setTo(0.5,0.5);
        //river.angle = 0;

        var wagon = game.add.image(-250, 115, 'wagon');
        //wagon.scale.setTo(.9,.9);
        //add dialogue system
        //this.dialogue = new Dialogue(game, 'dialogue', 96);
        //game.add.existing(this.dialogue);


        this.obstacles = [
                [2, 0, 0, 0, 2],
                [2, 1, 1, 1, 2],
                [2, 0, 0, 0, 2]

        ];

        // define a new board object
        this.board = new TutorialBoard(game, 5, 3, 128, 128, 256, 'window');
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
            new Character(game, 'scientist', 0, 0,  scientistAttributes, scientistConflicts, scientistText, 'Scientist', docTraits,'knightgood','knightbad','traitwindow'),
            new Character(game, 'knight', 0, 0, knightAttributes, knightConflicts, knightText, 'Knight', knightTraits,'knightgood','knightbad','traitwindow'),
            new Character(game, 'dino', 0, 0, dinoAttributes, dinoConflicts, dinoText, 'Dinosaur', dinoTraits,'dinogood','dinobad','traitwindow'),
        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[2][1].place(this.characters[0]);
        this.board.tiles[1][2].place(this.characters[1]);
        this.board.tiles[0][3].place(this.characters[2]);

        // pass one of the obstacles for the board object
        this.board.setTiles(this.obstacles);

        this.fullscreen = new Fullscreen(game);
        game.add.existing(this.fullscreen);

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
        game.state.start("WagonOutro");
    }
};