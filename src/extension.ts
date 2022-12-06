import * as vscode from "vscode";
import { MainPanel } from "./MainPanel";

// This method is called when the command is excecuted and the extension is activated
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	let disposable = vscode.commands.registerCommand("vs-gradient-maker.launch", () => {
		MainPanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

// This method is called when the extension is deactivated
export function deactivate() {}
