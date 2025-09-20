export interface GradientPreset {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  name: string;
}

export const BRIGHT_GRADIENT_PRESETS: GradientPreset[] = [
  // Синие градиенты
  {
    colors: ['#4facfe', '#00f2fe'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Сине-голубой',
  },
  {
    colors: ['#4facfe', '#00f2fe'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    name: 'Синий вертикальный',
  },
  {
    colors: ['#74b9ff', '#0984e3', '#a29bfe'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Сине-фиолетовый',
  },
  {
    colors: ['#0984e3', '#74b9ff', '#a29bfe'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-синий',
  },
  {
    colors: ['#74b9ff', '#0984e3', '#00b894'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Сине-зелёный',
  },
  {
    colors: ['#00b894', '#55efc4', '#74b9ff'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Зелёно-синий',
  },
  {
    colors: ['#4facfe', '#00f2fe', '#43e97b'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Тройной сине-зелёный',
  },
  {
    colors: ['#a29bfe', '#6c5ce7', '#74b9ff'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Фиолетово-синий',
  },

  // Фиолетовые градиенты
  {
    colors: ['#667eea', '#764ba2'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-фиолетовый',
  },
  {
    colors: ['#667eea', '#764ba2'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    name: 'Фиолетовый вертикальный',
  },
  {
    colors: ['#6c5ce7', '#a29bfe', '#fd79a8'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Фиолетово-розовый',
  },
  {
    colors: ['#a18cd1', '#fbc2eb'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Светло-фиолетовый',
  },
  {
    colors: ['#667eea', '#764ba2', '#f093fb'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Тройной фиолетовый',
  },
  {
    colors: ['#fd79a8', '#fdcb6e', '#6c5ce7'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Розово-фиолетовый',
  },
  {
    colors: ['#a29bfe', '#6c5ce7', '#55efc4'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Фиолетово-мятный',
  },
  {
    colors: ['#fdcb6e', '#e17055', '#6c5ce7'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Желто-фиолетовый',
  },

  // Розовые градиенты
  {
    colors: ['#f093fb', '#f5576c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Розово-красный',
  },
  {
    colors: ['#f093fb', '#f5576c'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    name: 'Розовый вертикальный',
  },
  {
    colors: ['#fa709a', '#fee140'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Розово-жёлтый',
  },
  {
    colors: ['#fa709a', '#fee140'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    name: 'Розово-жёлтый вертикальный',
  },
  {
    colors: ['#a8edea', '#fed6e3'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Мятно-розовый',
  },
  {
    colors: ['#ff9a9e', '#fecfef'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Розовый',
  },
  {
    colors: ['#fad0c4', '#ffd1ff'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Кораллово-розовый',
  },
  {
    colors: ['#fa709a', '#fee140', '#f093fb'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Тройной розово-жёлтый',
  },

  // Зеленые градиенты
  {
    colors: ['#43e97b', '#38f9d7'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Зелёно-бирюзовый',
  },
  {
    colors: ['#43e97b', '#38f9d7'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    name: 'Зеленый вертикальный',
  },
  {
    colors: ['#00b894', '#00cec9', '#55efc4'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Зелёно-мятный',
  },
  {
    colors: ['#00b894', '#55efc4', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Зелёно-жёлтый',
  },
  {
    colors: ['#55efc4', '#00b894', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Мятно-жёлтый',
  },
  {
    colors: ['#fd79a8', '#fdcb6e', '#00b894'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Розово-зелёный',
  },
  {
    colors: ['#00cec9', '#55efc4', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Бирюзово-жёлтый',
  },
  {
    colors: ['#e84393', '#fd79a8', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Ярко-розовый',
  },

  // Оранжевые градиенты
  {
    colors: ['#ff9a56', '#ff6b6b'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Оранжево-красный',
  },
  {
    colors: ['#ffecd2', '#fcb69f'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Персиково-оранжевый',
  },
  {
    colors: ['#ff6b6b', '#ee5a24', '#ff9ff3'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Красно-оранжевый',
  },
  {
    colors: ['#fdcb6e', '#e17055', '#fd79a8'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Оранжево-розовый',
  },
  {
    colors: ['#e17055', '#fdcb6e', '#fd79a8'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-оранжевый',
  },
  {
    colors: ['#ff9a56', '#ff6b6b', '#fecfef'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Тройной оранжево-розовый',
  },
  {
    colors: ['#ff7675', '#fd79a8', '#fdcb6e'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Красно-розовый',
  },
  {
    colors: ['#6c5ce7', '#a29bfe', '#fd79a8'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Фиолетово-розовый 2',
  },
];

export const DARK_GRADIENT_PRESETS: GradientPreset[] = [
  // Очень темные градиенты
  {
    colors: ['#000000', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Черный',
  },
  {
    colors: ['#000000', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    name: 'Черный вертикальный',
  },
  {
    colors: ['#000000', '#1a1a1a', '#2d3436'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-серый',
  },
  {
    colors: ['#000000', '#1a1a1a', '#2d3436', '#636e72'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-серый 4-цветный',
  },
  {
    colors: ['#000000', '#0d47a1'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-синий',
  },
  {
    colors: ['#000000', '#4a148c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-фиолетовый',
  },
  {
    colors: ['#000000', '#1b5e20'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-зелёный',
  },
  {
    colors: ['#000000', '#e65100'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-оранжевый',
  },
  {
    colors: ['#000000', '#b71c1c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-красный',
  },
  {
    colors: ['#000000', '#880e4f'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-розовый',
  },
  {
    colors: ['#1a1a1a', '#000000', '#0d47a1'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-серо-синий',
  },
  {
    colors: ['#1a1a1a', '#000000', '#4a148c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-серо-фиолетовый',
  },
  {
    colors: ['#1a1a1a', '#000000', '#1b5e20'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Тёмно-серо-зелёный',
  },
  {
    colors: ['#1a1a1a', '#000000', '#e65100'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-серо-оранжевый',
  },
  {
    colors: ['#1a1a1a', '#000000', '#b71c1c'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-серо-красный',
  },
  {
    colors: ['#1a1a1a', '#000000', '#880e4f'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-серо-розовый',
  },
  {
    colors: ['#2d3436', '#000000', '#0d47a1', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-синий 4-цветный',
  },
  {
    colors: ['#2d3436', '#000000', '#4a148c', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-фиолетовый 4-цветный',
  },
  {
    colors: ['#2d3436', '#000000', '#1b5e20', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Тёмно-зелёный 4-цветный',
  },
  {
    colors: ['#2d3436', '#000000', '#e65100', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-оранжевый 4-цветный',
  },
  {
    colors: ['#2d3436', '#000000', '#b71c1c', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-красный 4-цветный',
  },
  {
    colors: ['#2d3436', '#000000', '#880e4f', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Темно-розовый 4-цветный',
  },
  {
    colors: ['#636e72', '#2d3436', '#000000', '#1a1a1a'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Серо-черный 4-цветный',
  },
  {
    colors: ['#000000', '#0d47a1', '#4a148c', '#1b5e20'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    name: 'Чёрно-многоцветный',
  },
];
