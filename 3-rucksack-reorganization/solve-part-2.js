import {readFile} from 'node:fs/promises';

function getPriority(item) {
	if (/[a-z]/.test(item)) return item.codePointAt(0) - 'a'.codePointAt(0) + 1;
	if (/[A-Z]/.test(item)) return item.codePointAt(0) - 'A'.codePointAt(0) + 27;
}

const input = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

const rucksacks = input.split('\n');

const groups = [];

for (let i = 0; i < rucksacks.length; i++) {
	if ((i + 1) % 3 === 0) {
		groups.push([rucksacks[i - 2], rucksacks[i - 1], rucksacks[i]]);
	}
}

const badges = [];

for (const group of groups) {
	badges.push(
		[...group[0]].find(
			(item) => group[1].includes(item) && group[2].includes(item),
		),
	);
}

console.log(
	badges
		.map((badge) => getPriority(badge))
		.reduce((sum, priority) => sum + priority),
);
