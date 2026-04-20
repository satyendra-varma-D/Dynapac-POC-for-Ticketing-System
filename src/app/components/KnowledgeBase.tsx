import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, BookOpen, Video, FileText, ChevronRight, ThumbsUp, ThumbsDown, Clock, Package, AlertCircle, Wrench, Headphones, HelpCircle, ArrowLeft, Send, MessageCircle, BarChart3, TrendingUp, Plus, MessageSquare, Activity, Sparkles } from 'lucide-react';

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

export default function KnowledgeBase() {
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
      <div className="h-[calc(100vh-64px)] overflow-y-auto bg-white animate-fade-in">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Center</span>
          </button>

          {/* Article Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-red-50 text-[#C8102E] text-[10px] font-bold uppercase tracking-wider rounded-lg border border-red-100">
                {selectedArticle.category}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.readTime} read
              </span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
              {selectedArticle.title}
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Last Verified: {selectedArticle.lastUpdated}
            </p>
          </div>

          {/* Article Body */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#C8102E] rounded-full"></div>
                Problem Definition
              </h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                {selectedArticle.problemStatement}
              </p>
            </section>

            <section className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Required Parameters</h2>
              <div className="flex items-start gap-4 text-gray-600 font-medium">
                <AlertCircle className="w-5 h-5 text-[#C8102E] flex-shrink-0 mt-0.5" />
                <p>{selectedArticle.requiredInfo}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-8">Resolution Workflow</h2>
              <div className="space-y-5">
                {selectedArticle.solutionSteps.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-5 p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#C8102E] hover:shadow-md transition-all group">
                    <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black text-sm flex-shrink-0 group-hover:bg-[#C8102E] transition-colors">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 font-bold mt-1.5 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-red-50/30 border border-red-50 rounded-[32px] p-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3 text-[#C8102E]">
                <HelpCircle className="w-5 h-5" />
                Scenario Validation
              </h2>
              <p className="text-gray-700 leading-relaxed font-bold italic text-lg">
                "{selectedArticle.exampleScenario}"
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Exceptions & Compliance</h2>
              <ul className="space-y-4">
                {selectedArticle.edgeCases.map((edge: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl text-gray-600 font-bold border border-transparent hover:border-gray-200 transition-all">
                    <div className="w-2 h-2 rounded-full bg-[#C8102E] mt-2 flex-shrink-0"></div>
                    {edge}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-gray-100 pt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Cross-Referenced Assets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedArticle.relatedArticles.map((article: any) => (
                  <div key={article.id} className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-[#C8102E] cursor-pointer transition-all flex items-center justify-between group shadow-sm">
                    <span className="text-sm font-bold text-gray-700 group-hover:text-[#C8102E]">{article.title}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#C8102E] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Article Footer */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 px-10 bg-gray-900 rounded-[32px] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8102E] opacity-20 rounded-full translate-x-24 -translate-y-24 blur-[80px]"></div>
              <div className="relative z-10 text-center md:text-left">
                <p className="text-2xl font-black mb-1">Was this documentation helpful?</p>
                <p className="text-gray-400 font-bold">Feedback impacts intelligence training data.</p>
              </div>
              <div className="relative z-10 flex items-center gap-4">
                <button className="flex items-center gap-2 px-8 py-3 bg-white/10 border border-white/20 rounded-2xl hover:bg-white hover:text-gray-900 transition-all font-black text-xs uppercase tracking-widest">
                  <ThumbsUp className="w-4 h-4" /> Accurate
                </button>
                <button className="flex items-center gap-2 px-8 py-3 bg-white/10 border border-white/20 rounded-2xl hover:bg-[#C8102E] transition-all font-black text-xs uppercase tracking-widest text-white">
                  <ThumbsDown className="w-4 h-4" /> Improper
                </button>
              </div>
            </div>

            <div className="mt-16 text-center animate-bounce-slow">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-4">Requirement Unfulfilled?</p>
              <button 
                onClick={() => navigate('/my-tickets')}
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#C8102E] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-900 shadow-2xl shadow-red-900/20 transition-all active:scale-95"
              >
                Access Support Queue
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
      <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F9FAFB] animate-fade-in">
        <div className="max-w-[1600px] mx-auto px-8 py-12">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Global Taxonomy</span>
          </button>

          <div className="flex items-center gap-6 mb-16">
            <div className={`w-20 h-20 rounded-[28px] flex items-center justify-center shadow-lg border-2 ${getCategoryColor(selectedCategory.color)}`}>
              <selectedCategory.icon className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">{selectedCategory.name}</h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">{selectedCategory.count} Verified Dossiers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticle(articleContent)}
                className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:border-[#C8102E] hover:shadow-2xl hover:shadow-red-900/5 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="p-3 bg-red-50 text-[#C8102E] rounded-xl border border-red-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-[#C8102E] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-black text-gray-900 group-hover:text-[#C8102E] mb-6 leading-tight transition-colors">{article.title}</h3>
                <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pt-6 border-t border-gray-50">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime || '5m'}</span>
                  <span className="flex items-center gap-2"><ThumbsUp className="w-4 h-4 text-emerald-500" /> {article.helpful || 95}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F9FAFB] animate-fade-in relative">
      <div className="max-w-[1600px] mx-auto px-12 py-16">
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-6">
             <div className="px-3 py-1 bg-red-50 text-[#C8102E] text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-red-100">Institutional Knowledge</div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Sync: Active</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Intelligence Center
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Unified repository for service protocols, technical schematics, and operational troubleshooting dossiers.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="mb-24 relative group">
          <div className="absolute inset-0 bg-red-900/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
          <div className="relative max-w-4xl">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-300 group-focus-within:text-[#C8102E] transition-colors" />
            <input
              type="text"
              placeholder="Search by part index, fault code, or service manual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-20 pr-10 py-7 bg-white border-none rounded-[40px] text-2xl font-bold shadow-2xl shadow-gray-200/50 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Navigation Blocks</h2>
            <div className="h-px flex-1 bg-gray-100 mx-10 hidden md:block"></div>
            <button className="text-[10px] font-black text-[#C8102E] uppercase tracking-[0.3em] hover:opacity-70 flex items-center gap-2">
              All Archives <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:border-[#C8102E] hover:shadow-2xl hover:shadow-red-900/5 hover:-translate-y-1 transition-all cursor-pointer group flex items-center gap-5"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border-2 ${getCategoryColor(category.color)}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-black text-gray-900 group-hover:text-[#C8102E] transition-colors truncate">
                      {category.name}
                    </h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                      {category.count} Dossiers
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Trending Dossiers */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
              <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-10 bg-[#C8102E] rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Mission Critical Guides</h2>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   <Activity className="w-4 h-4 text-[#C8102E]" /> Trending
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {popularArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(articleContent)}
                    className="px-10 py-10 hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-10">
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#C8102E] transition-colors mb-4 tracking-tight">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-8 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                          <span className="inline-flex items-center gap-2 text-indigo-600">
                            <BookOpen className="w-4 h-4" />
                            {article.category}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#C8102E]" />
                            {article.views.toLocaleString()} Hits
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black">{article.helpful}% Match</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Intelligence Stream */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-100/50 border border-gray-100 overflow-hidden sticky top-8">
              <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Direct Feed</h2>
                <Sparkles className="w-5 h-5 text-[#C8102E]" />
              </div>
              <div className="divide-y divide-gray-50">
                {recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="px-10 py-8 hover:bg-gray-50 cursor-pointer transition-all group"
                  >
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors mb-3 leading-snug">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-500">{article.category}</span>
                      <span className="text-[#C8102E]">{article.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8">
                <button className="w-full py-4 bg-gray-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#C8102E] transition-all flex items-center justify-center gap-3 group">
                  Archive History <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
