function menuApp() {
  return {
    menu: [],
    cart: [],
    baseUrl: 'https://localhost:7028/', // Base URL for the application
    subtotal: 0,
    discount: 0,
    grandTotal: 0,
    async fetchMenu() {
      try {
        const response = await fetch(`${this.baseUrl}api/FoodItems`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();
        this.menu = data.map(item => ({
          ...item,
          foodItemImgUrl: `${this.baseUrl}${item.foodItemImgUrl}`, // Prepend base URL to image path
          pricing: item.pricing.map(pricingOption => ({
            ...pricingOption,
            quantity: 0 // Initialize quantity for each pricing option
          }))
        }));
        console.log(this.menu); // Log the menu data to the console
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    },
    addToCart(item, pricingOption) {
      const cartItem = this.cart.find(
        (ci) => ci.id === item.id && ci.pricingOption.id === pricingOption.id
      );
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({
          id: item.id,
          name: item.name,
          pricingOption: pricingOption,
          quantity: 1,
        });
      }
      this.updateTotals();
    },
    decreaseQuantity(item, pricingOption) {
      const cartItem = this.cart.find(
        (ci) => ci.id === item.id && ci.pricingOption.id === pricingOption.id
      );
      if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity <= 0) {
          this.cart = this.cart.filter(
            (ci) => !(ci.id === item.id && ci.pricingOption.id === pricingOption.id)
          );
        }
      }
      this.updateTotals();
    },
    updateTotals() {
      this.subtotal = this.cart.reduce(
        (sum, cartItem) =>
          sum + cartItem.quantity * cartItem.pricingOption.cost,
        0
      );
      this.discount = this.calculateDiscount();
      this.grandTotal = this.subtotal - this.discount;
    },
    calculateDiscount() {
      return this.subtotal * 0.1; // 10% discount
    },
    getItemQuantity(item, pricingOption) {
      const cartItem = this.cart.find(
        (ci) => ci.id === item.id && ci.pricingOption.id === pricingOption.id
      );
      return cartItem ? cartItem.quantity : 0;
    },
  };
}