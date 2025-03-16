'use client';
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaWhatsapp, FaInstagram, FaTshirt, FaUpload } from 'react-icons/fa';
import { MdStyle, MdTextFields, MdColorLens } from 'react-icons/md';
import ProductViewer from '@/lib/components/3DProductViewer/ProductViewer';

gsap.registerPlugin(ScrollTrigger);

const CustomizePage = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    'tshirt' | 'hoodie' | 'sweatshirt'
  >('tshirt');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedSize, setSelectedSize] = useState('M');
  const [customText, setCustomText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const products = [
    { id: 'tshirt', name: 'T-Shirt', price: 449 },
    { id: 'hoodie', name: 'Hoodie', price: 669 },
    { id: 'sweatshirt', name: 'Sweatshirt', price: 559 },
  ];

  const colors = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#808080',
    '#800000',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Log file details
      console.log('File selected:', {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type. Please upload an image.');
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          console.log(
            'Logo loaded successfully, data URL length:',
            result.length
          );
          setLogo(result);
        }
      };
      reader.onerror = error => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(file);
    }
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

  useEffect(() => {
    // Animate sections
    const sections = document.querySelectorAll('.animate-section');

    gsap.from(sections, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.customize-container',
        start: 'top center',
      },
    });

    // Animate controls
    gsap.from('.control-item', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.controls-container',
        start: 'top 80%',
      },
    });

    // Set loading to false after component mounts
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header Section - Reduced text sizes */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 
            bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
          >
            Design Your Perfect Style
          </h1>
          <p className="text-gray-900 text-center max-w-2xl mx-auto text-base md:text-lg font-medium">
            Create your unique design with our advanced customization tools.
            Preview in real-time and bring your vision to life.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Mobile-first order of sections */}
          <div className="lg:order-1 order-2">
            {/* Preview Section */}
            <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-xl border border-gray-200">
                {isLoading ? (
                  <div className="aspect-square flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                ) : (
                  <ProductViewer
                    productType={selectedProduct}
                    color={selectedColor}
                    logo={logo || undefined}
                    customText={customText}
                    textColor={textColor}
                  />
                )}
              </div>
              <div className="bg-gray-900 rounded-xl p-4 md:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Total Price
                    </h3>
                    <p className="text-sm md:text-base text-white/80">
                      Including customization
                    </p>
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold">
                    ₹
                    {products
                      .find(p => p.id === selectedProduct)
                      ?.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Controls - Reordered for mobile */}
          <div className="lg:order-1 order-2 space-y-4 md:space-y-6">
            {/* Color Selection - Moved to top for mobile */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <MdColorLens className="text-xl md:text-2xl text-gray-900" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  Choose Color
                </h2>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg transition-all hover:scale-110 
                      ${selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Product Selection - Moved below color for mobile */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <FaTshirt className="text-xl md:text-2xl text-gray-900" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  Choose Product
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {products.map(product => (
                  <button
                    key={product.id}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => setSelectedProduct(product.id as any)}
                    className={`text-black p-3 md:p-2 rounded-xl border-2  transition-all ${
                      selectedProduct === product.id
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    <span className="block text-sm md:text-base font-semibold mb-1">
                      {product.name}
                    </span>
                    <span className="block text-xs md:text-sm opacity-80">
                      ₹{product.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <MdStyle className="text-xl md:text-2xl text-gray-900" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  Choose Size
                </h2>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-black p-3 md:p-2 rounded-xl border-2 transition-all ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Upload */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <FaUpload className="text-xl md:text-2xl text-gray-900" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  Upload Logo
                </h2>
              </div>
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl hover:border-gray-900
                    transition-all text-gray-900 hover:text-gray-900 font-semibold"
                >
                  {logo ? 'Change Logo' : 'Upload Logo'}
                </button>
                {logo && (
                  <button
                    onClick={() => setLogo(null)}
                    className="w-full p-3 text-red-600 hover:text-red-700 transition-colors font-semibold"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
            </div>

            {/* Custom Text */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <MdTextFields className="text-xl md:text-2xl text-gray-900" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  Add Custom Text
                </h2>
              </div>
              <input
                type="text"
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-gray-900 
                  focus:ring-1 focus:ring-gray-900 mb-4 font-medium text-gray-900"
                placeholder="Enter your text here"
              />
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-full h-12 p-1 border-2 border-gray-300 rounded-xl cursor-pointer"
              />
            </div>

            {/* Contact Section */}
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 text-white">
              <h2 className="text-lg md:text-xl font-bold mb-3">
                Ready to Order?
              </h2>
              <p className="mb-4 text-sm md:text-base text-white/90">
                Contact us through WhatsApp or Instagram to place your order and
                discuss any custom requirements.
              </p>
              <div className="grid grid-cols-2 gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
