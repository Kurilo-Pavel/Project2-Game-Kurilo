'use strict'
let game = {
  size: 11,
  sizeRow: null,
  ship: ['Small', 'Medium', 'Big', 'Huge'],
  rowNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  colLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
}
let bordShips = document.getElementById('ships');
let board = document.getElementById('board');

function createBord() { // отрисовываем поле 10х10


  if (board.offsetWidth < board.offsetHeight) {
    game.sizeRow = board.offsetWidth / 14;
  } else {
    game.sizeRow = board.offsetHeight / 14;
  }

  let tab = document.createElement('table');
  board.appendChild(tab);
  tab.style.borderCollapse = 'collapse';
  tab.style.marginTop = game.sizeRow + 'px';
  tab.style.marginLeft = game.sizeRow + bordShips.offsetLeft - board.offsetWidth + 'px';
  tab.style.height = game.sizeRow * game.size + 'px';
  tab.style.width = game.sizeRow * game.size + 'px';


  for (let i = 1; i <= game.size; i++) {
    let row = document.createElement('tr');
    tab.appendChild(row);

    for (let n = 1; n <= game.size; n++) {
      let col = document.createElement('td');
      row.appendChild(col);
      col.style.border = '1px solid black';

    }
  }
  console.log(tab.getBoundingClientRect())

}

createBord()

function createButtonReturn() {// создаем кнопку rotate
  let buttonReturn = document.createElement('input');
  bordShips.appendChild(buttonReturn)
  buttonReturn.setAttribute('type', 'button');
  buttonReturn.setAttribute('value', 'Rotate');
  buttonReturn.style.right = buttonReturn.offsetHeight / 2 + 'px'
  buttonReturn.style.bottom = buttonReturn.offsetHeight / 2 + 'px'
  buttonReturn.style.position = 'absolute'
}

createButtonReturn()

function createShips() { // отрисовываем корабли
  for (let i = 0; i < game.ship.length; i++) {
    for (let k = 0; k < game.ship.length - i; k++) {
      let ship = document.createElement('img');
      bordShips.appendChild(ship);
      ship.setAttribute('src', 'image/ship' + game.ship[i] + '.png');
      ship.setAttribute('class', k + game.ship[i]);
      ship.style.position = 'absolute';
      ship.style.left = game.sizeRow * (3 * k + 3 - i) + 'px';
      ship.style.top = game.sizeRow * 2 * i + 'px';
      ship.style.height = game.sizeRow + 'px';
      // ship.style.margin = game.sizeRow / 2 + 'px';
    }
  }
}

createShips()

function pullImage() {
  let DragImage = null;
  let clickInImgX;
  let clickInImgY;
  var image = bordShips.querySelector('img');
  var position = [];
  window.onload = save;


  function save() {
    for (let i = image.length - 1; i > -1; i--) {
      position[i] = {
        top: image[i].offsetTop + 'px',
        left: image[i].offsetLeft + 'px',
      }
    }

    function positions() {
      for (let p = position.length - 1; p > -1; p--) {
        image[p].style.top = position[p].top;
        image[p].style.left = position[p].left;
        image[p].style.position = 'absolute';
      }
    }

    positions();
  }

  document.addEventListener('mousedown', DragStart, false);

  function DragStart(EO) {
    EO = EO || window.event;
    if (EO.target.tagName == 'IMG') {
      DragImage = EO.target;
      EO.preventDefault();
      DragImage.style.cursor = 'grabbing';
      DragImage.style.position = 'absolute';
      clickInImgX = EO.pageX - DragImage.offsetLeft;
      clickInImgY = EO.pageY - DragImage.offsetTop;
      window.onmousemove = DragMove;
      window.onmouseup = DragStop;
      console.log(EO.pageX)
      console.log(DragImage.offsetLeft)
      console.log(EO.clientX)
    }
  }

  function DragMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    let tab = document.querySelector('table')

    let DragImageX = Math.round((EO.pageX - clickInImgX) / game.sizeRow) * game.sizeRow;
    let DragImageY = Math.round((EO.pageY - clickInImgY) / game.sizeRow) * game.sizeRow;
    // if(DragImageX < 0){
    //   // bordShips.removeChild(DragImage)
    //
    //   DragImage.style.left = DragImageX + bordShips.offsetleft + 'px';
    //   console.log(DragImageX + bordShips.offsetLeft)
    //   board.appendChild(DragImage)
    // }
    DragImage.style.left = DragImageX + 'px';
    DragImage.style.top = DragImageY + 'px';
    DragImage.style.cursor = 'grabbing';
    DragImage.style.position = 'absolute';
  }

  function DragStop(EO) {
    EO = EO || window.event

    //
    // let tab = document.querySelector('table')
    // if (tab.offsetLeft < EO.pageX - clickInImgX) {
    //   DragImage.style.left = EO.pageX - clickInImgX + 'px';
    // } else {
    //   DragImage.style.left = 0 + 'px';
    // }
    // if (tab.offsetTop < EO.pageY - clickInImgY) {
    //   DragImage.style.top = EO.pageY - clickInImgY + 'px';
    // } else {
    //   DragImage.style.top = 0 + 'px';
    //
    // }
    // console.log('target.offsetTop' + (EO.pageY - clickInImgY))
    // console.log('target.offsetLeft' + (EO.pageX - clickInImgX))
    // console.log('tab.offsetLeft' + tab.offsetLeft)
    // console.log('tab.offsetTop' + tab.offsetTop)


    window.onmousemove = null;
    window.onmouseup = null;
    DragImage.style.cursor = 'auto';

  }
}

pullImage()

document.addEventListener("contextmenu", Rotate, false);

function Rotate(EO) {
  EO = EO || window.event;
  if (EO.target.tagName == 'IMG') {
    let ImageRotate = EO.target;
    EO.preventDefault();
    ImageRotate.style.transformOrigin = '0 0'
    if (ImageRotate.style.transform == '') {
      ImageRotate.style.transform = 'rotate(90deg)';
    } else {
      ImageRotate.style.transform = ''
    }
    ;
  }
}

document.addEventListener("contextmenu", NeutralCell, false);

function NeutralCell(EO) {
  EO = EO || window.event;
  if (EO.target.tagName == 'TD') {
    let cellImg = EO.target;
    EO.preventDefault();
    cellImg.style.background = 'orange'
  }
}

function Letters() {
  let firstLetter = document.getElementsByTagName('td');
  for (let i = 0; i < firstLetter.length; i++) {
    if (i < 11) {
      firstLetter[i].style.border = '0px'
      firstLetter[i].style.background = 'white';
    } else if (i % 11 == 0) {
      firstLetter[i].style.border = '0px'
      firstLetter[i].style.background = 'white';
      for(let n = 0; n<game.colLetter.length;n++){
      firstLetter[i].textContent = game.colLetter[n];}
      firstLetter[i].style.width = game.sizeRow+'px'
    }
  }


  console.log(firstLetter)
}

Letters()