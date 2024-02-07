const ticTacToeGame = (function () {
    const gameBoard = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];
    let playerState = "x";
    let turns = 0;

    const displayBoard = () => {
        console.log("  1 2 3");
        for (let i = 0; i < 3; i++) {
            console.log(`${i + 1} ${gameBoard[i].join(" ")}`);
        }
    };

    const playerTurn = () => {
        let row, col;
        console.log(`${playerState}'s turn. Choose a row and column.`);

        while (true) {
            row = prompt("Enter a row number:");
            col = prompt("Enter a column number:");

            if (gameBoard[row - 1][col - 1] === ".") {
                break;
            }
            console.log("Position already taken. Try again.");
        }
        gameBoard[row - 1][col - 1] = playerState;

        if (playerState === "x") {
            playerState = "o";
        }
        else {
            playerState = "x";
        }
        turns++;
        displayBoard();
    };

    return {displayBoard, playerTurn};
})();