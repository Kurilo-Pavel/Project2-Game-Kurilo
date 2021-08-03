'use strict'
let game = {
  canvas: null,
  ctx: null,
  board: null,
  width: 0,
  height: 0,
  dimensions: {
    max: {
      width: 640,
      height: 400
    },
    min: {
      width: 300,
      height: 300
    }
  },
  sprites: {
    background: null,
    cell: null,
     },

  start() {
    this.init();
    this.preload(() => {
      this.run();
    });
  },
  init() {

    // this.canvas = document.getElementById('canvas');
    var board = document.getElementById('board');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = board.offsetWidth;
    this.canvas.height = board.offsetHeight;
  },

  preload(callback) {
    var loaded = 0;
    const required = Object.keys(this.sprites).length;
    const onAssetLoad = () => {
      ++loaded;
      if (loaded >= required) {
        callback();
      }
    };
    this.preloadSprites(onAssetLoad);
  },
  preloadSprites(onAssetLoadCallback) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = 'image/' + key + '.png';
      this.sprites[key].addEventListener('load', onAssetLoadCallback);
      console.log('d', this.sprites[key])
    }
  },
  run() {
    console.log('запуск игры');
    this.create();
    this.gameInterval = setInterval(() => {
      this.update();
    }, 100);
  },
  create() {
    this.board.create();
  },
  update() {
    this.render();
  },
  render() {
    this.board.render();
  }
};
window.addEventListener('load', () => {
  game.start();
});