import Phaser from 'phaser';
import InitialScene from './scenes/InitialScene';

const config: Phaser.Types.Core.GameConfig = {
	parent: 'phaser',
	type: Phaser.CANVAS,
	width: 520,
	height: 380,
	scale: {
		mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
	},
	scene: [InitialScene],
	fps: {
		target: 15,
		forceSetTimeOut: true,
	},
	render: {
		transparent: true,
	},
};

export default new Phaser.Game(config);
