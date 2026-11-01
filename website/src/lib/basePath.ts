const basePath = process.env.NODE_ENV === 'production'
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '/lilli')
  : '';

export function asset(path: string) {
  return `${basePath}${path}`;
}

export default basePath;
