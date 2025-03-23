'use client';
import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Minus,
  Plus,
  X,
  ShoppingBag,
} from 'lucide-react';
import Button from '../ui/Button';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

// Define types
interface CartItem {
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

interface Color {
  name: string;
  class: string;
}

interface SizeImages {
  [key: string]: string[];
}

const ProductDetails = () => {
  const sizes: string[] = ['1', '2', '3', '4', '5'];

  const colors: Color[] = [
    { name: 'Bright Pink', class: 'bg-[#ff0054]' },
    { name: 'Amethyst Purple', class: 'bg-[#9d4edd]' },
    { name: 'Dodger Blue', class: 'bg-[#3a86ff]' },
    { name: 'Vermilion Orange', class: 'bg-[#ff5400]' },

    { name: 'Brown', class: 'bg-[#ffbd00]' },
  ];

  const sizeImages: SizeImages = {
    '1': [
      '/images/essancia-Cloths/brand-1.1.jpeg',
      '/images/essancia-Cloths/brand-1.2.jpeg',
      '/images/essancia-Cloths/brand-1.3.jpeg',
      '/images/essancia-Cloths/brand-5.jpeg',
      '/images/essancia-Cloths/brand-9.jpeg',
      '/images/essancia-Cloths/brand-11.jpeg',
      '/images/essancia-Cloths/brand-12.jpeg',
    ],
    '2': [
      '/images/productDetails/product-detail-men-1.jpeg',
      '/images/productDetails/product-detail-men-2.jpeg',
    ],
    '3': [
      '/images/productDetails/product-detail-women-1.jpeg',
      '/images/productDetails/product-detail-women-2.jpeg',
    ],
    '4': [
      '/images/productDetails/product-detail-men-hoodie-1.jpeg',
      '/images/productDetails/product-detail-men-hoodie-2.jpeg',
    ],
    '5': [
      '/images/productDetails/product-detail-men-5.jpeg',
      '/images/productDetails/product-detail-men-6.jpeg',
    ],
    '6': [
      '/images/productDetails/product-detail-women-5.jpg',
      '/images/productDetails/product-detail-women-3.jpg',
    ],
  };

  const products = [
    {
      id: 1,
      title: 'Essancia Collection: Elevate Your Style',
      price: 2999.0,
      originalPrice: 3499.0,
      discount: '20% OFF',
      description:
        'Elevate your wardrobe with a stunning collection. Crafted from premium fabric for all-day comfort and style.',
    },
    {
      id: 2,
      title: 'Urban Chic: Redefine Fashion',
      price: 2499.0,
      originalPrice: 2999.0,
      discount: '17% OFF',
      description:
        'Step into urban elegance with our exclusive designs, perfect for casual and formal occasions.',
    },
    {
      id: 3,
      title: 'Vintage Vibes: Classic Elegance',
      price: 1999.0,
      originalPrice: 2599.0,
      discount: '23% OFF',
      description:
        'Relive the golden era of fashion with our timeless, elegant, and vintage inspired pieces.',
    },
    {
      id: 4,
      title: 'Minimalist Collection: Sleek and Stylish',
      price: 1799.0,
      originalPrice: 2299.0,
      discount: '22% OFF',
      description:
        'Simplicity meets sophistication in our minimalist collection, perfect for modern-day styling.',
    },
    {
      id: 5,
      title: 'Bold Statements: Be Unapologetically You',
      price: 3999.0,
      originalPrice: 4999.0,
      discount: '20% OFF',
      description:
        'Stand out in bold prints and striking designs, crafted for those who dare to be different.',
    },
  ];

  const handleQuantityChange = (action: 'increment' | 'decrement'): void => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleImageNavigation = (direction: 'next' | 'prev'): void => {
    const currentImages = sizeImages[selectedSize];
    if (direction === 'next' && currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const handleAddToCart = (): void => {
    const newItem: CartItem = {
      name: selectedProduct.title,
      size: selectedSize,
      color: selectedColor,
      quantity,
      price: selectedProduct.price,
      image: sizeImages[selectedSize][0],
    };
    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleSocialRedirect = (platform: 'whatsapp' | 'instagram') => {
    const message = `Hi, I'm interested in customizing a ${selectedProduct} from Essancia Fashion!`;
    if (platform === 'whatsapp') {
      window.open(
        `https://wa.me/+918080261261?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    } else {
      window.open('https://instagram.com/essanciafashion', '_blank');
    }
  };

  // Size guide data
  const sizeChartData = {
    inches: [
      { size: 'S', chest: 46, toFitChest: 38, shoulder: 24, length: 26.5 },
      { size: 'M', chest: 48, toFitChest: 40, shoulder: 25, length: 27.5 },
      { size: 'L', chest: 50, toFitChest: 42, shoulder: 26, length: 28.5 },
      { size: 'XL', chest: 52, toFitChest: 44, shoulder: 27, length: 29 },
      { size: 'XXL', chest: 54, toFitChest: 46, shoulder: 28, length: 29.5 },
      { size: 'XXXL', chest: 56, toFitChest: 48, shoulder: 29, length: 30 },
    ],
    cms: [
      { size: 'S', chest: 117, toFitChest: 97, shoulder: 61, length: 67 },
      { size: 'M', chest: 122, toFitChest: 102, shoulder: 64, length: 70 },
      { size: 'L', chest: 127, toFitChest: 107, shoulder: 66, length: 72 },
      { size: 'XL', chest: 132, toFitChest: 112, shoulder: 69, length: 74 },
      { size: 'XXL', chest: 137, toFitChest: 117, shoulder: 71, length: 75 },
      { size: 'XXXL', chest: 142, toFitChest: 122, shoulder: 74, length: 76 },
    ],
  };

  const SizeGuideModal = () => (
    <div
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-opacity duration-300 ${isSizeGuideOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 text-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Size Guide</h2>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-4 flex justify-end">
            <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
              <button
                onClick={() => setMeasurementUnit('inches')}
                className={`px-4 py-2 text-sm ${measurementUnit === 'inches' ? 'bg-gray-100 font-medium' : 'bg-white'}`}
              >
                Inches
              </button>
              <button
                onClick={() => setMeasurementUnit('cms')}
                className={`px-4 py-2 text-sm ${measurementUnit === 'cms' ? 'bg-gray-100 font-medium' : 'bg-white'}`}
              >
                Cms
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left border-b border-gray-200">
                    Size
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">
                    Chest
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">
                    To Fit Chest
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">
                    Shoulder
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">
                    Length
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeChartData[measurementUnit].map(row => (
                  <tr key={row.size} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.size}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.chest}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.toFitChest}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.shoulder}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const handleRemoveFromCart = (indexToRemove: number) => {
    setCartItems(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const CartDrawer = () => (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-gray-800" />
              <span className="text-xl font-medium text-gray-900">
                Shopping Cart
              </span>
              <span className="text-sm text-gray-700">
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-700 mb-6">
                Add items to your cart to checkout
              </p>
              <Button variant="primary" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative w-24 h-32 bg-white rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-700 mb-2">
                            Size: {item.size} / Color: {item.color}
                          </p>
                          <p className="font-medium text-gray-900">
                            ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(index)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(index, item.quantity - 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-700"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(index, item.quantity + 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-700"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ₹
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-medium text-gray-900">
                    Calculated at checkout
                  </span>
                </div>
                <div className="flex justify-between text-base pt-4 border-t border-gray-200">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">
                    ₹
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
              <Button variant="primary" fullWidth className="mb-3" disabled>
                Proceed to Checkout
              </Button>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  onClick={() => handleSocialRedirect('whatsapp')}
                  className="flex items-center justify-center gap-2 py-2 md:py-3 bg-green-600 
                    rounded-xl hover:bg-green-700 transition-colors font-semibold text-sm"
                >
                  <FaWhatsapp size={16} />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleSocialRedirect('instagram')}
                  className="flex items-center justify-center gap-2 py-2 md:py-3 
                    bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl 
                    hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold text-sm"
                >
                  <FaInstagram size={16} />
                  Instagram
                </button>
              </div>

              <button
                className="w-full text-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('1');
  const [selectedColor, setSelectedColor] = useState<string>('Pale Taupe');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [measurementUnit, setMeasurementUnit] = useState<'inches' | 'cms'>(
    'inches'
  );
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  // Update selected product when size changes
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setCurrentImageIndex(0);

    // Convert size string to number and subtract 1 to get the index (since sizes are "1", "2", etc.)
    const productIndex = parseInt(size) - 1;

    // Make sure the index is valid
    if (productIndex >= 0 && productIndex < products.length) {
      setSelectedProduct(products[productIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-600">/</span>
            </li>
            <li>
              <a
                href="/collections"
                className="text-gray-700 hover:text-gray-900"
              >
                Fashion
              </a>
            </li>
            <li>
              <span className="text-gray-600">/</span>
            </li>
            <a
              href="/collections"
              className="text-gray-700 hover:text-gray-900"
            >
              Collections
            </a>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
              {sizeImages[selectedSize].map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 
                    ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img
                    src={img}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Navigation Controls */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
                <button
                  onClick={() => handleImageNavigation('prev')}
                  className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full shadow-xl  
                    disabled:opacity-50 transition-all hover:scale-110 disabled:hover:scale-100"
                  disabled={currentImageIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleImageNavigation('next')}
                  className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full shadow-xl 
                    disabled:opacity-50 transition-all hover:scale-110 disabled:hover:scale-100"
                  disabled={
                    currentImageIndex === sizeImages[selectedSize].length - 1
                  }
                >
                  <ChevronRight className="w-6 h-6 " />
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-4">
              {sizeImages[selectedSize].slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden 
                    transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-gray-900 ring-offset-2'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && sizeImages[selectedSize].length > 4 && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                      <span className="text-gray-900 font-medium">
                        +{sizeImages[selectedSize].length - 4}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-8">
            {/* Product Title and Price */}
            <div className="space-y-4">
              <h1 className="text-3xl text-gray-900 font-light">
                {selectedProduct.title}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-medium text-gray-900">
                  ₹{selectedProduct.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-700 line-through">
                  ₹{selectedProduct.originalPrice.toFixed(2)}
                </span>
                <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                  {selectedProduct.discount}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-900 font-medium">
                  Essancia Collection :{' '}
                </h3>
                <button
                  className="text-sm text-gray-700 hover:text-gray-900 hover:underline"
                  onClick={() => setIsSizeGuideOpen(true)}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center 
                      border-2 transition-all
                      ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-700 text-gray-900 hover:border-gray-900'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-gray-900 font-medium">
                Color: <span className="text-gray-700">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group relative w-14 h-14 rounded-xl ${color.class} 
                      transition-transform hover:scale-105
                      ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`}
                  >
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white/50 backdrop-blur-sm" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 pt-4">
              <div className="flex gap-4">
                <div className="flex items-center border-2 border-gray-900 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 text-center text-gray-900"
                  />
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 text-white rounded-xl 
                    hover:bg-gray-800 transition-all
                    active:scale-[0.98] transform"
                >
                  Add to Cart
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 border-2 border-gray-900 text-gray-900 
                  rounded-xl hover:bg-gray-900 hover:text-white transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-200">
              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
                <span>Share this product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer />
      <SizeGuideModal />
    </div>
  );
};

export default ProductDetails;
