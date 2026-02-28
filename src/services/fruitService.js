export async function getFruits(query = '') {
  const endpoint = `/api/fruits/search?q=${encodeURIComponent(query)}`
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error('Unable to load live fruits right now.')
  }

  const payload = await response.json()
  if (!payload || !Array.isArray(payload.items)) {
    throw new Error('Invalid response from fruits API')
  }

  return payload.items
}
