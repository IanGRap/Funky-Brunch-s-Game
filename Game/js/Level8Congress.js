var Level8Congress = function(game){

    //jake has edited this file to test implemenatation of the actual congress castle trump level

    //reference to the board object
    var board;
    //array of the circles on the board
    var characters;
    //timer for when the puzzle needs to be completed (In milliseconds)

    //layouts of board layouts, 1 is green 0 is red
    var obstacles;  

    var dialogue1 = false;
    var dialogue2 = false;
    var dialogue3 = false;

    var timer;

    var dialogueBubble;
    var dialogueText;
};

//Screen wipe effect
var wipe;
var do1 = true;

Level8Congress.prototype = {
    
    //load in art assets
    preload: function(){
        //fixes aftermath of intro
        game.world.scale.set(1);
    },

    create: function(){

        //loads background image
        var background = game.add.image(0, 0, 'council');

        var trump = game.add.image(1440 - 256, 300, 'trump');

        var congress = [
            game.add.image(1000, 600, 'congress'),
            game.add.image(500, 700, 'congress'),
            game.add.image(200, 700, 'congress'),
            game.add.image(1000, 100, 'congress')
        ];
        //add dialogue system
        //this.dialogue = new Dialogue(game, 'dialogue', 96);
        //game.add.existing(this.dialogue);


        this.obstacles = [
            [
                [2, 2, 2, 2, 2, 2],
                [2, 2, 1, 1, 1, 2],
                [2, 2, 1, 1, 1, 2],
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
            new Character(game, 'dino', 0, 0, ["Angry", "Anti King"],["Chill", "Pro King"],["There's nothing CHILL about this!", "He's clearly evil, why are you PRO KING?"], 'Dinosaur', dinoTraits, 'dinogood', 'dinobad','traitwindow'),
            new Character(game, 'scientist', 0, 0,  ["Chill", "Anti King"],["Angry", "Anti King"],["It's bad but don't be ANGRY about it.", "PRO KING people are awful"], 'Scientist', docTraits, 'scientistgood', 'scientistbad','traitwindow'),
            new Character(game, 'knight', 0, 0, ["Chill", "Pro King"],["Angry","Anti King"],["What is there to be ANGRY about?", "ANTI KING? He's keeping order!"], 'Knight', [true], 'knightgood', 'knightbad','traitwindow'),
            new Character(game, 'dog', 0, 0,  ["Chill", "Angry"],["Angry", "Chill"],["Bork!", "Heck!"], 'Dog', [true], 'doggood', 'dogbad','traitwindow'),
            new Character(game, 'astronaut', 0, 0,["Anti King"],["Pro King"],["PRO KING? He divides and enflames us!"], 'Astronaut', astronautTraits, 'astronautgood', 'astronautbad','traitwindow'),
            new Character(game, 'ghost', 0, 0,["Angry"],["Chill"],["No one should be CHILL about any of this."], 'Ghost', ghostTraits, 'ghostgood', 'ghostbad','traitwindow')
         
        ];

        for(let i=0; i<this.characters.length; i++){
            game.add.existing(this.characters[i]);
        };

        // set the starting location for the circles
        this.board.tiles[0][1].place(this.characters[0]);
        this.board.tiles[1][0].place(this.characters[1]);
        this.board.tiles[2][1].place(this.characters[2]);
        this.board.tiles[3][0].place(this.characters[3]);
        this.board.tiles[0][5].place(this.characters[4]);
        this.board.tiles[2][5].place(this.characters[5]);

        // pass one of the obstacles for the board object
        this.board.setTiles(this.obstacles[0]);

        //Screen Wipe Object Creation
        wipe = new ScreenWipe(game,'wipe');
        game.add.existing(wipe);
        wipe.animIn();
        do1 = true;

        this.dialogueBubble = game.add.image(0, 600, 'speachR');
        this.dialogueText = game.add.text(25, 625, '', { font: "25px Architects Daughter", fill: "#000000", wordWrap: true, wordWrapWidth: 330, align: "left"});
        this.dialogueBubble.alpha = 0;

        this.timer = 60000;
    },


    update: function(){
        this.timer -= game.time.elapsed;
        console.log(''+this.timer);
        if(!this.dialogue1){
            if(this.timer < 55000){
                this.dialogue1 = true;
                this.dialogueBubble.alpha = 1;
                this.dialogueText.text = 'warning 1';
            }
        } else if (!this.dialogue2){
            if(this.timer < 50000){
                this.dialogueText.text = '';
                this.dialogueBubble.alpha = 0;
            }
            if(this.timer < 40000){
                this.dialogueText.text = 'warning 2';
                this.dialogueBubble.alpha = 1;
                this.dialogue2 = true;
            }
        } else if (!this.dialogue3){
            if(this.timer < 35000){
                this.dialogueText.text = '';
                this.dialogueBubble.alpha = 0;
            }
            if(this.timer < 25000){
                this.dialogueText.text = 'warning 3';
                this.dialogueBubble.alpha = 1;
                this.dialogue3 = true;
            }
        } else {
            if(this.timer < 20000){
                this.dialogueText.text = '';
                this.dialogueBubble.alpha = 0;
            }
        }
    },
    nextlevel: function(){
        game.state.start("TestLevel2");
    }
};