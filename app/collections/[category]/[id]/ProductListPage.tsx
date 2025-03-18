'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Star,
  Share2,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  X,
  Plus,
  Minus,
  ShoppingBag,
} from 'lucide-react';
import gsap from 'gsap';
import { collectionsData } from '@/lib/constants/Collections';
import ProductCarousel from '@/lib/components/Carousel/Carousel';
import ColorSelector from '@/lib/components/ColorSelector/ColorSelector';
import SizeSelector from '@/lib/components/SizeSelector/SizeSelector';
import PageContainer from '@/lib/components/PageContainer/PageContainer';
import Button from '@/lib/components/ui/Button';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

// Define valid categories type
type Category = keyof typeof collectionsData;

type Props = {
  category: Category;
  id: string;
};

// Define types for cart items
interface CartItem {
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

const ProductListPage = ({ category, id }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Animation refs
  const pageRef = useRef<HTMLDivElement>(null);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Find the product data
  const categoryData = collectionsData[category];
  const product = categoryData?.items.find(item => item.id === id);

  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () =>
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Toggle wishlist
  const toggleWishlist = () => setIsWishlisted(prev => !prev);

  const handleAddToCart = () => {
    if (!product) return;

    const price =
      typeof product.price === 'string'
        ? parseFloat(product.price.replace(/[^0-9.-]+/g, ''))
        : product.price;

    const newItem: CartItem = {
      name: product.name,
      size: selectedSize || (product.sizes ? product.sizes[0] : ''),
      color: selectedColor || (product.colors ? product.colors[0] : ''),
      quantity,
      price,
      image: Array.isArray(product.images) ? product.images[0] : product.images,
    };

    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

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

  const handleSocialRedirect = (platform: 'whatsapp' | 'instagram') => {
    const message = `Hi, I'm interested in ${product?.name} from Essancia Fashion!`;
    if (platform === 'whatsapp') {
      window.open(
        `https://wa.me/+918080261261?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    } else {
      window.open('https://instagram.com/essanciafashion', '_blank');
    }
  };

  // Set up animations
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered entrance animations
      const tl = gsap.timeline();

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      tl.fromTo(
        priceRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      const animateElements =
        productInfoRef.current?.querySelectorAll('.animate-in');
      if (animateElements && animateElements.length > 0) {
        tl.fromTo(
          animateElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }

      tl.fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
        '-=0.1'
      );
    }, pageRef);

    return () => ctx.revert(); // Clean up animations
  }, []);

  if (!product) {
    return (
      <PageContainer>
        <div className="text-center">Product not found</div>
      </PageContainer>
    );
  }

  // Ensure images is an array
  const productImages = Array.isArray(product.images)
    ? product.images
    : [product.images];

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
                    rounded-xl hover:bg-green-700 transition-colors font-semibold text-sm text-white"
                >
                  <FaWhatsapp size={16} />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleSocialRedirect('instagram')}
                  className="flex items-center justify-center gap-2 py-2 md:py-3 
                    bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl 
                    hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold text-sm text-white"
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

  return (
    <PageContainer>
      <div ref={pageRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/collections/${category}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-medium">
              Back to {categoryData.title}
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Images Carousel */}
          <div
            ref={imageRef}
            className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg"
          >
            <ProductCarousel images={productImages} name={product.name} />

            {/* Image indicators */}
            <div className="flex justify-center mt-4 space-x-2 pb-4">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div ref={productInfoRef} className="flex flex-col">
            <h1
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              {product.name}
            </h1>

            <div className="flex items-center mb-4 animate-in">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              {product.reviews && (
                <span className="ml-2 text-gray-600">
                  {product.reviews} review{product.reviews !== 1 ? 's' : ''}
                </span>
              )}
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-green-600 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-1"></span>
                In Stock
              </span>
            </div>

            <div ref={priceRef} className="flex items-center mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="ml-2 text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                  <span className="ml-2 text-red-600 text-sm font-medium px-2 py-1 bg-red-50 rounded">
                    {product.discount}
                  </span>
                </>
              )}
            </div>

            <div className="border-t border-gray-100 pt-6 mb-6 animate-in">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.colors && (
              <div className="mb-6 animate-in">
                <h2 className="text-black text-lg font-medium mb-3">Color</h2>
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>
            )}

            {product.sizes && (
              <div className="mb-6 animate-in">
                <h2 className="text-black text-lg font-medium mb-3">Size</h2>
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onChange={setSelectedSize}
                />
              </div>
            )}

            <div className="mb-6 animate-in">
              <h2 className="text-black text-lg font-medium mb-3">Quantity</h2>
              <div className="flex items-center border border-gray-300 rounded-md w-36">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-black flex-1 text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div
              ref={actionsRef}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button
                variant="primary"
                fullWidth
                className="flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to cart
              </Button>
              <Button variant="primary" fullWidth onClick={handleAddToCart}>
                Buy it now
              </Button>
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-md border ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-600'} hover:bg-gray-100 transition-colors`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`}
                />
              </button>
            </div>

            {/* Product benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm text-black">Free Shipping</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm text-black">2 Year Warranty</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <RotateCcw className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm text-black">30 Day Returns</span>
              </div>
            </div>

            {/* Product tabs */}
            <div className="border-t border-gray-200 pt-8 animate-in">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-4 text-sm font-medium ${
                    activeTab === 'description'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-4 px-4 text-sm font-medium ${
                    activeTab === 'features'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 px-4 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="py-6">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    {product.features ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-gray-700">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">
                        No features listed for this product.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    {product.reviews ? (
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(product.rating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-gray-700 font-medium">
                            {product.rating} out of 5
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Based on {product.reviews} review
                          {product.reviews !== 1 ? 's' : ''}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No reviews yet for this product.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between animate-in">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
              <span className="text-sm text-gray-500">SKU: {product.id}</span>
            </div>
          </div>
        </div>

        {/* Related products section could be added here */}
      </div>
      <CartDrawer />
    </PageContainer>
  );
};

export default ProductListPage;
