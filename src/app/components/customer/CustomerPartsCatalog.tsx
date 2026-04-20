import { useState } from 'react';
import { Search, ShoppingCart, Package, Star, Filter, ChevronRight } from 'lucide-react';

const categories = [
  { id: 1, name: 'Hydraulic Components', count: 48 },
  { id: 2, name: 'Electrical Parts', count: 62 },
  { id: 3, name: 'Mechanical Parts', count: 95 },
  { id: 4, name: 'Filters & Seals', count: 34 },
  { id: 5, name: 'Belts & Chains', count: 28 },
  { id: 6, name: 'Bearings', count: 41 },
];

const parts = [
  {
    id: 'P-001',
    name: 'Hydraulic Seal Kit',
    partNumber: 'HSK-3000-A',
    category: 'Hydraulic Components',
    description: 'Complete seal kit for HP-3000 hydraulic press',
    price: 450.00,
    availability: 'In Stock',
    rating: 4.8,
    reviews: 24,
    compatibleWith: ['HP-3000', 'HP-3500'],
    image: null,
  },
  {
    id: 'P-002',
    name: 'Oil Filter Premium',
    partNumber: 'OF-HP3K',
    category: 'Filters & Seals',
    description: 'High-efficiency oil filter, pack of 2',
    price: 75.00,
    availability: 'In Stock',
    rating: 4.9,
    reviews: 38,
    compatibleWith: ['HP-3000', 'HP-2500'],
    image: null,
  },
  {
    id: 'P-003',
    name: 'Spindle Bearing Set',
    partNumber: 'SBS-M500',
    category: 'Bearings',
    description: 'Precision bearing set for M-500 CNC machines',
    price: 850.00,
    availability: 'Limited Stock',
    rating: 4.7,
    reviews: 16,
    compatibleWith: ['M-500', 'M-600'],
    image: null,
  },
  {
    id: 'P-004',
    name: 'Drive Belt Heavy Duty',
    partNumber: 'DB-M500-X',
    category: 'Belts & Chains',
    description: 'Reinforced drive belt for industrial use',
    price: 120.00,
    availability: 'In Stock',
    rating: 4.6,
    reviews: 31,
    compatibleWith: ['M-500', 'CS-1000'],
    image: null,
  },
  {
    id: 'P-005',
    name: 'Pressure Relief Valve',
    partNumber: 'PRV-AC200',
    category: 'Hydraulic Components',
    description: 'Safety valve for air compressor systems',
    price: 280.00,
    availability: 'In Stock',
    rating: 4.9,
    reviews: 42,
    compatibleWith: ['AC-200', 'AC-250'],
    image: null,
  },
  {
    id: 'P-006',
    name: 'Conveyor Roller Set',
    partNumber: 'CR-CS1K',
    category: 'Mechanical Parts',
    description: 'Set of 8 heavy-duty conveyor rollers',
    price: 760.00,
    availability: 'In Stock',
    rating: 4.5,
    reviews: 19,
    compatibleWith: ['CS-1000', 'CS-1200'],
    image: null,
  },
  {
    id: 'P-007',
    name: 'Motor Control Unit',
    partNumber: 'MCU-2024',
    category: 'Electrical Parts',
    description: 'Advanced motor control with diagnostics',
    price: 1250.00,
    availability: 'Pre-Order',
    rating: 4.8,
    reviews: 12,
    compatibleWith: ['M-500', 'HP-3000'],
    image: null,
  },
  {
    id: 'P-008',
    name: 'Cooling Fan Assembly',
    partNumber: 'CFA-500',
    category: 'Electrical Parts',
    description: 'High-efficiency cooling system',
    price: 320.00,
    availability: 'In Stock',
    rating: 4.4,
    reviews: 28,
    compatibleWith: ['M-500', 'M-600'],
    image: null,
  },
];

export default function CustomerPartsCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<string[]>([]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock':
        return 'bg-green-100 text-green-700';
      case 'Limited Stock':
        return 'bg-yellow-100 text-yellow-700';
      case 'Pre-Order':
        return 'bg-blue-100 text-blue-700';
      case 'Out of Stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (partId: string) => {
    setCart([...cart, partId]);
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Parts Catalog
              </h1>
              <p className="text-sm text-gray-500">
                Browse and order spare parts for your equipment
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors shadow-sm relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">View Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-[#C8102E] rounded-full flex items-center justify-center text-xs font-bold border-2 border-[#C8102E]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by part name or part number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === 'all' ? 'bg-[#C8102E] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>All Parts</span>
                  <span className={`text-xs ${selectedCategory === 'all' ? 'text-white/80' : 'text-gray-500'}`}>
                    {parts.length}
                  </span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.name ? 'bg-[#C8102E] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs ${selectedCategory === category.name ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Parts */}
            <div className="bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-xl shadow-sm p-5 mt-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-white/90 mb-4">
                Not sure which part you need? Our team can help you find the right component.
              </p>
              <button className="w-full bg-white text-[#C8102E] px-4 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                Contact Parts Specialist
              </button>
            </div>
          </div>

          {/* Parts Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredParts.map((part) => (
                <div key={part.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image Placeholder */}
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-400" />
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{part.name}</h3>
                          <p className="text-xs text-gray-500 font-mono mb-2">{part.partNumber}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getAvailabilityColor(part.availability)}`}>
                          {part.availability}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{part.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{part.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({part.reviews} reviews)</span>
                    </div>

                    {/* Compatible Models */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Compatible with:</p>
                      <div className="flex flex-wrap gap-1">
                        {part.compatibleWith.map((model) => (
                          <span key={model} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">${part.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => addToCart(part.id)}
                        disabled={part.availability === 'Out of Stock'}
                        className="flex items-center gap-2 px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredParts.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No parts found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
