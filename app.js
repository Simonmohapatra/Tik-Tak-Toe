let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("winner-msg");
let turn0 = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let count = 0;

console.log("O's turn");
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            console.log("X's turn");
            box.innerText = 'O';
            turn0 = false;
        }
        else {
            console.log("O's turn");
            box.innerText = 'X';
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let winnerFound = checkWinner();

        if (!winnerFound && count === 9) {
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `${winner} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log(`${pos1Val} wins!`);
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
};

let newGameBtn = document.getElementById("new-game");
let resetBtn = document.getElementById("reset-btn");

// Reset the game board
const resetGame = () => {
    turn0 = true;
    count = 0;
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);