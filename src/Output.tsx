import * as React from 'react';
import './Output.css';

export interface Props {
	passNT: string;
	passLM: string;
}

const Output: React.StatelessComponent<Props> = ({ passNT, passLM }) => (
	<div className="Output">
		<pre><strong>PassNT</strong>          { passNT }</pre>
		<pre><strong>PassLM</strong>          { passLM }</pre>
	</div>
);

export default Output;
