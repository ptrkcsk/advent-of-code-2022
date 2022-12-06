import {readFile} from 'node:fs/promises';

function decryptChoice(choice) {
	switch (choice) {
		case 'A':
		case 'X': {
			return 1;
		}

		case 'B':
		case 'Y': {
			return 2;
		}

		case 'C':
		case 'Z': {
			return 3;
		}

		default: {
			throw new Error(`Unexpected choice '${choice}'`);
		}
	}
}

function getRoundPoints([opponent, me]) {
	let points = me;

	if (opponent === me) points += 3; // Tie
	else if ([1, -2].includes(me - opponent)) points += 6; // Win

	return points;
}

async function solve() {
	const input = await readFile(new URL('input.txt', import.meta.url), {
		encoding: 'utf8',
	});

	return input
		.split('\n')
		.map((round) =>
			getRoundPoints(round.split(' ').map((choice) => decryptChoice(choice))),
		)
		.reduce((sum, roundScore) => sum + roundScore);
}

console.log(await solve());
