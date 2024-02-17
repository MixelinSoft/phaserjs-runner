import preload from './engine/preload.js';
import create from './engine/create.js';
import update from './engine/update.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

export default config;
