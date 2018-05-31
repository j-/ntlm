import * as React from 'react';
import { calculatePassNT, calculatePassLM } from './ntlm';
import Output from './Output';
import './Form.css';

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
			<form className="Form" onSubmit={this.handleSubmit}>
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

				<Output passNT={passNT} passLM={passLM} />
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
