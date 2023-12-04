let player = document.getElementById("player");
let enemyContainer = document.getElementById("game"); // Assuming there is a container for enemies in your HTML

let gameTicks = 0;
let enemiesT = [];
let enemiesL = [];
let enemiesB = [];
let enemiesR = [];

function gametick() {
    window.addEventListener("mousemove", (e) => {
        player.style.top = e.clientY - 20 + 'px';
        player.style.left = e.clientX - 20 + 'px';
    });
    if (gameTicks % 6 === 0) {
        spawnEnemy();
    }
    moveEnemies();
    requestAnimationFrame(gametick);
    gameTicks++;
}

function spawnEnemy() {
    let x = getRandomInt(4);
    if (x == 0) {
        let enemyT = document.createElement("div");
        enemyT.className = "enemy";
        enemyT.style.top = 0;
        enemyT.style.left = getRandomInt(window.innerWidth) + 'px';
        enemyContainer.appendChild(enemyT);
        enemiesT.push(enemyT);
    } else if (x == 1) {
        let enemyL = document.createElement("div");
        enemyL.className = "enemy";
        enemyL.style.top = getRandomInt(window.innerHeight) + 'px';
        enemyL.style.left = 0;
        enemyContainer.appendChild(enemyL);
        enemiesL.push(enemyL);
    } else if (x == 2) {
        let enemyB = document.createElement("div");
        enemyB.className = "enemy";
        enemyB.style.top = innerHeight + "px";
        enemyB.style.left = getRandomInt(window.innerWidth) + 'px';
        enemyContainer.appendChild(enemyB);
        enemiesB.push(enemyB);
    } else {
        let enemyR = document.createElement("div");
        enemyR.className = "enemy";
        enemyR.style.top = getRandomInt(window.innerHeight) + 'px';
        enemyR.style.left = innerWidth + "px";
        enemyContainer.appendChild(enemyR);
        enemiesR.push(enemyR);
    }
}

function moveEnemies() {
    enemiesT.forEach((enemyT) => {
        let top = parseInt(enemyT.style.top, 10);
        enemyT.style.top = top + 10 + 'px';
    });

    enemiesT = enemiesT.filter((enemyT) => {
        let top = parseInt(enemyT.style.top, 10);
        if (top < window.innerHeight) {
            return true;
        } else {
            enemyT.remove();
            return false;
        }
    });

    enemiesL.forEach((enemyL) => {
        let left = parseInt(enemyL.style.left, 10);
        enemyL.style.left = left + 10 + 'px';
    });
    
    enemiesL = enemiesL.filter((enemyL) => {
        let left = parseInt(enemyL.style.left, 10);
        if (left < window.innerWidth) {
            return true;
        } else {
            enemyL.remove();
            return false;
        }
    });

    enemiesB.forEach((enemyB) => {
        let top = parseInt(enemyB.style.top, 10);
        enemyB.style.top = top - 10 + 'px';
    });
    
    enemiesB = enemiesB.filter((enemyB) => {
        let top = parseInt(enemyB.style.top, 10);
        if (top > 0) {
            return true;
        } else {
            enemyB.remove();
            return false;
        }
    });

    enemiesR.forEach((enemyR) => {
        let left = parseInt(enemyR.style.left, 10);
        enemyR.style.left = left - 10 + 'px';
    });
    
    enemiesR = enemiesR.filter((enemyR) => {
        let left = parseInt(enemyR.style.left, 10);
        if (left > 0) {
            return true;
        } else {
            enemyR.remove();
            return false;
        }
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

requestAnimationFrame(gametick);