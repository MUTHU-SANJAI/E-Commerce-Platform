import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useProductStore } from '../../stores/productStore';
import Spinner from '../ui/Spinner';
import { MOCK_PRODUCTS } from '../../config';

interface ProductGridProps {
  category?: string;
  search?: string;
}

const ProductGrid = ({ category, search }: ProductGridProps) => {
  const { 
    products, 
    loading, 
    error, 
    filters, 
    pagination, 
    fetchProducts, 
    setFilters, 
    setPage 
  } = useProductStore();

  useEffect(() => {
    const newFilters: any = {};
    if (category) newFilters.category = category;
    if (search) newFilters.search = search;
    
    setFilters(newFilters);
    // For this demo, we'll use mock data instead of calling the real API
    // fetchProducts();
  }, [category, search, setFilters]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // fetchProducts();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-error-600 mb-2">Failed to load products</p>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  // Use mock products for this demo
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Empty state */}
      {displayProducts.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or search to find what you're looking for.
          </p>
        </div>
      )}

      {/* Pagination */}
      {displayProducts.length > 0 && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <button
              className="btn btn-outline py-1 px-3"
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              Previous
            </button>
            
            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                  pagination.page === i + 1
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              className="btn btn-outline py-1 px-3"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;