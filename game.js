const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(10, 10);

const matrix = [
    [0, 1, 0,],
    [0, 1, 0,],
    [1, 1, 1,],
];

const enemyMatrix = [
    [1, 0, 1,],
    [0, 1, 0,],
    [1, 0, 1,],
]
function drawEnemyMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = '#0DC2FF';
                context.fillRect(x + offset.x,
                    y + offset.y,
                    1, 1);
            }
        })
    })
};

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(player.matrix, player.pos);
    drawEnemyMatrix(enemy.matrix, enemy.pos);

}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = '#0DC2FF';
                context.fillRect(x + offset.x,
                    y + offset.y,
                    1, 1);
            }
        })
    })
};

let dropCounter = 0;
let dropInterval = 1000; 

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        enemy.pos.y++;
        dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update);
}

function enemyDrop() {
    enemy.pos.y++;
    dropCounter = 0;
}
document.addEventListener('keydown', event => {
    console.log(event);
    if (event.keyCode === 37) {
        player.pos.x--;
    } else if (event.keyCode === 39) {
        player.pos.x++;
    } else if (event.keyCode === 40 ) {
        player.pos.y++;
    } else if (event.keyCode === 38) {
        player.pos.y--;
    } 
});

const enemy = {
    pos: { x: 28, y: 1},
    matrix: enemyMatrix,
}

const player = {
    pos: { x: 28, y: 50 },
    matrix: matrix,
}

update();