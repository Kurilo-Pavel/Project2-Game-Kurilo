'use strict'
window.onhashchange = renderNewList;
let computerShip = document.getElementsByClassName('computer');

function renderNewList() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  if (state === '') {
    state = {page: 'first'}
  } else {
    state = JSON.parse(state);
  }
  let page = '';

  switch (state.page) {
    case 'first':
      firstImg.show();
      buttonNewGame.show();
      buttonRezult.show();
      total.hide();
      buttonBack.hide();
      boardPlayer.hide();
      boardShips.hide();
      buttonPlay.hide();
      buttonRandom.hide();
      winner.hide();
      battle.hide();
      pSpeed.hide()
      break;
    case 'second':
      inform.show();
      boardPlayer.show();
      boardShips.show();
      buttonBack.show();
      buttonRandom.show();
      battle.show();
      buttonPlay.hide();
      firstImg.hide();
      total.hide();
      buttonNewGame.hide();
      buttonRezult.hide();
      butRepeat.hide();
      winner.hide();
      pSpeed.hide()
      HomeShips.style.height = 9 * game.sizeRow + 'px';
      for (let i = 0; i < computerShip.length; i++) {
        computerShip[i].style.display = 'none';
      }
      let name = document.querySelectorAll('.Name')
      for (let i = 0; i < name.length; i++) {
        name[i].remove()
      }
      battleBoard.style.zIndex = '2';
      boardTab.style.zIndex = '-1';
      if (document.getElementById('shipTab')) {
        document.getElementById('shipTab').remove()
      }

      break;
    case 'third':
      battleBoard.style.zIndex = '-1';
      total.show();
      butRepeat.show();
      pSpeed.show()
      inform.hide();
      winner.hide();
      firstImg.hide();
      buttonRandom.hide();
      buttonPlay.hide();
      buttonNewGame.hide();
      buttonRezult.hide();
      HomeShips.style.height = board.offsetHeight + 'px';
      shipTab.style.zIndex = '2';
      HomeS.style.overflow = 'hidden';
      break;
  }
}

renderNewList();

function switchToList(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}





