const buttonColours = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []
let level = 0
let number = 0

function nextSequence() {
    $('.title').text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)

    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    animatePress($(`.${randomChosenColour}`))
    playSound(randomChosenColour)


    console.log('gamePattern', gamePattern)

}

$('.square').click((el) => {

    let userChosenColour = $(el.target).attr('class').split(' ')[1]
    console.log($(el.target).attr('class').split(' ')[1])
    userClickedPattern.push(userChosenColour)
    console.log('userClickedPattern', userClickedPattern)

    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[number]) {
        playSound(userChosenColour)
        animatePress(el.target)
        number++
        console.log(number)

        if (number === level) {
            level++
            number = 0
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
    } else {
        new Audio('./sounds/wrong.mp3').play()
        $('.title').text('Wrong color, try again! Press any key to restart!')
        level = 0
        gamePattern = []
        userClickedPattern = []
        number = 0
    }
})

function animatePress(currentColour) {
    $(currentColour).addClass('pressed')
    setTimeout(() => {
        $(currentColour).removeClass('pressed')
    }, 100)

}

function playSound(color) {
    new Audio(`./sounds/${color}.mp3`).play()
}


$('body').keypress(() => {
    if (level === 0) {
        level++
        nextSequence()
    }
})
