import OrderSummarySection from './OrderSummarySection'

function StaticSections({
  fruits,
  isFruitsLoading,
  fruitsError,
  fruitSearchTerm,
  onFruitSearchChange,
  onRetryFruits,
  cart,
  onBuyFruitNow,
  cartItems,
  subtotal,
  gst,
  deliveryFee,
  total,
  orderPlaced,
  onPlaceOrder,
  onUpdateCartQuantity,
}) {
  const getFruitImage = (name) => `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}.png`

  return (
    <>
      <div className="healthy-food-section pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="text-center">
                <img src="https://assets.ccbp.in/frontend/responsive-website/healthy-food-plate-img.png" className="healthy-food-section-img" />
              </div>
            </div>
            <div className="col-12 col-md-8">
              <h1 className="healthy-food-section-heading">
                Fresh, Healthy, Organic, Delicious Fruits
              </h1>
              <p className="healthy-food-section-description">
                Say no to harmful chemicals and go fully organic with our range of fresh fruits and veggies. Pamper your
                body and your senses with the true and unadulterated gifts from mother nature.
              </p>
              <div className="fruits-controls mt-3">
                <input
                  className="menu-search"
                  type="text"
                  value={fruitSearchTerm}
                  placeholder="Search fruits (apple, banana, mango...)"
                  onChange={(event) => onFruitSearchChange(event.target.value)}
                />
                <button type="button" className="custom-button" onClick={() => onRetryFruits(fruitSearchTerm)}>Search</button>
              </div>
            </div>

            <div className="col-12 mt-4">
              {isFruitsLoading && <p className="menu-status">Loading live fruits dataset...</p>}

              {!isFruitsLoading && fruitsError && (
                <div className="menu-error-box">
                  <p>{fruitsError}</p>
                  <button type="button" className="custom-button" onClick={() => onRetryFruits(fruitSearchTerm)}>Retry</button>
                </div>
              )}

              {!isFruitsLoading && !fruitsError && fruits.length > 0 && (
                <div className="fruits-grid">
                  {fruits.map((fruit) => (
                    <article className="fruit-card" key={fruit.id}>
                      <img
                        src={getFruitImage(fruit.name)}
                        className="fruit-image"
                        alt={fruit.name}
                        onError={(event) => {
                          event.currentTarget.src = 'https://assets.ccbp.in/frontend/responsive-website/fruits-img.png'
                        }}
                      />
                      <h2 className="fruit-title mt-3">{fruit.name}</h2>
                      <p className="fruit-subtitle mb-1">{fruit.family} · {fruit.order}</p>
                      <p className="menu-item-meta mb-2">₹{Math.max(79, Math.round((fruit.nutritions?.calories || 40) * 2))} · ⭐ {Number((4 + ((fruit.nutritions?.sugar || 5) % 1)).toFixed(1))}</p>
                      <div className="fruit-nutrition mb-2">
                        <span>Calories {fruit.nutritions.calories}</span>
                        <span>Sugar {fruit.nutritions.sugar}g</span>
                      </div>

                      <div className="menu-action-row mt-2">
                        <button type="button" className="menu-qty-btn" onClick={() => onUpdateCartQuantity(`fruit-${fruit.id}`, -1)}>-</button>
                        <span className="menu-qty-value">{cart[`fruit-${fruit.id}`] || 0}</span>
                        <button type="button" className="menu-qty-btn" onClick={() => onUpdateCartQuantity(`fruit-${fruit.id}`, 1)}>+</button>
                      </div>

                      <div className="fruit-buy-row mt-3">
                        <button type="button" className="fruit-add-btn" onClick={() => onUpdateCartQuantity(`fruit-${fruit.id}`, 1)}>Add to Cart</button>
                        <button type="button" className="fruit-buy-btn" onClick={() => onBuyFruitNow(`fruit-${fruit.id}`)}>Buy Now</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {!isFruitsLoading && !fruitsError && fruits.length === 0 && (
                <p className="menu-status">No fruits matched your search.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="delivery-and-payment-section pt-5 pb-5" id="deliveryPaymentSection">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 order-1 order-md-2">
              <div className="text-center">
                <img src="https://assets.ccbp.in/frontend/responsive-website/delivery-payment-section-img.png" className="delivery-and-payment-section-img" />
              </div>
            </div>
            <div className="col-12 col-md-7 order-2 order-md-1">
              <h1 className="delivery-and-payment-section-heading">
                Delivery and Payment
              </h1>
              <p className="delivery-and-payment-section-description">
                Enjoy hassle-free payment with the plenitude of payment options available for you. Get live tracking and locate
                your food on a live map. It's quite a sight to see your food arrive to your door.
              </p>
              <button className="custom-button">Order Now</button>
              <div className="mt-3">
                <img src="https://assets.ccbp.in/frontend/responsive-website/visa-card-img.png" className="payment-card-img" />
                <img src="https://assets.ccbp.in/frontend/responsive-website/master-card-img.png" className="payment-card-img" />
                <img src="https://assets.ccbp.in/frontend/responsive-website/paypal-card-img.png" className="payment-card-img" />
                <img src="https://assets.ccbp.in/frontend/responsive-website/american-express-img.png" className="payment-card-img" />
              </div>
            </div>
          </div>

          <OrderSummarySection
            cartItems={cartItems}
            subtotal={subtotal}
            gst={gst}
            deliveryFee={deliveryFee}
            total={total}
            orderPlaced={orderPlaced}
            onPlaceOrder={onPlaceOrder}
            onUpdateCartQuantity={onUpdateCartQuantity}
          />
        </div>
      </div>

      <div className="thanking-customers-section pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
              <h1 className="thanking-customers-section-heading">
                Thank you for being a valuable customer to us.
              </h1>
              <p className="thanking-customers-section-description">
                We have a surprise gift for you
              </p>
              <div className="d-md-none">
                <img src="https://assets.ccbp.in/frontend/responsive-website/thanking-customers-section-img.png" className="thanking-customers-section-img" />
              </div>
              <div>
                <button type="button" className="custom-button" data-toggle="modal" data-target="#exampleModal">
                  Redeem Gift
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog mt-5">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title thanking-customers-section-modal-title" id="exampleModalLabel">
                          Gift Voucher
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <img src="https://assets.ccbp.in/frontend/responsive-website/gift-voucher-img.png" className="w-100" />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 d-none d-md-block">
              <img src="https://assets.ccbp.in/frontend/responsive-website/thanking-customers-section-img.png" className="thanking-customers-section-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StaticSections
