import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import CheckoutForm from '../components/checkout/CheckoutForm';

const Checkout = () => {
  const { items, totalPrice } = useCartStore();
  const { user } = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate tax (assumed 8%)
  const tax = totalPrice * 0.08;
  // Shipping cost (free over $50)
  const shipping = totalPrice > 50 ? 0 : 5.99;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center">
            <Link to="/cart" className="text-primary-600 hover:text-primary-700 mr-4 flex items-center text-sm font-medium">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Cart
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <CheckoutForm 
                subtotal={totalPrice} 
                shipping={shipping} 
                tax={tax} 
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              
              {/* Cart Items */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                {items.map((item) => (
                  <div key={item.product._id} className="flex py-3">
                    <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900 font-medium">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900 font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Tax (8%)</p>
                  <p className="text-gray-900 font-medium">${tax.toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-bold text-gray-900">
                      ${(totalPrice + shipping + tax).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact & Support */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our customer service team is available Monday-Friday, 9am-5pm ET.
              </p>
              <div className="flex items-center text-sm text-primary-600 font-medium">
                <svg
                  className="h-5 w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +1 (555) 123-4567
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;