import { useState, useRef, useEffect } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useProductStore } from '../../stores/productStore';
import { PRODUCT_CATEGORIES } from '../../config';

interface ProductFiltersProps {
  onFiltersChange?: () => void;
}

const ProductFilters = ({ onFiltersChange }: ProductFiltersProps) => {
  const { filters, setFilters, clearFilters } = useProductStore();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || '',
    max: filters.maxPrice || '',
  });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sort: true,
  });
  
  const mobileFiltersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileFiltersOpen &&
        mobileFiltersRef.current &&
        !mobileFiltersRef.current.contains(event.target as Node)
      ) {
        setMobileFiltersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileFiltersOpen]);

  const handleCategoryChange = (category: string) => {
    setFilters({ category: filters.category === category ? null : category });
    if (onFiltersChange) onFiltersChange();
  };

  const handleSortChange = (sortBy: string) => {
    setFilters({ sortBy });
    if (onFiltersChange) onFiltersChange();
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const minPrice = priceRange.min !== '' ? Number(priceRange.min) : null;
    const maxPrice = priceRange.max !== '' ? Number(priceRange.max) : null;
    
    setFilters({ minPrice, maxPrice });
    if (onFiltersChange) onFiltersChange();
  };

  const handleClearFilters = () => {
    clearFilters();
    setPriceRange({ min: '', max: '' });
    if (onFiltersChange) onFiltersChange();
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isAnyFilterActive = !!filters.category || 
    !!filters.minPrice || 
    !!filters.maxPrice || 
    !!filters.sortBy;

  return (
    <div className="mb-8">
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="btn btn-outline w-full flex items-center justify-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          <span>Filters</span>
          {isAnyFilterActive && (
            <span className="ml-2 bg-primary-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </div>

      {/* Mobile filters sidebar */}
      <div
        ref={mobileFiltersRef}
        className={`fixed inset-0 z-40 lg:hidden transform ${
          mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-xs w-full h-full bg-white shadow-xl flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-medium">Filters</h2>
            <button 
              onClick={() => setMobileFiltersOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {/* Filter content - same as desktop */}
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('categories')}
                >
                  <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
                </div>
                
                {expandedSections.categories && (
                  <div className="mt-2 space-y-1">
                    {PRODUCT_CATEGORIES.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          id={`mobile-category-${category}`}
                          name="category"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={filters.category === category}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <label
                          htmlFor={`mobile-category-${category}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Price Range */}
              <div>
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('price')}
                >
                  <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
                </div>
                
                {expandedSections.price && (
                  <div className="mt-2">
                    <form onSubmit={handlePriceSubmit}>
                      <div className="flex space-x-2">
                        <div>
                          <label htmlFor="mobile-min-price" className="sr-only">
                            Minimum Price
                          </label>
                          <input
                            type="number"
                            id="mobile-min-price"
                            placeholder="Min"
                            className="input !h-9 !text-xs w-full"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                          />
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500">-</span>
                        </div>
                        <div>
                          <label htmlFor="mobile-max-price" className="sr-only">
                            Maximum Price
                          </label>
                          <input
                            type="number"
                            id="mobile-max-price"
                            placeholder="Max"
                            className="input !h-9 !text-xs w-full"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary !h-9 !px-3 !text-xs"
                        >
                          Go
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              
              {/* Sort By */}
              <div>
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('sort')}
                >
                  <h3 className="text-sm font-medium text-gray-900">Sort By</h3>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`} />
                </div>
                
                {expandedSections.sort && (
                  <div className="mt-2 space-y-1">
                    {[
                      { value: 'price-asc', label: 'Price: Low to High' },
                      { value: 'price-desc', label: 'Price: High to Low' },
                      { value: 'newest', label: 'Newest First' },
                      { value: 'rating-desc', label: 'Top Rated' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`mobile-sort-${option.value}`}
                          name="sort"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={filters.sortBy === option.value}
                          onChange={() => handleSortChange(option.value)}
                        />
                        <label
                          htmlFor={`mobile-sort-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleClearFilters}
              className="btn btn-outline w-full"
              disabled={!isAnyFilterActive}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-medium">Filters</h2>
            {isAnyFilterActive && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                <X className="h-4 w-4 mr-1" /> Clear All
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('categories')}
              >
                <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
              </div>
              
              {expandedSections.categories && (
                <div className="mt-3 space-y-1.5">
                  {PRODUCT_CATEGORIES.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name="category"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={filters.category === category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Price Range */}
            <div>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('price')}
              >
                <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
              </div>
              
              {expandedSections.price && (
                <div className="mt-3">
                  <form onSubmit={handlePriceSubmit}>
                    <div className="flex space-x-2">
                      <div>
                        <label htmlFor="min-price" className="sr-only">
                          Minimum Price
                        </label>
                        <input
                          type="number"
                          id="min-price"
                          placeholder="Min"
                          className="input !h-9 !text-xs w-full"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500">-</span>
                      </div>
                      <div>
                        <label htmlFor="max-price" className="sr-only">
                          Maximum Price
                        </label>
                        <input
                          type="number"
                          id="max-price"
                          placeholder="Max"
                          className="input !h-9 !text-xs w-full"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary !h-9 !px-3 !text-xs"
                      >
                        Go
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Sort By */}
            <div>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('sort')}
              >
                <h3 className="text-sm font-medium text-gray-900">Sort By</h3>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`} />
              </div>
              
              {expandedSections.sort && (
                <div className="mt-3 space-y-1.5">
                  {[
                    { value: 'price-asc', label: 'Price: Low to High' },
                    { value: 'price-desc', label: 'Price: High to Low' },
                    { value: 'newest', label: 'Newest First' },
                    { value: 'rating-desc', label: 'Top Rated' },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`sort-${option.value}`}
                        name="sort"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={filters.sortBy === option.value}
                        onChange={() => handleSortChange(option.value)}
                      />
                      <label
                        htmlFor={`sort-${option.value}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;