function init() {
  //* DOM Elements
  const grid = document.querySelector('.grid') 

  //* Variables
  const width = 10
  const cells = []
  const maskPosition = [71, 72, 74, 75, 77, 78]
  const gridCells = width * width
  let virusPosition = null
  let vaccinePosition = 62
  // let allViruses = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26]
  let playerPosition = 94
  let shotPosition = playerPosition
  let sneezePosition = virusPosition
  let timerShoot = null
  let allShots = []
  let virusId
  let allViruses = [
    { currentIndex: 0, isAlive: true },
    { currentIndex: 1, isAlive: true },
    { currentIndex: 2, isAlive: true },
    { currentIndex: 3, isAlive: true },
    { currentIndex: 4, isAlive: true }
  ]

  //* Scenario
  function createGrid() {
    for (let i = 0; i < gridCells; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('id', i)
      cell.innerHTML = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    createMasks()
    // masksDom()
  }
  createGrid()

  function createMasks() {
    maskPosition.forEach(mask => {
      return cells[mask].classList.add('mask')
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
    const finalVirus = allViruses[allViruses.length - 1].currentIndex
    const x = finalVirus % width
    const y = Math.floor(finalVirus / width)
    if (x < width - 1 && y % 2 === 0) {
      allViruses = allViruses.map(virus => {
        return {
          ...virus, currentIndex: virus.currentIndex + 1
        }
      })
    } else if (x > allViruses.length - 1 && y % 2 !== 0) {
      allViruses = allViruses.map(virus => {
        return {
          ...virus, currentIndex: virus.currentIndex - 1
        }
      })
    } else if (x === width - 1 || x === allViruses.length - 1) {
      allViruses = allViruses.map(virus => {
        return {
          ...virus, currentIndex: virus.currentIndex + width
        }
      })
    }
  }
  
  function move() {
    let count = 0
    virusId = setInterval(() => {
      removeAllViruses()
      moveViruses()
      addViruses()
    }, 1000)
  }
  move()
  
  
  // function sneeze() {
  //   addSneeze()
  //   sneezePosition + 30
  // }
  // sneeze()

  // function addSneeze(sneezePosition) {
  //   cells[sneezePosition].classList.add('sneeze')
  // }

  //* Remove Functions
  function removeVirus() {
    cells[shotPosition].classList.remove('virus')
  }

  function removeAllViruses() {
    allViruses.forEach(virus => {
      cells[virus.currentIndex].classList.remove('virus')
    })
  }
  
  function removePlayer(playerPosition) {
    cells[playerPosition].classList.remove('player') 
    cells[playerPosition].classList.remove('playerLeft') 
    cells[playerPosition].classList.remove('playerRight') 
  }
  
  function removeShoot() {
    cells[shotPosition].classList.remove('shoot')
  }

  function removeSneeze() {
    cells[sneezePosition].classList.remove('sneeze') 
  }

  //* Player Classes
  function addPlayer(playerPosition) {
    cells[playerPosition].classList.add('player')
  }
  addPlayer(playerPosition)

  //* Shoot Functions
  function handleShoot() {
    if (cells[shotPosition].classList.contains('virus')) {
      const hitVirus = allViruses.find(virus => {
        virus.currentIndex === shotPosition
      })
      console.log(hitVirus, 'hitVirus')
      hitVirus.isAlive = !hitVirus.isAlive
      console.log(allViruses, 'all viruses')
      console.log(shotPosition, 'shot')
      removeShoot()
      removeVirus()
      clearInterval(timerShoot)
    } 
    // else if (shotPosition % width === 0) {
    //   removeShoot()
    //   clearInterval(timerShoot)
    // }
    // allShots.forEach(shot => {
    //   allShots.push(shotPosition)
    //   console.log(allShots)
    // })
  }


  function shootSpray() {
    shotPosition = playerPosition
    timerShoot = setInterval(() => {
      cells[shotPosition].classList.remove('shoot')
      shotPosition -= 10
      cells[shotPosition].classList.add('shoot')
      handleShoot()
    }, 150)
  }

  //* Handle Shooting
  

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
        break
      default:
    }

    addPlayer(playerPosition)
  }

  document.addEventListener('keydown', movement)

















}

window.addEventListener('DOMContentLoaded', init)