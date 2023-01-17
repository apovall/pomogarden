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

function PhaserWrapper() {
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
    this.load.setBaseURL('http://labs.phaser.io');
  
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }
  
  function create ()
  {
    this.add.image(400, 300, 'sky');
  
    var particles = this.add.particles('red');
  
    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });
  
    var logo = this.physics.add.image(400, 100, 'logo');
  
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
  
    emitter.startFollow(logo);
  }

  // const game = new Phaser.Game(config)
  usePhaserGame(config)

  return (
    <div id={injectionID}></div>
  )
}

export default PhaserWrapper