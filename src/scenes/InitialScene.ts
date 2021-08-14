import Phaser from 'phaser';
import {gospherGliderGun} from '../presets';
import Color = Phaser.Display.Color;

type CellType =
	| {
			alive: true;
			x: number;
			y: number;
			sprite: Phaser.GameObjects.Rectangle;
	  }
	| {alive: false; x: number; y: number};

export default class InitialScene extends Phaser.Scene {
	private cells!: CellType[];

	constructor() {
		super('initial');
	}

	create(): void {
		this.cells = [...Array(this.sys.game.canvas.width / 10)]
			.map((_item, x) => {
				return [...Array(this.sys.game.canvas.height / 10)].map((_item, y) => {
					return [x, y];
				});
			})
			.flat(1)
			.map(([x, y]) => {
				const alive = !!gospherGliderGun.find(
					([mx, my]) => mx === x && my === y
				);
				return {
					x,
					y,
					alive,
					...(alive && {
						sprite: this.add
							.rectangle(x * 10, y * 10, 10, 10, 0xf2aa4c)
							.setOrigin(0, 0),
					}),
				} as CellType;
			});
		this.cameras.main.setSize(500, 360);
		this.cameras.main.x = 10;
		this.cameras.main.y = 10;
		this.cameras.main.transparent = false;
		this.cameras.main.backgroundColor = new Color(16, 16, 32);
	}

	update(): void {
		const currentCells = this.cells;
		this.cells = currentCells.map(cell => {
			const liveNeighbours = currentCells.filter(neighbour => {
				return (
					(cell.x - 1 === neighbour.x ||
						cell.x === neighbour.x ||
						cell.x + 1 === neighbour.x) &&
					(cell.y - 1 === neighbour.y ||
						cell.y === neighbour.y ||
						cell.y + 1 === neighbour.y) &&
					!(cell.y === neighbour.y && cell.x === neighbour.x) &&
					neighbour.alive
				);
			});

			if (cell.alive) {
				if (!(liveNeighbours.length === 2 || liveNeighbours.length === 3)) {
					cell.sprite.destroy();
					return {x: cell.x, y: cell.y, alive: false};
				} else if (cell.x > 50 || cell.y > 36) {
					cell.sprite.destroy();
					return {x: cell.x, y: cell.y, alive: false};
				}
			} else {
				if (liveNeighbours.length === 3) {
					return {
						x: cell.x,
						y: cell.y,
						alive: true,
						sprite: this.add
							.rectangle(cell.x * 10, cell.y * 10, 10, 10, 0xf2aa4c)
							.setOrigin(0, 0),
					};
				}
			}
			return cell;
		});
	}
}
