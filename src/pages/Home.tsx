import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Truck, Shield, Tag } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { MOCK_PRODUCTS } from '../config';

const Home = () => {
  // Animate on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((elem) => {
      observer.observe(elem);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((elem) => {
        observer.unobserve(elem);
      });
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <motion.h1 
                className="text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Shop the Latest Trends with Confidence
              </motion.h1>
              <motion.p 
                className="text-primary-100 text-lg mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover premium products with fast shipping and exceptional customer service. Your satisfaction is our priority.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/products" className="btn btn-secondary">
                  Shop Now
                </Link>
                <Link to="/products" className="btn bg-white text-primary-700 hover:bg-gray-100">
                  View Collections
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <img 
                  src="https://images.pexels.com/photos/5418899/pexels-photo-5418899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Modern shopping experience" 
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="bg-success-100 rounded-full p-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Trusted by 10,000+</p>
                      <p className="text-xs text-gray-500">Happy customers</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Shop With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best shopping experience with quality products and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShoppingBag className="h-8 w-8 text-primary-600" />,
                title: 'Quality Products',
                description: 'All products are carefully selected to ensure premium quality',
              },
              {
                icon: <Truck className="h-8 w-8 text-primary-600" />,
                title: 'Fast Shipping',
                description: 'Get your orders delivered quickly with our expedited shipping',
              },
              {
                icon: <Shield className="h-8 w-8 text-primary-600" />,
                title: 'Secure Payments',
                description: 'Shop with confidence using our secure payment methods',
              },
              {
                icon: <Tag className="h-8 w-8 text-primary-600" />,
                title: 'Best Prices',
                description: 'Enjoy competitive prices and regular discounts on our products',
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2>Featured Products</h2>
            <Link 
              to="/products" 
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              View All 
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.slice(0, 4).map((product) => (
              <div key={product._id} className="animate-on-scroll">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our wide range of product categories to find what you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Electronics',
                image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                link: '/products?category=Electronics',
              },
              {
                title: 'Clothing',
                image: 'https://images.pexels.com/photos/1105058/pexels-photo-1105058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                link: '/products?category=Clothing',
              },
              {
                title: 'Home & Kitchen',
                image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                link: '/products?category=Home%20%26%20Kitchen',
              },
            ].map((category, index) => (
              <Link 
                key={index} 
                to={category.link} 
                className="block rounded-lg overflow-hidden shadow-lg relative group animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3]">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-xl font-medium text-white mb-2">{category.title}</h3>
                      <span className="inline-flex items-center text-sm font-medium text-white">
                        Shop Now <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-primary-100 mb-8 max-w-lg mx-auto">
              Stay updated with our latest products, exclusive offers, and promotions.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="input flex-1"
                required
              />
              <button type="submit" className="btn btn-secondary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Verified Customer',
                quote: 'The quality of the products is outstanding! Fast shipping and excellent customer service. Will definitely shop here again.',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                name: 'Michael Chen',
                role: 'Verified Customer',
                quote: 'I was impressed by how quickly my order arrived. The products exceeded my expectations in terms of quality and value.',
                avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                name: 'Emily Williams',
                role: 'Verified Customer',
                quote: 'The customer service team was incredibly helpful when I had questions about my order. I highly recommend shopping here!',
                avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="text-white mb-6">Ready to Start Shopping?</h2>
            <p className="text-primary-100 mb-8 text-lg max-w-xl mx-auto">
              Join thousands of satisfied customers and experience the best online shopping has to offer.
            </p>
            <Link to="/products" className="btn btn-secondary inline-flex">
              Shop Now <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;