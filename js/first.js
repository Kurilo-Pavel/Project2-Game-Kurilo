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
      // buttonUpdate.hide()
      battle.hide()
        buttonRezult.show()
      break;
    case 'second':
      inform.show()
      boardPlayer.show()
      boardShips.show()
      buttonBack.show()
      buttonRandom.show()
      // buttonUpdate.show()
      battle.show()
      buttonPlay.hide()
      firstImg.hide()
      total.hide()
      buttonNewGame.hide()
      buttonRezult.hide()
      HomeShips.style.height = 9*game.sizeRow + 'px'
      for (let i = 0; i < computerShip.length; i++) {
        computerShip[i].style.display = 'none';
      }
      let name = document.querySelectorAll('.Name')
      for(let i=0; i<name.length;i++){
        name[i].remove()
      }
      battleBoard.style.zIndex=2;
      if(document.getElementById('shipTab')){
      document.getElementById('shipTab').remove()}

      break;
    case 'third':
      battleBoard.style.zIndex = '-1'
      inform.hide()
      total.show()
      firstImg.hide()
      buttonRandom.hide()
      buttonPlay.hide()
      buttonNewGame.hide()
      buttonRezult.hide()
      HomeShips.style.height = board.offsetHeight+'px'
      shipTab.style.zIndex = '2';
            break;
  }
}

renderNewList();

function switchToList(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}





