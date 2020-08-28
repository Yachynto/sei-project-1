function init() {
  //* DOM Elements
  const grid = document.querySelector('.grid')

  //* Variables
  const width = 10
  const cells = []
  const gridCells = width * width
  let virusPosition = 0
  let vaccinePosition = 94
  let allViruses = null

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

  //* Spawns
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




















}

window.addEventListener('DOMContentLoaded', init)