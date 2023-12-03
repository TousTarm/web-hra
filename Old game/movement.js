let player = document.getElementById("player");
function move(){
    window.addEventListener("mousemove",(e) => {
        player.style.top = e.clientY -20+ 'px';
        player.style.left = e.clientX -20+ 'px';
    });
}
setInterval(move,20);