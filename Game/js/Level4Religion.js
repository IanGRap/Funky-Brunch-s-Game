var Level4Religion = function(game){

    //jake has edited this file to test implemenatation of the actual religion level

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

Level4Religion.prototype = {
    
    //load in art assets
    preload: function(){
        //fixes aftermath of intro
        game.world.scale.set(1);
    },

    create: function(){

        //loads background image
        river = game.add.image(0, 0, 'temple');
        //add dialogue system
        //this.dialogue = new Dialogue(game, 'dialogue', 96);
        //game.add.existing(this.dialogue);


        this.obstacles = [
            [
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 1, 1, 2],
                [2, 2, 1, 1, 2, 2],
                [2, 2, 2, 1, 1, 2]
            ]
         
        ];

        this.timer = 12500;

        // define a new board object
        this.board = new Board(game, 6, 5, 128, 75, 140, 'window');
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming
        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
       //function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits,traitwindow){


        this.characters = [
            new Character(game, 'dino', 0, 0, ["DMONS Fan"],["LMONS Fan", "Uninterested"],["The LMONS aren't even cool.", "How could you be UNINTERESTED in mons?"], 'Dinosaur', dinoTraits,'dinogood','dinobad','traitwindow'),
            new Character(game, 'scientist', 0, 0,  ["Uninterested"],["DMONS Fan", "LMONS Fan"],["DMONS are just too scary, and boring", "There are just too many LMONS to keep track of."], 'Scientist', docTraits,'scientistgood','scientistbad','traitwindow'),
            new Character(game, 'knight', 0, 0, ["DMONS Fan", "Unfamiliar"],["LMONS Fan", "Uninterested"],["The LMONS copied us, they're fake!", "UNINTERESTED?, Dmons are important." ], 'Knight', [true],'knightgood','knightbad','traitwindow'),
            new Character(game, 'dog', 0, 0,  ["Happy"],[],["I'm Happy"], 'Dog', [true],'doggood','dogbad','traitwindow'),
            new Character(game, 'astronaut', 0, 0,["LMONS Fan"],["DMONS Fan", "Uninterested"],["Your DMONS aren't fun and happy.", "Lmons are the best, stay out this if you're UNINTERESTED!"], 'Astronaut', astronautTraits,'astrogood','astrobad','traitwindow'),
            new Character(game, 'ghost', 0, 0,["LMONS Fan"],["DMONS Fan", "Uninterested"],["DMONS are so violent, I can't support that.", "Lmons are superior, I don't understand being UNINTERESTED in them!"], 'Ghost', ghostTraits,'ghostgood','ghostbad','traitwindow'),
         
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
        this.board.tiles[0][2].place(this.characters[5]);

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
        game.state.start("BattlePre");
    }
};