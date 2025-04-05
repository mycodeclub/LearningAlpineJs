function menuApp() {
  return {
    menu: [
        { id: 1, name: 'Pizza', price: 12.99, image: 'https://via.placeholder.com/150?text=Pizza' },
        { id: 2, name: 'Burger', price: 8.99, image: 'https://via.placeholder.com/150?text=Burger' },
        { id: 3, name: 'Pasta', price: 10.99, image: 'https://via.placeholder.com/150?text=Pasta' },
        { id: 4, name: 'Fries', price: 4.99, image: 'https://via.placeholder.com/150?text=Fries' },
        { id: 5, name: 'Salad', price: 6.99, image: 'https://via.placeholder.com/150?text=Salad' },
        { id: 6, name: 'Soda', price: 2.99, image: 'https://via.placeholder.com/150?text=Soda' },
        { id: 7, name: 'Pizza', price: 12.99, image: 'https://via.placeholder.com/150?text=Pizza' },
        { id: 8, name: 'Burger', price: 8.99, image: 'https://via.placeholder.com/150?text=Burger' },
        { id: 9, name: 'Pasta', price: 10.99, image: 'https://via.placeholder.com/150?text=Pasta' },
        { id: 10, name: 'Fries', price: 4.99, image: 'https://via.placeholder.com/150?text=Fries' },
        { id: 11, name: 'Salad', price: 6.99, image: 'https://via.placeholder.com/150?text=Salad' },
        { id: 12, name: 'Soda', price: 2.99, image: 'https://via.placeholder.com/150?text=Soda' },
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
    decreaseQuantity(item) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
          this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
        }
      }
    },
    getItemQuantity(item) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
      return existingItem ? existingItem.quantity : 0;
    },
  };
}