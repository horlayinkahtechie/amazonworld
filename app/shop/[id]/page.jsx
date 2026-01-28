"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import products from "../../data/Products";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    } else {
      router.push("/shop");
    }
  }, [productId, router]);

  // Cart management functions
  const getCartFromStorage = () => {
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("amazon-world-cart");
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  };

  const saveCartToStorage = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("amazon-world-cart", JSON.stringify(cart));
    }
  };

  const addToCart = (product, quantity) => {
    const cart = getCartFromStorage();

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        category: product.category,
        quantity: quantity,
        in_stock: product.in_stock,
        addedAt: new Date().toISOString(),
      };
      cart.push(cartItem);
    }

    saveCartToStorage(cart);
    return cart;
  };

  const handleAddToCart = () => {
    if (!selectedProduct.in_stock) return;

    setIsAddingToCart(true);

    try {
      const updatedCart = addToCart(selectedProduct, quantity);

      // Show success feedback
      const cartItem = updatedCart.find(
        (item) => item.id === selectedProduct.id,
      );

      alert(
        `${quantity} ${selectedProduct.title} added to cart! Total in cart: ${cartItem.quantity}`,
      );

      // Optional: You could trigger a custom event to update cart counter in other components
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", path: "/", id: 1 },
    { name: "Categories", path: "/shop", id: 2 },
    {
      name: selectedProduct.category,
      id: 3,
      path: `/shop?category=${selectedProduct.category}`,
    },
    { name: selectedProduct.title, path: "#", id: 4 },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <div key={item.id} className="flex items-center">
                <a
                  href={item.path}
                  className={`${index === breadcrumbs.length - 1 ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}`}
                >
                  {item.name}
                </a>
                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2 text-gray-400">/</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="border border-gray-200 rounded-2xl p-8 bg-gray-50 flex items-center justify-center min-h-[500px]">
              <img
                src={selectedProduct.images[selectedImage]}
                alt={selectedProduct.title}
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {selectedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 h-24 border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? "border-blue-600 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${selectedProduct.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            {/* Category and Title */}
            <div>
              <div className="text-sm uppercase tracking-widest text-blue-600 font-bold mb-2">
                {selectedProduct.category}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {selectedProduct.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center">
              <span className="text-5xl font-bold text-gray-900">
                ₦{selectedProduct.price.toLocaleString()}
              </span>
              {selectedProduct.in_stock ? (
                <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedProduct.specifications).map(
                  ([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-3">
                      <div className="text-sm text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                    disabled={quantity <= 1}
                  >
                    <span className="text-xl">-</span>
                  </button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                    disabled={quantity >= 10}
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.in_stock || isAddingToCart}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                    selectedProduct.in_stock && !isAddingToCart
                      ? "bg-black text-white hover:bg-gray-800 transform hover:scale-[1.02]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Adding...
                    </>
                  ) : selectedProduct.in_stock ? (
                    "Add to Cart"
                  ) : (
                    "Out of Stock"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
