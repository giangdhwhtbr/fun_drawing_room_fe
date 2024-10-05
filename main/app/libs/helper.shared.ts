export function addQueryParamsToPath(
  path: string,
  params: Record<string, any>
): string {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${path}${queryString ? '?' + queryString : ''}`;
}
