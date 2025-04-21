import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ChevronRight, MinusCircle, PlusCircle, ShoppingCart, Heart, Truck, RotateCcw, Shield } from 'lucide-react';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/products/ProductCard';
import { MOCK_PRODUCTS } from '../config';

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error, fetchProductById } = useProductStore();
  const { addToCart } = useCartStore();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      // For demo, we'll use mock data instead of fetching from API
      // fetchProductById(id);
    }
  }, [id]);

  // Use mock product for demo
  const mockProduct = MOCK_PRODUCTS.find(p => p._id === id) || MOCK_PRODUCTS[0];
  const displayProduct = product || mockProduct;

  const handleAddToCart = () => {
    addToCart(displayProduct, quantity);
    toast.success(`Added ${displayProduct.name} to cart!`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Product</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container-custom">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <Link to="/products" className="ml-1 text-gray-600 hover:text-gray-900 text-sm">
                    Products
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <Link 
                    to={`/products?category=${displayProduct.category}`} 
                    className="ml-1 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {displayProduct.category}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="ml-1 text-gray-500 text-sm truncate max-w-[150px] md:max-w-xs">
                    {displayProduct.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <motion.div 
              className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={displayProduct.images[selectedImage]}
                alt={displayProduct.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            {displayProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {displayProduct.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`bg-gray-100 rounded border-2 cursor-pointer aspect-square ${
                      selectedImage === index 
                        ? 'border-primary-500' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image}
                      alt={`${displayProduct.name} - Image ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-2">
                <Badge variant="secondary">{displayProduct.category}</Badge>
                {displayProduct.stock <= 5 && displayProduct.stock > 0 && (
                  <Badge variant="warning" className="ml-2">Low Stock</Badge>
                )}
                {displayProduct.stock <= 0 && (
                  <Badge variant="error" className="ml-2">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {displayProduct.name}
              </h1>
              
              <div className="flex items-center mb-4">
                {/* Star Rating */}
                {displayProduct.avgRating && (
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(displayProduct.avgRating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {displayProduct.avgRating} stars
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${displayProduct.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  + Free shipping
                </span>
              </div>
              
              <div className="prose prose-sm text-gray-700 mb-6 max-w-none">
                <p>{displayProduct.description}</p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex items-center mb-6">
                  <div className="mr-6">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        className="mx-2 w-12 text-center border-gray-300 rounded-md"
                        value={quantity}
                        min="1"
                        max={displayProduct.stock}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(displayProduct.stock, parseInt(e.target.value))))}
                      />
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setQuantity(Math.min(displayProduct.stock, quantity + 1))}
                        disabled={quantity >= displayProduct.stock}
                      >
                        <PlusCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <span className={`text-sm font-medium ${displayProduct.stock > 0 ? 'text-success-600' : 'text-error-600'}`}>
                      {displayProduct.stock > 0 
                        ? `In Stock (${displayProduct.stock} available)` 
                        : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<ShoppingCart className="h-5 w-5" />}
                    onClick={handleAddToCart}
                    disabled={displayProduct.stock <= 0}
                    className="flex-1 sm:flex-none"
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant={isFavorite ? 'danger' : 'outline'}
                    size="lg"
                    leftIcon={<Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />}
                    onClick={toggleFavorite}
                    className="flex-1 sm:flex-none"
                  >
                    {isFavorite ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm text-gray-700">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm text-gray-700">30-day returns & exchanges</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm text-gray-700">Secure checkout & 1-year warranty</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.filter(p => p._id !== id).slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;