import {readFile} from 'node:fs/promises';

const input = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

const stacks = [
	['Q', 'S', 'W', 'C', 'Z', 'V', 'F', 'T'],
	['Q', 'R', 'B'],
	['B', 'Z', 'T', 'Q', 'P', 'M', 'S'],
	['D', 'V', 'F', 'R', 'Q', 'H'],
	['J', 'G', 'L', 'D', 'B', 'S', 'T', 'P'],
	['W', 'R', 'T', 'Z'],
	['H', 'Q', 'M', 'N', 'S', 'F', 'R', 'J'],
	['R', 'N', 'F', 'H', 'W'],
	['J', 'Z', 'T', 'Q', 'P', 'R', 'B'],
];

const instructions = input
	.split('\n')
	.slice(10)
	.map((instruction) => {
		const [crateCount, fromStack, toStack] = instruction
			.match(/\d+/g)
			.map(Number);

		return {crateCount, fromStack: fromStack - 1, toStack: toStack - 1};
	});

for (const instruction of instructions) {
	for (let i = 0; i < instruction.crateCount; i++) {
		stacks[instruction.toStack].push(stacks[instruction.fromStack].pop());
	}
}

console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
