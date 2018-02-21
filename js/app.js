//sets intial player score to 0
var score = 0;
document.getElementById("playerscore").innerHTML = score;
//Enemy function
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    //reset the position of enemy to move again
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }
    //check if any collision between enemy and player
    if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
            score = 0;
            document.getElementById("playerscore").innerHTML= score;
            player.x = 200;
            player.y = 380;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player function
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function() {
    //prevent player moving out of the border
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }
    //check for reaching the water level and incrementing the score
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        score++;
        document.getElementById("playerscore").innerHTML = score;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 41;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 41;
            break;
    }
};

var allEnemies = [];
var newEnemies = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

//for adding new enemies
newEnemies.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});