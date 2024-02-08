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
            row = prompt("Enter a row number:") - 1;
            col = prompt("Enter a column number:") - 1;

            if (gameBoard[row][col] === ".") {
                break;
            }
            console.log("Position already taken. Try again.");
        }
        gameBoard[row][col] = playerState;

        checkWinner(row, col);

        if (playerState === "x") {
            playerState = "o";
        }
        else {
            playerState = "x";
        }
        turns++;
        displayBoard();
    };

    const checkWinner = (row, col) => {
        for (let i = 0; i < 3; i++) {
            if (gameBoard[row][i] !== playerState) {
                break;
            }
            if (i == 2) {
                console.log(`${playerState} wins`);
                return true;
            }
        }

        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][col] !== playerState) {
                break;
            }
            if (i == 2) {
                console.log(`${playerState} wins`);
                return true;
            }
        }

        if (row === col) {
            for (let i = 0; i < 3; i++) {
                if (gameBoard[i][i] !== playerState) {
                    break;
                }
                if (i == 2) {
                    console.log(`${playerState} wins`);
                    return true;
                }
            }
        }
        
        if (row + col === 2) {
            for (let i = 0; i < 3; i++) {
                if (gameBoard[i][2 - i] !== playerState) {
                    break;
                }
                if (i == 2) {
                    console.log(`${playerState} wins`);
                    return true;
                }
            }
        }
    };

    return {displayBoard, playerTurn};
})();