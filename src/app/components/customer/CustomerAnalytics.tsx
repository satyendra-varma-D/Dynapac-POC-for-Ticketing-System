import { useState } from 'react';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, Wrench, Clock, BarChart3 } from 'lucide-react';

export default function CustomerAnalytics() {
  const [dateRange, setDateRange] = useState('last-12-months');

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Analytics & Reports
              </h1>
              <p className="text-sm text-gray-500">
                Track your service spending, equipment uptime, and performance metrics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              >
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="last-12-months">Last 12 Months</option>
                <option value="custom">Custom Range</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingDown className="w-4 h-4" />
                <span className="font-medium">8%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Spending</p>
            <p className="text-3xl font-bold text-gray-900">$42,580</p>
            <p className="text-xs text-gray-500 mt-2">vs. $46,290 last year</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">12%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Equipment Uptime</p>
            <p className="text-3xl font-bold text-gray-900">98.5%</p>
            <p className="text-xs text-gray-500 mt-2">vs. 87.9% last year</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingDown className="w-4 h-4" />
                <span className="font-medium">24%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
            <p className="text-3xl font-bold text-gray-900">3.2h</p>
            <p className="text-xs text-gray-500 mt-2">vs. 4.2h last year</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">5%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Service Requests</p>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-500 mt-2">vs. 23 last year</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Service Spending Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Service Spending Trends</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                const heights = [60, 45, 70, 55, 80, 65, 50, 75, 60, 85, 70, 55];
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-[#C8102E] rounded-t hover:bg-[#A00D25] transition-colors cursor-pointer" style={{ height: `${heights[index]}%` }}></div>
                    <span className="text-xs text-gray-600">{month}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly Average:</span>
                <span className="font-semibold text-gray-900">$3,548</span>
              </div>
            </div>
          </div>

          {/* Equipment Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Equipment Performance</h2>
            <div className="space-y-4">
              {[
                { name: 'Hydraulic Press HP-3000', uptime: 99.2, color: 'bg-green-500' },
                { name: 'CNC Milling Machine M-500', uptime: 98.5, color: 'bg-green-500' },
                { name: 'Air Compressor AC-200', uptime: 97.8, color: 'bg-green-500' },
                { name: 'Conveyor System CS-1000', uptime: 98.9, color: 'bg-green-500' },
              ].map((equipment, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{equipment.name}</span>
                    <span className="text-sm font-semibold text-green-600">{equipment.uptime}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${equipment.color} h-2 rounded-full transition-all`}
                      style={{ width: `${equipment.uptime}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Service Type Breakdown</h2>
            <div className="space-y-4">
              {[
                { type: 'Preventive Maintenance', percentage: 45, amount: 19161, color: 'bg-blue-500' },
                { type: 'Repairs', percentage: 35, amount: 14903, color: 'bg-yellow-500' },
                { type: 'Emergency Services', percentage: 15, amount: 6387, color: 'bg-red-500' },
                { type: 'Parts Replacement', percentage: 5, amount: 2129, color: 'bg-purple-500' },
              ].map((service, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{service.type}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">{service.percentage}%</span>
                      <span className="text-xs text-gray-500 ml-2">${service.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${service.color} h-2 rounded-full transition-all`}
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Response Time Analytics</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Critical Priority</span>
                  <span className="text-sm font-semibold text-green-600">2.1h avg</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '52.5%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Target: 4h</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">High Priority</span>
                  <span className="text-sm font-semibold text-green-600">5.2h avg</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Target: 8h</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Medium Priority</span>
                  <span className="text-sm font-semibold text-green-600">18h avg</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Target: 24h</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Low Priority</span>
                  <span className="text-sm font-semibold text-green-600">32h avg</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '66.7%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Target: 48h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
