import {readFile} from 'node:fs/promises';

const input = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

let listing = false;
let location = '';

const sizes = {};

function incrementSize({location, amount}) {
	if (!(location in sizes)) sizes[location] = 0;

	sizes[location] += amount;

	const levels = location.split('/');

	if (levels.length > 1) {
		const parent = levels.slice(0, -1).join('/');

		incrementSize({location: parent, amount});
	}
}

for (const line of input.split('\n')) {
	if (line.startsWith('$')) {
		listing = false;
	}

	if (listing) {
		if (/^\d+/.test(line)) {
			const [size] = line.split(' ');

			incrementSize({amount: Number(size), location});
		}
	} else if (line.startsWith('$ cd')) {
		const directory = line.slice(5);

		if (directory === '..') {
			location = location.slice(0, location.lastIndexOf('/'));
		} else if (directory === '/') {
			location = 'root';
		} else {
			location += `/${directory}`;
		}
	} else if (line.startsWith('$ ls')) {
		listing = true;
	}
}

let smallest = Number.POSITIVE_INFINITY;

const candidates = Object.values(sizes).filter(
	(size) => 70_000_000 - sizes.root + size >= 30_000_000,
);

for (const candidate of candidates) {
	if (candidate < smallest) smallest = candidate;
}

console.log(smallest);
