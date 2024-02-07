const ticTacToeGame = (function () {
    const gameBoard = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];

    const displayBoard = () => {
        for (let i = 0; i < 3; i++) {
            console.log(gameBoard[i].join(" "));
        }
    };

    return {displayBoard};
})();