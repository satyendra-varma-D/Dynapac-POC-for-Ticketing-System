import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, BookOpen, Video, FileText, ChevronRight, ThumbsUp, ThumbsDown, Clock, Package, AlertCircle, Wrench, Headphones, HelpCircle, ArrowLeft, Send, MessageCircle, BarChart3, TrendingUp, Plus, MessageSquare } from 'lucide-react';

const categories = [
  { id: 1, name: 'Order & Delivery Support', icon: Package, count: 12, color: 'blue' },
  { id: 2, name: 'Parts & Ordering', icon: Wrench, count: 45, color: 'green' },
  { id: 3, name: 'Issues & Claims', icon: AlertCircle, count: 8, color: 'red' },
  { id: 4, name: 'Installation & Setup', icon: FileText, count: 24, color: 'purple' },
  { id: 5, name: 'Maintenance & Service', icon: BookOpen, count: 32, color: 'orange' },
  { id: 6, name: 'Troubleshooting', icon: HelpCircle, count: 18, color: 'red' },
  { id: 7, name: 'Video Tutorials', icon: Video, count: 15, color: 'purple' },
  { id: 8, name: 'FAQs', icon: MessageCircle, count: 20, color: 'teal' },
];

const popularArticles = [
  { id: 1, title: 'Order Tracking Process (New SAP status update)', category: 'Order & Delivery Support', views: 3450, readTime: '4 min', helpful: 98 },
  { id: 2, title: 'How to Track Shipment Using DHL Integration', category: 'Order & Delivery Support', views: 2890, readTime: '6 min', helpful: 95 },
  { id: 3, title: 'Spare Parts Ordering Mistakes (2026 Edition)', category: 'Parts & Ordering', views: 2150, readTime: '8 min', helpful: 92 },
  { id: 4, title: 'Preventive Maintenance Checklist', category: 'Maintenance & Service', views: 1870, readTime: '10 min', helpful: 96 },
  { id: 5, title: 'Return & Replacement Policy', category: 'Issues & Claims', views: 1580, readTime: '5 min', helpful: 99 },
];

const recentArticles = [
  { id: 1, title: 'Updated: Order Tracking Process', category: 'Order & Delivery Support', timestamp: '2 days ago' },
  { id: 2, title: 'New: How to Track Shipment Using DHL Integration', category: 'Order & Delivery Support', timestamp: '3 days ago' },
  { id: 3, title: 'New: Spare Parts Ordering Mistakes (2026 Edition)', category: 'Parts & Ordering', timestamp: '5 days ago' },
  { id: 4, title: 'Updated: Return & Replacement Policy', category: 'Issues & Claims', timestamp: '1 week ago' },
  { id: 5, title: 'New: Preventive Maintenance Checklist', category: 'Maintenance & Service', timestamp: '1 week ago' },
];

const articleContent = {
  id: 1,
  title: 'Order Tracking Process (New SAP status update)',
  category: 'Order & Delivery Support',
  lastUpdated: 'March 15, 2026',
  readTime: '4 min',
  problemStatement: 'Customers often find it difficult to understand where their order is currently located within the Dynapac fulfillment pipeline, especially during the transition from the warehouse to the shipping carrier.',
  requiredInfo: 'To track your order, you will need your 10-digit Order Number (ORD-XXXXXXXX) or your 12-digit Tracking Number (TRK-XXXXXXXX).',
  solutionSteps: [
    'Log in to the Aftermarket Portal using your credentials.',
    'Navigate to the "Order History" or "Track Order" section in the side menu.',
    'Select the specific order you wish to monitor from the dashboard list.',
    'Review the "Live Order Preview" sidebar which now pulls real-time data from our SAP S/4HANA backend.',
    'Click on the tracking link (DHL/FedEx) for granular milestone updates from the carrier.'
  ],
  exampleScenario: 'If you ordered a Hydraulic Pump (P-45892) on March 1st, your status will transition from "In Processing" to "Shipped" within 24 hours. Once shipped, the ETA will be updated dynamically based on carrier performance.',
  edgeCases: [
    'Orders containing "Backordered" items will not show a tracking number until the primary component is back in stock.',
    'International shipments may experience a 48-hour delay in tracking visibility due to customs clearance processes.'
  ],
  relatedArticles: [
    { id: 2, title: 'How to Track Shipment Using DHL Integration' },
    { id: 5, title: 'Return & Replacement Policy' }
  ]
};

