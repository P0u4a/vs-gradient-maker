export function copyCss(element: HTMLTextAreaElement) : void {
    // Copy css code to clipboard
    navigator.clipboard.writeText(element.value);
    // Send a success message
    vscode.postMessage({
        type: "onInfo",
        value: "Copied CSS 🚀"
    });
}