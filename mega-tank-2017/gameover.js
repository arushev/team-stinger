/**
 * End the game and restart
 */
function gameOver() {
    stop = true;
    $('#score').html(score);
    $('#game-over').show();
}
/**
 * Click handlers for the different menu screens
 */
// …
$('.restart').click(function() {
    $('#game-over').hide();
    startGame();
});