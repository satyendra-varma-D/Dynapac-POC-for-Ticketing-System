import { useNavigate } from 'react-router';
import { AlertTriangle, Clock, ArrowUpRight, X } from 'lucide-react';
import { useState } from 'react';

interface EscalationTicket {
  id: string;
  priority: 'high' | 'critical';
  dealer: string;
  orderNumber: string;
  issueType: string;
  slaCountdown: string;
  escalationStatus: 'pending' | 'escalated' | 'supervisor-review';
  escalatedBy?: string;
  escalatedAt?: string;
  escalationReason?: string;
}

const escalationTickets: EscalationTicket[] = [
  {
    id: 'TKT-2456',
    priority: 'critical',
    dealer: 'Northern Auto Supply',
    orderNumber: 'ORD-89267',
    issueType: 'Missing Parts',
    slaCountdown: '45m',
    escalationStatus: 'escalated',
    escalatedBy: 'Sarah Johnson',
    escalatedAt: '1h ago',
    escalationReason: 'Multiple failed delivery attempts',
  },
  {
    id: 'TKT-2451',
    priority: 'high',
    dealer: 'AutoParts Direct',
    orderNumber: 'ORD-89234',
    issueType: 'Shipment Delay',
    slaCountdown: '1h 30m',
    escalationStatus: 'pending',
  },
  {
    id: 'TKT-2449',
    priority: 'critical',
    dealer: 'Pacific Motors',
    orderNumber: 'ORD-89212',
    issueType: 'Wrong Part',
    slaCountdown: '2h 10m',
    escalationStatus: 'supervisor-review',
    escalatedBy: 'Lisa Brown',
    escalatedAt: '3h ago',
    escalationReason: 'Customer escalation - VIP account',
  },
  {
    id: 'TKT-2445',
    priority: 'high',
    dealer: 'Coast Auto Supply',
    orderNumber: 'ORD-89156',
    issueType: 'Wrong Part Shipped',
    slaCountdown: '3h 05m',
    escalationStatus: 'pending',
  },
];

export default function SLAEscalationCenter() {
  const navigate = useNavigate();
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const getEscalationStatusColor = (status: EscalationTicket['escalationStatus']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'escalated':
        return 'bg-red-100 text-red-700';
      case 'supervisor-review':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEscalationStatusLabel = (status: EscalationTicket['escalationStatus']) => {
    return status.replace('-', ' ');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">SLA & Escalation Center</h1>
        <p className="text-sm text-gray-500">Monitor and manage tickets at risk of SLA breach</p>
      </div>

      {/* Alert Banner */}
      <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#C8102E] mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">4 tickets at critical SLA risk</p>
          <p className="text-xs text-gray-600 mt-1">
            2 tickets will breach SLA within the next hour. Immediate action required.
          </p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">SLA Risk Tickets</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Priority
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Ticket ID
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Dealer
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Order Number
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Issue Type
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  SLA Remaining
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Escalation Status
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {escalationTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${
                        ticket.priority === 'critical' ? 'text-[#C8102E]' : 'text-orange-500'
                      }`} />
                      <span className={`text-xs font-semibold uppercase ${
                        ticket.priority === 'critical' ? 'text-[#C8102E]' : 'text-orange-500'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-blue-600">{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{ticket.dealer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{ticket.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{ticket.issueType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C8102E]" />
                      <span className="text-sm font-semibold text-[#C8102E]">
                        {ticket.slaCountdown}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-md text-xs font-medium ${getEscalationStatusColor(
                        ticket.escalationStatus
                      )}`}
                    >
                      {getEscalationStatusLabel(ticket.escalationStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/ticket/${ticket.id}`)}
                        className="text-sm font-medium text-[#C8102E] hover:text-[#A00D25] transition-colors"
                      >
                        View
                      </button>
                      {ticket.escalationStatus === 'pending' && (
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket.id);
                            setShowEscalateModal(true);
                          }}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Escalate
                        </button>
                      )}
                      {ticket.escalationStatus !== 'pending' && (
                        <button
                          onClick={() => setShowHistoryModal(true)}
                          className="text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
                        >
                          History
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escalation History Timeline */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-6">Recent Escalation History</h2>
        <div className="space-y-6">
          {escalationTickets
            .filter((t) => t.escalatedBy)
            .map((ticket, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-[#C8102E]" />
                  </div>
                  {index < escalationTickets.filter((t) => t.escalatedBy).length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-1">
                    <button
                      onClick={() => navigate(`/dashboard/ticket/${ticket.id}`)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {ticket.id}
                    </button>
                    <span className="text-xs text-gray-500">{ticket.escalatedAt}</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">{ticket.dealer}</p>
                  <p className="text-sm text-gray-600 mb-2">{ticket.escalationReason}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Escalated by {ticket.escalatedBy}</span>
                    <span>•</span>
                    <span className={`font-medium ${getEscalationStatusColor(ticket.escalationStatus).split(' ')[1]}`}>
                      {getEscalationStatusLabel(ticket.escalationStatus)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Escalate Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Escalate Ticket
                </h3>
                <p className="text-sm text-gray-600">
                  Escalate {selectedTicket} to supervisor team
                </p>
              </div>
              <button
                onClick={() => setShowEscalateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escalation Reason
              </label>
              <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all mb-4">
                <option>SLA Breach Imminent</option>
                <option>Complex Technical Issue</option>
                <option>Customer Escalation Request</option>
                <option>Requires Manager Approval</option>
                <option>Other</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                placeholder="Provide additional context for the escalation..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowEscalateModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEscalateModal(false)}
                className="px-4 py-2 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#A00D25] transition-colors"
              >
                Confirm Escalation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Escalation History</h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="border-l-2 border-[#C8102E] pl-4 py-2">
                <p className="text-sm font-medium text-gray-900 mb-1">Escalated to Supervisor</p>
                <p className="text-xs text-gray-600 mb-1">By Sarah Johnson • 1h ago</p>
                <p className="text-xs text-gray-500">Reason: Multiple failed delivery attempts</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900 mb-1">Ticket Created</p>
                <p className="text-xs text-gray-600">By System • 3h ago</p>
              </div>
            </div>

            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
