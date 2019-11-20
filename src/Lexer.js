const LETRA = "[a-zA-Z]";
const NUMERO = "[0-9]";
const OPERADOR = "[+\\-*/]";
const ESPACO = ' ';

// COMPARA A LETRA DIGITADA COM O VALOR DA VARIAVEL
function compara(character, str) {
	return character.match(str);
}

//VERIFICAR POSI��O VAZIA
function posicaoVazia(trecho, posicao) {
	return (posicao + 1) >= trecho.length;
}

export function validacao(trecho) {
	let posi = 0;

	for(let i = 0; i < trecho.length;){
		switch (posi) {
		
		case 0:
			while (i < trecho.length && trecho.charAt(i) === ESPACO) {
				i++;
			}
			if (trecho.charAt(i) === '/') {
				posi = 1;
				i++;
			} else if (compara(trecho.charAt(i), LETRA)) {
				posi = 6;
				i++;
			} else {
				return true;
			}
			break;
			

		case 1:
			if (trecho.charAt(i) === '/') {
				posi = 5;
				i++;
			} else if (trecho.charAt(i) === '*') {
				posi = 2;
				i++;
			} else {
				return false;
			}
			break;
		

		case 2: 
			while (i < trecho.length && trecho.charAt(i) != '*') {
				i++;
			}
			posi = 3;
			i++;
			break;

		case 3: 
			while (i < trecho.length && trecho.charAt(i) === '*') {
				i++;
			}
			if (trecho.charAt(i) != '/') {
				posi = 2;
				i++;
			} else {
				posi = 4;
				i++;

				if (posicaoVazia(trecho, i)) {
					return true;
				}
			}
			break;
		

		case 4:
			while (trecho.charAt(i) === ESPACO) {
				i++;
			}
			if ( iniComent(trecho, i)) {
				posi = 26;
				i++;
			} else if (compara(trecho.charAt(i), LETRA)) {
				posi = 6;
				i++;
			}

			return posicaoVazia(trecho, i);

		case 5:
			return true;
			

		case 6:
			while (i < trecho.length && (compara(trecho.charAt(i), LETRA) || compara(trecho.charAt(i), NUMERO))) {
				i++;
			}
			if (trecho.charAt(i) === '/') {
				posi = 7;
				i++;
			} else if (trecho.charAt(i) === '=') {
				posi = 13;
				i++;
			} else if (trecho.charAt(i) === ESPACO) {
				posi = 9;
				i++;
			} else {
				return false;
			}
			break;
			

		case 7:
			if (trecho.charAt(i) === '*') {
				posi = 8;
				i++;
			} else {
				return false;
			}
			break;
			

		case 8: 
			if (trecho.charAt(i) === '*') {
				i++;
				if (trecho.charAt(i) === '/') {
					posi = 9;
					i++;
				}
			} else {
				i++;
			}
			break;
		

		case 9:
			while (i < trecho.length && trecho.charAt(i) === ESPACO) {
				i++;
			}
			if (compara(trecho.charAt(i), LETRA)) {
				posi = 10;
				i++;
			} else if (trecho.charAt(i) === '=') {
				posi = 13;
				i++;
			} else if (trecho.charAt(i) === '/') {
				posi = 7;
				i++;
			} else {
				return false;
			}
			break;
		

		case 10:
			while (i < trecho.length && (compara(trecho.charAt(i), LETRA) || compara(trecho.charAt(i), NUMERO))) {
				i++;
			}
			if (trecho.charAt(i) === '=') {
				posi = 13;
				i++;
			} else if (trecho.charAt(i) === ',') {
				posi = 11;
				i++;
			} else {
				return false;
			}
			break;
			

		case 11:
			while (i < trecho.length && trecho.charAt(i) === ESPACO) {
				i++;
			}
			if (compara(trecho.charAt(i), LETRA)) {
				posi = 10;
				i++;
			} else if (trecho.charAt(i) === '/') {
				posi = 21;
				i++;
			} else {
				return false;
			}
			break;
			

		case 12:
			if (trecho.charAt(i) === '*') {
				i++;
				if (trecho.charAt(i) === '/') {
					posi = 11;
					i++;
				}
			} else {
				i++;
			}
			break;

		case 13: 
			while (i < trecho.length && trecho.charAt(i) === ESPACO) {
				i++;
			}
			if (trecho.charAt(i) === '/') {
				posi = 22;
				i++;
			} else if (compara(trecho.charAt(i), LETRA)) {
				posi = 15;
				i++;
			} else if (compara(trecho.charAt(i), NUMERO)) {
				posi = 17;
				i++;
			} else {
				return false;
			}
			break;
			

		case 14:
			if (trecho.charAt(i) === '*') {
				i++;
				if (trecho.charAt(i) === '/') {
					posi = 13;
					i++;
				}
			} else {
				i++;
			}
			break;
			

		case 15:
			while (i < trecho.length && (compara(trecho.charAt(i), LETRA) || compara(trecho.charAt(i), NUMERO))) {
				i++;
			}
			if (trecho.charAt(i) === '/') {
				posi = 23;
				i++;
			} else if (trecho.charAt(i) === ';') {
				posi = 4;
				i++;

				if (posicaoVazia(trecho, i)) {
					return true;
				}
			} else if (compara(trecho.charAt(i), OPERADOR)) {
				posi = 16;
				i++;
			} else if (trecho.charAt(i) === ESPACO) {
				posi = 20;
				i++;
			} else {
				return false;
			}
			break;
			

		case 16:
			while (i < trecho.length && trecho.charAt(i) === ESPACO) {
				i++;
			}
			if ( iniComent(trecho, i)) {
				posi = 27;
				i++;
			} else if (compara(trecho.charAt(i), LETRA)) {
				posi = 15;
				i++;
			} else if (compara(trecho.charAt(i), NUMERO)) {
				posi = 17;
				i++;
			} else {
				return false;
			}
			break;
			

		case 17:
			while (i < trecho.length && compara(trecho.charAt(i), NUMERO)) {
				i++;
			}
			if (compara(trecho.charAt(i), OPERADOR)) {
				posi = 16;
				i++;
			} else if (trecho.charAt(i) === ';') {
				posi = 4;
				i++;

				if (posicaoVazia(trecho, i)) {
					return true;
				}
			} else if (trecho.charAt(i) === '.') {
				posi = 18;
				i++;
			} else if (trecho.charAt(i) === '/') {
				posi = 24;
				i++;
			} else if (trecho.charAt(i) === ESPACO) {
				posi = 20;
				i++;
			} else {
				return false;
			}
			break;
		

		case 18: 
			while (i < trecho.length && compara(trecho.charAt(i), NUMERO)) {
				i++;
			}
			if (trecho.charAt(i) === '/') {
				posi = 24;
				i++;
			} else if (trecho.charAt(i) === ESPACO) {
				posi = 20;
				i++;
			} else if (trecho.charAt(i) === ';') {
				posi = 4;
				i++;

				if (posicaoVazia(trecho, i)) {
					return true;
				}
			} else {
				return false;
			}
			break;
			

		case 19:
			if (trecho.charAt(i) === '*') {
				posi = 25;
				i++;
			} else {

				i++;
			}
			break;
			

		case 20:
			while (i < trecho.length && trecho.charAt(i) === ESPACO) {
				i++;
			}
			if (trecho.charAt(i) === ';') {
				posi = 4;
				i++;

				if (posicaoVazia(trecho, i)) {
					return true;
				}
			} else if (compara(trecho.charAt(i), OPERADOR)) {
				posi = 16;
				i++;
			} else if (trecho.charAt(i) === '/') {
				posi = 24;
				i++;
			}
			break;

		case 21:
			if (trecho.charAt(i) === '*') {
				posi = 12;
				i++;
			} else {
				return false;
			}
			break;
			

		case 22:
			if (trecho.charAt(i) === '*') {
				posi = 14;
				i++;
			} else {
				return false;
			}
			break;

		case 23:
			if (trecho.charAt(i) === '*') {
				posi = 15;
				i++;
			} else {
				return false;
			}
			break;
			
		case 24:
			if (trecho.charAt(i) === '*') {
				posi = 19;
				i++;
			} else {
				return false;
			}
			break;
			
		case 25:
			if (trecho.charAt(i) === '/') {
				posi = 20;
				i++;
			} else {
				posi = 19;
				i++;
			}
			break;
			
		case 26:
			if (fimComent(trecho, i)) {
				posi = 4;
				i += 2;
			} else {
				i++;
			}
			break;
			
		case 27:
			if (fimComent(trecho, i)) {
				posi = 16;
				i += 2;
			} else {
				i++;
			}
			break;
			
		}

	}

	return false;
}

function iniComent(trecho, i) {
	return trecho.charAt(i) === '/' && (i + 1) < trecho.length && trecho.charAt(i + 1) === '*';
}

function fimComent(trecho, i) {
	return trecho.charAt(i) === '*' && (i + 1) < trecho.length && trecho.charAt(i + 1) === '/';
}
