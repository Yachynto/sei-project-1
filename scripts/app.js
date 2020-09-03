function init() {

  //* DOM Elements
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.startButton')
  const scoreText = document.querySelector('.scoreText')

  //* Variables
  const width = 10
  const cells = []
  const maskLeftHalf = [71, 74, 77]
  const maskRightHalf = [ 72, 75, 78]
  const gridCells = width * width
  const virusPosition = null
  const vaccinePosition = 62
  // let allViruses = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26]
  let score = null
  let playerPosition = 94
  let shotPosition 
  const sneezePosition = virusPosition
  let movingRight = true
  const allShots = []
  let virusId
  let timerShoot
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

  //* Scenario
  function createGrid() {
    for (let i = 0; i < gridCells; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('id', i)
      cells.push(cell)
      grid.appendChild(cell)
    }
    createLeftHalfMask()
    createRightHalfMask()
    // masksDom()
  }
  createGrid()

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
  // function masksDom() {
  //   const firstMask = document.getElementById('71')
  //   const secondMask = document.getElementById('72')
  //   const thirdMask = document.getElementById('74')
  //   const fourthMask = document.getElementById('75')
  //   const fifthMask = document.getElementById('77')
  //   const sixthMask = document.getElementById('78')
  //   const firstPair = firstMask + secondMask
  //   const secondPair = thirdMask + fourthMask
  //   const thirdPair = fifthMask + sixthMask
  //   cells[firstPair].classList.add('mask')
  //   cells[secondPair].classList.add('mask')
  //   cells[thirdPair].classList.add('mask')
  // }

  //* Viruses Spawns, Movement and Sneeze
  // function addVaccine(vaccinePosition) {
  //   cells[vaccinePosition].classList.add('vaccine')
  // }
  // addVaccine(vaccinePosition)
  // function addViruses(virusPosition) {
  //   for (let i = virusPosition; i < 7; i++) {
  //     cells[virusPosition + i].classList.add('virus')
  //     for (let j = i; j < 40; j += 10) {
  //       cells[virusPosition + j].classList.add('virus')
  //       allViruses.push(j)
  //     }
  //   }
  //   moveViruses()
  // }
  // addViruses(virusPosition)

  function addViruses() {
    allViruses.forEach(virus => {
      if (virus.isAlive) {
        return cells[virus.currentIndex].classList.add('virus')
      }
    })
  }
  addViruses()

  function moveViruses() {
    const finalVirusIndex = movingRight ? allViruses[allViruses.length - 1].currentIndex : allViruses[0].currentIndex
    const x = finalVirusIndex % width 
    const y = Math.ceil(finalVirusIndex / width)
    if (finalVirusIndex === 89) {
      console.log(y, 'y position')
      clearInterval(virusId)  //* If viruses hit bottom, end game
    } else if ((x === width - 1 && movingRight) || (x === 0  && !movingRight)) { 
      allViruses = allViruses.map(virus => {
        return {
          ...virus, currentIndex: virus.currentIndex + width
        }
      })
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
    }, 200)
  }
  
  // function sneeze() {
  //   addSneeze()
  //   sneezePosition + 30
  // }
  // sneeze()
  // function addSneeze(sneezePosition) {
  //   cells[sneezePosition].classList.add('sneeze')
  // }

  //* Remove Functions
  function removeViruses() {
    allViruses.forEach(virus => {
      return cells[virus.currentIndex].classList.remove('virus')
    })
  }
  // function removeAllViruses() {
  //   allViruses.forEach(virus => {
  //     cells[virus.currentIndex].classList.remove('virus')
  //   })
  // }
  function removePlayer(playerPosition) {
    cells[playerPosition].classList.remove('player') 
    cells[playerPosition].classList.remove('playerLeft') 
    cells[playerPosition].classList.remove('playerRight') 
  }
  function removeSpray() {
    cells[shotPosition].classList.remove('shoot')
  }
  // function removeSneeze() {
  //   cells[sneezePosition].classList.remove('sneeze') 
  // }

  //* Player Classes
  function addPlayer(playerPosition) {
    cells[playerPosition].classList.add('player')
  }
  addPlayer(playerPosition)

  //* Shoot Functions
  // function handleShoot() {
  //   if (cells[shotPosition].classList.contains('virus')) {
  //     const hitVirus = allViruses.find(virus => {
  //       virus.currentIndex === shotPosition
  //     })
  //     console.log(hitVirus, 'hitVirus')
  //     hitVirus.isAlive = !hitVirus.isAlive
  //     console.log(allViruses, 'all viruses')
  //     console.log(shotPosition, 'shot')
  //     removeSpray()
  //     removeVirus()
  //     clearInterval(timerShoot)
  //   } 
  // else if (shotPosition % width === 0) {
  //   removeShoot()
  //   clearInterval(timerShoot)
  // }
  // allShots.forEach(shot => {
  //   allShots.push(shotPosition)
  //   console.log(allShots)
  // })
  // }

  //* Register Score
  function scoring() {
    score = score + 100
    scoreText.innerHTML = score
    if (score === 1500) {
      winGame()
    }
  }

  //* Player Shoots
  function addSpray() {
    if (cells[shotPosition].classList.contains('virus')) {
      console.log('collison')
      console.log('shotPosition', shotPosition)
      scoring()
      const hitVirus = allViruses.find(virus => {
        return virus.currentIndex === shotPosition
      })
      allViruses = allViruses.filter(virus => { //* Remove the object from array
        return virus.isAlive === true
      })
      //! use the splice to remove the object from allViruses
      console.log('hitVirus', hitVirus)
      hitVirus.isAlive = !hitVirus.isAlive
      cells[shotPosition].classList.remove('virus')
      console.log(allViruses, 'starting array')
      console.log(allViruses, 'hidden array')
      clearInterval(timerShoot) // * clear the interval
      return
    } else if (shotPosition <= 9 && !cells[shotPosition].classList.contains('virus')) {
      removeSpray()
      clearInterval(timerShoot)
    }
    cells[shotPosition].classList.add('shoot')
  }
  
  function shootSpray() {
    shotPosition = playerPosition
    timerShoot = setInterval(() => {
      removeSpray()
      shotPosition -= 10
      addSpray()
    }, 150)
  }

  //* Movement and shoot case in switch
  function movement(event) {
    removePlayer(playerPosition)
    const x = playerPosition % width
    switch (event.keyCode) {
      case 68: //* Going Right
        if (x < width - 1) playerPosition++
        cells[playerPosition].classList.add('playerRight')
        shotPosition = playerPosition
        break
      case 65: //* Going Left
        if (x > 0) playerPosition--
        cells[playerPosition].classList.add('playerLeft')
        shotPosition = playerPosition
        break
      case 32: //* Shoot
        shootSpray()
        // startGame()
        //! Start moving them with spacebar 
        break
      default:
    }
    addPlayer(playerPosition)
  }
  
  
  //* Start Game, Victory and Loose
  function startGame() {
    moveVirusesTimer()
  }
  
  function winGame() {
    clearInterval(virusId)
    window.alert('You Won')
  }
  
  
  
  
  
  
  
  
  
  startButton.addEventListener('click', startGame)
  document.addEventListener('keydown', movement)







}
window.addEventListener('DOMContentLoaded', init)