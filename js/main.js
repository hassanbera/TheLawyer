import { getGameState } from './engine.js';
import { drawMenu } from './scenes/menu.js';
import { drawGame } from './scenes/game.js';
import { ctx, canvas } from './engine.js';

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (getGameState() === "menu") {
        drawMenu();
    } else if (getGameState() === "game") {
        drawGame();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
