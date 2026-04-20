import { useState } from 'react';
import { Search, Wrench, Calendar, AlertCircle, CheckCircle, Package, Grid3x3, List, MoreVertical, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

const assets = [
  {
    id: 'AST-001',
    name: 'Hydraulic Press HP-3000',
    serialNumber: 'HP3K-2023-4567',
    model: 'HP-3000',
    category: 'Hydraulic Equipment',
    purchaseDate: '2023-01-15',
    warrantyExpiry: '2026-01-15',
    warrantyStatus: 'active',
    status: 'operational',
    lastService: '2024-11-20',
    nextService: '2025-05-20',
    location: 'Warehouse A',
  },
  {
    id: 'AST-002',
    name: 'CNC Milling Machine M-500',
    serialNumber: 'CNC-M500-8912',
    model: 'M-500',
    category: 'CNC Machinery',
    purchaseDate: '2022-06-10',
    warrantyExpiry: '2024-06-10',
    warrantyStatus: 'expired',
    status: 'operational',
    lastService: '2024-12-05',
    nextService: '2025-06-05',
    location: 'Production Floor B',
  },
  {
    id: 'AST-003',
    name: 'Air Compressor AC-200',
    serialNumber: 'AC200-2024-1123',
    model: 'AC-200',
    category: 'Compressed Air',
    purchaseDate: '2024-02-20',
    warrantyExpiry: '2027-02-20',
    warrantyStatus: 'active',
    status: 'maintenance',
    lastService: '2024-10-15',
    nextService: '2025-04-15',
    location: 'Utility Room',
  },
  {
    id: 'AST-004',
    name: 'Conveyor System CS-1000',
    serialNumber: 'CS1K-2021-3344',
    model: 'CS-1000',
    category: 'Material Handling',
    purchaseDate: '2021-09-30',
    warrantyExpiry: '2023-09-30',
    warrantyStatus: 'expired',
    status: 'operational',
    lastService: '2024-11-30',
    nextService: '2025-05-30',
    location: 'Assembly Line 1',
  },
];

export default function CustomerAssets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const getWarrantyColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'border-green-500';
      case 'maintenance':
        return 'border-yellow-500';
      case 'down':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-700';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700';
      case 'down':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Equipment Assets</h1>
        <p className="text-sm text-gray-500">Manage and monitor your registered equipment</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets, serial numbers..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all min-w-[150px]"
          >
            <option value="all">All ({assets.length})</option>
            <option value="operational">Operational</option>
            <option value="maintenance">Maintenance</option>
            <option value="down">Down</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#C8102E] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#C8102E] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid/List */}
      {filteredAssets.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
              : 'flex flex-col gap-4'
          }
        >
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className={`bg-white rounded-xl border-t-4 ${getStatusColor(
                asset.status
              )} shadow-sm hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {asset.id}
                      </h3>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium mt-1 ${getStatusBadgeColor(
                          asset.status
                        )}`}
                      >
                        {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Asset Name */}
                <h4 className="font-medium text-gray-900 mb-4">{asset.name}</h4>

                {/* Asset Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Serial Number
                    </p>
                    <p className="text-sm font-medium text-gray-900 font-mono">
                      {asset.serialNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Category
                    </p>
                    <p className="text-sm font-medium text-gray-900">{asset.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Location
                    </p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {asset.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Warranty
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${getWarrantyColor(
                        asset.warrantyStatus
                      )}`}
                    >
                      {asset.warrantyStatus === 'active' ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Expired
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Last: {new Date(asset.lastService).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Next: {new Date(asset.nextService).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets found</h3>
          <p className="text-gray-500">
            {searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your search or filters'
              : 'You have no registered equipment yet'}
          </p>
        </div>
      )}
    </div>
  );
}
