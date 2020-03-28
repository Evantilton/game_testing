const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(10, 10);

const matrix = [
    [0, 1, 0,],
    [0, 1, 0,],
    [1, 1, 1,],
];

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(player.matrix, player.pos);
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

function update() {
    draw();
    requestAnimationFrame(update);
}

const player = {
    pos: { x: 28, y: 50 },
    matrix: matrix,
}

update();