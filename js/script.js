const victoryCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

const formEl = document.querySelector('.form')
const mainContainer = document.querySelector('.container')
const contentEl = document.createElement('div')
const scoreX = document.querySelector('.score-x')
const scoreO = document.querySelector('.score-o')

formEl.addEventListener('submit', handleSubmit)

let nameX = ''
let nameO = ''
let totalScoreX = 0
let totalScoreO = 0

function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget
  nameX = form.elements.nameX.value
  nameO = form.elements.nameO.value

  if (nameX === "" || nameO === "") {
    alert("Please fill in all the fields!");
    return
  }

  scoreX.textContent = `${nameX} score: ${totalScoreX}`
  scoreO.textContent = `${nameO} score: ${totalScoreO}`
  onShowGame()
}

function onShowGame() {  
  formEl.style.display = 'none'
  mainContainer.prepend(contentEl)
  contentEl.classList.add('content')
  createMarkup()
}

let player = 'X'
let historyX = []
let historyO = []

function createMarkup() {
  let markup = '';
  for(let i = 1; i < 10; i += 1) {
    markup += `<div class='item js-item' data-id=${i}></div>`
  }
  contentEl.innerHTML = markup
  contentEl.style.border = '1px solid black';
}


contentEl.addEventListener('click', onCellClick)

function onCellClick(e) {
  const { target } = e
  if (!target.classList.contains('js-item') || target.textContent){
    return
  }

  const id = Number(target.dataset.id)
  let result = false
  
  if (player === 'X') {
    historyX.push(id)
    result = isWinner(historyX)
    console.log('X:', historyX);
  } else {
    historyO.push(id)
    result = isWinner(historyO)
    console.log('O:', historyO);
  }
  
  target.textContent = player

  const isEndGame = historyX.length + historyO.length === 9;

  if (result) {
    if(player === 'X') {
      setTimeout(() => {
      alert(`Player ${nameX} wins!`);
        totalScoreX += 1
        scoreX.textContent = `${nameX} score: ${totalScoreX}`
        resetGame()
      }, 100)
    } else {setTimeout(() => {
      alert(`Player ${nameO} wins!`);
        totalScoreO += 1
        scoreO.textContent = `${nameO} score: ${totalScoreO}`
        resetGame()
      }, 100)}
    return
  } else if (isEndGame) {
    setTimeout(() => {
      alert('End game');
      resetGame()
    }, 100)
    return
  }

  player = player === 'X' ? 'O' : 'X'
}

function isWinner(arr){
  return victoryCombinations.some(item => item.every((id) => arr.includes(id)))
}

function resetGame() {
  createMarkup()
  historyX = []
  historyO = []
  player = 'X'
}