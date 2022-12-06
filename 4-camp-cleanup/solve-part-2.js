import {readFile} from 'node:fs/promises';

const input = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

const pairs = input.split('\n').map((pair) =>
	pair.split(',').map((range) => {
		const [start, end] = range.split('-');
		return {start: Number(start), end: Number(end)};
	}),
);

const overlappingPairs = pairs.filter(([elf1, elf2]) => {
	if (elf1.start < elf2.start) return elf1.end >= elf2.start;
	if (elf1.start > elf2.start) return elf2.end >= elf1.start;

	return true;
});

console.log(overlappingPairs.length);
