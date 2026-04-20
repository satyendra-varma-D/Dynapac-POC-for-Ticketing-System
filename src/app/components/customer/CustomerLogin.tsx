import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Globe } from 'lucide-react';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      navigate('/customer/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Language Selector - Top Right */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
          <Globe className="w-4 h-4" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent border-none outline-none cursor-pointer text-sm"
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div className="text-left">
            <div className="text-xl font-semibold text-gray-900">
              Aftermarket Service
            </div>
            <div className="text-sm text-gray-500">Customer Service Portal</div>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#F5F6F8] rounded-xl px-10 py-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            Sign in to access your orders and tickets
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-[#C8102E] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C8102E] text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-[#A00D25] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          {/* Track Order Without Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/customer/track-order')}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              Track Order Without Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-8">
          © 2026 Aftermarket Service Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
}