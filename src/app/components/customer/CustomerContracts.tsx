import { useState } from 'react';
import { FileText, Download, Calendar, CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react';

const contracts = [
  {
    id: 'CNT-2024-001',
    name: 'Premium Service Agreement',
    type: 'Annual Maintenance',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    status: 'active',
    coverageLevel: 'Platinum',
    responseTime: '4 hours',
    maintenanceVisits: { included: 12, used: 8 },
    emergencyServices: 'Unlimited',
    coveredEquipment: ['AST-001', 'AST-002', 'AST-003', 'AST-004'],
    value: 24000.00,
    nextRenewal: '2025-01-01',
    slaTerms: {
      critical: '4 hours',
      high: '8 hours',
      medium: '24 hours',
      low: '48 hours',
    },
    coverage: [
      'All preventive maintenance',
      'Emergency repairs 24/7',
      'Parts replacement included',
      'Priority technical support',
      'Remote diagnostics',
      'Annual equipment health check',
    ],
    exclusions: [
      'Damage due to misuse',
      'Third-party modifications',
      'Natural disasters',
    ],
  },
  {
    id: 'CNT-2023-045',
    name: 'Standard Service Agreement',
    type: 'Annual Maintenance',
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    status: 'expired',
    coverageLevel: 'Gold',
    responseTime: '8 hours',
    maintenanceVisits: { included: 6, used: 6 },
    emergencyServices: '10 incidents/year',
    coveredEquipment: ['AST-001', 'AST-002'],
    value: 12000.00,
    nextRenewal: null,
    slaTerms: {
      critical: '8 hours',
      high: '16 hours',
      medium: '48 hours',
      low: '72 hours',
    },
    coverage: [
      'Scheduled preventive maintenance',
      'Business hours support',
      'Parts at additional cost',
      'Standard technical support',
    ],
    exclusions: [
      'Damage due to misuse',
      'Third-party modifications',
      'Natural disasters',
      'Cosmetic repairs',
    ],
  },
  {
    id: 'CNT-2024-018',
    name: 'Extended Warranty - Hydraulic Press',
    type: 'Warranty Extension',
    startDate: '2024-01-15',
    endDate: '2026-01-15',
    status: 'active',
    coverageLevel: 'Extended Warranty',
    responseTime: 'Best effort',
    maintenanceVisits: { included: 0, used: 0 },
    emergencyServices: 'Not included',
    coveredEquipment: ['AST-001'],
    value: 3500.00,
    nextRenewal: null,
    slaTerms: {
      critical: '5 business days',
      high: '10 business days',
      medium: '15 business days',
      low: '20 business days',
    },
    coverage: [
      'Manufacturing defects',
      'Component failures',
      'Parts replacement covered',
    ],
    exclusions: [
      'Wear and tear',
      'Damage due to misuse',
      'Third-party modifications',
      'Preventive maintenance',
    ],
  },
];

export default function CustomerContracts() {
  const [expandedContract, setExpandedContract] = useState<string | null>(null);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'expiring':
        return { color: 'bg-yellow-100 text-yellow-700', icon: Clock };
      case 'expired':
        return { color: 'bg-red-100 text-red-700', icon: AlertCircle };
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: FileText };
    }
  };

  const getCoverageLevelColor = (level: string) => {
    switch (level) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-700';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-700';
      case 'Silver':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Contracts & SLA
          </h1>
          <p className="text-sm text-gray-500">
            View your service agreements, warranty details, and SLA terms
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Contracts</p>
                <p className="text-3xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === 'active').length}
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
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + c.value, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Covered Assets</p>
                <p className="text-3xl font-bold text-gray-900">4</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Next Renewal</p>
                <p className="text-xl font-bold text-gray-900">32 days</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="space-y-6">
          {contracts.map((contract) => {
            const statusConfig = getStatusConfig(contract.status);
            const StatusIcon = statusConfig.icon;
            const isExpanded = expandedContract === contract.id;

            return (
              <div key={contract.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Contract Header */}
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{contract.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium ${statusConfig.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {contract.status}
                        </span>
                        <span className={`inline-flex px-3 py-1 rounded-md text-xs font-medium ${getCoverageLevelColor(contract.coverageLevel)}`}>
                          {contract.coverageLevel}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{contract.type} • Contract ID: {contract.id}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Contract Period</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Response Time</p>
                          <p className="text-sm font-medium text-gray-900">{contract.responseTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Maintenance Visits</p>
                          <p className="text-sm font-medium text-gray-900">
                            {contract.maintenanceVisits.used} / {contract.maintenanceVisits.included} used
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Annual Value</p>
                          <p className="text-sm font-medium text-gray-900">${contract.value.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedContract(isExpanded ? null : contract.id)}
                      className="ml-4 px-4 py-2 text-sm font-medium text-[#C8102E] hover:bg-red-50 rounded-lg transition-colors"
                    >
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 py-5 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* SLA Terms */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">SLA Response Times</h4>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
                          {Object.entries(contract.slaTerms).map(([priority, time]) => (
                            <div key={priority} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 capitalize">{priority} Priority:</span>
                              <span className="text-sm font-medium text-gray-900">{time}</span>
                            </div>
                          ))}
                        </div>

                        <h4 className="font-semibold text-gray-900 mt-4 mb-3">Covered Equipment</h4>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="flex flex-wrap gap-2">
                            {contract.coveredEquipment.map((assetId) => (
                              <span key={assetId} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                {assetId}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Coverage Details */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Coverage Scope</h4>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                          <ul className="space-y-2">
                            {contract.coverage.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <h4 className="font-semibold text-gray-900 mb-3">Exclusions</h4>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <ul className="space-y-2">
                            {contract.exclusions.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2.5 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors">
                        <Download className="w-4 h-4" />
                        Download Contract
                      </button>
                      {contract.status === 'active' && contract.nextRenewal && (
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-[#C8102E] text-[#C8102E] rounded-lg hover:bg-red-50 transition-colors">
                          <Calendar className="w-4 h-4" />
                          Renew Contract
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
