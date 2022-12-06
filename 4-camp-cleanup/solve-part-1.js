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

const fullyContainedPairs = pairs.filter(([elf1, elf2]) => {
	if (elf1.start < elf2.start) return elf1.end >= elf2.end;
	if (elf1.start > elf2.start) return elf1.end <= elf2.end;

	return true;
});

console.log(fullyContainedPairs.length);
