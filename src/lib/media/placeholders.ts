function createSvgPlaceholder(stops: readonly string[]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1">${stops
    .map(
      (stop, index) =>
        `<stop offset="${Math.round((index / Math.max(stops.length - 1, 1)) * 100)}%" stop-color="${stop}" />`,
    )
    .join(
      '',
    )}</linearGradient></defs><rect width="32" height="32" rx="6" fill="url(#g)"/></svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export const PROJECT_BLUR_DATA_URL = createSvgPlaceholder([
  '#f9fafb',
  '#eef2ff',
  '#dbeafe',
]);

export const BRAND_BLUR_DATA_URL = createSvgPlaceholder([
  '#f8fafc',
  '#e0f2fe',
  '#bfdbfe',
]);
