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


export function generateRandomUserProfile() {
  const randomId = Math.floor(Math.random() * 100) + 1;
  const gender = Math.random() < 0.5 ? 'men' : 'women';
  
  return `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
}
