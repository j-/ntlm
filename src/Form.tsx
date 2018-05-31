import * as React from 'react';
import { encode } from 'iconv-lite';
import { createCipheriv } from 'crypto';

const md4 = require('js-md4');
const TO_ENCODE = 'KGS!@#$%';

function passwordToKey (password: Uint8Array, key: Uint8Array) {
	key[0] =                        (password[0] >> 0);
	key[1] = ((password[0]) << 7) | (password[1] >> 1);
	key[2] = ((password[1]) << 6) | (password[2] >> 2);
	key[3] = ((password[2]) << 5) | (password[3] >> 3);
	key[4] = ((password[3]) << 4) | (password[4] >> 4);
	key[5] = ((password[4]) << 3) | (password[5] >> 5);
	key[6] = ((password[5]) << 2) | (password[6] >> 6);
	key[7] = ((password[6]) << 1);
}

export interface Props {

}

export interface State {
	password: string;
	passNT: string;
	passLM: string;
}

export default class Form extends React.Component<Props, State> {
	state: State = {
		password: '',
		passNT: '31D6CFE0D16AE931B73C59D7E0C089C0',
		passLM: 'AAD3B435B51404EEAAD3B435B51404EE',
	};

	render () {
		const { password, passNT, passLM } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Password</label><br />
					<input
						type="password"
						value={password}
						onChange={this.handleChangePassword}
						maxLength={14}
					/>
				</div>

				<br />

				<div>
					<pre><strong>PassNT</strong>          { passNT }</pre>
					<pre><strong>PassLM</strong>          { passLM }</pre>
				</div>
			</form>
		);
	}

	private calculateHashes (password: string) {
		return {
			passNT: this.calculatePassNT(password),
			passLM: this.calculatePassLM(password),
		};
	}

	private calculatePassNT (password: string) {
		return md4.hex(encode(password, 'utf-16le')).toUpperCase();
	}

	private calculatePassLM (password: string) {
		const buffLM = Buffer.alloc(14);
		buffLM.write(password.toUpperCase());
		const key1 = Buffer.alloc(8);
		passwordToKey(buffLM.slice(0, 7), key1);
		const key2 = Buffer.alloc(8);
		passwordToKey(buffLM.slice(7, 14), key2);
		const cipher1 = createCipheriv('des-ecb', key1, '').update(TO_ENCODE, 'utf8', 'hex').toString();
		const cipher2 = createCipheriv('des-ecb', key2, '').update(TO_ENCODE, 'utf8', 'hex').toString();
		return (cipher1 + cipher2).toUpperCase();
	}

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

	private handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value: password } = e.currentTarget;
		const { passNT, passLM } = this.calculateHashes(password);
		this.setState({ password, passNT, passLM });
	}
}
