import {readFile} from 'node:fs/promises';

const input = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

const grid = [];

for (const line of input.split('\n')) {
	grid.push([...line].map(Number));
}

let count = 0;

function isVisible({rowIndex, columnIndex}) {
	const column = grid.map((row) => row[columnIndex]);
	const height = grid[rowIndex][columnIndex];

	const tallestToLeft = Math.max(...grid[rowIndex].slice(0, columnIndex));
	const tallestToRight = Math.max(...grid[rowIndex].slice(columnIndex + 1));
	const tallestAbove = Math.max(...column.slice(0, rowIndex));
	const tallestBelow = Math.max(...column.slice(rowIndex + 1));

	return [tallestToLeft, tallestToRight, tallestAbove, tallestBelow].some(
		(tallest) => tallest < height,
	);
}

for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
	const row = grid[rowIndex];

	for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
		if (
			rowIndex === 0 ||
			rowIndex === grid.length - 1 ||
			columnIndex === 0 ||
			columnIndex === row.length - 1
		) {
			// Tree is on outside edge
			count++;
		} else if (isVisible({rowIndex, columnIndex})) {
			count++;
		}
	}
}

console.log(count);
