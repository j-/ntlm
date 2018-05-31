import { encode } from 'iconv-lite';
import { createCipheriv } from 'crypto';
import { hex as md4 } from 'js-md4';

const TO_ENCODE = 'KGS!@#$%';

/**
 * Populate a key buffer from a password buffer for LM hash generation.
 *
 * @param password Password buffer to read from
 * @param key Key buffer to write to
 * @param i Optional offset index for password buffer
 * @param j Optional offset index for key buffer
 */
function passwordToKey (
	password: Uint8Array,
	key: Uint8Array,
	i: number = 0,
	j: number = 0,
) {
	key[j + 0] =                            (password[i + 0] >> 0);
	key[j + 1] = ((password[i + 0]) << 7) | (password[i + 1] >> 1);
	key[j + 2] = ((password[i + 1]) << 6) | (password[i + 2] >> 2);
	key[j + 3] = ((password[i + 2]) << 5) | (password[i + 3] >> 3);
	key[j + 4] = ((password[i + 3]) << 4) | (password[i + 4] >> 4);
	key[j + 5] = ((password[i + 4]) << 3) | (password[i + 5] >> 5);
	key[j + 6] = ((password[i + 5]) << 2) | (password[i + 6] >> 6);
	key[j + 7] = ((password[i + 6]) << 1);
}

export function calculatePassNT (password: string) {
	return md4(encode(password, 'utf-16le')).toUpperCase();
}

export function calculatePassLM (password: string) {
	const buffLM = Buffer.alloc(14);
	buffLM.write(password.toUpperCase());
	const key1 = Buffer.alloc(8);
	const key2 = Buffer.alloc(8);
	passwordToKey(buffLM, key1, 0);
	passwordToKey(buffLM, key2, 7);
	const cipher1 = createCipheriv('des-ecb', key1, '').update(TO_ENCODE, 'utf8', 'hex').toString();
	const cipher2 = createCipheriv('des-ecb', key2, '').update(TO_ENCODE, 'utf8', 'hex').toString();
	return (cipher1 + cipher2).toUpperCase();
}
