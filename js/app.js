// Enemies our player must avoid
var Enemy = function(lane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    //var lane = (Math.floor((Math.random() * 10) + 1)%3)+1;
    if (lane===1)
        this.y = 60;
    else if (lane===2)
        this.y = 145;
    else if (lane===3)
        this.y = 225;
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
    this.x = this.x + this.speed*dt;
    //prevents enemy from going out of the screen
    if (this.x>500)
        this.x = 0;
    //collision detection
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt){
    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

Player.prototype.handleInput = function(allowedKeys){

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

var allEnemies = [new Enemy(1),
                  new Enemy(2), 
                  new Enemy(3)];
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
