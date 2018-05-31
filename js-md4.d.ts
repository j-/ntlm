declare module 'js-md4' {
	interface MD4 {
		(message: string | string[] | Uint8Array | ArrayBuffer): string
	}

	const md4: MD4;

	export default md4;
	export { md4 as hex };
}
