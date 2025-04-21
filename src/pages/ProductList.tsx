import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';

const ProductList = () => {
  const location = useLocation();
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    // Parse query params
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    setCategory(categoryParam);
    setSearch(searchParam);
  }, [location.search]);

  // Determine page title based on filters
  const getPageTitle = () => {
    if (search) {
      return `Search Results for "${search}"`;
    } else if (category) {
      return `${category}`;
    } else {
      return 'All Products';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
          {search && (
            <p className="mt-2 text-gray-600">
              Showing results for "{search}"
            </p>
          )}
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block">
            <ProductFilters />
          </div>
          
          {/* Product Grid */}
          <div className="lg:col-span-3">
            <ProductGrid category={category || undefined} search={search || undefined} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;