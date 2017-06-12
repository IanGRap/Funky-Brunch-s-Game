var Level2GlobalWarm = function(game){

    //jake has edited this file to test implemenatation of the actual raft global warming puzzle

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

Level2GlobalWarm.prototype = {
    
    //load in art assets
    preload: function(){

        //fixes aftermath of intro
        game.world.scale.set(1);
    },

    create: function(){
        music = game.add.audio('river');
        music.play();
        music.loopFull();
        music.volume = 1;

        //loads background image
        river = game.add.image(0, 0,'river');

        //add dialogue system
        //this.dialogue = new Dialogue(game, 'dialogue', 96);
        //game.add.existing(this.dialogue);


        this.obstacles = [
            [
                [0, 0, 2, 2, 2, 2],
                [0, 0, 2, 3, 3, 3],
                [0, 0, 2, 1, 1, 3],
                [0, 0, 2, 1, 1, 3]
            ]
         
        ];

        /*ar raft = [
            game.add.image(512, 384, 'raft'),
            game.add.image(512, 512, 'raft'),
            game.add.image(640, 512, 'raft'),
            game.add.image(640, 384, 'raft'),

            game.add.image(512, 256, 'crate'),
            game.add.image(640, 256, 'crate'),
            game.add.image(768, 256, 'crate'),
            game.add.image(768, 384, 'crate'),
            game.add.image(768, 512, 'crate'),
        ];
        */
        var raft = game.add.image(455, 205, 'raft');
        // raft.scale.setTo(3.8,3.8);

        game.add.image(512, 256, 'crate'),
            game.add.image(640, 256, 'crate'),
            game.add.image(768, 256, 'crate'),
            game.add.image(768, 384, 'crate'),
            game.add.image(768, 512, 'crate'),


        // define a new board object
        this.board = new Board(game, 6, 4, 128, 128, 128, 'window');
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
       //function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits,traitwindow){


        this.characters = [
            new Character(game, 'dino', 0, 0, ["Skeptic"],["Believer"],["How could you BELIEVE we're going extinct?"], 'Dinosaur', dinoTraits, 'dinogood','dinobad','traitwindow'),
            new Character(game, 'scientist', 0, 0,  ["Believer"],["Skeptic"],["You can't be a SKEPTIC, the world is ending!"], 'Scientist', docTraits,'scientistgood','scientistbad','traitwindow'),
            new Character(game, 'knight', 0, 0, ["Happy"],[],["I'm Happy"], 'Knight', [true],'knightgood','knightbad','traitwindow'),
            new Character(game, 'dog', 0, 0,  ["Happy"],[],["I'm Happy"], 'Dog', [true],'doggood','dogbad','traitwindow')
           
          //  new Character(game, 'ghost', 0, 0,["Allergies","Spooky"],["Dog","Fraidy Cat"],["Achoo, I think I'm allergic to Dogs", "Boo! You're scared!"], 'Ghost', ghostTraits,'traitwindow'),
         //   new Character(game, 'astronaut', 0, 0,["Quiet","Sci-Fi"],["Noise","Fantasy"],["You're too NOISY!","I wanted to play Sci-Fi"], 'Astronaut', astronautTraits,'traitwindow')

        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[0][0].place(this.characters[0]);
        this.board.tiles[1][1].place(this.characters[1]);
        this.board.tiles[2][0].place(this.characters[2]);
        this.board.tiles[3][1].place(this.characters[3]);
       // this.board.tiles[0][4].place(this.characters[4]);
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
                wipe.animOut(this.nextlevel);
            }
        }
    },
    nextlevel: function(){
        game.state.start("RiverOutro");
    }
};