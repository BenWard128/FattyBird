var score = 0;
var labelScore;
var pipes = [];
var scoreStart = false;

var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(1500, 400, Phaser.AUTO, 'game', stateActions);
var sound;
var redPipeCount = 0;

function preload() {
  game.load.audio("overlaymusic", "assets/music.mp3");
  game.load.image("pipeBlock", "../assets/pipe.png");
  game.load.image("pipeBlock2", "../assets/pipe_red.png");
  game.load.image("playerImg2", "../assets/pipe_yellow.png");
  game.load.image("playerImg3", "../assets/pipe_yellow.png");
  game.load.image("playerImg4", "../assets/pipe_red.png");
  game.load.image("playerImg5", "../assets/flappy-footer.png");
  game.load.image("playerImg6", "../assets/flappy-cropped.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("playerImg7", "../assets/TransformedTubesBG.PNG");
  //BackImage.width = 2550;
  //BackImage.height = 700;


}
/*
 * Initialises the game. This function is only called once.
 */
function create() {
   game.add.text(1575, 70, "Welcome to Flappy Bird! How little time can you get in 1 minute?",{font: "30px Times", fill: "#CC1000"});
     // set the background colour of the scene
   sound = game.add.audio("score");

   game.stage.setBackgroundColor("#b4a86b");
   labelScore = game.add.text(20, 20, "0");
   player = game.add.sprite(100, 200, "playerImg6");
   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.physics.arcade.enable(player);
   player.checkWorldBounds = true;
   player.body.collideWorldBounds = true;
   player.body.bounce.setTo(1,1)
   player.body.gravity.y = 1000;
   game.input.onDown.add(playerJump);
   player.body.velocity.x = 10;
   game.time.events.loop(1.75 * Phaser.Timer.SECOND, generatePipe);
   window.setTimeout(startPipes, 6000);
  //  backgroundMusic = game.add.audio("overlaymusic");
  //     backgroundMusic.loop = true;
  //  backgroundMusic.play();
//  music = game.add.audio("overlaymusic");
  //music.play();
//   game.sound.play("overlaymusic");

}

function startPipes() {
  scoreStart = true;
}



function update() {
    game.physics.arcade.overlap(player, pipes, gameOver);
}

function changeScore() {
  if (scoreStart) {
    score = score + 1;
    sound.play();
    labelScore.setText(score.toString());
  }
}

function playerJump() {
    player.body.velocity.y = -200;
}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  for (var count = 0; count < 8; count = count + 1) {
      if (count != gapStart && count != gapStart + 1) {
        if (redPipeCount == 4) {
            addGreenPipeBlock(1300, count * 50);
        } else {
            addRedPipeBlock(1300, count * 50);
        }
      }
  }
  if (redPipeCount != 6) {
    redPipeCount = redPipeCount + 1;
  } else {
    redPipeCount = 0;
  }
  changeScore();
}

function addRedPipeBlock(x, y) {
    var block = game.add.sprite(x, y, "pipeBlock2")
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
    pipes.push(block);
}

function addGreenPipeBlock(x, y) {
    var block = game.add.sprite(x, y, "pipeBlock")
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
    pipes.push(block);
}

function gameOver() {
    location.reload();
}
