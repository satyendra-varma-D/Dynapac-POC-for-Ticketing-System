import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Package, ArrowRight } from 'lucide-react';

export default function CustomerTrackOrder() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/customer/orders');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-blue-600" />
          </div>

          {/* Message */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Redirecting to Orders
          </h1>
          <p className="text-gray-600 mb-6">
            Since you're logged in, you can view and track all your orders from the Orders page.
          </p>

          {/* Loading */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          {/* Manual Button */}
          <button
            onClick={() => navigate('/customer/orders')}
            className="w-full px-6 py-3 bg-[#C8102E] text-white rounded-lg font-medium hover:bg-[#A00D25] transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            Go to Orders Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          You'll be redirected automatically in a few seconds
        </p>
      </div>
    </div>
  );
}
