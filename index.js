let turn = '#e63946'
let choice = 0
let columnCounts = [0, 0, 0, 0, 0, 0, 0]
let table = [[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0]]

window.onload = resetGame;

document.querySelectorAll('#button-row div').forEach(box => {
    box.addEventListener('click', choiceColumn)
})
document.getElementById('reset-button').addEventListener('click', resetGame);

function choiceColumn(event) {
    const selectedButton = event.target.id
    const number = selectedButton.replace('button', '')
    const columnNumber = parseInt(number, 10)
    let idBox = `box${columnCounts[columnNumber - 1]}${columnNumber - 1}`
    console.log({idBox})
    changeColour(idBox,columnNumber)
    console.log({columnCounts})
    console.log({table})
} 

function changeColour(idBox,columnNumber) {
    let box = document.getElementById(idBox) 
    if (box) {
        box.style.backgroundColor = turn
        turn = (turn === '#e63946') ? '#457b9d' : '#e63946'
        table[columnCounts[columnNumber - 1]][columnNumber - 1] = (turn === '#e63946') ? 2 : 1
        columnCounts[columnNumber - 1] += 1
        if(checkWinner(columnNumber)===true)
            document.getElementById('player').innerText = "Win"
        else
            document.getElementById('player').style.color = turn
    } else {
        console.error(`Element with id "${idBox}" not found.`)
    }
}

function checkWinner(columnNumber) {
    const col = columnNumber - 1;
    const row = columnCounts[col] - 1;
    const player = table[row][col];

    const directions = [
        { dx: -1, dy: 0 },  
        { dx: -1, dy: 1 },  
        { dx: 1, dy: 0 },  
        { dx: 1, dy: 1 }, 
        { dx: 0, dy: -1 }, 
        { dx: 1, dy: -1 }, 
        { dx: 0, dy: 1 },
        { dx: -1, dy: -1 },  
    ];

    function checkDir(dx, dy) {
        let x = col + dx;
        let y = row + dy;
        let count = 0;

        while (count <= 3) {
            if (x < 0 || x >= 7 || y < 0 || y >= 6) {
                break;
            }
            if (table[y][x] !== player) {
                break;
            }
            count++;
            x += dx;
            y += dy;
        }

        return count;
    }

    for (let { dx, dy } of directions) {
        let count = 1 + checkDir(dx, dy);  
        if (count >= 4) return true; 
    }

    return false;
}

function resetGame() {

    document.querySelectorAll('#ground div').forEach(box => {
        box.style.backgroundColor = 'a8dadc';
    });

    turn = '#e63946';
    columnCounts = [0, 0, 0, 0, 0, 0, 0];
    table = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    document.getElementById('player').innerText = 'Player turn';
    document.getElementById('player').style.color = turn;
}