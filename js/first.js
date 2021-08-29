'use strict'
window.onhashchange = renderNewList;
let computerShip = document.getElementsByClassName('computer');

function renderNewList() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));
  // let newGame = document.getElementById('newGame');
  // let img = document.getElementById('img');
  // // let board = document.getElementById('board');
  // // let ship = document.getElementById('ship');
  // let tablePlayer = document.getElementById('boardTab');
  // let tableComputer = document.getElementById('shipTab');
  // let update = document.getElementById('Update');
  // let help = document.getElementById('help');
  // let play = document.getElementById('play');
  // let random = document.getElementById('Random');
  // let back = document.getElementById('back');


  if (state === '') {
    state = {page: 'first'}
  } else {
    state = JSON.parse(state);
  }
  let page = '';

  switch (state.page) {
    case 'first':
      firstImg.show()
buttonNewGame.show()
      total.hide()
      buttonBack.hide()
      boardPlayer.hide()
      boardShips.hide()
      buttonPlay.hide()
      buttonRandom.hide()
      buttonUpdate.hide()
      battle.hide()
      break;
    case 'second':
      inform.show()
      boardPlayer.show()
      boardShips.show()
      buttonBack.show()
      buttonRandom.show()
      buttonUpdate.show()
      battle.show()
      buttonPlay.show()
      firstImg.hide()
      total.hide()
      buttonNewGame.hide()

      for (let i = 0; i < computerShip.length; i++) {
        computerShip[i].style.display = 'none';
      }
      break;
    case 'third':
      battleBoard.style.zIndex = '-1'
      inform.hide()
      total.show()
      firstImg.hide()
      buttonRandom.hide()
      buttonUpdate.hide()
      buttonPlay.hide()
      buttonNewGame.hide()
      HomeShips.style.height = board.offsetHeight+'px'
      console.log(HomeShips.style.height)
      createBord(game.boardShips)
      namePlayer('player', 'player')
      namePlayer('computer', 'computer')
      for (let i = 0; i < computerShip.length; i++) {
        if (computerShip[i].style.display === 'none') {
          computerShip[i].style.display = 'block';
        }
      }

      break;
  }
}

renderNewList();

function switchToList(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}





