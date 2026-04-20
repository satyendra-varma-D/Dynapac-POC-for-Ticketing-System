import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function WorkspaceSelection() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('global');
  const [queue, setQueue] = useState('spare-parts');

  const handleEnterWorkspace = () => {
    // Store workspace information for the session
    sessionStorage.setItem('userRole', 'support-agent');
    sessionStorage.setItem('userRegion', region);
    sessionStorage.setItem('userQueue', queue);
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-xl">A</span>
          </div>
          <span className="text-2xl font-medium text-gray-900">
            Aftermarket Service Platform
          </span>
        </div>

        {/* Selection Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
            Select Workspace
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Choose your region and queue to enter
          </p>

          <div className="space-y-6">
            {/* Region Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
              >
                <option value="germany">Germany</option>
                <option value="eu">European Union</option>
                <option value="global">Global</option>
              </select>
            </div>

            {/* Queue Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Queue
              </label>
              <select
                value={queue}
                onChange={(e) => setQueue(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
              >
                <option value="spare-parts">Spare Parts</option>
                <option value="technical">Technical Support</option>
                <option value="warranty">Warranty Claims</option>
              </select>
            </div>

            {/* Enter Button */}
            <button
              onClick={handleEnterWorkspace}
              className="w-full bg-[#C8102E] text-white py-3.5 px-6 rounded-lg font-medium hover:bg-[#A00D25] transition-colors shadow-sm mt-8"
            >
              Enter Workspace
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          © 2026 Aftermarket Service Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
}