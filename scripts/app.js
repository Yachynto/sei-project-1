function init() {
  //* DOM Elements
  const grid = document.querySelector('.grid')

  //* Variables
  const width = 10
  const cells = []
  const gridCells = width * width
  let virusPosition = null
  let vaccinePosition = 62
  let allViruses = []
  let playerPosition = 94
  let shotPosition = playerPosition
  let timerShoot = null
  let allShots = []
  // let shot = null

  //* Scenario
  function createGrid() {
    for (let i = 0; i < gridCells; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('id', i)
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  createGrid()

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
    for (let i = 0; i < 28; i++) {
      allViruses.push(i)
      allViruses.forEach(virus => {
        return cells[virus].classList.add('virus')
      })
    }
    console.log(allViruses.length)
  }
  
  

  function moveViruses() {
    let count = 0
    let timerId = setInterval(() => {
      removeVirus()
      allViruses = allViruses.map(virus => {
        return virus + 1
      })
      addViruses()
    }, 1000)
  }
  moveViruses()
  
  
  function sneeze(virusPosition) {
    
  }

  //* Remove Functions
  function removeVirus() {
    cells[shotPosition].classList.remove('virus')
  }

  // function removeAllViruses() {
  //   for (let i = 0; i < 28; i++) {
  //     cells[virusPosition].classList.remove('virus')
  //     console.log(i)
  //   }
  // }
  
  function removePlayer(playerPosition) {
    cells[playerPosition].classList.remove('player') 
    cells[playerPosition].classList.remove('playerLeft') 
    cells[playerPosition].classList.remove('playerRight') 
  }
  
  function removeShoot() {
    cells[shotPosition].classList.remove('shoot')
  }

  //* Player Classes
  function addPlayer(playerPosition) {
    cells[playerPosition].classList.add('player')
  }
  addPlayer(playerPosition)

  //* Shoot Functions
  function handleShoot() {
    if (cells[shotPosition].classList.contains('virus')) {
      removeShoot()
      removeVirus()
      clearInterval(timerShoot)
    }
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
    }, 500)
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