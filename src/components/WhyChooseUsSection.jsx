const wcuCards = [
  {
    id: 1,
    title: 'Food Service',
    description:
      'Experience fine dining at the comfort of your home. All our orders are carefully packed and arranged to give you the nothing less than perfect.',
    image: 'https://assets.ccbp.in/frontend/responsive-website/food-serve.png',
  },
  {
    id: 2,
    title: 'Fresh Food',
    description:
      'The Fresh Food group provides fresh-cut fruits and vegetables directly picked from our partner farms and farm houses so that you always get them tree to plate.',
    image: 'https://assets.ccbp.in/frontend/responsive-website/fruits-img.png',
  },
  {
    id: 3,
    title: 'Best Offers',
    description: 'Food Coupons & Offers upto ',
    offerText: '50% OFF',
    descriptionTail: ' and Exclusive Promo Codes on All Online Food Orders.',
    image: 'https://assets.ccbp.in/frontend/responsive-website/offers-img.png',
  },
]

function WhyChooseUsSection() {
  return (
    <div className="wcu-section pt-5 pb-5" id="wcuSection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="wcu-section-heading">Why Choose Us?</h1>
            <p className="wcu-section-description">
              We use both original recipes and classic versions of famous food items.
            </p>
          </div>
          {wcuCards.map((card) => (
            <div className="col-12 col-md-4" key={card.id}>
              <div className="wcu-card p-3 mb-3">
                <img src={card.image} className="wcu-card-image" alt={card.title} />
                <h1 className="wcu-card-title mt-3">{card.title}</h1>
                <p className="wcu-card-description">
                  {card.description}
                  {card.offerText && <span className="offers">{card.offerText}</span>}
                  {card.descriptionTail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUsSection
