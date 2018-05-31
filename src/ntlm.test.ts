import { calculatePassNT, calculatePassLM } from './ntlm';

/* https://msdn.microsoft.com/en-us/library/cc245828.aspx */

describe('calculatePassNT()', () => {
	it('calculates "OLDPASSWORD"', () => {
		expect(calculatePassNT('OLDPASSWORD')).toBe('6677B2C394311355B54F25EEC5BFACF5');
	});
	it('calculates "NEWPASSWORD"', () => {
		expect(calculatePassNT('NEWPASSWORD')).toBe('256781A62031289D3C2C98C14F1EFC8C');
	});
});

describe('calculatePassLM()', () => {
	it('calculates "OLDPASSWORD"', () => {
		expect(calculatePassLM('OLDPASSWORD')).toBe('C9B81D939D6FD80CD408E6B105741864');
	});
	it('calculates "NEWPASSWORD"', () => {
		expect(calculatePassLM('NEWPASSWORD')).toBe('09EEAB5AA415D6E4D408E6B105741864');
	});
});
