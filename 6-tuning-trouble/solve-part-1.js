import {readFile} from 'node:fs/promises';

const datastream = await readFile(new URL('input.txt', import.meta.url), {
	encoding: 'utf8',
});

let start = 0;
let i = 1;

while (i < datastream.length) {
	const character = datastream[i];
	const previousIndex = datastream.slice(start, i).indexOf(character);

	if (previousIndex > -1) {
		start += previousIndex + 1;
		i = start + 1;
	} else {
		if (i - start === 3) {
			console.log(i + 1);
			break;
		}

		i++;
	}
}
