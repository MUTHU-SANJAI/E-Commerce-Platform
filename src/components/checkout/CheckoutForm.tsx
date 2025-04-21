import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import axios from 'axios';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import { API_URL } from '../../config';

type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
};

const CheckoutForm = ({ subtotal, shipping = 5.99, tax }: { subtotal: number; shipping?: number; tax: number }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { items, clearCart, setShippingAddress, setPaymentMethod: setCartPaymentMethod } = useCartStore();
  const { user, token } = useAuthStore();

  const totalAmount = subtotal + shipping + tax;

  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };

  const onSubmit = async (data: FormData) => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Save shipping address to cart store
      const shippingAddress = {
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      };
      
      setShippingAddress(shippingAddress);
      setCartPaymentMethod(paymentMethod);

      // In a real application, we would create a payment intent on the server
      // and confirm the payment with Stripe
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        toast.error('Card information is required');
        setIsProcessing(false);
        return;
      }

      // Mock API call for demo purposes
      // In a real application, you would create a payment intent and confirm the payment
      // const response = await axios.post(
      //   `${API_URL}/orders`,
      //   {
      //     items: items.map(item => ({
      //       product: item.product._id,
      //       quantity: item.quantity,
      //       price: item.product.price,
      //     })),
      //     shippingAddress,
      //     paymentMethod,
      //     itemsPrice: subtotal,
      //     taxPrice: tax,
      //     shippingPrice: shipping,
      //     totalPrice: totalAmount,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // Simulate successful payment
      setTimeout(() => {
        toast.success('Payment successful!');
        clearCart();
        navigate('/dashboard/orders');
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="input"
              defaultValue={user?.name || ''}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-error-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="input"
              defaultValue={user?.email || ''}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-error-600">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              className="input"
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-error-600">{errors.address.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                className="input"
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-error-600">{errors.city.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                className="input"
                {...register('postalCode', { required: 'Postal code is required' })}
              />
              {errors.postalCode && (
                <p className="mt-1 text-xs text-error-600">{errors.postalCode.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                className="input"
                {...register('country', { required: 'Country is required' })}
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-xs text-error-600">{errors.country.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="input"
                {...register('phoneNumber', { required: 'Phone number is required' })}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-error-600">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="payment-card"
              name="paymentMethod"
              type="radio"
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <label htmlFor="payment-card" className="ml-3 block text-sm font-medium text-gray-700">
              Credit / Debit Card
            </label>
          </div>
          
          {paymentMethod === 'card' && (
            <div className="mt-2">
              <div className="border border-gray-300 rounded-md p-4 bg-white">
                <CardElement 
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                  onChange={handleCardChange}
                />
              </div>
              {cardError && (
                <p className="mt-2 text-xs text-error-600">{cardError}</p>
              )}
            </div>
          )}

          <div className="flex items-center">
            <input
              id="payment-paypal"
              name="paymentMethod"
              type="radio"
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
            />
            <label htmlFor="payment-paypal" className="ml-3 block text-sm font-medium text-gray-700">
              PayPal
            </label>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-900 font-medium">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-900 font-medium">${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Tax</p>
            <p className="text-gray-900 font-medium">${tax.toFixed(2)}</p>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between">
              <p className="text-base font-medium text-gray-900">Total</p>
              <p className="text-base font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        fullWidth 
        size="lg" 
        isLoading={isProcessing}
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </Button>
    </form>
  );
};

export default CheckoutForm;