import type { ColorMode } from "types/gradient-types";

function colorToRGB(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function colorToHSL(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = h;
  let l = h;

  if (max === min) {
    // achromatic
    h = 0;
    s = 0;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  const d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
    default:
      h = 0;
      break;
  }

  h /= 6;

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function convertColor(colorValue: string, mode: ColorMode) {
  switch (mode) {
    case "rgb":
      return colorToRGB(colorValue);
    case "hsl":
      return colorToHSL(colorValue);
    default:
      // HEX format is the default
      return colorValue;
  }
}
