var Level6Healthcare = function(game){

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

Level6Healthcare.prototype = {
    
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
        var background = game.add.image(0, 0, 'village');

        var crate = game.add.image(500, 400, 'medical');
        var gurney = game.add.image(628, 400, 'gurney');
        //add dialogue system
        //this.dialogue = new Dialogue(game, 'dialogue', 96);
        //game.add.existing(this.dialogue);


        this.obstacles = [
            [
                [2, 2, 2, 2, 2, 2],
                [2, 1, 2, 1, 1, 2],
                [2, 1, 2, 2, 1, 1],
                [2, 2, 2, 2, 2, 2]
            ]
         
        ];

        this.timer = 12500;

        // define a new board object
        this.board = new Board(game, 6, 4, 128, 128, 128, 'window');
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
       //function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits,traitwindow){


        this.characters = [
            new Character(game, 'dino', 0, 0, ["Ignoring", "Shares"],["Ignored", "Don't Share"],["Sorry Goldhelm, but you're IGNORED", "Play isn't fun when you DON'T SHARE"], 'Dinosaur', dinoTraits, 'dinogood', 'dinobad','traitwindow'),
            new Character(game, 'scientist', 0, 0,  ["Ignoring", "Don't Share"],["Ignored", "Shares"],["You're not real, you're IGNORED", "I don't have to SHARE!"], 'Scientist', docTraits, 'scientistgood', 'scientistbad', 'traitwindow'),
            new Character(game, 'knight', 0, 0, ["Ignored"],["Ignoring"],["I don't like people IGNORING me"], 'Knight', [true], 'knightgood', 'knightbad', 'traitwindow'),
            new Character(game, 'dog', 0, 0,  ["Happy"],[],["I'm Happy"], 'Dog', [true], 'doggood', 'dogbad', 'traitwindow'),
            new Character(game, 'astronaut', 0, 0,["Ignoring", "Shares"],["Sorry, can't talk to IGNORED spirits", "It's mean when you DON'T SHARE"],["I like real weapons not MAGICAL ones!"], 'Astronaut', astronautTraits, 'astronautgood', 'astronautbad', 'traitwindow'),
            new Character(game, 'ghost', 0, 0,["Shares"],["Don't Share"],["Doc, I can't believe you DON'T SHARE"], 'Ghost', ghostTraits, 'ghostgood', 'ghostbad', 'traitwindow')
         
        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[1][5].place(this.characters[0]);
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
                wipe.animOut(this.nextlevel);
            }
        }
    },
    nextlevel: function(){
        game.state.start("ToTheMoon");
    }
};