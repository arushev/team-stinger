function getGameEngine(gameCanvas) {
    const fieldCanvas = gameCanvas;

    let fieldObjects = [];
    let playerTank;

    // Use this function to launch shells. Provide it to a shooting object (e. g. turret) and use it from there
    function launchShell(positionX, positionY, shellDirection, shellSpeed = 20, shellDamage = 10) {
        let shell = getShell(positionX, positionY, 16, shellDirection, shellSpeed, shellDamage);
        fieldObjects.push(shell);
        // console.log('launched shell');
        // console.log('positionX = ', positionX);
        // console.log('positionY = ', shellDirection);
        // console.log('shellSpeed = ', shellSpeed);
        // console.log('shellDamage = ', shellDamage);
        // console.log('fieldObjects count = ' + fieldObjects.length);
    }

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

            playerTank = getPlayerTank(390, 250, 100, launchShell);

            fieldObjects.push(topFieldBorder, rightFieldBorder, bottomFieldBorder, leftFieldBorder, playerTank);
        },

        advanceOneFrame: function() {
            fieldObjects.forEach(obj => obj.advanceOneFrame());
            processCollisions();
            fieldObjects = fieldObjects.filter(obj => !obj.canRemove())
        },

        drawFieldAndObjects: function() {
            let context = fieldCanvas.getContext('2d');
            drawRect(context, 0, 0, fieldCanvas.width, fieldCanvas.height, 'DarkGray');

            fieldObjects.forEach(obj => obj.draw(fieldCanvas));
        },

        isPlayerDead: function() {
            return playerTank.getHealth() <= 0;
        }
    }
}