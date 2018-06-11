import { calculatePassNT, calculatePassLM } from './ntlm';

/* https://msdn.microsoft.com/en-us/library/cc245828.aspx */
/* https://asecuritysite.com/encryption/lmhash */

describe('calculatePassNT()', () => {
	it('calculates "OLDPASSWORD"', () => {
		expect(calculatePassNT('OLDPASSWORD')).toBe('6677B2C394311355B54F25EEC5BFACF5');
	});
	it('calculates "NEWPASSWORD"', () => {
		expect(calculatePassNT('NEWPASSWORD')).toBe('256781A62031289D3C2C98C14F1EFC8C');
	});
	it('calculates "Hello world"', () => {
		expect(calculatePassNT('Hello world')).toBe('7FA55ECEFF9EE70555848D4CD6D4A83D');
	});
	it('calculates "HELLO WORLD"', () => {
		expect(calculatePassNT('HELLO WORLD')).toBe('772A31319846D91D08656A72F4CDC97B');
	});
	it('calculates "ThisLengthIs14"', () => {
		expect(calculatePassNT('ThisLengthIs14')).toBe('9DD5840A99F192F0959F5C1C18CBEEC2');
	});
	it('calculates "5char"', () => {
		expect(calculatePassNT('5char')).toBe('D85C401563D7387E15F1BA43C107255B');
	});
	it('calculates "6chars"', () => {
		expect(calculatePassNT('6chars')).toBe('414191276EEB26199973675B1EE557B2');
	});
});

describe('calculatePassLM()', () => {
	it('calculates "OLDPASSWORD"', () => {
		expect(calculatePassLM('OLDPASSWORD')).toBe('C9B81D939D6FD80CD408E6B105741864');
	});
	it('calculates "NEWPASSWORD"', () => {
		expect(calculatePassLM('NEWPASSWORD')).toBe('09EEAB5AA415D6E4D408E6B105741864');
	});
	it('calculates "Hello world"', () => {
		expect(calculatePassLM('Hello world')).toBe('6FE32EF5A435E4316F6364A9EE00A557');
	});
	it('calculates "HELLO WORLD"', () => {
		expect(calculatePassLM('HELLO WORLD')).toBe('6FE32EF5A435E4316F6364A9EE00A557');
	});
	it('calculates "ThisLengthIs14"', () => {
		expect(calculatePassLM('ThisLengthIs14')).toBe('637F3A23A9D5F5248EBE21E271794BFB');
	});
	it('calculates "5char"', () => {
		expect(calculatePassLM('5char')).toBe('9C8BDEDB514CA5D5AAD3B435B51404EE');
	});
	it('calculates "6chars"', () => {
		expect(calculatePassLM('6chars')).toBe('05341BD545D3BECDAAD3B435B51404EE');
	});
});
