import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class MainPanel {
    
    // Track the current panel to only allow a single panel to exist at a time.
    public static currentPanel: MainPanel | undefined;

    public static readonly viewType = "main";

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If panel exists, show it.
        if (MainPanel.currentPanel) {
            MainPanel.currentPanel._panel.reveal(column);
            MainPanel.currentPanel._update();
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            MainPanel.viewType,
            "Gradient Maker",
            column || vscode.ViewColumn.One,
            {
                // Enable javascript in the webview
                enableScripts: true,

                // Persist webview state
                retainContextWhenHidden: true,

                // Restrict the webview to only load content from our extension's "media" directory.
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, "media"),
                    vscode.Uri.joinPath(extensionUri, "out/compiled"),
                ],
            }
        );

        MainPanel.currentPanel = new MainPanel(panel, extensionUri);
    }

    public static kill() {
        MainPanel.currentPanel?.dispose();
        MainPanel.currentPanel = undefined;
    }

    public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        MainPanel.currentPanel = new MainPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public dispose() {
        MainPanel.currentPanel = undefined;

        // Clean up resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private async _update() {
        const webview = this._panel.webview;

        this._panel.webview.html = this._getHtmlForWebview(webview);
        webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        //  Uri to load the main script in the webview
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "out/compiled", "makeGradient.js")
        );

        const styleMainUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "out/compiled", "makeGradient.css")
        );

        // Uri to load styles into webview from local path
        const styleVSCodeUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
        );

        const styleInterfaceUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "interface.css")
        );

        const stylesResetUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri,"media","reset.css")
        );

        // Use a nonce to only allow specific scripts to be run
        const nonce = getNonce();

        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
                -->
                <meta http-equiv="Content-Security-Policy" content="; img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="${stylesResetUri}" rel="stylesheet">
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <link href="${styleInterfaceUri}" rel="stylesheet">
                <script defer src="${scriptUri}"  nonce="${nonce}">
                </script>
                <script nonce="${nonce}">
                    const vscode = acquireVsCodeApi();
                </script>
			</head>
            <body>
	        </body>
		    </html>`;
    }
}