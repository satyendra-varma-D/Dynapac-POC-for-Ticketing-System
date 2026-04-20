import { useState } from 'react';
import { Search, BookOpen, Video, FileText, ChevronRight, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';

const categories = [
  { id: 1, name: 'Installation Guides', icon: FileText, count: 24, color: 'blue' },
  { id: 2, name: 'Maintenance', icon: BookOpen, count: 18, color: 'green' },
  { id: 3, name: 'Troubleshooting', icon: BookOpen, count: 32, color: 'red' },
  { id: 4, name: 'Video Tutorials', icon: Video, count: 15, color: 'purple' },
  { id: 5, name: 'Best Practices', icon: FileText, count: 12, color: 'orange' },
  { id: 6, name: 'FAQs', icon: BookOpen, count: 45, color: 'teal' },
];

const popularArticles = [
  { id: 1, title: 'How to Install XYZ Component', category: 'Installation Guides', views: 1240, readTime: '5 min', helpful: 98 },
  { id: 2, title: 'Troubleshooting Common Error Codes', category: 'Troubleshooting', views: 2150, readTime: '8 min', helpful: 95 },
  { id: 3, title: 'Routine Maintenance Schedule', category: 'Maintenance', views: 890, readTime: '4 min', helpful: 92 },
  { id: 4, title: 'Safety Guidelines and Best Practices', category: 'Best Practices', views: 670, readTime: '6 min', helpful: 96 },
  { id: 5, title: 'Getting Started with Your New Equipment', category: 'Installation Guides', views: 1580, readTime: '10 min', helpful: 99 },
];

const recentArticles = [
  { id: 6, title: 'Updated Firmware Installation Guide', category: 'Installation Guides', publishedDate: '2 days ago' },
  { id: 7, title: 'New Feature: Remote Diagnostics', category: 'Video Tutorials', publishedDate: '1 week ago' },
  { id: 8, title: 'Winter Maintenance Tips', category: 'Maintenance', publishedDate: '2 weeks ago' },
];

export default function CustomerKnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      teal: 'bg-teal-100 text-teal-600',
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Knowledge Base
          </h1>
          <p className="text-sm text-gray-500">
            Find answers, guides, and tutorials to help you get the most out of your equipment
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, guides, and videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-[#C8102E] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(category.color)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-[#C8102E] transition-colors">{category.name}</p>
                        <p className="text-xs text-gray-500">{category.count} articles</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#C8102E] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Articles */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Popular Articles</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {popularArticles.map((article) => (
                  <div
                    key={article.id}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#C8102E] transition-colors mb-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {article.category}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                          <span>{article.views.toLocaleString()} views</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <ThumbsUp className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-600 font-medium">{article.helpful}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recently Added */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recently Added</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <h3 className="font-medium text-gray-900 group-hover:text-[#C8102E] transition-colors mb-2 text-sm">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.category}</span>
                      <span>{article.publishedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-gray-100">
                <button className="text-sm font-medium text-[#C8102E] hover:underline">
                  View all updates →
                </button>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-xl shadow-sm p-6 mt-6 text-white">
              <h3 className="font-semibold mb-2">Can't find what you need?</h3>
              <p className="text-sm text-white/90 mb-4">
                Our support team is here to help you
              </p>
              <button className="w-full bg-white text-[#C8102E] px-4 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
