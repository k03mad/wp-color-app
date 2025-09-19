export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToCmyk = (r: number, g: number, b: number) => {
  const rPercent = r / 255;
  const gPercent = g / 255;
  const bPercent = b / 255;

  const k = 1 - Math.max(rPercent, gPercent, bPercent);
  const c = k === 1 ? 0 : (1 - rPercent - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - gPercent - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - bPercent - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };
};

export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

export const getColorInfo = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return { rgb, cmyk, hsl };
};
