function getShell(initialPositionX, initialPositionY, shellWidth, shellDirection, shellSpeed, shellDamage) {
    let positionX = initialPositionX;
    let positionY = initialPositionY;

    const width = shellWidth;
    const direction = shellDirection;
    const speed = shellSpeed;
    const damage = shellDamage;

    let shellHit = false;

    return {
        getPositionX: function() {
            return positionX;
        },

        getPositionY: function() {
            return positionY;
        },

        getWidth: function() {
            return width;
        },

        getHealth: function() {
            return 1;
        },

        advanceOneFrame: function() {
            positionX += Math.cos(direction) * speed;
            positionY += Math.sin(direction) * speed;
        },

        draw: function(fieldCanvas) {
            context = fieldCanvas.getContext('2d');
            drawRotatingObj(context,
                positionX,
                positionY,
                direction,
                width / 2,
                width / 2,
                width,
                width,
                'Gray');
        },

        onColide: function(otherObject) {
            if (!shellHit) {
                shellHit = true;
                otherObject.takeDamage(damage);
            }
            console.log('shell colides');
        },

        takeDamage: function(damagePoints) {

        },

        canRemove: function() {
            return shellHit == true;
        }
    }
}