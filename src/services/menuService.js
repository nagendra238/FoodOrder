export async function getMenuItems(query = '') {
  const endpoint = `/api/foods/search?q=${encodeURIComponent(query)}`
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error('Unable to load live food data right now.')
  }

  const payload = await response.json()
  if (!payload || !Array.isArray(payload.items)) {
    throw new Error('Invalid response from live food API')
  }

  return payload.items
}
