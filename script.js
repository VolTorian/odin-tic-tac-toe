const ticTacToeGame = (function () {
    const newGameButton = document.getElementById("new-game");
    const gridSquares = document.querySelectorAll(".cell");
    const turnIndicator = document.getElementById("current-turn");

    const gameBoard = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];
    let playerState = "x";
    let turns = 0;

    const handleCellClick = (event) => {
        if (event.target.tagName.toUpperCase() === "DIV") {
            handlePlayerChoice(event);
        }
        else if (event.target.tagName.toUpperCase() === "IMG") {
            console.log("Position already taken. Try again.");
            // 
        }
        else {
            console.log(`O.o wat this should not have happened ${event.target}`);
        }
    }

    const handlePlayerChoice = (event) => {
        const cellClasses = event.target.className.split(" ");
        let row = cellClasses[1].charAt(cellClasses[1].length - 1);
        let col = cellClasses[2].charAt(cellClasses[2].length - 1);

        if (gameBoard[row][col] === ".") {
            drawShape(event);
            turns++;
            gameBoard[row][col] = playerState;
            let gameState = checkWinner(row, col);
            displayBoard();

            if (gameState === "WINNER") {
                console.log(`${playerState} wins.`);
                gridSquares.forEach((square) => square.removeEventListener("click", handleCellClick));
                return;
            }
            else if (gameState === "DRAW") {
                console.log("It's a draw.");
                gridSquares.forEach((square) => square.removeEventListener("click", handleCellClick));
                return;
            }
            else if (gameState === "ONGOING") {
                if (playerState === "x") {
                    playerState = "o";
                    turnIndicator.src = "./images/circle-outline.svg";
                }
                else {
                    playerState = "x";
                    turnIndicator.src = "./images/close.svg";
                }
            }
        }
        else {
            console.log("Position already taken. Try again.");
        }
    };

    const newGame = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = ".";
            }
        }
        playerState = "x";
        turnIndicator.src = "./images/close.svg";
        turns = 0;
        gridSquares.forEach((square) => square.querySelector("img").src = "");
        gridSquares.forEach((square) => square.addEventListener("click", handleCellClick));
        displayBoard();
    };

    const displayBoard = () => {
        console.log("  1 2 3");
        for (let i = 0; i < 3; i++) {
            console.log(`${i + 1} ${gameBoard[i].join(" ")}`);
        }
    };

    const checkWinner = (row, col) => {
        for (let i = 0; i < 3; i++) {
            if (gameBoard[row][i] !== playerState) {
                break;
            }
            if (i == 2) {
                console.log(`${playerState} wins`);
                return "WINNER";
            }
        }

        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][col] !== playerState) {
                break;
            }
            if (i == 2) {
                console.log(`${playerState} wins`);
                return "WINNER";
            }
        }

        if (row === col) {
            for (let i = 0; i < 3; i++) {
                if (gameBoard[i][i] !== playerState) {
                    break;
                }
                if (i == 2) {
                    console.log(`${playerState} wins`);
                    return "WINNER";
                }
            }
        }

        if (parseInt(row) + parseInt(col) === 2) {
            for (let i = 0; i < 3; i++) {
                if (gameBoard[i][2 - i] !== playerState) {
                    break;
                }
                if (i == 2) {
                    console.log(`${playerState} wins`);
                    return "WINNER";
                }
            }
        }

        if (turns >= 9) {
            return "DRAW";
        }

        return "ONGOING";
    };

    const drawShape = (event) => {
        if (playerState === "x") {
            event.target.querySelector("img").src = "./images/close.svg";
        }
        else {
            event.target.querySelector("img").src = "./images/circle-outline.svg";
        }
    }

    newGameButton.addEventListener("click", newGame);
    gridSquares.forEach((square) => square.addEventListener("click", handleCellClick));

    return {newGame, displayBoard};
})();