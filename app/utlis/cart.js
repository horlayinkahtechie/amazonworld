export const CART_STORAGE_KEY = 'amazon-world-cart';

export const getCart = () => {
  if (typeof window === 'undefined') return [];
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.image,
      category: product.category,
      quantity: quantity,
      in_stock: product.in_stock,
      addedAt: new Date().toISOString()
    };
    cart.push(cartItem);
  }
  
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  return updatedCart;
};

export const updateQuantity = (productId, quantity) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    cart[itemIndex].quantity = quantity;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
  
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
  return [];
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};