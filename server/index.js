import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const buildPriceFromId = (id) => {
  const base = Number(String(id).slice(-2)) || 50
  return 120 + (base % 180)
}

const buildRatingFromId = (id) => {
  const base = Number(String(id).slice(-1)) || 0
  return Number((3.8 + (base * 0.12)).toFixed(1))
}

const normalizeMeal = (meal) => ({
  id: Number(meal.idMeal),
  name: meal.strMeal,
  category: meal.strCategory || 'Special',
  area: meal.strArea || 'Global',
  image: meal.strMealThumb,
  sourceUrl: meal.strSource || meal.strYoutube || '',
  price: buildPriceFromId(meal.idMeal),
  rating: buildRatingFromId(meal.idMeal),
})

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, message: 'FoodMunch API is running' })
})

app.get('/api/foods/search', async (req, res) => {
  const query = String(req.query.q || '').trim()
  const safeQuery = query.length > 0 ? query : 'chicken'

  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(safeQuery)}`
    const response = await fetch(url)

    if (!response.ok) {
      return res.status(502).json({ error: 'Live food provider is temporarily unavailable.' })
    }

    const payload = await response.json()
    const meals = Array.isArray(payload.meals) ? payload.meals : []
    const items = meals.map(normalizeMeal)

    return res.status(200).json({
      query,
      count: items.length,
      items,
    })
  } catch (_error) {
    return res.status(500).json({ error: 'Failed to fetch live food data. Please try again.' })
  }
})

const normalizeFruit = (fruit) => ({
  id: fruit.id,
  name: fruit.name,
  family: fruit.family,
  order: fruit.order,
  genus: fruit.genus,
  nutritions: {
    carbohydrates: fruit.nutritions?.carbohydrates ?? 0,
    protein: fruit.nutritions?.protein ?? 0,
    fat: fruit.nutritions?.fat ?? 0,
    calories: fruit.nutritions?.calories ?? 0,
    sugar: fruit.nutritions?.sugar ?? 0,
  },
})

app.get('/api/fruits/search', async (req, res) => {
  const query = String(req.query.q || '').trim().toLowerCase()

  try {
    const response = await fetch('https://www.fruityvice.com/api/fruit/all')

    if (!response.ok) {
      return res.status(502).json({ error: 'Live fruits provider is temporarily unavailable.' })
    }

    const fruits = await response.json()
    const normalizedFruits = Array.isArray(fruits) ? fruits.map(normalizeFruit) : []

    const items = query.length > 0
      ? normalizedFruits.filter((fruit) => fruit.name.toLowerCase().includes(query))
      : normalizedFruits.slice(0, 24)

    return res.status(200).json({
      query,
      count: items.length,
      items,
    })
  } catch (_error) {
    return res.status(500).json({ error: 'Failed to fetch live fruits data. Please try again.' })
  }
})

app.listen(PORT, () => {
  console.log(`FoodMunch API server running on http://localhost:${PORT}`)
})
