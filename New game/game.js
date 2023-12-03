let player = document.getElementById("player");
let enemyContainer = document.getElementById("game"); // Assuming there is a container for enemies in your HTML

let gameTicks = 0;
let enemies = [];

function gametick() {
    window.addEventListener("mousemove", (e) => {
        player.style.top = e.clientY - 20 + 'px';
        player.style.left = e.clientX - 20 + 'px';
    });

    // Spawn an enemy every 60 game ticks
    if (gameTicks % 6 === 0) {
        spawnEnemy();
    }

    // Move and update existing enemies
    moveEnemies();

    requestAnimationFrame(gametick);
    gameTicks++;
}

function spawnEnemy() {
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.top = 0;
    enemy.style.left = getRandomInt(window.innerWidth) + 'px';
    enemyContainer.appendChild(enemy);
    enemies.push(enemy);
}

function moveEnemies() {
    enemies.forEach((enemy) => {
        // Update enemy positions or any other logic
        // For example, move them downward
        let top = parseInt(enemy.style.top, 10);
        enemy.style.top = top + 10 + 'px';

        // You can add logic to remove enemies when they go off-screen or collide with the player
    });

    // Clean up enemies that have gone off-screen
    enemies = enemies.filter((enemy) => {
        return parseInt(enemy.style.top, 10) < window.innerHeight;
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

requestAnimationFrame(gametick);