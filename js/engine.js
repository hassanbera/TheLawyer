export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

export let gameState = "menu";

export function setGameState(state) {
    gameState = state;
}

export function getGameState() {
    return gameState;
}
