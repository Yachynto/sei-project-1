function init() {
  //* DOM Elements
  const grid = document.querySelector('.grid')

  //* Variables
  const width = 10
  const cells = []
  const gridCells = width * width
  let virusPosition = 0
  let vaccinePosition = 62
  let allViruses = null
  let playerPosition = 94
  let shotPosition = playerPosition

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

  //* Viruses Spawns and Sneeze
  function addVaccine(vaccinePosition) {
    cells[vaccinePosition].classList.add('vaccine')
  }
  addVaccine(vaccinePosition)

  function addViruses(virusPosition) {
    for (let i = virusPosition; i < 7; i++) {
      cells[virusPosition + i].classList.add('virus')
      for (let j = i; j < 40; j += 10) {
        cells[virusPosition + j].classList.add('virus')
        allViruses = (i, j)
        console.log(allViruses)
      }
    }
  }
  addViruses(virusPosition)

  function sneeze(virusPosition) {
    
  }

  //* Player Classes
  function addPlayer(playerPosition) {
    cells[playerPosition].classList.add('player')
  }
  addPlayer(playerPosition)

  function removePlayer(playerPosition) {
    cells[playerPosition].classList.remove('player') 
    cells[playerPosition].classList.remove('playerLeft') 
    cells[playerPosition].classList.remove('playerRight') 
  }

  //* Shoot Function
  function shootSpray() {
    shotPosition = setInterval(() => {
      playerPosition - 20
      cells[playerPosition].classList.add('shoot')
    }, 1000)
  }

  //* Movement and shoot case in switch
  function movement(event) {

    removePlayer(playerPosition)

    const x = playerPosition % width
    
    switch (event.keyCode) {
      case 68: //* Going Right
        if (x < width - 1) playerPosition++
        cells[playerPosition].classList.add('playerRight')
        break
      case 65: //* Going Left
        if (x > 0) playerPosition--
        cells[playerPosition].classList.add('playerLeft')
        break
      case 32:
        shootSpray()
        break
      default:
    }

    addPlayer(playerPosition)
  }

  document.addEventListener('keydown', movement)

















}

window.addEventListener('DOMContentLoaded', init)