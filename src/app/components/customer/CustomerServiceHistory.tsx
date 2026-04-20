import { useState } from 'react';
import { Search, Calendar, User, FileText, Download, ChevronDown, ChevronUp, Wrench, CheckCircle } from 'lucide-react';

const serviceHistory = [
  {
    id: 'SRV-2024-089',
    assetName: 'Hydraulic Press HP-3000',
    assetId: 'AST-001',
    serviceType: 'Preventive Maintenance',
    serviceDate: '2024-11-20',
    technician: 'Mike Johnson',
    technicianId: 'TECH-045',
    duration: '3 hours',
    status: 'completed',
    notes: 'Performed routine inspection, replaced hydraulic seals, tested pressure levels. All systems operating within normal parameters.',
    partsReplaced: [
      { name: 'Hydraulic Seal Kit', partNumber: 'HSK-3000-A', quantity: 1 },
      { name: 'Oil Filter', partNumber: 'OF-HP3K', quantity: 2 },
    ],
    recommendations: 'Schedule next maintenance in 6 months. Monitor oil levels weekly.',
    cost: 850.00,
    reportUrl: '#',
  },
  {
    id: 'SRV-2024-078',
    assetName: 'CNC Milling Machine M-500',
    assetId: 'AST-002',
    serviceType: 'Repair Service',
    serviceDate: '2024-12-05',
    technician: 'Sarah Chen',
    technicianId: 'TECH-032',
    duration: '5 hours',
    status: 'completed',
    notes: 'Diagnosed and repaired spindle motor issue. Replaced worn bearings and recalibrated axis alignment. System tested and validated.',
    partsReplaced: [
      { name: 'Spindle Bearing Set', partNumber: 'SBS-M500', quantity: 1 },
      { name: 'Drive Belt', partNumber: 'DB-M500-X', quantity: 1 },
    ],
    recommendations: 'Regular lubrication required. Check belt tension monthly.',
    cost: 1420.00,
    reportUrl: '#',
  },
  {
    id: 'SRV-2024-056',
    assetName: 'Air Compressor AC-200',
    assetId: 'AST-003',
    serviceType: 'Emergency Repair',
    serviceDate: '2024-10-15',
    technician: 'David Rodriguez',
    technicianId: 'TECH-019',
    duration: '2 hours',
    status: 'completed',
    notes: 'Responded to pressure drop alert. Found and replaced faulty pressure valve. System restored to full operational status.',
    partsReplaced: [
      { name: 'Pressure Relief Valve', partNumber: 'PRV-AC200', quantity: 1 },
    ],
    recommendations: 'Install pressure monitoring system for early detection.',
    cost: 560.00,
    reportUrl: '#',
  },
  {
    id: 'SRV-2024-043',
    assetName: 'Conveyor System CS-1000',
    assetId: 'AST-004',
    serviceType: 'Preventive Maintenance',
    serviceDate: '2024-11-30',
    technician: 'Mike Johnson',
    technicianId: 'TECH-045',
    duration: '4 hours',
    status: 'completed',
    notes: 'Complete system inspection, lubricated all moving parts, adjusted belt tension, replaced worn rollers.',
    partsReplaced: [
      { name: 'Conveyor Rollers', partNumber: 'CR-CS1K', quantity: 8 },
      { name: 'Drive Chain', partNumber: 'DC-CS1K-HD', quantity: 1 },
    ],
    recommendations: 'Continue regular cleaning to prevent buildup. Next service in 6 months.',
    cost: 720.00,
    reportUrl: '#',
  },
];

export default function CustomerServiceHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const getServiceTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'preventive maintenance':
        return 'bg-blue-100 text-blue-700';
      case 'repair service':
        return 'bg-yellow-100 text-yellow-700';
      case 'emergency repair':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredHistory = serviceHistory.filter(service =>
    service.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.technician.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Service History
          </h1>
          <p className="text-sm text-gray-500">
            Complete timeline of all services performed on your equipment
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Services</p>
                <p className="text-3xl font-bold text-gray-900">{serviceHistory.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {serviceHistory.filter(s => s.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${serviceHistory.reduce((sum, s) => sum + s.cost, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Response</p>
                <p className="text-3xl font-bold text-gray-900">2.5h</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by service ID, equipment, or technician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
            />
          </div>
        </div>

        {/* Service History List */}
        <div className="space-y-4">
          {filteredHistory.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div
                className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(service.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{service.assetName}</h3>
                        <span className={`inline-flex px-3 py-1 rounded-md text-xs font-medium ${getServiceTypeColor(service.serviceType)}`}>
                          {service.serviceType}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(service.serviceDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {service.technician}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {service.id}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">${service.cost.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{service.duration}</p>
                    </div>
                  </div>
                  <button className="ml-4">
                    {expandedService === service.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedService === service.id && (
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Service Notes</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{service.notes}</p>
                      
                      <h4 className="font-semibold text-gray-900 mt-4 mb-3">Technician Recommendations</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{service.recommendations}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Parts Replaced</h4>
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Part Name</th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Part Number</th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Qty</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {service.partsReplaced.map((part, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-900">{part.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-600 font-mono">{part.partNumber}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{part.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors">
                        <Download className="w-4 h-4" />
                        Download Service Report
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
