export function copyCss(element: HTMLTextAreaElement) : void {
    navigator.clipboard.writeText(element.value);
    vscode.postMessage({
        type: "onInfo",
        value: "Copied CSS 🚀"
    });
}