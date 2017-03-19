function getInvisibleWall(initialPositionX, initialPositionY, wallWidth) {
    let positionX = initialPositionX;
    let positionY = initialPositionY;

    const width = wallWidth;


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
            // the wall is stationarry
        },

        draw: function() {
            //nothing to draw, the wall is invisible
        },

        onColide: function(otherObject) {
            //the other object should process the colission
        },

        takeDamage: function(damagePoints) {
            //no damage
        },

        canRemove: function() {
            return false;
        }
    }
}