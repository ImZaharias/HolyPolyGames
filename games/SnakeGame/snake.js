
//board
var blockSize = 25
var rows = 20
var cols = 20
var board
var context

//snake head
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var velocityX = 0
var velocityY = 0

var snakeBody = []

//food
var foodX
var foodY

var score = 0
var gameOver = false

window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d") //used for drawing on the board

    //Load background image
    backgroundImg = new Image();
    backgroundImg.src = './images/labyrinth.webp'
    backgroundImg.onload = function() {
        // Optional: draw the background image once it is loaded
        context.drawImage(backgroundImg, 0, 0, board.width, board.height)
    }

    placeFood()
    document.addEventListener("keyup", changeDirection)
    //update()
    setInterval(update, 1000/10) //100 miliseconds
}

function update() {
    if (gameOver) {
        return
    }

    context.fillStyle="black"
    context.fillRect(0, 0, board.width, board.height)

    // Draw the background image
    context.drawImage(backgroundImg, 0, 0, board.width, board.height)

    context.fillStyle="red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
        score +=100
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle="lime"
    snakeX +=velocityX * blockSize
    snakeY +=velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true
        alert("Game Over")
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            alert("Game Over")
        }
    }

    context.fillStyle="white"
    context.font="16px courier"
    context.fillText(score, 5, 20)
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

function placeFood() {
    //0-1 * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}