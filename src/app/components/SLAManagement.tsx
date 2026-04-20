import { Clock, AlertCircle, CheckCircle2, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';

interface SLAPolicy {
  id: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  responseTime: string;
  resolutionTime: string;
  escalationTime: string;
  description: string;
  priorityColor: string;
  priorityBgColor: string;
  priorityBorderColor: string;
  icon: JSX.Element;
}

export default function SLAManagement() {
  const navigate = useNavigate();

  const slaPolicies: SLAPolicy[] = [
    {
      id: '1',
      priority: 'Critical',
      responseTime: '15 minutes',
      resolutionTime: '2 hours',
      escalationTime: '30 minutes',
      description: 'System down, production stopped, or major business impact',
      priorityColor: 'text-[#C8102E]',
      priorityBgColor: 'bg-red-50',
      priorityBorderColor: 'border-[#C8102E]',
      icon: <AlertCircle className="w-6 h-6 text-[#C8102E]" />,
    },
    {
      id: '2',
      priority: 'High',
      responseTime: '30 minutes',
      resolutionTime: '4 hours',
      escalationTime: '1 hour',
      description: 'Significant functionality affected, urgent delivery issues',
      priorityColor: 'text-orange-600',
      priorityBgColor: 'bg-orange-50',
      priorityBorderColor: 'border-orange-600',
      icon: <Zap className="w-6 h-6 text-orange-600" />,
    },
    {
      id: '3',
      priority: 'Medium',
      responseTime: '2 hours',
      resolutionTime: '8 hours',
      escalationTime: '4 hours',
      description: 'Minor functionality affected, delayed shipments',
      priorityColor: 'text-yellow-600',
      priorityBgColor: 'bg-yellow-50',
      priorityBorderColor: 'border-yellow-600',
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
    },
    {
      id: '4',
      priority: 'Low',
      responseTime: '4 hours',
      resolutionTime: '24 hours',
      escalationTime: '8 hours',
      description: 'General inquiries, documentation requests, minor issues',
      priorityColor: 'text-green-600',
      priorityBgColor: 'bg-green-50',
      priorityBorderColor: 'border-green-600',
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    },
  ];

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">SLA Management</h1>
        <p className="text-sm text-gray-600">
          Service Level Agreement policies for support ticket priorities
        </p>
      </div>

      {/* SLA Cards */}
      <div className="space-y-6">
        {slaPolicies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {/* Card Header */}
            <div className={`${policy.priorityBgColor} px-6 py-5 border-b border-gray-200`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {policy.icon}
                  <div>
                    <h2 className={`text-lg font-semibold ${policy.priorityColor}`}>
                      {policy.priority} Priority
                    </h2>
                    <p className="text-sm text-gray-600 mt-0.5">{policy.description}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg bg-white border-2 ${policy.priorityBorderColor}`}>
                  <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide text-center mb-0.5">
                    Priority Level
                  </div>
                  <div className={`text-xl font-bold ${policy.priorityColor} text-center`}>
                    {policy.priority}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body - SLA Metrics */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Response Time */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                      Response Time
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">
                    {policy.responseTime}
                  </div>
                  <p className="text-xs text-blue-700">
                    Initial acknowledgement to customer
                  </p>
                </div>

                {/* Resolution Time */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-xs font-semibold text-green-900 uppercase tracking-wide">
                      Resolution Time
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-green-900 mb-1">
                    {policy.resolutionTime}
                  </div>
                  <p className="text-xs text-green-700">
                    Complete issue resolution deadline
                  </p>
                </div>

                {/* Escalation Time */}
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-purple-600" />
                    <h3 className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                      Escalation Time
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-purple-900 mb-1">
                    {policy.escalationTime}
                  </div>
                  <p className="text-xs text-purple-700">
                    Auto-escalate if unresolved
                  </p>
                </div>
              </div>

              {/* SLA Coverage Details */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">SLA Coverage Details:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#C8102E] font-bold mt-0.5">•</span>
                    <span>Tickets are automatically assigned to agents based on priority</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#C8102E] font-bold mt-0.5">•</span>
                    <span>SLA timer starts when ticket is created</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#C8102E] font-bold mt-0.5">•</span>
                    <span>Escalations are sent to senior support managers</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#C8102E] font-bold mt-0.5">•</span>
                    <span>All times calculated during business hours (8 AM - 8 PM, Mon-Fri)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}