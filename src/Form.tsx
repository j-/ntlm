import * as React from 'react';
import { calculatePassNT, calculatePassLM } from './ntlm';

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
		passNT: calculatePassNT(''),
		passLM: calculatePassLM(''),
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

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

	private handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value: password } = e.currentTarget;
		const passNT = calculatePassNT(password);
		const passLM = calculatePassLM(password);
		this.setState({ password, passNT, passLM });
	}
}
