function Navbar({ cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="https://assets.ccbp.in/frontend/responsive-website/food-munch-img.png" className="food-munch-logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <a className="nav-link active" id="navItem1" href="#wcuSection">
              Why Choose Us?
            </a>
            <a className="nav-link" href="#exploreMenuSection" id="navItem2">Explore Menu</a>
            <a className="nav-link" href="#deliveryPaymentSection" id="navItem3">Delivery & Payment</a>
            <a className="nav-link" href="#followUsSection" id="navItem4">Follow Us</a>
            <a className="nav-link" href="#orderSummarySection" id="navItem5">
              Cart
              <span className="cart-badge">{cartCount}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
