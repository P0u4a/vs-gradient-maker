// Types for vscode api
type VSCode = {
    postMessage: ({ type: string, value: any }) => void;
};

declare const vscode: VSCode;

// Types for UI properties
type ColorStop = {
    color: string;
    position: number;
};

type SelectedDirection = {
    angle?: number;
};

type SelectedPosition = {
    position?: string;
};