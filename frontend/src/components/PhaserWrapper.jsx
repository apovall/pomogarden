import {useRef, useEffect} from 'react'
import Phaser from 'phaser';

function usePhaserGame(config) {
  const phaserGameRef = useRef(null);
  useEffect(() => {
    if (phaserGameRef.current) {
      return;
    }
    phaserGameRef.current = new Phaser.Game(config);
    return () => {
      phaserGameRef.current.destroy(true);
      phaserGameRef.current = null;
    };
  }, []); /* only run once; config ref elided on purpose */
  return phaserGameRef.current;
}

function PhaserWrapper({gameMapLayout}) {
  let injectionID = 'game-wrapper'
  let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    },
    parent: injectionID
  };

  function preload ()
  {
    // this.load.setBaseURL('http://127.0.0.1:3000');
  
    this.load.image('testTileSet', 'http://127.0.0.1:3000/images/tiles/core/testTileSet.png');
  }
  
  function create ()
  {
    console.log('1');
    console.log(gameMapLayout);
    const map = this.make.tilemap({data: gameMapLayout, tileWidth: 42, tileHeight: 50 })
    console.log('2');
    const tiles = map.addTilesetImage('testTileSet');
    console.log('3');
    const layer = map.createLayer(0,tiles,0,0)
    // this.add.image(400, 300, 'sky');
  
    // var particles = this.add.particles('red');
  
    // var emitter = particles.createEmitter({
    //     speed: 100,
    //     scale: { start: 1, end: 0 },
    //     blendMode: 'ADD'
    // });
  
    // var logo = this.physics.add.image(400, 100, 'logo');
  
    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);
  
    // emitter.startFollow(logo);
  }

  // const game = new Phaser.Game(config)
  usePhaserGame(config)

  return (
    <div id={injectionID}></div>
  )
}

export default PhaserWrapper