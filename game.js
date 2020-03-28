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


function collide(arena, player) {
    const [m,o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
            (arena[y + o.y] &&
            arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0))
    }
    return matrix;
}
function drawEnemyMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
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

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

let dropCounter = 0;
let dropInterval = 100; 

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
function playerVert(dir) {
    player.pos.y += dir;
    if (collide(arena, player)) {
        player.pos.y -= dir; 
    }
}
function playerHorz(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir; 
    }
}
function enemyDrop() {
    enemy.pos.y++;
    dropCounter = 0;
}


document.addEventListener('keydown', event => {
    console.log(event);
    //left
    if (event.keyCode === 37) {
        playerHorz(-1);
        //right
    } else if (event.keyCode === 39) {
        playerHorz(1);
        //down
    } else if (event.keyCode === 40 ) {
        playerVert(1);
        //up
    } else if (event.keyCode === 38) {
        playerVert(-1);
    } 
});
const arena = createMatrix(60,60);
const enemy = {
    pos: { x: 28, y: 50},
    matrix: enemyMatrix,
}

const player = {
    pos: { x: 30, y: 57 },
    matrix: matrix,
}

update();