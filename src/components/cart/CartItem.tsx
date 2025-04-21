import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const [removing, setRemoving] = useState(false);
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleRemove = () => {
    setRemoving(true);
    // Add a small delay for animation
    setTimeout(() => {
      removeFromCart(item.product._id);
    }, 300);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.product._id, newQuantity);
    }
  };

  return (
    <motion.div 
      className={`flex py-6 border-b border-gray-200 ${removing ? 'opacity-0' : 'opacity-100'}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
        <Link to={`/products/${item.product._id}`}>
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <Link 
              to={`/products/${item.product._id}`}
              className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              {item.product.name}
            </Link>
            <p className="mt-1 text-xs text-gray-500">{item.product.category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex-1 flex items-end justify-between mt-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-900"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2 py-1 text-sm text-gray-700">{item.quantity}</span>
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-900"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
            onClick={handleRemove}
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;