import Phaser from 'phaser';
import InitialScene from './scenes/InitialScene';

const config: Phaser.Types.Core.GameConfig = {
	parent: 'phaser',
	type: Phaser.CANVAS,
	width: 500,
	height: 360,
	scale: {
		mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
	},
	scene: [InitialScene],
	backgroundColor: '#21213B',
};

export default new Phaser.Game(config);
