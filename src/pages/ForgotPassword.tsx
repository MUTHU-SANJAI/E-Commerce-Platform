import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Clear any errors when the component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  // Show toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data.email);
      setSubmitted(true);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (err) {
      // Error is handled by the store and displayed via the useEffect
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <motion.div 
            className="bg-white shadow-sm rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/login" className="text-primary-600 hover:text-primary-700 mb-6 flex items-center text-sm font-medium">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
              <p className="text-gray-600">
                Enter your email to receive password reset instructions
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-4">
                <div className="bg-success-100 text-success-800 p-4 rounded-md mb-6">
                  <p>
                    We've sent you an email with instructions to reset your password. 
                    Please check your inbox.
                  </p>
                </div>
                <Link 
                  to="/login" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Return to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input"
                    placeholder="your@email.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  isLoading={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;