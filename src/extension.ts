import * as vscode from "vscode";
import { MainPanel } from "./MainPanel";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	let disposable = vscode.commands.registerCommand("vs-gradient-maker.launch", () => {
		// The code here will be executed every time this command is executed
		// Display a message box to the user
		MainPanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

// This method is called when the extension is deactivated
export function deactivate() {}
