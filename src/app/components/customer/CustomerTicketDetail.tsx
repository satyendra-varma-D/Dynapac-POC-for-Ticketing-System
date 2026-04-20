import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Send, Paperclip, ArrowLeft, MessageCircle, X, Package, User, Calendar, AlertCircle, Clock, CheckCircle, FileText, Tag, Truck, DollarSign, MapPin, Hash } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import agentPhoto from 'figma:asset/fd383cc16a26e9b6919854dcabd4d7c098fb71ce.png';

export default function CustomerTicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false); // Toggle for showing chat inline
  
  // Move messages to state so they can be updated
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      name: 'Sarah Johnson',
      message: 'Hello! I see you reported a missing part. Can you confirm which part is missing from your order?',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      sender: 'customer',
      name: 'You',
      message: 'Yes, the hydraulic pump (P-123456) was not included in the package.',
      timestamp: '1 hour ago',
    },
    {
      id: 3,
      sender: 'agent',
      name: 'Sarah Johnson',
      message: 'Thank you for confirming. I\'ve checked with our warehouse and we\'ll ship the missing part today. You should receive it by March 4th.',
      timestamp: '45 min ago',
    },
  ]);

  // Mock ticket data - would come from API/props
  const ticketData = {
    id: ticketId || 'TKT-10234',
    status: 'in-progress',
    title: 'Part Missing from Order',
    issueType: 'Part Missing',
    description: 'Missing component in delivered package – hydraulic pump was not included in the order.',
    assignedTo: 'Sarah Johnson',
    assignedEmail: 'sarah.johnson@aftermarket.com',
    category: 'Delivery',
    // Ticket fields
    createdDate: '2024-03-08',
    lastUpdated: '2 hours ago',
    priority: 'high',
    company: 'Acme Corp',
    expectedResolution: 'March 4, 2026',
    // Order fields
    orderNumber: 'ORD-45676',
    orderDate: '2024-02-28',
    productName: 'Hydraulic Pump HP-3000',
    quantity: 1,
    shipmentId: 'SHIP-789456123',
    partNumber: 'P-45892',
    trackingNumber: 'TRK-9912345678US',
    deliveryStatus: 'delayed',
    estimatedDelivery: '2024-03-12',
    totalAmount: '4,250.00',
    currency: 'USD',
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Create new message object
    const newMsg = {
      id: messages.length + 1,
      sender: 'customer' as const,
      name: 'You',
      message: newMessage,
      timestamp: 'Just now',
    };
    
    // Add message to the messages array
    setMessages([...messages, newMsg]);
    
    // Clear input
    setNewMessage('');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'open':
        return { color: 'bg-blue-100 text-blue-700', label: 'Open' };
      case 'in-progress':
        return { color: 'bg-amber-100 text-amber-700', label: 'In Progress' };
      case 'resolved':
        return { color: 'bg-green-100 text-green-700', label: 'Resolved' };
      case 'closed':
        return { color: 'bg-gray-100 text-gray-700', label: 'Closed' };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: status };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-600', bgColor: 'bg-red-50', label: 'High' };
      case 'medium':
        return { color: 'text-orange-600', bgColor: 'bg-orange-50', label: 'Medium' };
      case 'low':
        return { color: 'text-green-600', bgColor: 'bg-green-50', label: 'Low' };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-50', label: priority };
    }
  };

  const statusConfig = getStatusConfig(ticketData.status);
  const priorityConfig = getPriorityConfig(ticketData.priority);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#F5F6F8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={() => navigate('/customer/tickets')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                {ticketData.id}
              </h1>
              <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
            </div>
            <p className="text-sm text-gray-600">{ticketData.title}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Ticket Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Ticket Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ticket Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#C8102E]" />
                  Ticket Information
                </h2>

                {/* Issue Title */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                    Issue Title
                  </label>
                  <p className="text-sm font-semibold text-gray-900">{ticketData.title}</p>
                </div>

                {/* Description */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                    Issue Description
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">{ticketData.description}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Issue Type */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Issue Type
                    </label>
                    <span className="inline-flex px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-md">
                      {ticketData.issueType}
                    </span>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Issue Category
                    </label>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">{ticketData.category}</span>
                    </div>
                  </div>

                  {/* Order Number */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Order Number
                    </label>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-mono font-semibold text-gray-900">{ticketData.orderNumber}</span>
                    </div>
                  </div>

                  {/* Shipment ID */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Shipment ID
                    </label>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-mono text-gray-900">{ticketData.shipmentId || '—'}</span>
                    </div>
                  </div>

                  {/* Part Number */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Part Number
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-900">{ticketData.partNumber || '—'}</span>
                    </div>
                  </div>

                  {/* Priority Level */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Priority Level
                    </label>
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${priorityConfig.bgColor}`}>
                      <AlertCircle className={`w-4 h-4 ${priorityConfig.color}`} />
                      <span className={`text-sm font-semibold ${priorityConfig.color}`}>{priorityConfig.label}</span>
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Assigned To
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {ticketData.assignedTo.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{ticketData.assignedTo}</p>
                        <p className="text-xs text-gray-500">{ticketData.assignedEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Created Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-900">{ticketData.createdDate}</span>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Last Updated
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-900">{ticketData.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Activity Timeline</h2>
                
                <div className="space-y-4">
                  {/* Timeline Item 1 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Ticket Created</p>
                      <p className="text-xs text-gray-500 mb-2">{ticketData.createdDate} at 10:30 AM</p>
                      <p className="text-sm text-gray-700">You submitted a new support ticket</p>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Ticket Assigned</p>
                      <p className="text-xs text-gray-500 mb-2">30 minutes ago</p>
                      <p className="text-sm text-gray-700">Assigned to <strong>{ticketData.assignedTo}</strong></p>
                    </div>
                  </div>

                  {/* Timeline Item 3 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Status Updated</p>
                      <p className="text-xs text-gray-500 mb-2">{ticketData.lastUpdated}</p>
                      <p className="text-sm text-gray-700">Status changed to <strong>In Progress</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Info & Resolution */}
            <div className="lg:col-span-1 space-y-6">

              {/* Order Information - Rich Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#C8102E] to-[#A00D25] px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Order Information</h3>
                    <p className="text-xs text-red-200 font-mono">{ticketData.orderNumber}</p>
                  </div>
                </div>

                <div className="p-5 space-y-0 divide-y divide-gray-100">

                  {/* Order Date */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium uppercase tracking-wide">Order Date</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{ticketData.orderDate}</span>
                  </div>

                  {/* Product */}
                  <div className="py-3">
                    <div className="flex items-center gap-2 text-gray-500 mb-1.5">
                      <Package className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium uppercase tracking-wide">Product</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 pl-6">{ticketData.productName}</p>
                    <p className="text-xs text-gray-500 pl-6 mt-0.5">Qty: {ticketData.quantity} &nbsp;|&nbsp; Part No: <span className="font-mono">{ticketData.partNumber}</span></p>
                  </div>

                  {/* Shipment ID */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Hash className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium uppercase tracking-wide">Shipment ID</span>
                    </div>
                    <span className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">{ticketData.shipmentId}</span>
                  </div>

                  {/* Tracking Number */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Truck className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium uppercase tracking-wide">Tracking</span>
                    </div>
                    <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-1 rounded">{ticketData.trackingNumber}</span>
                  </div>

                  {/* Delivery Status */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium uppercase tracking-wide">Delivery Status</span>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      ticketData.deliveryStatus === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : ticketData.deliveryStatus === 'delayed'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {ticketData.deliveryStatus.charAt(0).toUpperCase() + ticketData.deliveryStatus.slice(1)}
                    </span>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium uppercase tracking-wide">Est. Delivery</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{ticketData.estimatedDelivery}</span>
                  </div>

                  {/* Order Total */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium uppercase tracking-wide">Order Total</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{ticketData.currency} {ticketData.totalAmount}</span>
                  </div>

                </div>
              </div>

              {/* Expected Resolution */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Estimated Resolution
                    </h4>
                    <p className="text-sm text-blue-800">
                      Your issue should be resolved by <strong>{ticketData.expectedResolution}</strong> when the replacement part arrives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Inline */}
      {showChat && (
          <div className="fixed bottom-24 right-4 w-96 bg-white shadow-2xl border border-gray-200 rounded-lg z-50 flex flex-col h-[500px]">
          {/* Chat Header */}
          <div className="bg-[#C8102E] text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base">Live Chat - {ticketData.id}</h3>
              <p className="text-xs text-red-100">Chat with {ticketData.assignedTo}</p>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === 'customer' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'customer'
                      ? 'bg-[#C8102E]'
                      : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`text-xs font-semibold ${
                      msg.sender === 'customer' ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {msg.sender === 'customer' ? 'You' : msg.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Message Content */}
                <div
                  className={`flex-1 ${
                    msg.sender === 'customer' ? 'text-right' : ''
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-1 ${
                    msg.sender === 'customer' ? 'justify-end' : 'justify-start'
                  }`}>
                    {msg.sender === 'customer' ? (
                      <>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        <span className="text-xs font-semibold text-gray-900">
                          {msg.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-semibold text-gray-900">
                          {msg.name}
                        </span>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </>
                    )}
                  </div>
                  <div
                    className={`inline-block px-3 py-2.5 rounded-lg ${
                      msg.sender === 'customer'
                        ? 'bg-[#C8102E] text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-white rounded-b-lg">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#C8102E] text-white rounded-lg text-sm font-semibold hover:bg-[#A00D25] transition-colors shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Help/Chat Button - Opens Chat */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 w-16 h-16 bg-[#C8102E] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50"
      >
        {showChat ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}