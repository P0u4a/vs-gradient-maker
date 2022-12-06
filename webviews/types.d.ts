// Types for vscode api
type VSCode = {
    postMessage: ({ type: string, value: any }) => void;
}

declare const vscode: VSCode;
