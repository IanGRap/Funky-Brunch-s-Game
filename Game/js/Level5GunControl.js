var Level5GunControl = function(game){

    //jake has edited this file to test implemenatation of the actual temple 2 - gun control level

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

Level5GunControl.prototype = {

    create: function(){

        //loads background image
        var background = game.add.image(0, 0, 'temple');

        this.obstacles = [
            [
                [2, 2, 1, 1, 2, 2],
                [2, 2, 2, 1, 2, 2],
                [2, 2, 2, 1, 2, 2],
                [2, 2, 2, 1, 1, 2],
                [2, 2, 2, 2, 2, 2],
            ]
         
        ];

        // define a new board object
        this.board = new Board(game, 6, 5, 128, 80, 140);
        game.add.existing(this.board);

        //DISCLAIMER: these are by no means final traits as they don't work super well, it's a proof of concept
        //actually terrible and promotes differences, we'll need to do some writing brainstorming

        //make 6 circles, 2 of each color   [Trait Arrays]     [Difference Array]      [Conflict Text Array]       
       //function Character(game, key, locationX, locationY, traits, conflicts, conflictText, name, visibleTraits,traitwindow){


        this.characters = [
            new Character(game, 'dino', 0, 0, ["Scared"],["Fighting"],["Hey you're FIGHTING, stay away!"], 'Dinosaur', dinoTraits, 'dinogood', 'dinobad', 'traitwindow'),
            new Character(game, 'scientist', 0, 0,  ["Scared"],["Fighting"],["That's too dangerous to be FIGHTING with!"], 'Scientist', docTraits, 'scientistgood', 'scientistbad', 'traitwindow'),
            new Character(game, 'knight', 0, 0, ["Fighting"],["Scared"],["Don't be SCARED, I'm a master, but stay back!" ], 'Knight', [true], 'knightgood', 'knightbad', 'traitwindow'),
            new Character(game, 'dog', 0, 0,  ["Happy"],[],["I'm Happy"], 'Dog', [true], 'doggood', 'dogbad', 'traitwindow'),
            new Character(game, 'astronaut', 0, 0,["Sword Fan"],["Magical"],["I like real weapons not MAGICAL ones!"], 'Astronaut', astronautTraits, 'astronautgood', 'astronautbad', 'traitwindow'),
            new Character(game, 'ghost', 0, 0,["Fighting", "Magical"],["Scared", "Sword Fan"],["Stay back if you're SCARED", "SWORD FANS are scary, go away"], 'Ghost', ghostTraits, 'ghostgood', 'ghostbad', 'traitwindow')
         
        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[0][0].place(this.characters[0]);
        this.board.tiles[1][1].place(this.characters[1]);
        this.board.tiles[2][0].place(this.characters[2]);
        this.board.tiles[3][1].place(this.characters[3]);
        this.board.tiles[0][4].place(this.characters[4]);
        this.board.tiles[1][3].place(this.characters[5]);

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
        game.state.start("BattlePost");
    }
};