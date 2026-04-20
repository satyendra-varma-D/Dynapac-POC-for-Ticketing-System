import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Eye, EyeOff, Globe } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [portalType, setPortalType] = useState<'agent' | 'customer'>('agent');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Login attempted with:', { email, portalType });
      
      // Store agent data in session (system would provide this after authentication)
      if (portalType === 'agent') {
        // Mock agent data - in real app, this comes from authentication API
        sessionStorage.setItem('userRole', 'support-agent');
        sessionStorage.setItem('userRegion', 'germany');
        sessionStorage.setItem('userQueue', 'spare-parts');
        navigate('/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-16 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C8102E] rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">A</span>
            </div>
            <span className="text-xl font-medium text-gray-900">
              Aftermarket Service Platform
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Support
            </a>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-[1400px] w-full grid grid-cols-2 gap-20 items-center">
          {/* Left Side - Hero Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-semibold text-gray-900 mb-5 leading-tight">
              Service Operations
              <br />
              Simplified
            </h1>
            <p className="text-base text-gray-600 mb-10 leading-relaxed">
              Manage spare parts inquiries, track orders, and resolve support cases
              efficiently from one centralized platform.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 text-[#C8102E] mt-0.5">
                  <CheckCircle2 className="w-full h-full" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Centralized Ticket Management
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Track all service requests and support cases in one unified dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 text-[#C8102E] mt-0.5">
                  <CheckCircle2 className="w-full h-full" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Real-Time Order Visibility
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Monitor spare parts orders and shipments with live status updates
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 text-[#C8102E] mt-0.5">
                  <CheckCircle2 className="w-full h-full" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    SLA & Performance Monitoring
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Ensure compliance with service level agreements through automated tracking
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-[#F5F6F8] rounded-2xl shadow-lg p-10">
                {/* Portal Type Toggle */}
                <div className="mb-8 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPortalType('customer')}
                    className={`flex-1 py-3 px-5 rounded-xl text-sm font-medium transition-all ${
                      portalType === 'customer'
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                        : 'bg-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Customer Portal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPortalType('agent')}
                    className={`flex-1 py-3 px-5 rounded-xl text-sm font-medium transition-all ${
                      portalType === 'agent'
                        ? 'bg-[#C8102E] text-white shadow-md'
                        : 'bg-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Support Agent
                  </button>
                </div>

                <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-600 mb-8 text-center">
                  Sign in to access your orders and tickets
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all placeholder:text-gray-400"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all placeholder:text-gray-400"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-sm font-medium text-[#C8102E] hover:underline transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C8102E] text-white py-4 px-6 rounded-xl font-semibold text-base hover:bg-[#A00D25] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Login'
                    )}
                  </button>

                  {/* Track Order Link - Only show for customer portal */}
                  {portalType === 'customer' && (
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => navigate('/customer/track-order')}
                        className="text-sm text-gray-600 hover:text-[#C8102E] transition-colors"
                      >
                        Track Order Without Login
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-16 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>© 2026 Aftermarket Service Platform. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gray-700 transition-colors">
                Privacy Policy
              </a>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}