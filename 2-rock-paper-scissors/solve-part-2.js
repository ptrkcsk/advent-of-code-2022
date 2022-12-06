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

function getRoundPoints([opponent, end]) {
	let points = 0;

	switch (end) {
		case 1: {
			// Lose
			points += opponent > 1 ? opponent - 1 : 3;
			break;
		}

		case 2: {
			// Draw
			points += 3 + opponent;
			break;
		}

		case 3: {
			// Win
			points += 6;
			points += opponent < 3 ? opponent + 1 : 1;
			break;
		}

		default: {
			throw new Error('Unexpected round outcome');
		}
	}

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
