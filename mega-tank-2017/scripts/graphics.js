function drawRect(context, x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawText(context, showWords, textX, textY, fillColor) {
    context.fillStyle = fillColor;
    context.fillText(showWords, textX, textY);
}

function drawRotatingObj(context, x, y, ang, axisX, axisY, length, thickness, color) {
    context.save();
    context.translate(x, y);
    context.rotate(ang);
    drawRect(context, -axisX, -axisY, length, thickness, color);
    context.restore();
}

function drawRotatingImg(context, bitmap, x, y, ang, axisX, axisY) {
    context.save();
    context.translate(x, y);
    context.rotate(ang);
    context.drawImage(bitmap, -axisX, -axisY);
    context.restore();
}