import {readFile} from 'node:fs/promises';

const input = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

console.log(
	Math.max(
		...input.split('\n\n').map((group) =>
			group
				.split('\n')
				.map(Number)
				.reduce((sum, calories) => sum + calories),
		),
	),
);