export default function CustomerKnowledgeBase() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      green: 'bg-green-50 text-green-600 border-green-100',
      red: 'bg-red-50 text-red-600 border-red-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-100',
      orange: 'bg-orange-50 text-orange-600 border-orange-100',
      teal: 'bg-teal-50 text-teal-600 border-teal-100',
    };
    return colors[color] || 'bg-gray-50 text-gray-600 border-gray-100';
  };

  const allArticles = [
    ...popularArticles,
    ...recentArticles.map(a => ({ ...a, views: 0, readTime: '5 min', helpful: 0 })),
    { id: 10, title: 'How to replace a hydraulic filter', category: 'Maintenance & Service', views: 800, readTime: '12 min', helpful: 94 },
    { id: 11, title: 'Engine oil specifications by model', category: 'Maintenance & Service', views: 1200, readTime: '8 min', helpful: 97 },
    { id: 12, title: 'Understanding warning light codes', category: 'Troubleshooting', views: 4500, readTime: '15 min', helpful: 89 },
    { id: 13, title: 'Emergency shutdown procedures', category: 'Troubleshooting', views: 5600, readTime: '5 min', helpful: 100 },
  ];

  if (selectedArticle) {
    return (
      <div className="h-[calc(100vh-64px)] overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Knowledge Base</span>
          </button>

          {/* Article Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.readTime} read
              </span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
              {selectedArticle.title}
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Last Updated: {selectedArticle.lastUpdated}
            </p>
          </div>

          {/* Article Body */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#C8102E] rounded-full"></div>
                1. Problem Statement
              </h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                {selectedArticle.problemStatement}
              </p>
            </section>

            <section className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Required Information</h2>
              <div className="flex items-start gap-3 text-gray-600 font-medium">
                <AlertCircle className="w-5 h-5 text-[#C8102E] flex-shrink-0 mt-0.5" />
                <p>{selectedArticle.requiredInfo}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">3. Step-by-step Solution</h2>
              <div className="space-y-4">
                {selectedArticle.solutionSteps.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#C8102E] hover:shadow-sm transition-all">
                    <div className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 font-medium mt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2 text-blue-900">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                4. Example Scenario
              </h2>
              <p className="text-blue-900/80 leading-relaxed font-medium italic">
                "{selectedArticle.exampleScenario}"
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Edge Cases / Exceptions</h2>
              <ul className="space-y-3">
                {selectedArticle.edgeCases.map((edge: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8102E] mt-2 flex-shrink-0"></div>
                    {edge}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-gray-100 pt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedArticle.relatedArticles.map((article: any) => (
                  <div key={article.id} className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#C8102E] cursor-pointer transition-all flex items-center justify-between group">
                    <span className="text-sm font-bold text-gray-700 group-hover:text-[#C8102E]">{article.title}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C8102E]" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 px-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <p className="text-lg font-bold text-gray-900 mb-1">Was this helpful?</p>
                <p className="text-sm text-gray-500 font-medium">Your feedback helps us improve our guides</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-green-600 hover:text-green-600 transition-all font-bold text-sm">
                  <ThumbsUp className="w-4 h-4" /> Yes
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-red-600 hover:text-red-600 transition-all font-bold text-sm">
                  <ThumbsDown className="w-4 h-4" /> No
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 font-medium mb-4">Still need help?</p>
              <button 
                onClick={() => navigate('/customer/create-ticket')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C8102E] text-white rounded-xl font-bold hover:bg-[#A00D25] shadow-lg shadow-red-100 hover:shadow-red-200 transition-all"
              >
                Create a Support Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const categoryArticles = allArticles.filter(a => a.category === selectedCategory.name);
    return (
      <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
        <div className="max-w-[1600px] mx-auto px-8 py-12">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">All Categories</span>
          </button>

          <div className="flex items-center gap-4 mb-12">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${getCategoryColor(selectedCategory.color)}`}>
              <selectedCategory.icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">{selectedCategory.name}</h1>
              <p className="text-gray-500 font-medium">{selectedCategory.count} articles available in this section</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticle(articleContent)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-red-50 text-[#C8102E] rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#C8102E] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#C8102E] mb-3 leading-tight">{article.title}</h3>
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime || '5 min'}</span>
                  <span className="flex items-center gap-1.5"><ThumbsUp className="w-3.5 h-3.5" /> {article.helpful || 0}% Helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
            Knowledge Base
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            Find answers, guides, and tutorials to help you get the most out of your equipment
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-16">
          <div className="relative max-w-3xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number, part number, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-transparent rounded-2xl text-lg font-medium focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-[#C8102E] shadow-xl shadow-gray-200/50 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Categories Grid (Compact) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900">Browse by Category</h2>
            <button className="text-sm font-bold text-[#C8102E] hover:underline uppercase tracking-wider">Expand All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#C8102E] hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm border ${getCategoryColor(category.color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors truncate">
                      {category.name}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                      {category.count} Articles
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#C8102E] translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Popular Articles */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-[#C8102E] rounded-full"></div>
                  <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Popular Articles</h2>
                </div>
                <BarChart3 className="w-5 h-5 text-gray-300" />
              </div>
              <div className="divide-y divide-gray-100">
                {popularArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(articleContent)}
                    className="px-8 py-6 hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors mb-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <span className="inline-flex items-center gap-1.5 text-blue-600">
                            <BookOpen className="w-4 h-4" />
                            {article.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4" />
                            {article.views.toLocaleString()} Views
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded-lg">
                          <ThumbsUp className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-tighter">{article.helpful}% Helpful</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recently Added */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-8">
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Recent Updates</h2>
                <Clock className="w-5 h-5 text-gray-300" />
              </div>
              <div className="divide-y divide-gray-100">
                {recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="px-8 py-6 hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors mb-2 leading-relaxed">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span className="text-[#C8102E]">{article.category}</span>
                      <span>{article.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/30">
                <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-[#C8102E] hover:underline uppercase tracking-wider">
                  View All Updates <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
