function init() {

  //* DOM Elements
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.startButton')
  const scoreText = document.querySelector('.scoreText')
  const sprayAudio = document.querySelector('#sprayAudio')
  const endGameAudio = document.querySelector('#endGameAudio')
  const endGameDiv = document.querySelector('#endGameDiv')
  const lostText = document.querySelector('#lostText')
  const baseSound = document.querySelector('#baseSound')
  const victoryAudio = document.querySelector('#victoryAudio')
  
  //* Variables
  const width = 10
  const gridCells = width * width
  const maskLeftHalf = [72, 76]
  const maskRightHalf = [ 73, 77]
  let sprayPosition = 94
  let sprayDirection
  let shotPosition
  let movingRight = true
  let score = 0
  let virusId
  //* initially at 750
  let timerTime = 500

  //* Scenario
  
  for (let i = 0; i < gridCells; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cell.setAttribute('id', i)
  }

  function createLeftHalfMask () {
    maskLeftHalf.forEach(mask => {
      return cells[mask].classList.add('leftMask')
    })
  }

  function createRightHalfMask() {
    maskRightHalf.forEach(mask => {
      return cells[mask].classList.add('rightMask')
    })
  }

  const cells = Array.from(document.querySelectorAll('.grid div'))

  function startGameSheet() {
    endGameDiv.classList.add('endGameDiv')
    lostText.innerHTML = "Ready to cure the world? Be Safe! Controls: 'A' and 'D' for Left and Right, 'W' to shoot"
    document.querySelector('#youCured').style.display = 'none'
    document.querySelector('#the').style.display = 'none'
    document.querySelector('#pandemic').style.display = 'none'
    document.querySelector('#gameOverPic').style.display = 'none'
  }
  startGameSheet()

  createLeftHalfMask()
  createRightHalfMask()

  //* Viruses spawn

  let allViruses = [
    { currentIndex: 1, isAlive: true },
    { currentIndex: 2, isAlive: true },
    { currentIndex: 3, isAlive: true },
    { currentIndex: 4, isAlive: true },
    { currentIndex: 5, isAlive: true },
    { currentIndex: 11, isAlive: true },
    { currentIndex: 12, isAlive: true },
    { currentIndex: 13, isAlive: true },
    { currentIndex: 14, isAlive: true },
    { currentIndex: 15, isAlive: true },
    { currentIndex: 21, isAlive: true },
    { currentIndex: 22, isAlive: true },
    { currentIndex: 23, isAlive: true },
    { currentIndex: 24, isAlive: true },
    { currentIndex: 25, isAlive: true }
  ]

  function addViruses() {
    allViruses.forEach(virus => {
      if (virus.isAlive) {
        return cells[virus.currentIndex].classList.add('virus')
      }
    })
  }
  addViruses()

  //* Spray spawn

  function addSpray(sprayPosition) {
    if (sprayDirection === 'right') {
      return cells[sprayPosition].classList.add('sprayRight')
    } else if (sprayDirection === 'left') {
      return cells[sprayPosition].classList.add('sprayLeft')
    }
  }

  cells[sprayPosition].classList.add('spray')

  function removeSpray(sprayPosition) {
    cells[sprayPosition].classList.remove('spray') 
    cells[sprayPosition].classList.remove('sprayLeft') 
    cells[sprayPosition].classList.remove('sprayRight') 
  }

  function moveSpray(event) {
    removeSpray(sprayPosition)
    const x = sprayPosition % width
    switch (event.keyCode) {
      case 68: //* Going Right
        if (x < width - 1) sprayPosition++
        cells[sprayPosition].classList.add('sprayRight')
        sprayDirection = 'right'
        break
      case 65: //* Going Left
        if (x > 0) sprayPosition--
        cells[sprayPosition].classList.add('sprayLeft')
        sprayDirection = 'left'
        break
      default:
    }
    addSpray(sprayPosition)
  }
  document.addEventListener('keydown', moveSpray)

  //* Move Viruses

  function moveViruses() {
    const finalVirusIndex = movingRight ? allViruses[allViruses.length - 1].currentIndex : allViruses[0].currentIndex
    const x = finalVirusIndex % width 
    const y = Math.ceil(finalVirusIndex / width)
    if (finalVirusIndex === 89) {
      console.log(y, 'y position Last Virus')
      endGameSheet()
      clearInterval(virusId)  //* If viruses hit bottom, END GAME!
      playEndGameAudio()
      startButtonDisappear()
      baseSound.pause()
      // window.alert(`You lost! Your highest score is ${score} points!`)
    } else if ((x === width - 1 && movingRight) || (x === 0  && !movingRight)) { 
      allViruses = allViruses.map(virus => {
        return {
          ...virus, currentIndex: virus.currentIndex + width
        }
      })
      console.log('going down')
      clearInterval(virusId)
      moveVirusesTimer()
      timerSpeedUp()
      movingRight = !movingRight
    } else if (movingRight) { //* moving right
      allViruses = allViruses.map(virus => {
        return {
          ...virus, currentIndex: virus.currentIndex + 1
        }
      })
    } else if (!movingRight) { // * move left
      allViruses = allViruses.map(virus => {
        return {
          ...virus, currentIndex: virus.currentIndex - 1
        }
      })
    }
  }

  function moveVirusesTimer() {
    clearInterval(virusId) // * clear timer before starting it so it doesnt speed up when theres a collision
    virusId = setInterval(() => {
      removeViruses()
      moveViruses()
      addViruses()
    }, timerTime)
  }
  // moveVirusesTimer()

  function timerSpeedUp() {
    timerTime -= 70
    console.log('increasing speed', timerTime)
  }

  function removeViruses() {
    allViruses.forEach(virus => {
      return cells[virus.currentIndex].classList.remove('virus')
    })
  }

  //* Shoot spray

  function shootSpray(event) {
    let shotId
    let shotPosition = sprayPosition
    function moveShot() {
      cells[shotPosition].classList.remove('shot')
      shotPosition -= width
      cells[shotPosition].classList.add('shot')

      if (cells[shotPosition].classList.contains('virus')) {
        console.log('collision at', shotPosition)
        scoring()
        const hitVirus = allViruses.find(virus => {
          return virus.currentIndex === shotPosition
        })
        allViruses = allViruses.filter(virus => { //* Remove the object from array
          return virus.isAlive === true
        })
        console.log('hitVirus', hitVirus)
        hitVirus.isAlive = !hitVirus.isAlive
        cells[shotPosition].classList.remove('virus')
        cells[shotPosition].classList.remove('shot')
        cells[shotPosition].classList.add('virusDead')
        setTimeout(() => cells[shotPosition].classList.remove('virusDead'), 200)
        console.log('starting array', allViruses)
        console.log('hidden array', allViruses)
        clearInterval(shotId) // * clear the interval
        return
      } else if (shotPosition <= 9) {
        cells[shotPosition].classList.remove('shot')
        clearInterval(shotId)
      }
      cells[shotPosition].classList.add('shoot')
      if (shotPosition <= 9 && !cells[shotPosition].classList.contains('virus')) {
        console.log('nowhere to go, deleting shot')
        cells[shotPosition].classList.remove('shot')
      }

    }
    switch (event.keyCode) {
      case 87: //* Shoot with W
        playSpray()
        shotId = setInterval(moveShot, 100)
        addSpray(sprayPosition)
    }
    addSpray(sprayPosition)
  }
  document.addEventListener('keydown', shootSpray)

  //* Register Score
  function scoring() {
    score = score + 100
    scoreText.innerHTML = score
    if (score === 1500) {
      winGame()
    }
  }

  //* Sounds

  function playSpray() {
    sprayAudio.src = 'styles/Sounds/Spray Sound.mp3'
    sprayAudio.play()
    // console.log('Playing')
  }

  function playEndGameAudio() {
    endGameAudio.src = 'styles/Sounds/End Game Cough.mp3'
    endGameAudio.play()
    // console.log('Playing endGame')
  }

  function playBase() {
    baseSound.src = 'styles/Sounds/One Minute To Midnight.mp3'
    baseSound.volume = 0.1
    baseSound.play()
    // console.log('Playing Base')
  }

  function playVictory() {
    victoryAudio.src = 'styles/Sounds/victory sound.wav'
    victoryAudio.play()
    // console.log('playing victory')
  }
  
  //* Start Game, Victory and End Game stuff
  function startButtonStuffHide() {
    startButtonDisappear()
    endGameDiv.classList.remove('endGameDiv')
    startGame()
  }

  function startGame() {
    moveVirusesTimer()
    playBase()
  }
  function winGame() {
    clearInterval(virusId)
    endGameDiv.classList.add('endGameDiv')
    lostText.innerHTML = `Well Done sanitizing!Your highest score is ${score} points!`
    winGameSheet()
    baseSound.pause()
    playVictory()
    // window.alert('You Won')
  }

  //! End Game inside moveViruses()
  
  function endGameSheet() {
    endGameDiv.classList.add('endGameDiv')
    document.querySelector('#gameOverPic').style.display = 'block'
    lostText.innerHTML = `You got infected! Your highest score is ${score} points!`
    document.querySelector('#youCured').removeAttribute('id')
    document.querySelector('#the').removeAttribute('id')
    document.querySelector('#pandemic').removeAttribute('id')
  }

  function winGameSheet() {
    endGameDiv.classList.add('endGameDiv')
    document.querySelector('#gameOverPic').removeAttribute('id')
    document.querySelector('#youCured').style.display = 'block'
    document.querySelector('#the').style.display = 'block'
    document.querySelector('#pandemic').style.display = 'block'
  }
  
  function startButtonDisappear() {
    startButton.style.display = 'none'
  }

  startButton.addEventListener('click', startButtonStuffHide)













}
window.addEventListener('DOMContentLoaded', init)