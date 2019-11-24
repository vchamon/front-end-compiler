const LETTER = "[a-zA-Z]";
const NUMBER = "[0-9]";
const OPERATOR = "[+\\-*/]";
const WHITESPACE = ' ';

export function validate (codeSnippet) {
	let position = 0;

	for (let i = 0; i < codeSnippet.length;){
		switch (position) {

		case 0:
			while (i < codeSnippet.length && codeSnippet.charAt(i) === WHITESPACE) {
				i++;
			}
			if (codeSnippet.charAt(i) === '/') {
				position = 1;
				i++;
			} else if (compare(codeSnippet.charAt(i), LETTER)) {
				position = 6;
				i++;
			} else {
				return true;
			}
			break;

		case 1:
			if (codeSnippet.charAt(i) === '/') {
				position = 5;
				i++;
			} else if (codeSnippet.charAt(i) === '*') {
				position = 2;
				i++;
			} else {
				return false;
			}
			break;

		case 2: 
			while (i < codeSnippet.length && codeSnippet.charAt(i) !== '*') {
				i++;
			}
			position = 3;
			i++;
			break;

		case 3: 
			while (i < codeSnippet.length && codeSnippet.charAt(i) === '*') {
				i++;
			}
			if (codeSnippet.charAt(i) !== '/') {
				position = 2;
				i++;
			} else {
				position = 4;
				i++;

				if (emptyPosition(codeSnippet, i)) {
					return true;
				}
			}
			break;

		case 4:
			while (codeSnippet.charAt(i) === WHITESPACE) {
				i++;
			}
			if (startComment(codeSnippet, i)) {
				position = 26;
				i++;
			} else if (compare(codeSnippet.charAt(i), LETTER)) {
				position = 6;
				i++;
			} else {
				return emptyPosition(codeSnippet, i);
			}
			break;

		case 5:
			return true;

		case 6:
			while (i < codeSnippet.length && (compare(codeSnippet.charAt(i), LETTER) || compare(codeSnippet.charAt(i), NUMBER))) {
				i++;
			}
			if (codeSnippet.charAt(i) === '/') {
				position = 7;
				i++;
			} else if (codeSnippet.charAt(i) === '=') {
				position = 13;
				i++;
			} else if (codeSnippet.charAt(i) === WHITESPACE) {
				position = 9;
				i++;
			} else {
				return false;
			}
			break;

		case 7:
			if (codeSnippet.charAt(i) === '*') {
				position = 8;
				i++;
			} else {
				return false;
			}
			break;

		case 8: 
			if (codeSnippet.charAt(i) === '*') {
				i++;
				if (codeSnippet.charAt(i) === '/') {
					position = 9;
					i++;
				}
			} else {
				i++;
			}
			break;

		case 9:
			while (i < codeSnippet.length && codeSnippet.charAt(i) === WHITESPACE) {
				i++;
			}
			if (compare(codeSnippet.charAt(i), LETTER)) {
				position = 10;
				i++;
			} else if (codeSnippet.charAt(i) === '=') {
				position = 13;
				i++;
			} else if (codeSnippet.charAt(i) === '/') {
				position = 7;
				i++;
			} else {
				return false;
			}
			break;

		case 10:
			while (i < codeSnippet.length && (compare(codeSnippet.charAt(i), LETTER) || compare(codeSnippet.charAt(i), NUMBER))) {
				i++;
			}
			if (codeSnippet.charAt(i) === '=') {
				position = 13;
				i++;
			} else if (codeSnippet.charAt(i) === ',') {
				position = 11;
				i++;
			} else {
				return false;
			}
			break;

		case 11:
			while (i < codeSnippet.length && codeSnippet.charAt(i) === WHITESPACE) {
				i++;
			}
			if (compare(codeSnippet.charAt(i), LETTER)) {
				position = 10;
				i++;
			} else if (codeSnippet.charAt(i) === '/') {
				position = 21;
				i++;
			} else {
				return false;
			}
			break;

		case 12:
			if (codeSnippet.charAt(i) === '*') {
				i++;
				if (codeSnippet.charAt(i) === '/') {
					position = 11;
					i++;
				}
			} else {
				i++;
			}
			break;

		case 13: 
			while (i < codeSnippet.length && codeSnippet.charAt(i) === WHITESPACE) {
				i++;
			}
			if (codeSnippet.charAt(i) === '/') {
				position = 22;
				i++;
			} else if (compare(codeSnippet.charAt(i), LETTER)) {
				position = 15;
				i++;
			} else if (compare(codeSnippet.charAt(i), NUMBER)) {
				position = 17;
				i++;
			} else {
				return false;
			}
			break;

		case 14:
			if (codeSnippet.charAt(i) === '*') {
				i++;
				if (codeSnippet.charAt(i) === '/') {
					position = 13;
					i++;
				}
			} else {
				i++;
			}
			break;

		case 15:
			while (i < codeSnippet.length && (compare(codeSnippet.charAt(i), LETTER) || compare(codeSnippet.charAt(i), NUMBER))) {
				i++;
			}
			if (codeSnippet.charAt(i) === '/') {
				position = 23;
				i++;
			} else if (codeSnippet.charAt(i) === ';') {
				position = 4;
				i++;

				if (emptyPosition(codeSnippet, i)) {
					return true;
				}
			} else if (compare(codeSnippet.charAt(i), OPERATOR)) {
				position = 16;
				i++;
			} else if (codeSnippet.charAt(i) === WHITESPACE) {
				position = 20;
				i++;
			} else {
				return false;
			}
			break;

		case 16:
			while (i < codeSnippet.length && codeSnippet.charAt(i) === WHITESPACE) {
				i++;
			}
			if (startComment(codeSnippet, i)) {
				position = 27;
				i++;
			} else if (compare(codeSnippet.charAt(i), LETTER)) {
				position = 15;
				i++;
			} else if (compare(codeSnippet.charAt(i), NUMBER)) {
				position = 17;
				i++;
			} else {
				return false;
			}
			break;

		case 17:
			while (i < codeSnippet.length && compare(codeSnippet.charAt(i), NUMBER)) {
				i++;
			}
			if (compare(codeSnippet.charAt(i), OPERATOR)) {
				position = 16;
				i++;
			} else if (codeSnippet.charAt(i) === ';') {
				position = 4;
				i++;

				if (emptyPosition(codeSnippet, i)) {
					return true;
				}
			} else if (codeSnippet.charAt(i) === '.') {
				position = 18;
				i++;
			} else if (codeSnippet.charAt(i) === '/') {
				position = 24;
				i++;
			} else if (codeSnippet.charAt(i) === WHITESPACE) {
				position = 20;
				i++;
			} else {
				return false;
			}
			break;

		case 18: 
			while (i < codeSnippet.length && compare(codeSnippet.charAt(i), NUMBER)) {
				i++;
			}
			if (codeSnippet.charAt(i) === '/') {
				position = 24;
				i++;
			} else if (codeSnippet.charAt(i) === WHITESPACE) {
				position = 20;
				i++;
			} else if (codeSnippet.charAt(i) === ';') {
				position = 4;
				i++;

				if (emptyPosition(codeSnippet, i)) {
					return true;
				}
			} else {
				return false;
			}
			break;

		case 19:
			if (codeSnippet.charAt(i) === '*') {
				position = 25;
				i++;
			} else {
				i++;
			}
			break;

		case 20:
			while (i < codeSnippet.length && codeSnippet.charAt(i) === WHITESPACE) {
				i++;
			}
			if (codeSnippet.charAt(i) === ';') {
				position = 4;
				i++;

				if (emptyPosition(codeSnippet, i)) {
					return true;
				}
			} else if (compare(codeSnippet.charAt(i), OPERATOR)) {
				position = 16;
				i++;
			} else if (codeSnippet.charAt(i) === '/') {
				position = 24;
				i++;
			}
			break;

		case 21:
			if (codeSnippet.charAt(i) === '*') {
				position = 12;
				i++;
			} else {
				return false;
			}
			break;

		case 22:
			if (codeSnippet.charAt(i) === '*') {
				position = 14;
				i++;
			} else {
				return false;
			}
			break;

		case 23:
			if (codeSnippet.charAt(i) === '*') {
				position = 15;
				i++;
			} else {
				return false;
			}
			break;

		case 24:
			if (codeSnippet.charAt(i) === '*') {
				position = 19;
				i++;
			} else {
				return false;
			}
			break;

		case 25:
			if (codeSnippet.charAt(i) === '/') {
				position = 20;
				i++;
			} else {
				position = 19;
				i++;
			}
			break;

		case 26:
			if (endComment(codeSnippet, i)) {
				position = 4;
				i += 2;
			} else {
				i++;
			}
			break;

		case 27:
			if (endComment(codeSnippet, i)) {
				position = 16;
				i += 2;
			} else {
				i++;
			}
			break;
		}
	}
	return false;
}

function compare (character, codeSnippet) {
	return character.match(codeSnippet);
}

function emptyPosition (codeSnippet, position) {
	return (position + 1) >= codeSnippet.length;
}

function startComment(codeSnippet, i) {
	return codeSnippet.charAt(i) === '/' && (i + 1) < codeSnippet.length && codeSnippet.charAt(i + 1) === '*';
}

function endComment(codeSnippet, i) {
	return codeSnippet.charAt(i) === '*' && (i + 1) < codeSnippet.length && codeSnippet.charAt(i + 1) === '/';
}
