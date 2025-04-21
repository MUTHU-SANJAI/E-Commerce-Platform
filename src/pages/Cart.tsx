import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart } = useCartStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        </div>
      </div>

      <div className="container-custom py-8">
        {totalItems > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Cart Items ({totalItems})
                    </h2>
                    <button
                      type="button"
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </div>

                  <AnimatePresence>
                    <div className="divide-y divide-gray-200">
                      {items.map((item) => (
                        <CartItem key={item.product._id} item={item} />
                      ))}
                    </div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/products"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
                >
                  <svg
                    className="h-4 w-4 mr-1 -rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <motion.div 
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="text-gray-900 font-medium">${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Shipping</p>
                      <p className="text-gray-900 font-medium">Calculated at checkout</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Tax</p>
                      <p className="text-gray-900 font-medium">Calculated at checkout</p>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between">
                        <p className="text-base font-medium text-gray-900">Estimated Total</p>
                        <p className="text-base font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link to="/checkout">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        fullWidth 
                        rightIcon={<ArrowRight className="h-5 w-5" />}
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          // Empty Cart
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Browse our collection to find something you'll love.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;