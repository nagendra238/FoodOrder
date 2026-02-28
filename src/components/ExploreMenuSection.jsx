function ExploreMenuSection({
  isLoading,
  menuError,
  menuItems,
  onRetry,
  categories,
  searchTerm,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortByChange,
  cart,
  onUpdateCartQuantity,
}) {
  return (
    <div className="explore-menu-section pt-5 pb-5" id="exploreMenuSection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="menu-section-heading">Explore Menu</h1>
          </div>
          <div className="col-12">
            <div className="menu-controls mb-4">
              <input
                type="text"
                className="menu-search"
                value={searchTerm}
                placeholder="Search dishes..."
                onChange={(event) => onSearchChange(event.target.value)}
              />
              <select className="menu-filter" value={activeCategory} onChange={(event) => onCategoryChange(event.target.value)}>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select className="menu-filter" value={sortBy} onChange={(event) => onSortByChange(event.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          {isLoading && (
            <div className="col-12">
              <p className="menu-status">Loading menu items...</p>
            </div>
          )}
          {!isLoading && menuError && (
            <div className="col-12">
              <div className="menu-error-box">
                <p>{menuError}</p>
                <button type="button" className="custom-button" onClick={onRetry}>Retry</button>
              </div>
            </div>
          )}
          {!isLoading && !menuError && menuItems.map((item) => (
            <div className="col-12 col-md-6 col-lg-3" key={item.id}>
              <div className="shadow menu-item-card p-3 mb-3">
                <img src={item.image} className="menu-item-image w-100" alt={item.name} />
                <h1 className="menu-card-title mb-2">{item.name}</h1>
                <p className="menu-item-meta mb-1">{item.category}</p>
                <p className="menu-item-meta mb-2">₹{item.price} · ⭐ {item.rating}</p>
                <a href="#" className="menu-item-link" onClick={(event) => event.preventDefault()}>
                  View All
                  <svg width="16px" height="16px" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="#d0b200" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                  </svg>
                </a>
                <div className="menu-action-row mt-3">
                  <button type="button" className="menu-qty-btn" onClick={() => onUpdateCartQuantity(item.id, -1)}>-</button>
                  <span className="menu-qty-value">{cart[item.id] || 0}</span>
                  <button type="button" className="menu-qty-btn" onClick={() => onUpdateCartQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
          {!isLoading && !menuError && menuItems.length === 0 && (
            <div className="col-12">
              <p className="menu-status">No dishes found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExploreMenuSection
