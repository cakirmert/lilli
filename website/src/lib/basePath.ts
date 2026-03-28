const basePath = process.env.NODE_ENV === 'production'
  ? `/${process.env.NEXT_PUBLIC_REPO_NAME || 'lilli'}`
  : '';

export function asset(path: string) {
  return `${basePath}${path}`;
}

export default basePath;
