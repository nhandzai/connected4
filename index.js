let turn = '#e63946'
let choice = 0
let columnCounts = [0, 0, 0, 0, 0, 0, 0]
let table = [[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0]]
let end = false

window.onload = resetGame;

document.querySelectorAll('#ground div').forEach(box => {
    box.addEventListener('click', choiceColumn)
})
document.getElementById('reset-button').addEventListener('click', resetGame);

function choiceColumn(event) {
    const selectedButton = event.target.id
    const number = parseInt(selectedButton.charAt(selectedButton.length - 1)) + 1
    const columnNumber = parseInt(number, 10)
    let idBox = `box${columnCounts[columnNumber - 1]}${columnNumber - 1}`
    console.log({idBox})
    if(!end)
        changeColour(idBox,columnNumber)
    console.log({columnCounts})
    console.log({table})
} 
function highlightWinningBoxes(coordinates) {
    coordinates.forEach(coord => {
        const box = document.getElementById(`box${coord.j}${coord.i}`)
        if (box) {
            box.style.backgroundColor = 'black'
        }
    })
}
function changeColour(idBox,columnNumber) {
    let box = document.getElementById(idBox) 
    if (box) {
        box.style.backgroundColor = turn

        table[columnCounts[columnNumber - 1]][columnNumber - 1] = (turn === '#e63946') ? 2 : 1
        columnCounts[columnNumber - 1] += 1
        const winningCoordinates = checkWinner(columnNumber)
        if(winningCoordinates){
            highlightWinningBoxes(winningCoordinates)
            document.getElementById('player').innerText = "Win"
            end = true
        }
        else
            document.getElementById('player').style.color = turn
            document.getElementById('ano-box').style.backgroundColor = turn
    } else {
        console.error(`Element with id "${idBox}" not found.`)
    }
    turn = (turn === '#e63946') ? '#457b9d' : '#e63946'
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


    let winningCoordinates = [];

    function checkDir(dx, dy) {
        let x = col + dx;
        let y = row + dy;
        let count = 0;
        let tempCoordinates = [];

        while (count < 3) { 
            if (x < 0 || x >= 7 || y < 0 || y >= 6) {
                break;
            }
            if (table[y][x] !== player) {
                break;
            }

            tempCoordinates.push({ i: x, j: y });
            count++;
            x += dx;
            y += dy;
        }


        return { count, coordinates: tempCoordinates };
    }

    for (let { dx, dy } of directions) {
        let { count, coordinates } = checkDir(dx, dy);  
        
        if (count >= 3) {
            winningCoordinates.push({ i: col, j: row }); 
            winningCoordinates.push(...coordinates); 
            return winningCoordinates; 
        }
    }

    return false;
}

function resetGame() {

    document.querySelectorAll('#ground div').forEach(box => {
        box.style.backgroundColor = '#a8dadc';
    });

    columnCounts = [0, 0, 0, 0, 0, 0, 0];
    table = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    end = false
    document.getElementById('player').innerText = 'Player turn';
    document.getElementById('player').style.color = turn;
}

