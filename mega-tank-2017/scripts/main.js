const gameFramesPerSecond = 60;
let gameEngine;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');

    gameEngine = getGameEngine(canvas);

    gameEngine.setupNewGame();

    setInterval(gameLoop, 1000 / gameFramesPerSecond);
}

function gameLoop() {
    gameEngine.advanceOneFrame();
    gameEngine.drawFieldAndObjects();
}