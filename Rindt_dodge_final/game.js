//DEKLARACE VESKERYCH HODNOT
let player = document.getElementById("player");
let enemyContainer = document.getElementById("game");
let gameTicks = 0;
let game = false;
let score = 0;
let highscore = 0;

//DEKLARACE ENEMAKU
let enemiesT = [];
let enemiesL = [];
let enemiesB = [];
let enemiesR = [];

//GAMESTOPU
function gameStop(){
    game = true;
    console.log("start");
    score = 0;
    document.getElementById("instructions").innerHTML = "PLAY!";
}

//INTERVAL NA MOUSE CURZOR
setInterval(mMove,10);

//GAMETICK - KAZDY FRAME SE PREHRAJE 1 POKUD NENI STOPLA HRA
function gametick() {
    if (game == true){ //PLAYER MOVEMENT
        checkCollisions(); //CHECK COLIZI
        if (gameTicks % 6 === 1) {//POCITANI SCORE
            spawnEnemy();//SPAWN NOVYCH ENEMIES
            score += Math.floor(1/(innerHeight) * 4000);//KALKULACE SCORE
            document.getElementById("score").innerHTML = score + "P";//ZAPISOVANI SCORE
        }
        moveEnemies();//MOVEMENT ENEMIES
    }
    requestAnimationFrame(gametick);//FRAME X
    gameTicks++;//FRAME X ++
}

//------------------------------ GENEACE EMENIES (HROZNE DEBILNI) --------------------------------------------------------------

function spawnEnemy() {
    let x = getRandomInt(4);
    if (x == 0) { //GENERACE PRO TOP
        let enemyT = document.createElement("div");
        enemyT.className = "enemy";
        enemyT.style.top = "40px";
        enemyT.style.left = getRandomInt(window.innerWidth - 80) + 20 +  'px';
        enemyContainer.appendChild(enemyT);
        enemiesT.push(enemyT);
    } else if (x == 1) { //GENERACE PRO LEFT
        let enemyL = document.createElement("div");
        enemyL.className = "enemy";
        enemyL.style.top = getRandomInt(window.innerHeight - 80) + 20 + 'px';
        enemyL.style.left = "40px";
        enemyContainer.appendChild(enemyL);
        enemiesL.push(enemyL);
    } else if (x == 2) { //GENERACE PRO BOTTOM
        let enemyB = document.createElement("div");
        enemyB.className = "enemy";
        enemyB.style.top = innerHeight - 40 + "px";
        enemyB.style.left = getRandomInt(window.innerWidth - 80) + 20 + 'px';
        enemyContainer.appendChild(enemyB);
        enemiesB.push(enemyB);
    } else { //GENERACE PRO RIGHT
        let enemyR = document.createElement("div");
        enemyR.className = "enemy";
        enemyR.style.top = getRandomInt(window.innerHeight - 80) + 20 + 'px';
        enemyR.style.left = innerWidth - 40 + "px";
        enemyContainer.appendChild(enemyR);
        enemiesR.push(enemyR);
    }
}

//------------------------------ MOVEMENT EMENIES --------------------------------------------------------------

function moveEnemies() {

    //MOVEMENT ENEMIES Z TOP
    enemiesT.forEach((enemyT) => {
        let top = parseInt(enemyT.style.top, 10);
        enemyT.style.top = top + 10 + 'px';
    });

    //DESTRUKCE ENEMIES Z TOP PO OPUSTENI OBRAZOVKY
    enemiesT = enemiesT.filter((enemyT) => {
        let top = parseInt(enemyT.style.top, 10);
        if (top < window.innerHeight - 60) {
            return true;
        } else {
            enemyT.remove();
            return false;
        }
    });

    //MOVEMENT ENEMIES Z LEFT
    enemiesL.forEach((enemyL) => {
        let left = parseInt(enemyL.style.left, 10);
        enemyL.style.left = left + 10 + 'px';
    });
    //DESTRUKCE ENEMIES Z LEFT PO OPUSTENI OBRAZOVKY
    enemiesL = enemiesL.filter((enemyL) => {
        let left = parseInt(enemyL.style.left, 10);
        if (left < window.innerWidth - 60) {
            return true;
        } else {
            enemyL.remove();
            return false;
        }
    });
    
    //MOVEMENT ENEMIES Z BOTTOM
    enemiesB.forEach((enemyB) => {
        let top = parseInt(enemyB.style.top, 10);
        enemyB.style.top = top - 10 + 'px';
    });
    //DESTRUKCE ENEMIES Z BOTTOM PO OPUSTENI OBRAZOVKY
    enemiesB = enemiesB.filter((enemyB) => {
        let top = parseInt(enemyB.style.top, 10);
        if (top > 60) {
            return true;
        } else {
            enemyB.remove();
            return false;
        }
    });
    //MOVEMENT ENEMIES Z LEFT
    enemiesR.forEach((enemyR) => {
        let left = parseInt(enemyR.style.left, 10);
        enemyR.style.left = left - 10 + 'px';
    });
    //DESTRUKCE ENEMIES Z LEFT PO OPUSTENI OBRAZOVKY
    enemiesR = enemiesR.filter((enemyR) => {
        let left = parseInt(enemyR.style.left, 10);
        if (left > 60) {
            return true;
        } else {
            enemyR.remove();
            return false;
        }
    });
}

//------------------------------ DEKLARACE FUNKCI --------------------------------------------------------------

//PO DETEKCI KOLIZE ZE EXECUTNE
function handleCollision() {
    game = false;
    console.log("end");
    removeEnemies(enemiesT);
    removeEnemies(enemiesL);
    removeEnemies(enemiesB);
    removeEnemies(enemiesR);
    if (score >= highscore){
        document.getElementById("highscore").innerHTML = "HIGHSCORE: " + score + "P";
        highscore = score;
    }
    document.getElementById("instructions").innerHTML = "PRESS ME TO START AGAIN";
}

//GENERATOR NAHODNYCH CISEL - KDYKOLIV JE POTREBA (PREVAZNE U GENERACE ENEMIES)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//ODSTRANI VESEKE ENEMIES PO KONCI HRY(NEFUNGUJE PERFEKTNE) - SPOUSTI SE PRI KOLIZI
function removeEnemies(enemies) {
    enemies.forEach((enemy) => {
        enemy.remove();
    });
    enemies.length = 0;
}


//CHECK PRO KOLIZE - SPOUSTI SE KAZDY FRAME
function checkCollisions() {
    let playerRect = player.getBoundingClientRect();
    checkCollisionsWith(enemiesT, playerRect);
    checkCollisionsWith(enemiesL, playerRect);
    checkCollisionsWith(enemiesB, playerRect);
    checkCollisionsWith(enemiesR, playerRect);
}

//COLISION CHECK - SPOUSTI SE KAZDY FRAME
function checkCollisionsWith(enemies, playerRect) {
    enemies.forEach((enemy) => {
        let enemyRect = enemy.getBoundingClientRect();
        if (
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top &&
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left
        ) {
            handleCollision();
        }
    });
}

//TRACKOVANI MYSI (BEZI PORAD)
function mMove(){
    enemyContainer.addEventListener("mousemove", (e) => {
        let rect = enemyContainer.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            player.style.top = e.clientY - 20 + 'px';
            player.style.left = e.clientX - 20 + 'px';
        }
    });
}
//NAHODÍ HRU
requestAnimationFrame(gametick);