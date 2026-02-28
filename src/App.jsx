import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { getMenuItems } from './services/menuService'
import { getFruits } from './services/fruitService'
import Navbar from './components/Navbar'
import BannerSection from './components/BannerSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'
import ExploreMenuSection from './components/ExploreMenuSection'
import StaticSections from './components/StaticSections'
import FollowUsSection from './components/FollowUsSection'
import FooterSection from './components/FooterSection'

function App() {
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [menuError, setMenuError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('recommended')
  const [fruitSearchTerm, setFruitSearchTerm] = useState('')
  const [fruits, setFruits] = useState([])
  const [isFruitsLoading, setIsFruitsLoading] = useState(true)
  const [fruitsError, setFruitsError] = useState('')
  const [cart, setCart] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  const loadMenu = async (queryValue = searchTerm) => {
    setIsLoading(true)
    setMenuError('')
    try {
      const data = await getMenuItems(queryValue)
      setMenuItems(data)
    } catch (error) {
      setMenuError(error instanceof Error ? error.message : 'Failed to load menu items.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      loadMenu(searchTerm)
    }, 400)

    return () => clearTimeout(timerId)
  }, [searchTerm])

  const loadFruits = async (queryValue = fruitSearchTerm) => {
    setIsFruitsLoading(true)
    setFruitsError('')
    try {
      const data = await getFruits(queryValue)
      setFruits(data)
    } catch (error) {
      setFruitsError(error instanceof Error ? error.message : 'Failed to load fruits data.')
    } finally {
      setIsFruitsLoading(false)
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      loadFruits(fruitSearchTerm)
    }, 400)

    return () => clearTimeout(timerId)
  }, [fruitSearchTerm])

  const categories = useMemo(() => {
    return ['All', ...new Set(menuItems.map((item) => item.category))]
  }, [menuItems])

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory('All')
    }
  }, [categories, activeCategory])

  const filteredMenuItems = useMemo(() => {
    const filtered = menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      return matchesSearch && matchesCategory
    })

    if (sortBy === 'price-low') {
      return [...filtered].sort((first, second) => first.price - second.price)
    }
    if (sortBy === 'price-high') {
      return [...filtered].sort((first, second) => second.price - first.price)
    }
    if (sortBy === 'rating') {
      return [...filtered].sort((first, second) => second.rating - first.rating)
    }
    return filtered
  }, [menuItems, searchTerm, activeCategory, sortBy])

  const fruitCatalogItems = useMemo(() => {
    return fruits.map((fruit) => ({
      id: `fruit-${fruit.id}`,
      name: fruit.name,
      category: 'Fruits',
      price: Math.max(79, Math.round((fruit.nutritions?.calories || 40) * 2)),
      rating: Number((4 + ((fruit.nutritions?.sugar || 5) % 1)).toFixed(1)),
    }))
  }, [fruits])

  const catalogItems = useMemo(() => {
    return [...menuItems, ...fruitCatalogItems]
  }, [menuItems, fruitCatalogItems])

  const updateCartQuantity = (itemId, delta) => {
    setOrderPlaced(false)
    setCart((previousCart) => {
      const nextQuantity = (previousCart[itemId] || 0) + delta
      if (nextQuantity <= 0) {
        const { [itemId]: _, ...restCart } = previousCart
        return restCart
      }
      return { ...previousCart, [itemId]: nextQuantity }
    })
  }

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const item = catalogItems.find((catalogItem) => String(catalogItem.id) === String(id))
        return item ? { ...item, quantity } : null
      })
      .filter(Boolean)
  }, [cart, catalogItems])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const gst = subtotal * 0.05
  const deliveryFee = cartCount > 0 ? 40 : 0
  const total = subtotal + gst + deliveryFee

  const placeOrder = () => {
    if (cartCount === 0) {
      return
    }
    setOrderPlaced(true)
    setCart({})
  }

  const buyFruitNow = (fruitId) => {
    updateCartQuantity(fruitId, 1)
    const summarySection = document.getElementById('orderSummarySection')
    if (summarySection) {
      summarySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <BannerSection />
      <WhyChooseUsSection />
      <ExploreMenuSection
        isLoading={isLoading}
        menuError={menuError}
        menuItems={filteredMenuItems}
        onRetry={loadMenu}
        categories={categories}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        cart={cart}
        onUpdateCartQuantity={updateCartQuantity}
      />
      <StaticSections
        fruits={fruits}
        isFruitsLoading={isFruitsLoading}
        fruitsError={fruitsError}
        fruitSearchTerm={fruitSearchTerm}
        onFruitSearchChange={setFruitSearchTerm}
        onRetryFruits={loadFruits}
        cart={cart}
        onBuyFruitNow={buyFruitNow}
        cartItems={cartItems}
        subtotal={subtotal}
        gst={gst}
        deliveryFee={deliveryFee}
        total={total}
        orderPlaced={orderPlaced}
        onPlaceOrder={placeOrder}
        onUpdateCartQuantity={updateCartQuantity}
      />
      <FollowUsSection />
      <FooterSection />
    </>
  )
}

export default App
