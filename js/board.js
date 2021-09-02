game.board = {
  game: game,
  size: 10,
  cellSize: null,
  cells: [],
  ship: ['Small', 'Medium', 'Big', 'Huge'],
  rowNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  colLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  create() {
    this.createCells();
    this.createShips();
    this.createButtonReturn();
    this.pullImage();

  },
  createCells() {//создаем поле
    for (var row = 1; row <= this.size; row++) {
      for (var col = 1; col <= this.size; col++) {
        this.cells.push(this.createCell(row, col))
      }
    }
    console.log(this.cells)
  },
  createCell(row, col) {
    var tabl = document.getElementById('board');
    if (tabl.offsetWidth < tabl.offsetHeight) {
      game.board.cellSize = tabl.offsetWidth / 12;
    } else {
      game.board.cellSize = tabl.offsetHeight / 12;
    }

    return {
      row: row,
      col: col,
      x: game.board.cellSize * col,
      y: game.board.cellSize * row,
      cellsSize: game.board.cellSize - 1
    }
  },
  createShips() {// отрисовываем корабли
    var bordShips = document.getElementById('ships');
    for (var i = 0; i < game.board.ship.length; i++) {
      for (var k = 0; k < game.board.ship.length - i; k++) {
        var ship = document.createElement('img');
        bordShips.appendChild(ship);
        ship.setAttribute('src', 'image/ship' + game.board.ship[i] + '.png');
        ship.setAttribute('class', k + game.board.ship[i]);
        var shipHeight = game.board.cellSize;
        ship.style.position = 'absolute';
        var shipWidth = ship.x
        ship.style.left = shipHeight * (2 * k - i) + 'px';
        ship.style.top = shipHeight * 1.5 * i + 'px';
        ship.style.height = shipHeight + 'px';
        ship.style.margin = shipHeight / 2 + 'px';
      }
    }
  },
  createButtonReturn() {// создаем кнопку rotate
    var bordShips = document.getElementById('ships');
    var buttonReturn = document.createElement('input');
    bordShips.appendChild(buttonReturn)
    buttonReturn.setAttribute('type', 'button');
    buttonReturn.setAttribute('value', 'Rotate');
    buttonReturn.style.right = buttonReturn.offsetHeight / 2 + 'px'
    buttonReturn.style.bottom = buttonReturn.offsetHeight / 2 + 'px'
    buttonReturn.style.position = 'absolute'
  },
  pullImage() {
    var DragImage = null;
    var clickInImgX;
    var clickInImgY;
    var divShip = document.getElementById('ships');
    var image = divShip.querySelector('img');
    var position = [];
    window.onload = save;


    function save() {
      for (var i = image.length - 1; i > -1; i--) {
        position[i] = {
          top: image[i].offsetTop + 'px',
          left: image[i].offsetLeft + 'px',
        }
      }

      function positions() {
        for (var p = position.length - 1; p > -1; p--) {
          image[p].style.top = position[p].top;
          image[p].style.left = position[p].left;
          image[p].style.position = 'fixed';
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
        console.log('clickInImgX', clickInImgX)
        console.log('clickInImgY', clickInImgY)
      }
    }

    function DragMove(EO) {
      EO - EO || window.event;
      EO.preventDefault();
      DragImageX = EO.pageX - clickInImgX - game.board.cellSize / 2;
      DragImageY = EO.pageY - clickInImgY - game.board.cellSize / 2;
      DragImage.style.left = DragImageX + 'px';
      DragImage.style.top = DragImageY + 'px';
      DragImage.style.cursor = 'move';
      DragImage.style.position = 'absolute';
    }

    function DragStop() {
      window.onmousemove = null;
      window.onmouseup = null;
      DragImage.style.cursor = 'auto';
    }
  },
  render() { // отрисовываем координаты
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y, cell.cellsSize, cell.cellsSize);
      for (var i = 1; i <= this.game.board.rowNumber.length; i++) {
        this.game.ctx.font = cell.cellsSize / 1.5 + 'px Arial normal';
        this.game.ctx.textAlign = 'center';
        this.game.ctx.textBaseline = 'middle';
        if (cell.row === i && cell.col === i) {
          this.game.ctx.strokeText(this.colLetter[i - 1], cell.x + cell.cellsSize / 2, cell.cellsSize / 2);
          this.game.ctx.strokeText(this.rowNumber[i - 1], cell.cellsSize / 2, cell.cellsSize / 2 + cell.y);
        }
      }
    });

  }
};