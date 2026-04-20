import { useState } from 'react';
import { MessageSquare, Send, Paperclip, User, Calendar, Tag, Clock, AlertCircle, ChevronDown, CheckCircle, FileText, ArrowLeft, Package, X, MessageCircle, HelpCircle, AlertTriangle, Users, Loader2, Sparkles, Truck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import customerPhoto from 'figma:asset/fd383cc16a26e9b6919854dcabd4d7c098fb71ce.png';

interface OrderData {
  orderNumber: string;
  orderStatus: string[];
  deliveryStatus: string;
  warehouseStock: string;
  supplierETA: string;
  backorder: boolean;
  partNumber: string;
  partDescription: string;
  quantityOrdered: number;
  unitPrice: string;
  totalAmount: string;
  orderDate: string;
  expectedShipDate: string;
}

interface ShipmentData {
  trackingNumber: string;
  estimatedDelivery: string;
  carrier: string;
  serviceType: string;
  shippedDate: string;
  currentStatus: string;
  destination: string;
  weight: string;
  currentLocation: string;
}

interface TicketInfo {
  category: string;
  priority: string;
  subject: string;
  description: string;
  customerName: string;
  customerEmail: string;
  dealerName: string;
  submittedDate: string;
  lastUpdated: string;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'customer';
  senderName: string;
  message: string;
  timestamp: string;
}

export default function TicketView() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticketInfo] = useState<TicketInfo>({
    category: 'Delivery',
    priority: 'High',
    subject: 'Part Missing',
    description: 'We placed order ORD-89234 three days ago for brake pads (Part #BP-4582) and were expecting delivery today. However, we haven\'t received any shipment and our customer is waiting. Can you please check the status urgently?',
    customerName: 'John Smith',
    customerEmail: 'john.smith@autopartsdirect.com',
    dealerName: 'AutoParts Direct',
    submittedDate: '2024-03-08 10:30 AM',
    lastUpdated: '2 hours ago',
  });

  const [orderData] = useState<OrderData>({
    orderNumber: 'ORD-89234',
    orderStatus: ['Processing', 'In Transit'],
    deliveryStatus: 'In Transit',
    warehouseStock: '5 units available',
    supplierETA: 'Mar 5, 2026',
    backorder: true,
    partNumber: 'BP-4582',
    partDescription: 'Brake pads',
    quantityOrdered: 2,
    unitPrice: '$25.00',
    totalAmount: '$50.00',
    orderDate: 'Mar 2, 2026',
    expectedShipDate: 'Mar 5, 2026',
  });

  const [shipmentData] = useState<ShipmentData>({
    trackingNumber: 'TRK-45892341',
    estimatedDelivery: 'Mar 5, 2026 by 5:00 PM',
    carrier: 'FedEx',
    serviceType: 'Standard Overnight',
    shippedDate: 'Mar 3, 2026',
    currentStatus: 'On Time',
    destination: '123 Main St, Anytown, USA',
    weight: '2 lbs',
    currentLocation: 'Chicago Distribution Center',
  });

  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true);

  // Shared teams data
  const teams = [
    {
      id: 'delivery',
      name: 'Delivery & Logistics',
      description: 'Handles shipment and delivery issues',
      members: [
        { id: 'sj', name: 'Sarah Johnson', role: 'Senior Agent', avatar: 'SJ', available: true },
        { id: 'rk', name: 'Raj Kumar', role: 'Logistics Specialist', avatar: 'RK', available: true },
        { id: 'aw', name: 'Amy Wilson', role: 'Delivery Coordinator', avatar: 'AW', available: false },
      ],
    },
    {
      id: 'technical',
      name: 'Technical Support',
      description: 'Handles product and technical issues',
      members: [
        { id: 'mc', name: 'Michael Chen', role: 'Technical Lead', avatar: 'MC', available: true },
        { id: 'lt', name: 'Laura Torres', role: 'Support Engineer', avatar: 'LT', available: true },
      ],
    },
    {
      id: 'billing',
      name: 'Billing & Accounts',
      description: 'Handles invoices and payment issues',
      members: [
        { id: 'eb', name: 'Emma Brown', role: 'Billing Specialist', avatar: 'EB', available: true },
        { id: 'jl', name: 'James Lee', role: 'Accounts Manager', avatar: 'JL', available: false },
      ],
    },
  ];

  // Assign to Team modal state
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [assignReason, setAssignReason] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState(false);

  const selectedTeamData = teams.find(t => t.id === selectedTeam);

  const handleAssignToTeam = () => {
    if (!selectedTeam || !selectedMember || !assignReason.trim()) return;
    setIsAssigning(true);
    setTimeout(() => {
      setIsAssigning(false);
      setAssignSuccess(true);
      setShowAssignModal(false);
      setSelectedTeam('');
      setSelectedMember('');
      setAssignReason('');
      setTimeout(() => setAssignSuccess(false), 3500);
    }, 1800);
  };

  // Escalate modal state
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalateLevel, setEscalateLevel] = useState('');
  const [escalateTeam, setEscalateTeam] = useState('');
  const [escalateMember, setEscalateMember] = useState('');
  const [escalateReason, setEscalateReason] = useState('');
  const [isEscalating, setIsEscalating] = useState(false);
  const [escalateSuccess, setEscalateSuccess] = useState(false);

  const escalateLevels = [
    { id: 'tier1', label: 'Tier 1 – Team Lead', description: 'Assign to a senior team member for review', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { id: 'tier2', label: 'Tier 2 – Department Manager', description: 'Escalate to department management level', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { id: 'tier3', label: 'Tier 3 – Executive', description: 'Critical escalation to executive level', color: 'bg-red-100 text-red-700 border-red-300' },
  ];

  const escalateTeamData = teams.find(t => t.id === escalateTeam);

  const handleEscalate = () => {
    if (!escalateLevel || !escalateTeam || !escalateMember || !escalateReason.trim()) return;
    setIsEscalating(true);
    setTimeout(() => {
      setIsEscalating(false);
      setEscalateSuccess(true);
      setShowEscalateModal(false);
      setEscalateLevel('');
      setEscalateTeam('');
      setEscalateMember('');
      setEscalateReason('');
      setTimeout(() => setEscalateSuccess(false), 3500);
    }, 1800);
  };

  // Timeline filter state
  const [timelineFilter, setTimelineFilter] = useState('all');

  const timelineEvents = [
    { id: 1, type: 'created', icon: 'FileText', color: 'bg-blue-100 text-blue-600', title: 'Ticket Created', detail: 'TKT-10234 opened by John Smith (AutoParts Direct)', actor: 'System', actorInitials: 'SY', actorColor: 'bg-gray-400', timestamp: '2024-03-08 10:30 AM', changes: [] },
    { id: 2, type: 'assignment', icon: 'User', color: 'bg-purple-100 text-purple-600', title: 'Ticket Assigned', detail: 'Assigned to Mike Chen via auto-routing (Delivery queue)', actor: 'System', actorInitials: 'SY', actorColor: 'bg-gray-400', timestamp: '2024-03-08 10:31 AM', changes: [{ label: 'Assigned To', from: 'Unassigned', to: 'Mike Chen' }] },
    { id: 3, type: 'status', icon: 'RefreshCw', color: 'bg-amber-100 text-amber-600', title: 'Status Changed', detail: 'Status updated from Open to In Progress', actor: 'Mike Chen', actorInitials: 'MC', actorColor: 'bg-[#C8102E]', timestamp: '2024-03-08 10:45 AM', changes: [{ label: 'Status', from: 'Open', to: 'In Progress' }] },
    { id: 4, type: 'note', icon: 'MessageSquare', color: 'bg-green-100 text-green-600', title: 'Internal Note Added', detail: 'Checked SAP — order ORD-89234 shows backorder flag on Part #BP-4582. Contacting warehouse team.', actor: 'Mike Chen', actorInitials: 'MC', actorColor: 'bg-[#C8102E]', timestamp: '2024-03-08 11:00 AM', changes: [] },
    { id: 5, type: 'customer', icon: 'MessageCircle', color: 'bg-sky-100 text-sky-600', title: 'Customer Reply', detail: '"Yes, the hydraulic pump (P-123456) was not included in the package."', actor: 'John Smith', actorInitials: 'JS', actorColor: 'bg-blue-500', timestamp: '2024-03-08 11:30 AM', changes: [] },
    { id: 6, type: 'assignment', icon: 'Users', color: 'bg-purple-100 text-purple-600', title: 'Reassigned to Team', detail: 'Ticket reassigned to Delivery & Logistics team — Sarah Johnson', actor: 'Mike Chen', actorInitials: 'MC', actorColor: 'bg-[#C8102E]', timestamp: '2024-03-08 12:00 PM', changes: [{ label: 'Assigned To', from: 'Mike Chen', to: 'Sarah Johnson' }, { label: 'Team', from: 'General Support', to: 'Delivery & Logistics' }] },
    { id: 7, type: 'priority', icon: 'AlertCircle', color: 'bg-red-100 text-red-600', title: 'Priority Changed', detail: 'Priority escalated due to SLA breach risk', actor: 'Sarah Johnson', actorInitials: 'SJ', actorColor: 'bg-indigo-500', timestamp: '2024-03-08 01:15 PM', changes: [{ label: 'Priority', from: 'Medium', to: 'High' }] },
    { id: 8, type: 'escalation', icon: 'AlertTriangle', color: 'bg-orange-100 text-orange-600', title: 'Ticket Escalated', detail: 'Escalated to Tier 2 — Department Manager. Reason: SLA approaching and backorder unresolved.', actor: 'Sarah Johnson', actorInitials: 'SJ', actorColor: 'bg-indigo-500', timestamp: '2024-03-08 02:00 PM', changes: [{ label: 'Escalation Level', from: '—', to: 'Tier 2 – Department Manager' }] },
    { id: 9, type: 'response', icon: 'Send', color: 'bg-teal-100 text-teal-600', title: 'Response Sent to Customer', detail: 'Agent sent: "Your shipment is in transit. Estimated delivery Mar 5 by 5:00 PM via FedEx."', actor: 'Sarah Johnson', actorInitials: 'SJ', actorColor: 'bg-indigo-500', timestamp: '2024-03-08 02:30 PM', changes: [] },
    { id: 10, type: 'status', icon: 'Clock', color: 'bg-amber-100 text-amber-600', title: 'Status Changed', detail: 'Waiting on customer confirmation of delivery', actor: 'Sarah Johnson', actorInitials: 'SJ', actorColor: 'bg-indigo-500', timestamp: '2024-03-08 03:00 PM', changes: [{ label: 'Status', from: 'In Progress', to: 'Waiting on Customer' }] },
  ];

  const timelineFilterTypes = [
    { key: 'all', label: 'All' },
    { key: 'status', label: 'Status Changes' },
    { key: 'assignment', label: 'Assignments' },
    { key: 'escalation', label: 'Escalations' },
    { key: 'note', label: 'Notes' },
    { key: 'customer', label: 'Customer' },
  ];

  const timelineIconMap: Record<string, React.ElementType> = {
    FileText, User, Users, AlertCircle, AlertTriangle, MessageSquare, Send, CheckCircle, Clock, MessageCircle,
    RefreshCw: Clock,
  };

  const filteredEvents = timelineFilter === 'all' ? timelineEvents : timelineEvents.filter(e => e.type === timelineFilter);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'customer',
      senderName: 'John Doe',
      message: 'Yes, the hydraulic pump (P-123456) was not included in the package.',
      timestamp: '1 hour ago',
    },
    {
      id: '2',
      sender: 'agent',
      senderName: 'Sarah Johnson',
      message: 'Thank you for confirming. I\'ve checked with our warehouse and we\'ll ship the missing part today. You should receive it by March 4th.',
      timestamp: '45 min ago',
    },
    {
      id: '3',
      sender: 'customer',
      senderName: 'John Doe',
      message: 'Hi',
      timestamp: 'Just now',
    },
  ]);

  const handleSendResponse = () => {
    if (response.trim()) {
      console.log('Sending response:', response);
      setResponse('');
    }
  };

  const handleSendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'agent',
        senderName: 'Mike Chen',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleGenerateAIResponse = async () => {
    setIsGeneratingResponse(true);

    // Simulate AI response generation with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate professional email response based on all available data
    const aiResponse = `Dear ${ticketInfo.customerName},

Thank you for contacting us regarding your order ${orderData.orderNumber}. I understand your concern about the delivery delay for the ${orderData.partDescription} (Part #${orderData.partNumber}).

I've reviewed your order details and current shipment status:

ORDER STATUS:
Your order placed on ${orderData.orderDate} is currently ${orderData.orderStatus.join(' and ')}. The part is showing as ${orderData.backorder ? 'backordered' : 'in stock'} in our system.

SHIPMENT TRACKING:
The good news is that your shipment is actively in transit with ${shipmentData.carrier}. Here are the details:
• Tracking Number: ${shipmentData.trackingNumber}
• Current Location: ${shipmentData.currentLocation}
• Estimated Delivery: ${shipmentData.estimatedDelivery}
• Service Type: ${shipmentData.serviceType}

The shipment is currently ${shipmentData.currentStatus.toLowerCase()} and progressing as scheduled. Based on the latest scan, your package is expected to arrive at your location (${shipmentData.destination}) by ${shipmentData.estimatedDelivery}.

${orderData.backorder ? `\nREGARDING BACKORDER:\nI see that this item was on backorder. However, we have ${orderData.warehouseStock} now available, and the supplier ETA shows ${orderData.supplierETA} for additional stock.\n` : ''}
ACTION TAKEN:
I have escalated this with our logistics team to ensure priority handling. You will receive automated tracking updates, and I will personally monitor this shipment until delivery is confirmed.

If you need any further assistance or have additional questions, please don't hesitate to reach out. You can also track your shipment directly using the tracking number provided above on the ${shipmentData.carrier} website.

We apologize for any inconvenience this delay may have caused and appreciate your patience.

Best regards,
Mike Chen
Support Agent
Aftermarket Service Support System`;

    setResponse(aiResponse);
    setIsGeneratingResponse(false);
  };

  return (
    <div className="px-8 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Dashboard</span>
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">TKT-10234</h1>
          <p className="text-sm text-gray-500">
            {ticketInfo.dealerName} • Order: {orderData.orderNumber}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Escalate Button */}
          <button
            onClick={() => setShowEscalateModal(true)}
            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Escalate
          </button>
          {/* Assign to Team Button */}
          <button
            onClick={() => setShowAssignModal(true)}
            className="px-5 py-2.5 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#A00D25] transition-colors flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Assign to Team
          </button>
          {/* SLA Timer */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 rounded-lg">
            <Clock className="w-4 h-4 text-[#C8102E]" />
            <div className="text-left">
              <div className="text-xs text-gray-600">SLA: 2h 15m</div>
              <div className="text-xs text-gray-600">remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Top Row: Ticket Information, Actions, Response */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Ticket Information</h2>

            {/* Category and Priority */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                  Category
                </label>
                <span className="inline-flex px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                  {ticketInfo.category}
                </span>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                  Priority
                </label>
                <span className={`inline-flex px-3 py-1.5 rounded-lg text-sm font-medium ${getPriorityColor(ticketInfo.priority)}`}>
                  {ticketInfo.priority}
                </span>
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                Subject
              </label>
              <p className="text-sm font-semibold text-gray-900">{ticketInfo.subject}</p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                Description
              </label>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">{ticketInfo.description}</p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Customer Name
                </label>
                <p className="text-sm font-medium text-gray-900">{ticketInfo.customerName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Email
                </label>
                <p className="text-sm text-gray-700">{ticketInfo.customerEmail}</p>
              </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-gray-200">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Submitted
                </label>
                <p className="text-sm text-gray-700">{ticketInfo.submittedDate}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Last Updated
                </label>
                <p className="text-sm text-gray-700">{ticketInfo.lastUpdated}</p>
              </div>
            </div>
          </div>

          {/* Actions Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Actions</h2>

            {/* Status */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Waiting on Customer">Waiting on Customer</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Status Update Text */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                Status Update Note
              </label>
              <textarea
                placeholder="Add a note about this status change..."
                rows={3}
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none"
              />
            </div>

            {/* Update Status Button */}
            <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors mt-auto">
              Update Status
            </button>
          </div>

          {/* Response Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Response to Customer</h2>
              <button
                onClick={handleGenerateAIResponse}
                disabled={isGeneratingResponse}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-xs font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingResponse ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate AI Response
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Click 'Generate AI Response' to create a professional email draft based on order and shipment data..."
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none flex-1 mb-3"
                rows={6}
              />
              <button
                onClick={handleSendResponse}
                disabled={!response.trim()}
                className="w-full px-4 py-2.5 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#A00D25] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Send Response
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Order Information + Shipment Tracking */}
        <div className="grid grid-cols-2 gap-6">
          {/* Order Information Card */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Package className="w-5 h-5" />
                <span className="font-semibold text-sm">Order Information</span>
              </div>
              <span className="px-3 py-1 bg-white text-blue-600 rounded text-xs font-semibold">SAP</span>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Order Number</div>
                  <div className="text-xl font-bold text-gray-900">{orderData.orderNumber}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    Processing
                  </span>
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    In Transit
                  </span>
                </div>
              </div>

              {/* Backorder Alert */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2.5 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <span className="text-xs font-medium text-yellow-800">Item on Backorder</span>
              </div>

              {/* Order Details Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Part Number</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2.5 text-sm font-medium text-gray-900">{orderData.partNumber}</td>
                      <td className="px-3 py-2.5 text-sm text-gray-700">{orderData.partDescription}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1">Quantity</div>
                  <div className="text-sm font-semibold text-gray-900">{orderData.quantityOrdered}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1">Unit Price</div>
                  <div className="text-sm font-semibold text-gray-900">{orderData.unitPrice}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1">Total</div>
                  <div className="text-sm font-bold text-[#C8102E]">{orderData.totalAmount}</div>
                </div>
              </div>

              {/* Timeline and Inventory */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Timeline</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-blue-700 font-medium">Order Date</div>
                      <div className="text-sm font-semibold text-blue-900">{orderData.orderDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-700 font-medium">Expected Ship</div>
                      <div className="text-sm font-semibold text-blue-900">{orderData.expectedShipDate}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-semibold text-green-900 uppercase tracking-wide">Inventory</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-green-700 font-medium">Warehouse</div>
                      <div className="text-sm font-semibold text-green-900">{orderData.warehouseStock}</div>
                    </div>
                    <div>
                      <div className="text-xs text-green-700 font-medium">Supplier ETA</div>
                      <div className="text-sm font-semibold text-green-900">{orderData.supplierETA}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Tracking Card */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-purple-700 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Truck className="w-5 h-5" />
                <span className="font-semibold text-sm">Shipment Tracking</span>
              </div>
              <span className="px-3 py-1 bg-white text-purple-700 rounded text-xs font-semibold">FedEx</span>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Tracking Number</div>
                <div className="text-xl font-bold text-gray-900">{shipmentData.trackingNumber}</div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  In Transit
                </span>
              </div>

              {/* Estimated Delivery */}
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-900 uppercase tracking-wide">Estimated Delivery</span>
                </div>
                <div className="text-base font-bold text-green-900">{shipmentData.estimatedDelivery}</div>
              </div>

              {/* Carrier and Service */}
              <div className="bg-purple-50 rounded-lg p-3 mb-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-purple-700 uppercase tracking-wide mb-1">Carrier</div>
                  <div className="text-sm font-bold text-purple-900">{shipmentData.carrier}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-purple-700 uppercase tracking-wide mb-1">Service</div>
                  <div className="text-sm font-bold text-purple-900">{shipmentData.serviceType}</div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1">Shipped</div>
                  <div className="text-sm font-semibold text-gray-900">{shipmentData.shippedDate}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1">Weight</div>
                  <div className="text-sm font-semibold text-gray-900">{shipmentData.weight}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1">Status</div>
                  <div className="text-sm font-semibold text-green-600">{shipmentData.currentStatus}</div>
                </div>
              </div>

              {/* Location Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs font-semibold text-orange-900 uppercase tracking-wide">Current Location</span>
                  </div>
                  <div className="text-sm font-bold text-orange-900">{shipmentData.currentLocation}</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Destination</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{shipmentData.destination}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Ticket Activity Timeline ── */}
      {(() => {
        const allEvents = [
          {
            id: 1,
            type: 'created',
            icon: 'FileText',
            color: 'bg-blue-100 text-blue-600',
            title: 'Ticket Created',
            detail: 'TKT-10234 opened by John Smith (AutoParts Direct)',
            actor: 'System',
            actorInitials: 'SY',
            actorColor: 'bg-gray-400',
            timestamp: '2024-03-08 10:30 AM',
            changes: [],
          },
          {
            id: 2,
            type: 'assignment',
            icon: 'User',
            color: 'bg-purple-100 text-purple-600',
            title: 'Ticket Assigned',
            detail: 'Assigned to Mike Chen via auto-routing (Delivery queue)',
            actor: 'System',
            actorInitials: 'SY',
            actorColor: 'bg-gray-400',
            timestamp: '2024-03-08 10:31 AM',
            changes: [{ label: 'Assigned To', from: 'Unassigned', to: 'Mike Chen' }],
          },
          {
            id: 3,
            type: 'status',
            icon: 'RefreshCw',
            color: 'bg-amber-100 text-amber-600',
            title: 'Status Changed',
            detail: 'Status updated from Open to In Progress',
            actor: 'Mike Chen',
            actorInitials: 'MC',
            actorColor: 'bg-[#C8102E]',
            timestamp: '2024-03-08 10:45 AM',
            changes: [{ label: 'Status', from: 'Open', to: 'In Progress' }],
          },
          {
            id: 4,
            type: 'note',
            icon: 'MessageSquare',
            color: 'bg-green-100 text-green-600',
            title: 'Internal Note Added',
            detail: 'Checked SAP — order ORD-89234 shows backorder flag on Part #BP-4582. Contacting warehouse team to check stock.',
            actor: 'Mike Chen',
            actorInitials: 'MC',
            actorColor: 'bg-[#C8102E]',
            timestamp: '2024-03-08 11:00 AM',
            changes: [],
          },
          {
            id: 5,
            type: 'customer',
            icon: 'Mail',
            color: 'bg-sky-100 text-sky-600',
            title: 'Customer Reply',
            detail: '"Yes, the hydraulic pump (P-123456) was not included in the package."',
            actor: 'John Smith',
            actorInitials: 'JS',
            actorColor: 'bg-blue-500',
            timestamp: '2024-03-08 11:30 AM',
            changes: [],
          },
          {
            id: 6,
            type: 'assignment',
            icon: 'Users',
            color: 'bg-purple-100 text-purple-600',
            title: 'Reassigned to Team',
            detail: 'Ticket reassigned to Delivery & Logistics team — Sarah Johnson',
            actor: 'Mike Chen',
            actorInitials: 'MC',
            actorColor: 'bg-[#C8102E]',
            timestamp: '2024-03-08 12:00 PM',
            changes: [
              { label: 'Assigned To', from: 'Mike Chen', to: 'Sarah Johnson' },
              { label: 'Team', from: 'General Support', to: 'Delivery & Logistics' },
            ],
          },
          {
            id: 7,
            type: 'priority',
            icon: 'AlertCircle',
            color: 'bg-red-100 text-red-600',
            title: 'Priority Changed',
            detail: 'Priority escalated due to SLA breach risk',
            actor: 'Sarah Johnson',
            actorInitials: 'SJ',
            actorColor: 'bg-indigo-500',
            timestamp: '2024-03-08 01:15 PM',
            changes: [{ label: 'Priority', from: 'Medium', to: 'High' }],
          },
          {
            id: 8,
            type: 'escalation',
            icon: 'AlertTriangle',
            color: 'bg-orange-100 text-orange-600',
            title: 'Ticket Escalated',
            detail: 'Escalated to Tier 2 — Department Manager. Reason: SLA approaching and backorder unresolved.',
            actor: 'Sarah Johnson',
            actorInitials: 'SJ',
            actorColor: 'bg-indigo-500',
            timestamp: '2024-03-08 02:00 PM',
            changes: [{ label: 'Escalation Level', from: '—', to: 'Tier 2 – Department Manager' }],
          },
          {
            id: 9,
            type: 'response',
            icon: 'Send',
            color: 'bg-teal-100 text-teal-600',
            title: 'Response Sent to Customer',
            detail: 'Agent sent update: "Your shipment is in transit. Estimated delivery Mar 5 by 5:00 PM via FedEx."',
            actor: 'Sarah Johnson',
            actorInitials: 'SJ',
            actorColor: 'bg-indigo-500',
            timestamp: '2024-03-08 02:30 PM',
            changes: [],
          },
          {
            id: 10,
            type: 'status',
            icon: 'RefreshCw',
            color: 'bg-amber-100 text-amber-600',
            title: 'Status Changed',
            detail: 'Waiting on customer confirmation of delivery',
            actor: 'Sarah Johnson',
            actorInitials: 'SJ',
            actorColor: 'bg-indigo-500',
            timestamp: '2024-03-08 03:00 PM',
            changes: [{ label: 'Status', from: 'In Progress', to: 'Waiting on Customer' }],
          },
        ];

        const filterTypes = [
          { key: 'all', label: 'All' },
          { key: 'status', label: 'Status Changes' },
          { key: 'assignment', label: 'Assignments' },
          { key: 'escalation', label: 'Escalations' },
          { key: 'note', label: 'Notes' },
          { key: 'customer', label: 'Customer' },
        ];

        // Note: Using component-level state defined above if needed, 
        // but for this UI block we'll use local defaults if not already defined.
        const filtered = timelineFilter === 'all' ? allEvents : allEvents.filter(e => e.type === timelineFilter);

        const iconMap: Record<string, React.ElementType> = {
          FileText, User, Users, AlertCircle, AlertTriangle, MessageSquare, Send, CheckCircle, Clock,
          RefreshCw: Clock, Mail: MessageSquare,
        };

        return (
          <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Activity Timeline</h2>
                  <p className="text-xs text-gray-500">{allEvents.length} events recorded</p>
                </div>
              </div>
              {/* Filter Pills */}
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {filterTypes.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setTimelineFilter(f.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      timelineFilter === f.key
                        ? 'bg-[#C8102E] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="px-6 py-4 space-y-0">
              {filtered.map((event, index) => {
                const IconComp = iconMap[event.icon] || Clock;
                const isLast = index === filtered.length - 1;
                return (
                  <div key={event.id} className="flex gap-4">
                    {/* Left: icon + connector */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${event.color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      {!isLast && <div className="w-px flex-1 bg-gray-200 my-1" style={{ minHeight: '24px' }} />}
                    </div>

                    {/* Right: content */}
                    <div className={`flex-1 ${!isLast ? 'pb-5' : 'pb-2'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{event.detail}</p>

                          {/* Change pills */}
                          {event.changes.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {event.changes.map((c, i) => (
                                <div key={i} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs">
                                  <span className="text-gray-500 font-medium">{c.label}:</span>
                                  <span className="text-gray-400 line-through">{c.from}</span>
                                  <span className="text-gray-400">→</span>
                                  <span className="text-gray-900 font-semibold">{c.to}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Right: actor + timestamp */}
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <span className="text-xs text-gray-400 whitespace-nowrap">{event.timestamp}</span>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold ${event.actorColor}`}>
                              {event.actorInitials}
                            </div>
                            <span className="text-xs text-gray-500">{event.actor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Help/Chat Button - Fixed at bottom right */}
      <button
        onClick={() => {
          setShowChat(!showChat);
          if (!showChat) {
            setHasUnreadMessages(false); // Mark as read when opening chat
          }
        }}
        className="fixed bottom-4 right-4 w-16 h-16 bg-[#C8102E] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50"
      >
        {/* Unread Message Indicator */}
        {hasUnreadMessages && !showChat && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 border-2 border-white rounded-full flex items-center justify-center z-10">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        )}
        {showChat ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>

      {/* Live Chat Window - Opens above the button */}
      {showChat && (
        <div className="fixed bottom-24 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col h-[500px]">
          {/* Chat Header */}
          <div className="bg-[#C8102E] text-white px-5 py-4 rounded-t-lg">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">Live Chat - TKT-10234</h3>
              <button onClick={() => setShowChat(false)} className="text-white hover:text-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-red-100">Chat with customer for real-time clarification</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${msg.sender === 'agent' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender === 'customer' && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">JS</span>
                      </div>
                    )}
                    <span className="text-xs font-medium text-gray-600">{msg.senderName}</span>
                    <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`px-4 py-2.5 rounded-lg ${msg.sender === 'agent'
                      ? 'bg-[#C8102E] text-white'
                      : 'bg-gray-100 text-gray-900'
                      }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
              <button
                onClick={handleSendChatMessage}
                className="px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Assign to Team Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#C8102E] to-[#A00D25] px-6 py-5 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Assign to Team</h2>
                  <p className="text-xs text-red-200">TKT-10234 · {ticketInfo.subject}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Step 1: Select Team */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  1. Select Team
                </label>
                <div className="space-y-2">
                  {teams.map(team => (
                    <button
                      key={team.id}
                      onClick={() => { setSelectedTeam(team.id); setSelectedMember(''); }}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedTeam === team.id
                          ? 'border-[#C8102E] bg-red-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-semibold ${ selectedTeam === team.id ? 'text-[#C8102E]' : 'text-gray-900' }`}>
                            {team.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{team.description}</p>
                        </div>
                        <span className="text-xs text-gray-400">{team.members.filter(m => m.available).length} available</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Member */}
              {selectedTeamData && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    2. Select Team Member
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedTeamData.members.map(member => (
                      <button
                        key={member.id}
                        onClick={() => member.available && setSelectedMember(member.id)}
                        disabled={!member.available}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          !member.available
                            ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                            : selectedMember === member.id
                            ? 'border-[#C8102E] bg-red-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                            selectedMember === member.id ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {member.avatar}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${ selectedMember === member.id ? 'text-[#C8102E]' : 'text-gray-900' }`}>
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            member.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {member.available ? 'Available' : 'Busy'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Reason */}
              {selectedMember && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    3. Reason for Assignment <span className="text-[#C8102E]">*</span>
                  </label>
                  <textarea
                    value={assignReason}
                    onChange={e => setAssignReason(e.target.value)}
                    placeholder="Explain why this ticket is being assigned to this team / member..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">{assignReason.length} / 500 characters</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignToTeam}
                  disabled={!selectedTeam || !selectedMember || !assignReason.trim() || isAssigning}
                  className="flex-1 px-5 py-2.5 bg-[#C8102E] text-white rounded-xl text-sm font-semibold hover:bg-[#A00D25] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAssigning ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Assigning...</>
                  ) : (
                    <><Users className="w-4 h-4" /> Confirm Assignment</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Success Toast */}
      {assignSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-white border border-green-200 shadow-xl rounded-xl px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Ticket Assigned Successfully</p>
            <p className="text-xs text-gray-500">The team has been notified.</p>
          </div>
        </div>
      )}

      {/* Escalate Success Toast */}
      {escalateSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-white border border-amber-200 shadow-xl rounded-xl px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Ticket Escalated Successfully</p>
            <p className="text-xs text-gray-500">The assigned member has been notified.</p>
          </div>
        </div>
      )}

      {/* Escalate Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Escalate Ticket</h2>
                  <p className="text-xs text-amber-100">TKT-10234 · {ticketInfo.subject}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEscalateModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Step 1: Escalation Level */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  1. Escalation Level
                </label>
                <div className="space-y-2">
                  {escalateLevels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setEscalateLevel(level.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        escalateLevel === level.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-semibold ${ escalateLevel === level.id ? 'text-amber-700' : 'text-gray-900'}`}>
                            {level.label}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{level.description}</p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${level.color}`}>
                          {level.id.toUpperCase()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Team */}
              {escalateLevel && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    2. Assign To Team
                  </label>
                  <div className="space-y-2">
                    {teams.map(team => (
                      <button
                        key={team.id}
                        onClick={() => { setEscalateTeam(team.id); setEscalateMember(''); }}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          escalateTeam === team.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-semibold ${ escalateTeam === team.id ? 'text-amber-700' : 'text-gray-900'}`}>
                              {team.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{team.description}</p>
                          </div>
                          <span className="text-xs text-gray-400">{team.members.filter(m => m.available).length} available</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Select Member */}
              {escalateTeamData && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    3. Select Team Member
                  </label>
                  <div className="space-y-2">
                    {escalateTeamData.members.map(member => (
                      <button
                        key={member.id}
                        onClick={() => member.available && setEscalateMember(member.id)}
                        disabled={!member.available}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          !member.available
                            ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                            : escalateMember === member.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                            escalateMember === member.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {member.avatar}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${ escalateMember === member.id ? 'text-amber-700' : 'text-gray-900'}`}>
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            member.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {member.available ? 'Available' : 'Busy'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Reason */}
              {escalateMember && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    4. Reason for Escalation <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    value={escalateReason}
                    onChange={e => setEscalateReason(e.target.value)}
                    placeholder="Explain why this ticket needs to be escalated..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">{escalateReason.length} / 500 characters</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setShowEscalateModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEscalate}
                  disabled={!escalateLevel || !escalateTeam || !escalateMember || !escalateReason.trim() || isEscalating}
                  className="flex-1 px-5 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-semibold hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isEscalating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Escalating...</>
                  ) : (
                    <><AlertTriangle className="w-4 h-4" /> Confirm Escalation</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}