import * as React from 'react';
import './Input.css';

export interface Props {
	password: string;
	onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.StatelessComponent<Props> = ({ password, onChangePassword }) => (
	<div className="Input">
		<pre><label htmlFor="Input-password"><strong>Password</strong></label>        </pre>
		<input
			id="Input-password"
			type="password"
			value={password}
			onChange={onChangePassword}
			maxLength={14}
		/>
	</div>
);

export default Input;
