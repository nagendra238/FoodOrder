const mockMenuItems = [
  { id: 1, name: 'Ginger Chicken Fry', category: 'Starters', price: 189, rating: 4.6, image: 'https://assets.ccbp.in/frontend/responsive-website/em-ginger-fried-img.png' },
  { id: 2, name: 'Veg Crispy Bites', category: 'Starters', price: 149, rating: 4.3, image: 'https://assets.ccbp.in/frontend/responsive-website/em-veg-starters-img.png' },
  { id: 3, name: 'Sweet Corn Soup', category: 'Soups', price: 129, rating: 4.4, image: 'https://assets.ccbp.in/frontend/responsive-website/em-soup-img.png' },
  { id: 4, name: 'Grilled Sea Food Platter', category: 'Sea Food', price: 349, rating: 4.7, image: 'https://assets.ccbp.in/frontend/responsive-website/em-grilled-seafood-img.png' },
  { id: 5, name: 'Hyderabadi Biryani', category: 'Main Course', price: 269, rating: 4.8, image: 'https://assets.ccbp.in/frontend/responsive-website/em-hyderabadi-biryani-img.png' },
  { id: 6, name: 'Mushroom Noodles', category: 'Noodles', price: 199, rating: 4.5, image: 'https://assets.ccbp.in/frontend/responsive-website/em-mushroom-noodles-img.png' },
  { id: 7, name: 'Gluten Free Salad', category: 'Salads', price: 169, rating: 4.2, image: 'https://assets.ccbp.in/frontend/responsive-website/em-gluten-img.png' },
  { id: 8, name: 'Coffee Bourbon Dessert', category: 'Desserts', price: 159, rating: 4.7, image: 'https://assets.ccbp.in/frontend/responsive-website/em-coffee-bourbon-img.png' },
]

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

const shouldFail = () => {
  return false
}

export async function fetchMenuMockEndpoint() {
  await delay(700)

  if (shouldFail()) {
    throw new Error('Unable to connect to the menu service. Please try again.')
  }

  return {
    status: 200,
    data: mockMenuItems,
    message: 'Mock menu fetched successfully',
  }
}
