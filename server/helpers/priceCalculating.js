function priceCalculating (events) {
    let totalPrice = 0
    events.forEach(e => {
        totalPrice = totalPrice + e.price
    });
    return totalPrice
}

module.exports = priceCalculating