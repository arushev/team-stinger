const gameFramesPerSecond = 30;
let gameEngine;
let gameInteval;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');

    loadGraphics();

    gameEngine = getGameEngine(canvas);
}

function startNewGame() {
    clearInterval(gameInteval);
    // Remove start screen
    var startScreen = document.getElementById('start-game');
    startScreen.style.display = 'none';

    gameEngine.setupNewGame();

    gameEngine.startOrResumeGame();

    gameInteval = setInterval(gameLoop, 1000 / gameFramesPerSecond);
}

function gameLoop() {
    gameEngine.advanceOneFrame();
    gameEngine.drawFieldAndObjects();

    if (gameEngine.isPlayerDead()) {
        console.log('player is dead');
        clearInterval(gameInteval);
    }
}