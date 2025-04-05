function menuApp() {
  return {
    menu: [
      { id: 1, name: 'Pizza', price: 12.99 },
      { id: 2, name: 'Burger', price: 8.99 },
      { id: 3, name: 'Pasta', price: 10.99 },
    ],
    cart: [],
    get subtotal() {
      return this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    },
    get discount() {
      return this.subtotal * 0.1; // 10% discount
    },
    get grandTotal() {
      return this.subtotal - this.discount;
    },
    addToCart(item) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
    updateCart(index) {
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
  };
}