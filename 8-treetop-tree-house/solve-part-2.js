import {readFile} from 'node:fs/promises';

const input = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

const grid = [];

for (const line of input.split('\n')) {
	grid.push([...line].map(Number));
}

function scenicScore({rowIndex, columnIndex}) {
	const column = grid.map((row) => row[columnIndex]);
	const height = grid[rowIndex][columnIndex];
	const row = grid[rowIndex];

	const blockingLeftIndex = row
		.slice(0, columnIndex)
		.findLastIndex((_height) => _height >= height);
	const left =
		blockingLeftIndex > -1 ? columnIndex - blockingLeftIndex : columnIndex;

	let blockingRightIndex = row
		.slice(columnIndex + 1)
		.findIndex((_height) => _height >= height);
	if (blockingRightIndex > -1) blockingRightIndex += columnIndex + 1;
	const right =
		blockingRightIndex > -1
			? blockingRightIndex - columnIndex
			: row.length - 1 - columnIndex;

	const blockingAboveIndex = column
		.slice(0, rowIndex)
		.findLastIndex((_height) => _height >= height);
	const above =
		blockingAboveIndex > -1 ? rowIndex - blockingAboveIndex : rowIndex;

	let blockingBelowIndex = column
		.slice(rowIndex + 1)
		.findIndex((_height) => _height >= height);
	if (blockingBelowIndex > -1) blockingBelowIndex += rowIndex + 1;
	const below =
		blockingBelowIndex > -1
			? blockingBelowIndex - rowIndex
			: column.length - 1 - rowIndex;

	return [left, right, above, below].reduce(
		(product, current) => product * current,
	);
}

let best = 0;

for (const [rowIndex, row] of grid.entries()) {
	for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
		const score = scenicScore({rowIndex, columnIndex});

		if (score > best) best = score
	}
}

console.log(best);
