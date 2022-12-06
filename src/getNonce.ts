import { nanoid } from "nanoid";
// Nonce generator to only allow specific scripts to run in webview
export function getNonce(): string {
	
	let nonce = nanoid();
	return nonce;
}