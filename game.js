// Retrieve canvas from html, and let JS style the canvas

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// Maze-trix
let maze = [
    [3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 4, 4, 3, 11, 4, 4, 4, 4, 4, 4, 4, 3],
    [3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 3, 4, 3],
    [3, 4, 3, 4, 4, 4, 4, 4, 3, 2, 4, 12, 3],
    [3, 4, 4, 4, 3, 2, 3, 3, 3, 3, 3, 4, 3],
    [3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 3],
    [3, 15, 4, 4, 4, 4, 3, 4, 3, 3, 3, 3, 3],
    [3, 4, 3, 2, 3, 4, 3, 4, 4, 13, 4, 4, 3],
    [3, 4, 3, 3, 3, 4, 3, 3, 3, 4, 3, 4, 3],
    [3, 4, 4, 4, 3, 4, 4, 14, 3, 2, 3, 4, 3],
    [3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 4, 3],
    [3, 4, 4, 4, 4, 16, 3, 4, 4, 4, 4, 4, 3],
    [3, 4, 3, 3, 3, 4, 3, 4, 3, 3, 3, 3, 3],
    [3, 4, 3, 4, 4, 4, 3, 4, 4, 2, 3, 4, 3],
    [3, 2, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 3],
    [3, 3, 3, 4, 3, 4, 4, 4, 4, 4, 4, 4, 3],
    [3, 17, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3],
    [3, 4, 3, 3, 3, 4, 3, 4, 4, 4, 4, 18, 3],
    [3, 4, 3, 2, 3, 4, 3, 4, 3, 3, 3, 3, 3],
    [3, 4, 4, 4, 4, 4, 3, 4, 4, 2, 7, 4, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 3]
];

/*
left: 37
up: 38
right: 39
down: 40
*/

// Maze variables

// Maze tilesize
let tile = 40;

let player = 0;
let enemy1 = 11;
let enemy2 = 12;
let enemy3 = 13;
let enemy4 = 14;
let enemy5 = 15;
let enemy6 = 16;
let enemy7 = 17;
let enemy8 = 18;
let point = 2;
let wall = 3;
let path = 4;
let home = 5;
let finish = 6;
let block = 7;

let playpos = {
    x: 0,
    y: 0
};

let enemypos = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0,
    x4: 0,
    y4: 0,
    x5: 0,
    y5: 0,
    x6: 0,
    y6: 0,
    x7: 0,
    y7: 0,
    x8: 0,
    y8: 0
};

let endpos = {
    x: 0,
    y: 0
};

let pointcount = 20;
let food = 20;
let foodcount = 0;

// Enemy direction variables

let direct1 = 0;
let direct2 = 0;
let direct3 = 0;
let direct4 = 0;
let direct5 = 0;
let direct6 = 0;
let direct7 = 0;
let direct8 = 0;


// Picture variables

let dog = new Image();
dog.src = 'images/dog.png';

let mushroom = new Image();
mushroom.src = 'images/mushroom.png';

let treat = new Image();
treat.src = 'images/treat.png';

let tree = new Image();
tree.src = 'images/tree.png';

let house = new Image();
house.src = 'images/house.png';

let safe = new Image();
safe.src = 'images/safe.png';

let gate = new Image();
gate.src = 'images/gate.png';


// Enemy move functions

