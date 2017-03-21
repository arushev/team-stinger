function getGameEngine(gameCanvas) {
    const fieldCanvas = gameCanvas;

    let fieldObjects = [];

    function processCollisions() {
        let objectCount = fieldObjects.length;
        for (let i = 0; i < objectCount; i++) {
            for (let j = i + 1; j < objectCount; j++) {
                let object1 = fieldObjects[i];
                let object2 = fieldObjects[j];

                let object1LeftBorder = object1.getPositionX() - object1.getWidth() / 2;
                let object1RightBorder = object1.getPositionX() + object1.getWidth() / 2;
                let object1TopBorder = object1.getPositionY() - object1.getWidth() / 2;
                let object1BottomBorder = object1.getPositionY() + object1.getWidth() / 2;

                let object2LeftBorder = object2.getPositionX() - object2.getWidth() / 2;
                let object2RightBorder = object2.getPositionX() + object2.getWidth() / 2;
                let object2TopBorder = object2.getPositionY() - object2.getWidth() / 2;
                let object2BottomBorder = object2.getPositionY() + object2.getWidth() / 2;

                if (object1LeftBorder < object2RightBorder &&
                    object1RightBorder > object2LeftBorder &&
                    object1TopBorder < object2BottomBorder &&
                    object1BottomBorder > object2TopBorder) {
                    // Collision between object1 and object2 detected

                    // console.log('collision:');
                    // console.log('object1LeftBorder =' + object1LeftBorder);
                    // console.log('object1RightBorder =' + object1RightBorder);
                    // console.log('object1TopBorder =' + object1TopBorder);
                    // console.log('object1BottomBorder =' + object1BottomBorder);
                    // console.log('object2LeftBorder =' + object2LeftBorder);
                    // console.log('object2RightBorder =' + object2RightBorder);
                    // console.log('object2TopBorder =' + object2TopBorder);
                    // console.log('object2BottomBorder =' + object2BottomBorder);

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

            const topFieldBorder = getInvisibleWall(
                fieldCanvas.width / 2, -fieldBordersWidth / 2, fieldBordersWidth);

            const rightFieldBorder = getInvisibleWall(
                fieldCanvas.width + fieldBordersWidth / 2, fieldCanvas.height / 2, fieldBordersWidth);

            const bottomFieldBorder = getInvisibleWall(
                fieldCanvas.width / 2, fieldCanvas.height + fieldBordersWidth / 2, fieldBordersWidth);

            const leftFieldBorder = getInvisibleWall(-fieldBordersWidth / 2, fieldCanvas.height / 2, fieldBordersWidth);

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