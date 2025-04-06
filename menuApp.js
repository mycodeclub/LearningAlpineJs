function menuApp() {
  return {
    menu: [],
    cart: [],
    baseUrl: 'https://localhost:7028/', // Base URL for the application
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
    get subtotal() {
      return this.cart.reduce((sum, item) => sum + item.quantity * item.cost, 0);
    },
    get discount() {
      return this.subtotal * 0.1; // 10% discount
    },
    get grandTotal() {
      return this.subtotal - this.discount;
    },
    addToCart(item, pricingOption) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id && cartItem.pricingId === pricingOption.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({
          id: item.id,
          name: item.name,
          pricingId: pricingOption.id,
          quantityDesciption: pricingOption.quantityDesciption,
          cost: pricingOption.cost,
          quantity: 1
        });
      }
    },
    decreaseQuantity(item, pricingOption) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id && cartItem.pricingId === pricingOption.id);
      if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
          this.cart = this.cart.filter(cartItem => !(cartItem.id === item.id && cartItem.pricingId === pricingOption.id));
        }
      }
    },
    getItemQuantity(item, pricingOption) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id && cartItem.pricingId === pricingOption.id);
      return existingItem ? existingItem.quantity : 0;
    },
  };
}