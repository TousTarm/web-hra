function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Enemy {
    constructor(enemyn) {
        this.enemyn = enemyn;
        let game = document.getElementById('game');
        game.innerHTML += "<div class='enemy' id='" + this.enemyn + "'></div>";

        this.enemy = document.getElementById(this.enemyn);
        this.x = getRandomInt(window.innerWidth);
        this.y = 0;

        this.moveInterval = setInterval(this.enemymove.bind(this), 20);
    }

    enemymove() {
        this.enemy.style.left = this.x + 'px';
        this.enemy.style.top = this.y + 'px';
        this.y += 10;

        if (this.y >= window.innerHeight) {
            this.remove();
        }
    }

    remove() {
        clearInterval(this.moveInterval);
        this.enemy.remove();
    }
}
let enemyCount = 0;

setInterval(() => {
    const enemy = new Enemy('enemy' + enemyCount);
    enemyCount++;
}, 1000);
