// Types for UI properties
export type ColorStop = {
  color: string;
  position: number;
};

export type SelectedDirection = {
  angle?: number;
};

export type SelectedPosition = {
  position?: string;
};

// Gradient color modes
const COLOR_MODE = {
  hex: "Hex",
  rgb: "RGB",
  hsl: "HSL",
} as const;

export type ColorMode = keyof typeof COLOR_MODE;
