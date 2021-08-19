'use strict'
window.onhashchange = renderNewList;
let computerShip = document.getElementsByClassName('computer');
function renderNewList() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));
  let newGame = document.getElementById('newGame');
  let img = document.getElementById('img');
  let board = document.getElementById('board');
  let ship = document.getElementById('ship');
  let tablePlayer = document.getElementById('boardTab');
  let tableComputer = document.getElementById('shipTab');
  let update = document.getElementById('Update');
  let help = document.getElementById('help');
  let play = document.getElementById('play');
  let random = document.getElementById('Random');
  let back = document.getElementById('back');



  if (state === '') {
    state = {page: 'first'}
  } else {
    state = JSON.parse(state);
  }
  let page = '';

  switch (state.page) {
    case 'first':
      img.style.display = 'block';
      board.style.display = 'none';
      ship.style.display = 'none';
      newGame.style.display = 'block'
      break;
    case 'second':
      img.style.display = 'none';
      newGame.style.display = 'none';
      board.style.display = 'block';
      ship.style.display = 'block';
      board.style.zIndex = 0;
      tablePlayer.style.zIndex = -1;
      tableComputer.style.display = 'none'
      help.style.display = 'block';
      random.style.display = 'block';
      game.battleBoard.style.zIndex = '0';
      // update.style.display = 'block'
      for (let i=0; i<computerShip.length; i++){
        computerShip[i].style.display = 'none';
      };
      if(play.style.display == 'none'){
        play.style.display = 'block';
      };
      back.style.display = 'block';
      break;
    case 'third':
      tableComputer.style.display = 'inline-table';
      board.style.zIndex = 20;
      tableComputer.style.zIndex = 20;
      help.style.display = 'none';
      img.style.display = 'none';
      update.style.display = 'none';
      newGame.style.display = 'block';
      random.style.display = 'none';
      game.HomeShips.style.width = '100%';
      game.HomeShips.style.height = ship.offsetHeight+'px';
      for (let i=0; i<computerShip.length; i++){
      if(computerShip[i].style.display === 'none'){
      computerShip[i].style.display = 'block';}}
      if(play.style.display == 'block'){
        play.style.display = 'none';
      };
back.style.display = 'none';
      break;
  }
}

renderNewList();

function switchToList(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}

function newGame() {
  switchToList({page: 'second'});
game.HomeShips.remove();
// createHomeShips()
  document.getElementById('winner').remove();

}

function play() {
  switchToList({page: 'third'});
  createHomeShips()
  createShip(game.shipComputer, 'computer');
  Random(game.HomeShips, game.randomPlayer, 'computer');
  winner()
}

function back() {
  let statePage = JSON.parse(decodeURIComponent(location.hash.substr(1))).page;
  if (statePage == 'second') {
    switchToList({page: 'first'});
  } else {
    switchToList({page: 'second'});
  }
  // game.HomeShips.style.height = 9 * game.sizeRow+ 'px';
  // game.HomeShips.style.width = '100%';
}