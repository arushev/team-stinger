function getPlayerTank(initialPositionX, initialPositionY, initialHealth = 100) {
    // keyCodes
    const KEY_W = 87;
    const KEY_S = 83;
    const KEY_A = 65;
    const KEY_D = 68;

    // key flags
    var keyHeld_Gas = false;
    var keyHeld_Reverse = false;
    var keyHeld_TurnLeft = false;
    var keyHeld_TurnRight = false;

    let tankSpeed = 0;
    let tankAng = -Math.PI / 2;

    var cannonAng = 0;

    const TANK_WIDTH = 75;
    const TANK_HEIGHT = 120;
    const TANK_AXIS = [TANK_HEIGHT / 2, TANK_WIDTH / 2];

    const CANNON_WIDTH = 15;
    const CANNON_HEIGHT = 80;
    const CANNON_AXIS = [CANNON_WIDTH / 2, CANNON_HEIGHT * 0.9];

    const GROUNDSPEED_DECAY = 0.90;
    const MAX_SPEED = 5;
    const DRIVE_POWER = 0.2;
    const REVERSE_POWER = 0.2;
    const TURN_RATE = 0.015;

    let tankCenterPositionX = initialPositionX + TANK_AXIS[0];
    let tankCenterPositionY = initialPositionY + TANK_AXIS[1];
    let health = initialHealth;
    const width = 120;

    // INPUT FUNCTIONS
    function aim() {
        let toAng = Math.atan2(mouseY - tankCenterPositionY, mouseX - tankCenterPositionX) + (Math.PI / 2);
        if (toAng !== cannonAng) cannonAng = toAng;
    }

    function handleMouse(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;

        mouseX = evt.clientX - rect.left - root.scrollLeft;
        mouseY = evt.clientY - rect.top - root.scrollTop;

        aim();
    }

    function keyPressed(evt) {
        console.log("key pressed: " + evt.keyCode);

        if (evt.keyCode == KEY_A) {
            keyHeld_TurnLeft = true;
        }
        if (evt.keyCode == KEY_W) {
            keyHeld_Gas = true;
        }
        if (evt.keyCode == KEY_D) {
            keyHeld_TurnRight = true;
        }
        if (evt.keyCode == KEY_S) {
            keyHeld_Reverse = true;
        }
        evt.preventDefault();
    }

    function keyReleased(evt) {
        console.log("key released: " + evt.keyCode);

        if (evt.keyCode == KEY_A) {
            keyHeld_TurnLeft = false;
        }
        if (evt.keyCode == KEY_W) {
            keyHeld_Gas = false;
        }
        if (evt.keyCode == KEY_D) {
            keyHeld_TurnRight = false;
        }
        if (evt.keyCode == KEY_S) {
            keyHeld_Reverse = false;
        }
        evt.preventDefault();
    }

    canvas.addEventListener('mousemove', handleMouse);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    function drawTankBody(context, X, Y, ang) {
        context.save();
        context.translate(X, Y);
        context.rotate(ang);
        drawRect(context, -TANK_AXIS[0], -TANK_AXIS[1], TANK_HEIGHT, TANK_WIDTH, 'DarkOliveGreen');
        context.restore();
    }

    function drawCannon(context, X, Y, ang) {
        context.save();
        context.translate(X, Y);
        context.rotate(ang);
        drawRect(context, -CANNON_AXIS[0], -CANNON_AXIS[1], CANNON_WIDTH, CANNON_HEIGHT, 'OliveDrab');
        context.restore();
    }

    function moveTank() {
        tankSpeed *= GROUNDSPEED_DECAY;

        if (Math.abs(tankSpeed) < MAX_SPEED) {
            if (keyHeld_Gas) {
                tankSpeed += DRIVE_POWER;
            }
            if (keyHeld_Reverse) {
                tankSpeed -= REVERSE_POWER;
            }
        }

        if (keyHeld_TurnLeft) {
            tankAng -= TURN_RATE;
        }
        if (keyHeld_TurnRight) {
            tankAng += TURN_RATE;
        }

        tankCenterPositionX += Math.cos(tankAng) * tankSpeed;
        tankCenterPositionY += Math.sin(tankAng) * tankSpeed;
    }

    function drawRect(context, X, Y, width, height, color) {
        context.fillStyle = color;
        context.fillRect(X, Y, width, height);
    }

    return {
        getPositionX: function() {
            return tankCenterPositionX - TANK_AXIS[0];
        },

        getPositionY: function() {
            return tankCenterPositionY - TANK_AXIS[1];;
        },

        getWidth: function() {
            return width;
        },

        getHealth: function() {
            return health;
        },

        advanceOneFrame: function() {
            moveTank()
        },

        draw: function(fieldCanvas) {
            context = fieldCanvas.getContext('2d');
            drawTankBody(context, tankCenterPositionX, tankCenterPositionY, tankAng);
            drawCannon(context, tankCenterPositionX, tankCenterPositionY, cannonAng);
        },

        onColide: function(otherObject) {
            console.log('player tank colided with another object');
            // stop tank from moving and unstack
            tankSpeed = 0;
            let newCenterTankPositionX = tankCenterPositionX;
            let newCenterTankPositionY = tankCenterPositionY;

            if (this.getPositionX() < otherObject.getPositionX() + otherObject.getWidth() &&
                this.getPositionX() + width > otherObject.getPositionX()) {
                // Unstack on the Y axis
                const distanceFromCenterToBottomOfOtherObject =
                    Math.abs(tankCenterPositionY - (otherObject.getPositionY() + otherObject.getWidth()));
                const distanceFromCenterToTopOfOtherObject =
                    Math.abs(tankCenterPositionY - otherObject.getPositionY());
                if (distanceFromCenterToBottomOfOtherObject < distanceFromCenterToTopOfOtherObject) {
                    //The tank is south of the other object
                    newCenterTankPositionY = otherObject.getPositionY() + otherObject.getWidth() + width / 2;
                } else {
                    //The tank is north of the other object
                    newCenterTankPositionY = otherObject.getPositionY() - width - width / 2;
                }
            }

            if (this.getPositionY() < otherObject.getPositionY() + otherObject.getWidth() &&
                this.getPositionY() + width > otherObject.getPositionY()) {
                // Unstack on the X axis
                // TODO:
            }

            tankCenterPositionX = newCenterTankPositionX;
            tankCenterPositionY = newCenterTankPositionY;
            console.log(`collision detected at ${this.getPositionX()}, ${this.getPositionY()}`);
        },

        takeDamage: function(damagePoints) {
            health -= damagePoints;
        },

        canRemove: function() {
            health <= 0;
        }
    }
}