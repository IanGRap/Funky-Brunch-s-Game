var Level3Refugee = function(game){

    //jake has edited this file to test implemenatation of the actual raft 2 - refugee puzzle

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

Level3Refugee.prototype = {
    
    //load in art assets
    preload: function(){
    },

    create: function(){

        //loads background image
        river = game.add.image(0,0,'river');

        //add dialogue system
        //this.dialogue = new Dialogue(game, 'dialogue', 96);
        //game.add.existing(this.dialogue);


        this.obstacles = [
            [
                [0, 0, 2, 2, 2, 2],
                [0, 0, 2, 2, 2, 1],
                [0, 0, 2, 1, 1, 1],
                [0, 0, 2, 2, 2, 1],
                [0, 0, 2, 2, 2, 2]
            ]
         
        ];

        var raft = [
            game.add.image(512, 384, 'raft'),
            game.add.image(640, 384, 'raft'),
            game.add.image(768, 256, 'raft'),
            game.add.image(768, 512, 'raft'),
            game.add.image(768, 384, 'raft'),

            game.add.image(512, 256, 'crate'),
            game.add.image(512, 512, 'crate'),
            game.add.image(640, 512, 'crate'),
            game.add.image(640, 256, 'crate'),
        ];

        // define a new board object
        this.board = new Board(game, 6, 5, 128, 128, 128, 'window');
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
       //function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits,traitwindow){


        this.characters = [
            new Character(game, 'dino', 0, 0, ["Inclusive", "Unfamiliar"],["Exclusive","New Arrival"],["Hey I was new too, don't be EXCLUSIVE", "You're too NEW, sit with your friend"], 'Dinosaur', dinoTraits,'dinogood','dinobad','traitwindow'),
            new Character(game, 'scientist', 0, 0,  ["Inclusive"],["Exclusive"],["Don't EXCLUDE others from playtime!"], 'Scientist', docTraits,'scientistgood','scientistbad','traitwindow'),
            new Character(game, 'knight', 0, 0, ["Exclusive", "Unfamiliar"],["Inclusive", "New Arrival"],["He's not invited, don't INCLUDE him.", "I don't trust you, you're too NEW" ], 'Knight', [true],'knightgood','knightbad','traitwindow'),
            new Character(game, 'dog', 0, 0,  ["Happy"],[],["I'm Happy"], 'Dog', [true],'doggood','doggood','traitwindow'),
            new Character(game, 'astronaut', 0, 0,["New Arrival"],["Exclusive", "Unfamiliar"],["Hey I'm hungry and want to play, don't EXCLUDE me.", "You're too UNFAMILIAR"], 'Astronaut', astronautTraits,'astrogood','astrobad','traitwindow')
          //  new Character(game, 'ghost', 0, 0,["Allergies","Spooky"],["Dog","Fraidy Cat"],["Achoo, I think I'm allergic to Dogs", "Boo! You're scared!"], 'Ghost', ghostTraits,'traitwindow'),
         
        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[0][0].place(this.characters[0]);
        this.board.tiles[1][1].place(this.characters[1]);
        this.board.tiles[2][0].place(this.characters[2]);
        this.board.tiles[3][1].place(this.characters[3]);
        this.board.tiles[4][0].place(this.characters[4]);
       // this.board.tiles[1][0].place(this.characters[5]);

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
                wipe.animOutMusic(this.nextlevel,music);
            }
        }
    },
    nextlevel: function(){
        game.state.start("GhostIntro");
    }
};