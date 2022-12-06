import {readFile} from 'node:fs/promises';

function getPriority(item) {
	if (/[a-z]/.test(item)) return item.codePointAt(0) - 'a'.codePointAt(0) + 1;
	if (/[A-Z]/.test(item)) return item.codePointAt(0) - 'A'.codePointAt(0) + 27;
}

async function solve() {
	const input = await readFile(new URL('input.txt', import.meta.url), {
		encoding: 'utf8',
	});

	let prioritiesSum = 0;

	for (const rucksack of input.split('\n')) {
		const compartment1 = new Set(rucksack.slice(0, rucksack.length / 2));
		const compartment2 = rucksack.slice(rucksack.length / 2);

		const duplicate = [...compartment2].find((item) => compartment1.has(item));

		prioritiesSum += getPriority(duplicate);
	}

	return prioritiesSum;
}

console.log(await solve());
