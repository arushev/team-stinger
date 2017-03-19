function getGameEngine(gameCanvas) {
    const fieldCanvas = gameCanvas;

    let fieldObjects = [];

    function processCollisions() {
        let objectCount = fieldObjects.length;
        for (let i = 0; i < objectCount; i++) {
            for (let j = i + 1; j < objectCount; j++) {
                let object1 = fieldObjects[i];
                let object2 = fieldObjects[j];

                if (object1.getPositionX() < object2.getPositionX() + object2.getWidth() &&
                    object1.getPositionX() + object1.getWidth() > object2.getPositionX() &&
                    object1.getPositionY() < object2.getPositionY() + object2.getWidth() &&
                    object1.getPositionY() + object1.getWidth() > object2.getPositionY()) {
                    // Collision between object1 and object2 detected
                    object1.onColide(object2);
                    object2.onColide(object1);
                }
            }
        }
    }

    return {
        setupNewGame: function() {
            fieldObjects = [];

            const fieldBordersWidth = Math.max(fieldCanvas.width, fieldCanvas.height);

            const topFieldBorder = getInvisibleWall(0, -fieldBordersWidth, fieldBordersWidth);
            const rightFieldBorder = getInvisibleWall(fieldCanvas.width, 0, fieldBordersWidth);
            const bottomFieldBorder = getInvisibleWall(0, fieldCanvas.height, fieldBordersWidth);
            const leftFieldBorder = getInvisibleWall(-fieldBordersWidth, 0, fieldBordersWidth);

            const playerTank = getPlayerTank(390, 250, 100);

            fieldObjects.push(topFieldBorder, rightFieldBorder, bottomFieldBorder, leftFieldBorder, playerTank);
        },

        advanceOneFrame: function() {
            fieldObjects.forEach(obj => obj.advanceOneFrame());
            processCollisions();
        },

        drawFieldAndObjects: function() {
            context = fieldCanvas.getContext('2d');
            context.fillStyle = 'black';
            context = canvas.getContext('2d');
            context.fillRect(0, 0, fieldCanvas.width, fieldCanvas.height);

            fieldObjects.forEach(obj => obj.draw(fieldCanvas));
        }
    }
}