function OrderSummarySection({
  cartItems,
  subtotal,
  gst,
  deliveryFee,
  total,
  orderPlaced,
  onPlaceOrder,
  onUpdateCartQuantity,
}) {
  return (
    <div className="order-summary-section pt-5 pb-5" id="orderSummarySection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="menu-section-heading">Order Summary</h1>
          </div>
          <div className="col-12">
            <div className="order-summary-card">
              <div className="order-summary-header">
                <p className="order-summary-subtitle mb-0">Review items, adjust quantities, and place your order.</p>
              </div>

              {cartItems.length === 0 ? (
                <div className="order-empty-state">
                  <h2 className="order-empty-title">Your cart is empty</h2>
                  <p className="menu-status mb-0">Add dishes from Explore Menu to see your bill here.</p>
                </div>
              ) : (
                <>
                  <div className="order-items-list">
                    {cartItems.map((item) => (
                      <div className="order-item" key={item.id}>
                        <div>
                          <h1 className="order-item-title">{item.name}</h1>
                          <p className="order-item-meta">₹{item.price} each</p>
                        </div>
                        <div className="menu-action-row mt-0">
                          <button type="button" className="menu-qty-btn" onClick={() => onUpdateCartQuantity(item.id, -1)}>-</button>
                          <span className="menu-qty-value">{item.quantity}</span>
                          <button type="button" className="menu-qty-btn" onClick={() => onUpdateCartQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bill-summary-card">
                    <div className="bill-line"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                    <div className="bill-line"><span>GST (5%)</span><span>₹{gst.toFixed(2)}</span></div>
                    <div className="bill-line"><span>Delivery Fee</span><span>₹{deliveryFee.toFixed(2)}</span></div>
                    <div className="bill-line bill-total"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                    <button type="button" className="custom-button place-order-btn" onClick={onPlaceOrder}>Place Order</button>
                  </div>
                </>
              )}
              {orderPlaced && <p className="order-success mt-3 mb-0">Order placed successfully. Enjoy your meal!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummarySection
