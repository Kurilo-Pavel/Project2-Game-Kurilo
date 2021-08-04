'use strict'
window.onhashchange = renderNewList;

function renderNewList() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));
  let buttonGame = document.getElementById('newGame');
  let img = document.getElementById('img');

  if (state === '') {
    buttonGame.style.display = 'block';
    img.style.display = 'block';
  } else {
    state = JSON.parse(state);
  }
  let page = '';

  switch (state.page) {
    case 'first':
      img.style.display = 'none';
      buttonGame.style.display = 'none';
      break;
    case 'second':
      alert('back')
      break;
    case 'third':
      alert('play')
      break;
  }
}

renderNewList();

function switchToList(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}

function newGame() {
  switchToList({page: 'first'});
}

function play() {
  switchToList({page: 'third'});
}

function back() {
  switchToList({page: 'second'})
}