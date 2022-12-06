import {readFile} from 'node:fs/promises';

const input = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

console.log(
	input
		.split('\n\n')
		.map((group) =>
			group
				.split('\n')
				.map(Number)
				.reduce((sum, calories) => sum + calories),
		)
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((sum, calories) => sum + calories),
);
