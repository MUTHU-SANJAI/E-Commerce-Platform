import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import Button from '../ui/Button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success('Added to cart!');
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <motion.div
      className="card group h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product._id}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden rounded-t-lg aspect-square">
          {/* Product image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Favorite button */}
          <button
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
              isFavorite ? 'bg-error-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          
          {/* Quick add to cart overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button
              size="sm"
              className="mx-auto"
              leftIcon={<ShoppingCart className="h-4 w-4" />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
          
          {/* Show out of stock */}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="bg-error-600 text-white px-3 py-1 text-sm font-medium rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          {/* Category */}
          <span className="text-xs font-medium text-primary-600 mb-1">
            {product.category}
          </span>
          
          {/* Product Name */}
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="mt-auto pt-2">
            <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
            
            {/* Star Rating */}
            {product.avgRating && (
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(product.avgRating || 0)
                          ? 'text-yellow-400'
                          : i < (product.avgRating || 0)
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
                <span className="text-xs text-gray-500 ml-1">
                  ({product.avgRating})
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;