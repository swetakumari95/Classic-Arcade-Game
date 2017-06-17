var score = 0;
var lives = 5;
var button = document.createElement("BUTTON");
var text = document.createTextNode("REPLAY");
var gameOver = false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.sprite = 'images/enemy-bug.png';
    
    //enemy's initial location
    this.x = 0;
    this.y = randomLane();
    
    //random speeds for the enemies
    var max = 300;
    var min = 150;
    this.speed = Math.random()*(max-min) + min;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //moving the enemy along the x axis
    this.x = this.x + this.speed*dt;
    
    //prevents enemy from going out of the screen
    if (this.x>500){
        this.x = 0;
        this.y = randomLane(); //used for enemies to appear in different lanes
    }
    
    //collision detection
    var diff_x = Math.abs(this.x-player.x);
    if (diff_x<50){
        if (this.y==60 && player.y==40) {
            //collision in lane 1
            player.reset();
            //decreases the lives
            decreaseLives();
        }else if (this.y==145 && player.y==130) {
            //collision in lane 2
            player.reset();
            //decreases the lives
            decreaseLives();
        }
        else if (this.y==225 && player.y==220){
            //collision in lane 1
            player.reset();
            //decreases the lives
            decreaseLives();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//function to generate random lane numbers
var randomLane = function(){
    var lane = (Math.floor((Math.random() * 10) + 1)%3)+1;
    if (lane===1)
        this.y = 60;
    else if (lane===2)
        this.y = 145;
    else if (lane===3)
        this.y = 225;
    return this.y;
};

var decreaseLives = function(){
    if (gameOver==false){
        lives -= 1;
        if (lives==0){
            gameOver = true;
            document.getElementById("livesBoard").innerHTML = "LIVES: "+lives;
            document.getElementById("gameOver").innerHTML = "GAME OVER";
            button.appendChild(text);
            document.getElementById("container").appendChild(button);
        }else
            document.getElementById("livesBoard").innerHTML = "LIVES: "+lives;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    //loading the player image
    this.sprite = 'images/char-boy.png';
    
    //initial location of player
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt){
    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//reseting the position of player
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

Player.prototype.handleInput = function(allowedKeys){
    //moving the players on the screen
    if (allowedKeys=='left'){
        this.x -= 100;
        if (this.x<0)
            this.x += 100;
    }else if (allowedKeys=='right'){
        this.x += 100;
        if (this.x>400)
            this.x -= 100;
    }else if (allowedKeys=='up'){
        this.y -= 90;
        if (this.y<40){
            //reseting the game when player reaches the water
            player.reset();
            //updating the score of the game
            if (gameOver==false){
                score += 10;
                document.getElementById("scoreBoard").innerHTML = "SCORE: "+score;   
            }
        }
    }else if (allowedKeys=='down'){
        this.y += 90;
        if (this.y>400)
            this.y -= 90;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i=0; i<5; i++){
    allEnemies.push(new Enemy());
}
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

button.onclick = function(){
    location.reload();
};