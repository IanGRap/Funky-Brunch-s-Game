var Level7NukeWar = function(game){

    //jake has edited this file to test implemenatation of the actual village 2 - health care level

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

Level7NukeWar.prototype = {
    
    //load in art assets
    preload: function(){
        //fixes aftermath of intro
        game.world.scale.set(1);
    },

    create: function(){

        //loads background image
        var background = game.add.image(0, 0, 'space');

        var rocket = game.add.image(625, 575, 'rocket');
        rocket.anchor.setTo(0.5, 0.5);
        rocket.angle += 180;

        this.obstacles = [
            [
                [2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 2, 2],
                [2, 1, 1, 1, 1, 1, 1],
                [2, 0, 0, 0, 0, 2, 2]
            ]
         
        ];

        // define a new board object
        this.board = new Board(game, 7, 5, 128, 128, 128);
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
       //function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits,traitwindow){


        this.characters = [
            new Character(game, 'dino', 0, 0, ["Panicked"],["Excited", "Focused"],["You're EXCITED by mass destruction?", "How can you be FOCUSED right now?"], 'Dinosaur', dinoTraits, 'dinogood', 'dinobad', 'traitwindow'),
            new Character(game, 'scientist', 0, 0,  ["Calm"],["Panicked"],["Don't be PANICKED, we're safe!"], 'Scientist', docTraits, 'scientistgood', 'scientistbad', 'traitwindow'),
            new Character(game, 'knight', 0, 0, ["Excited"],["Panicked", "Focused"],["I'm not PANICKED, we'll win", "FOCUS up! I want a good view of the explosion"], 'Knight', [true], 'knightgood', 'knightbad', 'traitwindow'),
            new Character(game, 'dog', 0, 0,  ["Loud"],["Focused"],["BORK BORK"], 'Dog', [true], 'doggood', 'dogbad', 'traitwindow'),
            new Character(game, 'astronaut', 0, 0,["Focused"],["Panicked", "Loud", "Excited"],["DON'T PANIC", "Wolfy you're too LOUD", "EXCITED is distracting"], 'Astronaut', astronautTraits, 'astronautgood', 'astronautbad', 'traitwindow'),
            new Character(game, 'ghost', 0, 0,["Panicked"],["Excited", "Focused"],["EXCITED by war? Gross.", "FOCUS, FOCUS, FOCUS!"], 'Ghost', ghostTraits, 'ghostgood', 'ghostbad', 'traitwindow')       
        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[2][1].place(this.characters[0]);
        this.board.tiles[3][5].place(this.characters[1]);
        this.board.tiles[0][1].place(this.characters[2]);
        this.board.tiles[1][0].place(this.characters[3]);
        this.board.tiles[3][2].place(this.characters[4]);
        this.board.tiles[3][0].place(this.characters[5]);

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
                wipe.animOutMusic(Level7NukeWar.prototype.nextlevel, music);
            }
        }
    },
    nextlevel: function(){
        game.state.start("Council");
    }
};