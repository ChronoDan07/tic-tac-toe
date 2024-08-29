let player1 = createPlayer();
let player2 = createPlayer(false);
player2.setName("Computer");

function gameBoard(board) {
    const setPlace = function(choice, i, j) {
        const box = document.querySelector(`#gamebox [data-index="${i},${j}"]`);
        if (i >= 0 && i <= 2 && j >= 0 && j <= 2) {
            if (board[i][j] === "") {
                board[i][j] = choice;
                box.querySelector(`#${choice}`).classList.remove('invisible');
                return true;
            }
        }
        return false;
    };
    const getPlace = function(n) {
        switch(n) {
            case 1:
                return board[0][0];
            case 2:
                return board[0][1];
            case 3:
                return board[0][2];
            case 4:
                return board[1][0];
            case 5:
                return board[1][1];
            case 6:
                return board[1][2];
            case 7:
                return board[2][0];
            case 8:
                return board[2][1];
            case 9:
                return board[2][2];
        }
    };

    return {
        board,
        setPlace,
        getPlace
    };
}

function createPlayer(human = true) {
    let name;
    let score = 0;

    return {
        addScore: () => score++,
        getScore: () => score,
        getName: () => name,
        setName: (newName) => {
            if (human) {
                name = newName;
            } else {
                name = "Computer";
            }
        }
    };
}

function cpuMove(board) {
    let lst = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                lst.push([i, j]);
            }
        }
    }
    const rando = Math.floor(Math.random() * lst.length);
    //console.log("CPU MOVE", [lst[rando][0], lst[rando][1]]);
    return [lst[rando][0], lst[rando][1]];
}

function confirmWin(board) {
    const winningCombinations = [
        // Rows
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        // Columns
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        // Diagonals
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a[0]][a[1]] && 
            board[a[0]][a[1]] === board[b[0]][b[1]] && 
            board[a[0]][a[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];
        }
    }
    return null;
}

function play(board = [['', '', ''], ['', '', ''], ['', '', '']]) {
    let game = gameBoard(board);
    resetBoard();
    let currentPlayer = "X";
    let move = 0;
    const start = document.getElementById("start");
    start.textContent = "New Game";
    const boxes = document.querySelectorAll('#box');
    const score1 = document.getElementById("score1");
    const score2 = document.getElementById("score2");
    const round = document.getElementById("round");
    round.textContent = "The computer prepares its moves.";

    boxes.forEach(box => {
        let newBox = box.cloneNode(true);
        box.parentNode.replaceChild(newBox, box);
        newBox.addEventListener('click', function() {
            let lst = this.dataset.index.split(",");
            let [i, j] = lst;
            if (confirmWin(game.board)) {
                return;
            }
            if (game.setPlace(currentPlayer, i, j)) {
                move++;
                if (confirmWin(game.board) === "X") {
                    player1.addScore();
                    round.textContent = `${player1.getName()} wins!`;
                    score1.textContent = player1.getScore();
                    return;
                } else if (move === 9) {
                    round.textContent = "It's a draw!";
                    return;
                } else {
                    currentPlayer = "O";
                }
                setTimeout(() => {
                    let [i, j] = cpuMove(game.board);
                    if (game.setPlace(currentPlayer, i, j)) {
                        move++;
                        if (confirmWin(game.board) === "O") {
                            player2.addScore();
                            round.textContent = `Computer wins!`;
                            score2.textContent = player2.getScore();
                            return;
                        } else if (move === 9) {
                            round.textContent = "It's a draw!";
                            return;
                        } else {
                            currentPlayer = "X";
                        }
                    }
                }, 300);
            }
        });
    });
}

function updateScore() {
    const score1 = document.getElementById("score1");
    const score2 = document.getElementById("score2");

    score1.textContent = player1.getScore();
    score2.textContent = player2.getScore();
}

function changeName() {
    const form = document.getElementById("form");
    const dialog = document.getElementById("dialog");

    dialog.classList.remove("invisible");
    dialog.showModal();
    form.removeEventListener("submit", handleFormSubmit);
    form.addEventListener("submit", handleFormSubmit);

    const closeDialog = document.getElementById("close-dialog");
    closeDialog.removeEventListener("click", handleCloseClick);
    closeDialog.addEventListener("click", handleCloseClick);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const named = document.getElementById("name");
    const player = document.getElementById("player");
    player1.setName(named.value);
    player.textContent = `${named.value}'s Score:`;   
    const dialog = document.getElementById("dialog");
    dialog.classList.add("invisible");
    dialog.close();
    event.target.reset();
}

function handleCloseClick() {
    const dialog = document.getElementById("dialog");
    dialog.classList.add("invisible");
    dialog.close();
    const form = document.getElementById("form");
    form.reset();
}

function resetScore() {
    const score1 = document.getElementById("score1");
    const score2 = document.getElementById("score2");
    const round = document.getElementById("round");
    const keepName = player1.getName();
    player1 = createPlayer();
    player1.setName(keepName);
    player2 = createPlayer(false);

    round.textContent = "The computer prepares its moves.";
    score1.textContent = 0;
    score2.textContent = 0;
}

function resetBoard() {
    const boxes = document.querySelectorAll('#gamebox [data-index]');
    boxes.forEach(box => {
        const x = box.querySelector('#X');
        const o = box.querySelector('#O');
        x.classList.add('invisible');
        o.classList.add('invisible');
    });
}

changeName()
