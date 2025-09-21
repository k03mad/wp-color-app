export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.floor(n)));
    const hex = clamped.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

export const isValidRgb = (r: number, g: number, b: number) => {
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
};

export const getContrastColor = (hexColor: string): string => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#FFFFFF';

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const getColorInfo = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  return { rgb };
};
