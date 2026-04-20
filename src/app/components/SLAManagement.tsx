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

      {/* SLA Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority Level</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Policy Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Resolution Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Escalation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {slaPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${policy.priorityBgColor}`}>
                        {policy.icon}
                      </div>
                      <span className={`font-bold ${policy.priorityColor}`}>
                        {policy.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-600 max-w-xs">{policy.description}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-900">{policy.responseTime}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5 whitespace-nowrap">Initial response</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-gray-900">{policy.resolutionTime}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5 whitespace-nowrap">Full resolution</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-900">{policy.escalationTime}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5 whitespace-nowrap">Auto-escalate</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLA Coverage Details Footer */}
      <div className="mt-8 bg-[#F8FAFC] rounded-xl border border-blue-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-900">SLA Coverage Rules</h4>
            <p className="text-xs text-gray-500 italic">Governing terms for automated support escalation</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">Tickets automatically assigned to agents based on priority levels</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">SLA timer starts immediately upon ticket creation</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">Escalations are automatically routed to senior management</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">Calculation limited to business hours (8 AM - 8 PM, Mon-Fri)</p>
          </div>
        </div>
      </div>
    </div>
  );
}