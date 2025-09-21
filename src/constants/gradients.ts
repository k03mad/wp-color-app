export interface GradientPreset {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export const BRIGHT_GRADIENT_PRESETS: GradientPreset[] = [
  {
    colors: ['#4facfe', '#00f2fe'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#4facfe', '#00f2fe'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  {
    colors: ['#74b9ff', '#0984e3', '#a29bfe'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#0984e3', '#74b9ff', '#a29bfe'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#74b9ff', '#0984e3', '#00b894'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#00b894', '#55efc4', '#74b9ff'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#4facfe', '#00f2fe', '#43e97b'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#a29bfe', '#6c5ce7', '#74b9ff'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  {
    colors: ['#667eea', '#764ba2'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#667eea', '#764ba2'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  {
    colors: ['#6c5ce7', '#a29bfe', '#fd79a8'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#a18cd1', '#fbc2eb'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#667eea', '#764ba2', '#f093fb'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#fd79a8', '#fdcb6e', '#6c5ce7'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#a29bfe', '#6c5ce7', '#55efc4'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#fdcb6e', '#e17055', '#6c5ce7'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  {
    colors: ['#f093fb', '#f5576c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#f093fb', '#f5576c'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  {
    colors: ['#fa709a', '#fee140'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#fa709a', '#fee140'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  {
    colors: ['#a8edea', '#fed6e3'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#ff9a9e', '#fecfef'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#fad0c4', '#ffd1ff'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#fa709a', '#fee140', '#f093fb'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  {
    colors: ['#43e97b', '#38f9d7'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#43e97b', '#38f9d7'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  {
    colors: ['#00b894', '#00cec9', '#55efc4'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#00b894', '#55efc4', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#55efc4', '#00b894', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#fd79a8', '#fdcb6e', '#00b894'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#00cec9', '#55efc4', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#e84393', '#fd79a8', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  {
    colors: ['#ff9a56', '#ff6b6b'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#ffecd2', '#fcb69f'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#ff6b6b', '#ee5a24', '#ff9ff3'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#fdcb6e', '#e17055', '#fd79a8'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#e17055', '#fdcb6e', '#fd79a8'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#ff9a56', '#ff6b6b', '#fecfef'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#ff7675', '#fd79a8', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#6c5ce7', '#a29bfe', '#fd79a8'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
];

export const DARK_GRADIENT_PRESETS: GradientPreset[] = [
  {
    colors: ['#000000', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  {
    colors: ['#000000', '#1a1a1a', '#2d3436'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#1a1a1a', '#2d3436', '#636e72'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#0d47a1'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#4a148c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#1b5e20'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#e65100'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#b71c1c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#880e4f'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#1a1a1a', '#000000', '#0d47a1'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#1a1a1a', '#000000', '#4a148c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#1a1a1a', '#000000', '#1b5e20'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#1a1a1a', '#000000', '#e65100'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#1a1a1a', '#000000', '#b71c1c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#1a1a1a', '#000000', '#880e4f'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#2d3436', '#000000', '#0d47a1', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#2d3436', '#000000', '#4a148c', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#2d3436', '#000000', '#1b5e20', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#2d3436', '#000000', '#e65100', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#2d3436', '#000000', '#b71c1c', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#2d3436', '#000000', '#880e4f', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#636e72', '#2d3436', '#000000', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    colors: ['#000000', '#0d47a1', '#4a148c', '#1b5e20'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
];