function enemy1move() {

    if (direct1 == 0) {

        if (maze[enemypos.x1 + 1][enemypos.y1] == path) {

            maze[enemypos.x1 + 1][enemypos.y1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;

        } else if (maze[enemypos.x1 + 1][enemypos.y1] == player) {

            maze[enemypos.x1 + 1][enemypos.y1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;
            defeat();

        } else {

            direct1 = 1;
            maze[enemypos.x1][enemypos.y1 + 1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;

        }

    } else if (direct1 == 1) {

        if (maze[enemypos.x1][enemypos.y1 + 1] == path) {

            maze[enemypos.x1][enemypos.y1 + 1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;

        } else if (maze[enemypos.x1][enemypos.y1 + 1] == player) {

            maze[enemypos.x1][enemypos.y1 + 1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;
            defeat();

        } else {

            direct1 = 2;
            maze[enemypos.x1 - 1][enemypos.y1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;

        }

    } else if (direct1 == 2) {

        if (maze[enemypos.x1 - 1][enemypos.y1] == path) {

            maze[enemypos.x1 - 1][enemypos.y1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;

        } else if (maze[enemypos.x1 - 1][enemypos.y1] == player) {

            maze[enemypos.x1 - 1][enemypos.y1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;
            defeat();

        } else {

            direct1 = 3;
            maze[enemypos.x1][enemypos.y1 - 1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;

        }

    } else if (direct1 == 3) {

        if (maze[enemypos.x1][enemypos.y1 - 1] == path) {

            maze[enemypos.x1][enemypos.y1 - 1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;

        } else if (maze[enemypos.x1][enemypos.y1 - 1] == player) {

            maze[enemypos.x1][enemypos.y1 - 1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;
            defeat();

        } else {

            direct1 = 0;
            maze[enemypos.x1 + 1][enemypos.y1] = enemy1;
            maze[enemypos.x1][enemypos.y1] = path;

        }

    }

    drawMaze();
};

function enemy2move() {

    if (direct2 == 0) {

        if (maze[enemypos.x2 - 1][enemypos.y2] == path) {

            maze[enemypos.x2 - 1][enemypos.y2] = enemy2;
            maze[enemypos.x2][enemypos.y2] = path;

        } else if (maze[enemypos.x2 - 1][enemypos.y2] == player) {

            maze[enemypos.x2 - 1][enemypos.y2] = enemy2;
            maze[enemypos.x2][enemypos.y2] = path;
            defeat();

        } else {

            direct2 = 1;
            maze[enemypos.x2 + 1][enemypos.y2] = enemy2;
            maze[enemypos.x2][enemypos.y2] = path;

        }

    } else if (direct2 == 1) {

        if (maze[enemypos.x2 + 1][enemypos.y2] == path) {

            maze[enemypos.x2 + 1][enemypos.y2] = enemy2;
            maze[enemypos.x2][enemypos.y2] = path;

        } else if (maze[enemypos.x2 + 1][enemypos.y2] == player) {

            maze[enemypos.x2 + 1][enemypos.y2] = enemy2;
            maze[enemypos.x2][enemypos.y2] = path;
            defeat();

        } else {

            direct2 = 0;
            maze[enemypos.x2 - 1][enemypos.y2] = enemy2;
            maze[enemypos.x2][enemypos.y2] = path;

        }

    }

    drawMaze();
};

function enemy3move() {

    if (direct3 == 0) {

        if (maze[enemypos.x3][enemypos.y3 - 1] == path) {

            maze[enemypos.x3][enemypos.y3 - 1] = enemy3;
            maze[enemypos.x3][enemypos.y3] = path;

        } else if (maze[enemypos.x3][enemypos.y3 - 1] == player) {

            maze[enemypos.x3][enemypos.y3 - 1] = enemy3;
            maze[enemypos.x3][enemypos.y3] = path;
            defeat();

        } else {

            direct3 = 1;
            maze[enemypos.x3][enemypos.y3 + 1] = enemy3;
            maze[enemypos.x3][enemypos.y3] = path;

        }

    } else if (direct3 == 1) {

        if (maze[enemypos.x3][enemypos.y3 + 1] == path) {

            maze[enemypos.x3][enemypos.y3 + 1] = enemy3;
            maze[enemypos.x3][enemypos.y3] = path;

        } else if (maze[enemypos.x3][enemypos.y3 + 1] == player) {

            maze[enemypos.x3][enemypos.y3 + 1] = enemy3;
            maze[enemypos.x3][enemypos.y3] = path;
            defeat();

        } else {

            direct3 = 0;
            maze[enemypos.x3][enemypos.y3 - 1] = enemy3;
            maze[enemypos.x3][enemypos.y3] = path;

        }

    }

    drawMaze();
};

function enemy4move() {

    if (direct4 == 0) {

        if (maze[enemypos.x4 - 1][enemypos.y4] == path) {

            maze[enemypos.x4 - 1][enemypos.y4] = enemy4;
            maze[enemypos.x4][enemypos.y4] = path;

        } else if (maze[enemypos.x4 - 1][enemypos.y4] == player) {

            maze[enemypos.x4 - 1][enemypos.y4] = enemy4;
            maze[enemypos.x4][enemypos.y4] = path;
            defeat();

        } else {

            direct4 = 1;
            maze[enemypos.x4 + 1][enemypos.y4] = enemy4;
            maze[enemypos.x4][enemypos.y4] = path;

        }

    } else if (direct4 == 1) {

        if (maze[enemypos.x4 + 1][enemypos.y4] == path) {

            maze[enemypos.x4 + 1][enemypos.y4] = enemy4;
            maze[enemypos.x4][enemypos.y4] = path;

        } else if (maze[enemypos.x4 + 1][enemypos.y4] == player) {

            maze[enemypos.x4 + 1][enemypos.y4] = enemy4;
            maze[enemypos.x4][enemypos.y4] = path;
            defeat();

        } else {

            direct4 = 0;
            maze[enemypos.x4 - 1][enemypos.y4] = enemy4;
            maze[enemypos.x4][enemypos.y4] = path;

        }

    }

    drawMaze();
};

function enemy5move() {

    if (direct5 == 0) {

        if (maze[enemypos.x5][enemypos.y5 - 1] == path) {

            maze[enemypos.x5][enemypos.y5 - 1] = enemy5;
            maze[enemypos.x5][enemypos.y5] = path;

        } else if (maze[enemypos.x5][enemypos.y5 - 1] == player) {

            maze[enemypos.x5][enemypos.y5 - 1] = enemy5;
            maze[enemypos.x5][enemypos.y5] = path;
            defeat();

        } else {

            direct5 = 1;
            maze[enemypos.x5][enemypos.y5 + 1] = enemy5;
            maze[enemypos.x5][enemypos.y5] = path;

        }

    } else if (direct5 == 1) {

        if (maze[enemypos.x5][enemypos.y5 + 1] == path) {

            maze[enemypos.x5][enemypos.y5 + 1] = enemy5;
            maze[enemypos.x5][enemypos.y5] = path;

        } else if (maze[enemypos.x5][enemypos.y5 + 1] == player) {

            maze[enemypos.x5][enemypos.y5 + 1] = enemy5;
            maze[enemypos.x5][enemypos.y5] = path;
            defeat();

        } else {

            direct5 = 0;
            maze[enemypos.x5][enemypos.y5 - 1] = enemy5;
            maze[enemypos.x5][enemypos.y5] = path;

        }

    }

    drawMaze();
};

function enemy6move() {

    if (direct6 == 0) {

        if (maze[enemypos.x6][enemypos.y6 - 1] == path) {

            maze[enemypos.x6][enemypos.y6 - 1] = enemy6;
            maze[enemypos.x6][enemypos.y6] = path;

        } else if (maze[enemypos.x6][enemypos.y6 - 1] == player) {

            maze[enemypos.x6][enemypos.y6 - 1] = enemy6;
            maze[enemypos.x6][enemypos.y6] = path;
            defeat();

        } else {

            direct6 = 1;
            maze[enemypos.x6][enemypos.y6 + 1] = enemy6;
            maze[enemypos.x6][enemypos.y6] = path;

        }

    } else if (direct6 == 1) {

        if (maze[enemypos.x6][enemypos.y6 + 1] == path) {

            maze[enemypos.x6][enemypos.y6 + 1] = enemy6;
            maze[enemypos.x6][enemypos.y6] = path;

        } else if (maze[enemypos.x6][enemypos.y6 + 1] == player) {

            maze[enemypos.x6][enemypos.y6 + 1] = enemy6;
            maze[enemypos.x6][enemypos.y6] = path;
            defeat();

        } else {

            direct6 = 0;
            maze[enemypos.x6][enemypos.y6 - 1] = enemy6;
            maze[enemypos.x6][enemypos.y6] = path;

        }

    }

    drawMaze();
};

function enemy7move() {

    if (direct7 == 0) {

        if (maze[enemypos.x7][enemypos.y7 + 1] == path) {

            maze[enemypos.x7][enemypos.y7 + 1] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;

        } else if (maze[enemypos.x7][enemypos.y7 + 1] == player) {

            maze[enemypos.x7][enemypos.y7 + 1] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;
            defeat();

        } else {

            direct7 = 1;
            maze[enemypos.x7 + 1][enemypos.y7] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;

        }

    } else if (direct7 == 1) {

        if (maze[enemypos.x7 + 1][enemypos.y7] == path) {

            maze[enemypos.x7 + 1][enemypos.y7] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;

        } else if (maze[enemypos.x7 + 1][enemypos.y7] == player) {

            maze[enemypos.x7 + 1][enemypos.y7] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;
            defeat();

        } else {

            direct7 = 2;
            maze[enemypos.x7][enemypos.y7 - 1] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;

        }

    } else if (direct7 == 2) {

        if (maze[enemypos.x7][enemypos.y7 - 1] == path) {

            maze[enemypos.x7][enemypos.y7 - 1] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;

        } else if (maze[enemypos.x7][enemypos.y7 - 1] == player) {

            maze[enemypos.x7][enemypos.y7 - 1] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;
            defeat();

        } else {

            direct7 = 3;
            maze[enemypos.x7 - 1][enemypos.y7] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;

        }

    } else if (direct7 == 3) {

        if (maze[enemypos.x7 - 1][enemypos.y7] == path) {

            maze[enemypos.x7 - 1][enemypos.y7] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;

        } else if (maze[enemypos.x7 - 1][enemypos.y7] == player) {

            maze[enemypos.x7 - 1][enemypos.y7] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;
            defeat();

        } else {

            direct7 = 0;
            maze[enemypos.x7][enemypos.y7 + 1] = enemy7;
            maze[enemypos.x7][enemypos.y7] = path;

        }

    }

    drawMaze();
};

function enemy8move() {

    if (direct8 == 0) {

        if (maze[enemypos.x8 - 1][enemypos.y8] == path) {

            maze[enemypos.x8 - 1][enemypos.y8] = enemy8;
            maze[enemypos.x8][enemypos.y8] = path;

        } else if (maze[enemypos.x8 - 1][enemypos.y8] == player) {

            maze[enemypos.x8 - 1][enemypos.y8] = enemy8;
            maze[enemypos.x8][enemypos.y8] = path;
            defeat();

        } else {

            direct8 = 1;
            maze[enemypos.x8 + 1][enemypos.y8] = enemy8;
            maze[enemypos.x8][enemypos.y8] = path;

        }

    } else if (direct8 == 1) {

        if (maze[enemypos.x8 + 1][enemypos.y8] == path) {

            maze[enemypos.x8 + 1][enemypos.y8] = enemy8;
            maze[enemypos.x8][enemypos.y8] = path;

        } else if (maze[enemypos.x8 + 1][enemypos.y8] == player) {

            maze[enemypos.x8 + 1][enemypos.y8] = enemy8;
            maze[enemypos.x8][enemypos.y8] = path;
            defeat();

        } else {

            direct8 = 0;
            maze[enemypos.x8 - 1][enemypos.y8] = enemy8;
            maze[enemypos.x8][enemypos.y8] = path;

        }

    }

    drawMaze();
};


// Move enemies every second

setInterval(() => {
    enemy1move();
    enemy2move();
    enemy3move();
    enemy4move();
    enemy5move();
    enemy6move();
    enemy7move();
    enemy8move();
}, 600)


// Function to draw the maze

function drawMaze() {

    for (let x = 0; x < maze.length; x++) {

        for (let y = 0; y < maze[x].length; y++) {

            if (maze[x][y] == player) {

                playpos.x = x;
                playpos.y = y;
                ctx.drawImage(dog, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == enemy1) {

                enemypos.x1 = x;
                enemypos.y1 = y;
                ctx.drawImage(mushroom, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == enemy2) {

                enemypos.x2 = x;
                enemypos.y2 = y;
                ctx.drawImage(mushroom, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == enemy3) {

                enemypos.x3 = x;
                enemypos.y3 = y;
                ctx.drawImage(mushroom, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == enemy4) {

                enemypos.x4 = x;
                enemypos.y4 = y;
                ctx.drawImage(mushroom, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == enemy5) {

                enemypos.x5 = x;
                enemypos.y5 = y;
                ctx.drawImage(mushroom, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == enemy6) {

                enemypos.x6 = x;
                enemypos.y6 = y;
                ctx.drawImage(mushroom, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == enemy7) {

                enemypos.x7 = x;
                enemypos.y7 = y;
                ctx.drawImage(mushroom, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == enemy8) {

                enemypos.x8 = x;
                enemypos.y8 = y;
                ctx.drawImage(mushroom, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == point) {

                ctx.drawImage(treat, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == wall) {

                ctx.drawImage(tree, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == path) {

                ctx.fillStyle = "#b0e996";
                ctx.fillRect(x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == home) {

                ctx.drawImage(safe, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == finish) {

                endpos.x = x;
                endpos.y = y;
                ctx.drawImage(house, x * tile, y * tile, tile, tile);

            } else if (maze[x][y] == block) {

                if (foodcount == 8) {

                    maze[x][y] = path;

                } else {

                    ctx.drawImage(gate, x * tile, y * tile, tile, tile);

                }

            } else {

                ctx.fillStyle = "#b0e996";
                ctx.fillRect(x * tile, y * tile, tile, tile);

            }

        }

    }

}

// Sound functions

function walk() {

    let walksound = new Audio('sound/walk.mp3');
    walksound.play();

}

function eat() {

    let crunchsound = new Audio('sound/crunch.mp3');
    crunchsound.play();

}

function bark() {

    let barksound = new Audio('sound/bark.mp3');
    barksound.play();

}

function fail() {

    let failsound = new Audio('sound/fail.mp3');
    failsound.play();

}

// Alert variables

let lostalert = "Oh no! The puppy got lost in the forest.";

let failalert = "Oh no! The puppy was attacked by an angry mushroom.";

let tiredalert = "Oh no! The puppy is too tired to continue.";

let winalert = "Congrats! The puppy got home, safe and happy.<br>Your final score is ";

let score = document.getElementById('points');
score.innerHTML = "Energy: " + pointcount;

let result = document.getElementById('winlose');

let message = document.getElementById('alert');

let modal = document.getElementById('modal');


// Player controls
// If the tile you move to is a path or treat, display the player on that tile instead

function moveLeft() {

    maze[playpos.x - 1][playpos.y] = player;

}

function moveUp() {

    maze[playpos.x][playpos.y - 1] = player;

}

function moveRight() {

    maze[playpos.x + 1][playpos.y] = player;

}

function moveDown() {

    maze[playpos.x][playpos.y + 1] = player;

}

// Move events

function move() {

    // Display a path tile where you stood before
    maze[playpos.x][playpos.y] = path;

    // Play the footstep sound
    walk();

    // Decrease score by one, and display the new score
    pointcount = pointcount -= 1;
    score.innerHTML = "Energy: " + pointcount;

}

function energise() {

    // Display a path tile where you stood before
    maze[playpos.x][playpos.y] = path;

    // Play the munching sound
    eat();

    // Increase amount of treats eaten
    foodcount = foodcount += 1;

    // Add energy (points) to the score and display the new score
    pointcount = pointcount += food;
    score.innerHTML = "Energy: " + pointcount;

}

function lost() {

    // If the tile you move to is a tree, the player is assigned an undefined value in the matrix, in which case the drawMaze function displays the same tile as the path
    player = 1;

    // Play the failing sound
    fail();

    // Alert the player that the game is lost
    result.innerHTML = "GAME OVER";
    message.innerHTML = lostalert;
    modal.style.display = "flex";

}

function defeat() {

    // If the tile you move to is an enemy, the player is assigned an undefined value in the matrix, in which case the drawMaze function displays the same tile as the path
    player = 8;

    // Play the failing sound
    fail();

    // Alert the player that the game is lost
    result.innerHTML = "GAME OVER"
    message.innerHTML = failalert;
    modal.style.display = "flex";

}

function tired() {

    // If the player runs out of energy, display the tired alert in the modal
    result.innerHTML = "GAME OVER"
    message.innerHTML = tiredalert;
    modal.style.display = "flex";

}

function goal() {

    // If the tile you move to is the dog house, display the safe dog on that tile instead, and display a path tile where you stood before
    maze[endpos.x][endpos.y] = home;
    maze[playpos.x][playpos.y] = path;

    result.innerHTML = "YOU WON";
    message.innerHTML = winalert + "<input name=\"score\" id=\"score\" value=\"" + pointcount + "\" readonly>";
    modal.style.display = "flex";

}

document.addEventListener("keydown", function(event) {

    // As long as you have not walked into the wall, the player will move when arrowkeys are pressed
    if (player == 0) {

        // As long as the game has not been won, the player will move when arrowkeys are pressed
        if (maze[endpos.x][endpos.y] == finish) {

            // As long as the score is above 0, the player will move when arrowkeys are pressed
            if (pointcount > 0) {

                switch (event.keyCode) {
                    // Left
                    case 37:
                        if (maze[playpos.x - 1][playpos.y] == path) {

                            moveLeft();
                            move();

                        } else if (maze[playpos.x - 1][playpos.y] == point) {

                            moveLeft();
                            energise();

                        } else if (maze[playpos.x - 1][playpos.y] == wall) {

                            lost();

                        } else if (maze[playpos.x - 1][playpos.y] == enemy1 || maze[playpos.x - 1][playpos.y] == enemy2 || maze[playpos.x - 1][playpos.y] == enemy3 || maze[playpos.x - 1][playpos.y] == enemy4 || maze[playpos.x - 1][playpos.y] == enemy5 || maze[playpos.x - 1][playpos.y] == enemy6 || maze[playpos.x - 1][playpos.y] == enemy7 || maze[playpos.x - 1][playpos.y] == enemy8) {

                            defeat();

                        } else if (maze[playpos.x - 1][playpos.y] == finish) {

                            // Play the happy bark sound
                            bark();
                            goal();

                        }

                        drawMaze();

                        break;

                    // Up
                    case 38:
                        if (maze[playpos.x][playpos.y - 1] == path) {

                            moveUp();
                            move();

                        } else if (maze[playpos.x][playpos.y - 1] == point) {

                            moveUp();
                            energise();

                        } else if (maze[playpos.x][playpos.y - 1] == wall) {

                            lost();

                        } else if (maze[playpos.x][playpos.y - 1] == enemy1 || maze[playpos.x][playpos.y - 1] == enemy2 || maze[playpos.x][playpos.y - 1] == enemy3 || maze[playpos.x][playpos.y - 1] == enemy4 || maze[playpos.x][playpos.y - 1] == enemy5 || maze[playpos.x][playpos.y - 1] == enemy6 || maze[playpos.x][playpos.y - 1] == enemy7 || maze[playpos.x][playpos.y - 1] == enemy8) {

                            defeat();

                        } else if (maze[playpos.x][playpos.y - 1] == finish) {

                            // Play the happy bark sound
                            bark();
                            goal();

                        }

                        drawMaze();

                        break;

                    // Right
                    case 39:
                        if (maze[playpos.x + 1][playpos.y] == path) {

                            moveRight();
                            move();

                        } else if (maze[playpos.x + 1][playpos.y] == point) {

                            moveRight();
                            energise();

                        } else if (maze[playpos.x + 1][playpos.y] == wall) {

                            lost();

                        } else if (maze[playpos.x + 1][playpos.y] == enemy1 || maze[playpos.x + 1][playpos.y] == enemy2 || maze[playpos.x + 1][playpos.y] == enemy3 || maze[playpos.x + 1][playpos.y] == enemy4 || maze[playpos.x + 1][playpos.y] == enemy5 || maze[playpos.x + 1][playpos.y] == enemy6 || maze[playpos.x + 1][playpos.y] == enemy7 || maze[playpos.x + 1][playpos.y] == enemy8) {

                            defeat();

                        } else if (maze[playpos.x + 1][playpos.y] == finish) {

                            // Play the happy bark sound
                            bark();
                            goal();

                        }

                        drawMaze();

                        break;

                    // Down
                    case 40:
                        if (maze[playpos.x][playpos.y + 1] == path) {

                            moveDown();
                            move();

                        } else if (maze[playpos.x][playpos.y + 1] == point) {

                            moveDown();
                            energise();

                        } else if (maze[playpos.x][playpos.y + 1] == wall) {

                            lost();

                        } else if (maze[playpos.x][playpos.y + 1] == enemy1 || maze[playpos.x][playpos.y + 1] == enemy2 || maze[playpos.x][playpos.y + 1] == enemy3 || maze[playpos.x][playpos.y + 1] == enemy4 || maze[playpos.x][playpos.y + 1] == enemy5 || maze[playpos.x][playpos.y + 1] == enemy6 || maze[playpos.x][playpos.y + 1] == enemy7 || maze[playpos.x][playpos.y + 1] == enemy8) {

                            defeat();

                        } else if (maze[playpos.x][playpos.y + 1] == finish) {

                            // Play the happy bark sound
                            bark();
                            goal();

                        }

                        drawMaze();

                        break;

                    default:
                        break;
                }

            // If you run out of points, you are unable to continue the game
            } else {

                tired();

            }

        } else {

            goal();

        }

    } else {

        modal.style.display = "flex";

    }
})

drawMaze();
window.addEventListener("load", drawMaze);