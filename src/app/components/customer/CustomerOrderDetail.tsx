import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Download,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';

export default function CustomerOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Mock order data - in real app, fetch based on orderId
  const orderData = {
    orderNumber: orderId || 'ORD-45678',
    orderDate: 'Feb 28, 2026',
    status: 'in-transit',
    totalAmount: '$2,450.00',
    trackingNumber: 'TRK-8923764521',
    carrier: 'FedEx Express',
    
    timeline: [
      {
        status: 'Order Placed',
        date: 'Feb 28, 2026',
        time: '10:30 AM',
        location: 'Online',
        completed: true,
        icon: CheckCircle,
      },
      {
        status: 'Processing',
        date: 'Feb 28, 2026',
        time: '2:15 PM',
        location: 'Warehouse - Dallas, TX',
        completed: true,
        icon: Package,
      },
      {
        status: 'Shipped',
        date: 'Mar 1, 2026',
        time: '9:00 AM',
        location: 'Dallas, TX',
        completed: true,
        icon: Truck,
      },
      {
        status: 'In Transit',
        date: 'Mar 3, 2026',
        time: '8:45 AM',
        location: 'Memphis, TN Hub',
        completed: true,
        current: true,
        icon: Truck,
      },
      {
        status: 'Out for Delivery',
        date: 'Mar 5, 2026',
        time: 'Expected',
        location: 'Your City',
        completed: false,
        icon: Truck,
      },
      {
        status: 'Delivered',
        date: 'Mar 5, 2026',
        time: 'Expected',
        location: 'Delivery Address',
        completed: false,
        icon: CheckCircle,
      },
    ],

    shippingAddress: {
      name: 'Acme Manufacturing Co.',
      address: '1234 Industrial Parkway',
      city: 'Detroit, MI 48201',
      country: 'United States',
    },

    items: [
      {
        partNumber: 'P-123456',
        description: 'Hydraulic Pump Assembly - Model HP-2500',
        quantity: 2,
        unitPrice: '$580.00',
        total: '$1,160.00',
        status: 'In Stock',
      },
      {
        partNumber: 'P-789012',
        description: 'Premium Gasket Set - Industrial Grade',
        quantity: 1,
        unitPrice: '$290.00',
        total: '$290.00',
        status: 'In Stock',
      },
      {
        partNumber: 'P-456789',
        description: 'Bearing Kit with Seals',
        quantity: 5,
        unitPrice: '$200.00',
        total: '$1,000.00',
        status: 'In Stock',
      },
    ],

    documents: [
      { name: 'Invoice', type: 'PDF', size: '245 KB' },
      { name: 'Packing List', type: 'PDF', size: '128 KB' },
      { name: 'Shipping Label', type: 'PDF', size: '89 KB' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'delayed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-full overflow-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/customer/orders')}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </button>

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Order Details
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Order #{orderData.orderNumber}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                Placed on {orderData.orderDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
                orderData.status
              )}`}
            >
              {orderData.status === 'in-transit' ? 'In Transit' : orderData.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Shipment Tracking
                  </h2>
                  <p className="text-sm text-gray-500">
                    Track your order's journey
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {orderData.timeline.map((event, index) => {
                  const Icon = event.icon;
                  const isLast = index === orderData.timeline.length - 1;

                  return (
                    <div key={index} className="relative flex gap-4 pb-8">
                      {/* Vertical Line */}
                      {!isLast && (
                        <div
                          className={`absolute left-5 top-12 w-0.5 h-full -ml-px ${
                            event.completed ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                          event.current
                            ? 'bg-blue-600 border-blue-600 ring-4 ring-blue-100'
                            : event.completed
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            event.completed || event.current
                              ? 'text-white'
                              : 'text-gray-400'
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3
                            className={`font-semibold ${
                              event.current || event.completed
                                ? 'text-gray-900'
                                : 'text-gray-400'
                            }`}
                          >
                            {event.status}
                            {event.current && (
                              <span className="ml-2 text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                Current
                              </span>
                            )}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                          <span className="text-gray-400">•</span>
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tracking Number */}
              <div className="mt-4 pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
                      <p className="text-sm font-medium text-gray-900">
                        {orderData.trackingNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Carrier</p>
                      <p className="text-sm font-medium text-gray-900">
                        {orderData.carrier}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order Items
                  </h2>
                  <p className="text-sm text-gray-500">
                    {orderData.items.length} items in this order
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            {item.description}
                          </h4>
                          <p className="text-sm text-gray-500 font-mono">
                            {item.partNumber}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md ml-4">
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>Qty: {item.quantity}</span>
                        <span>Unit: {item.unitPrice}</span>
                        <span className="font-semibold text-gray-900">
                          Total: {item.total}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Order Total
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {orderData.totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order Documents
                  </h2>
                  <p className="text-sm text-gray-500">
                    Download invoices and shipping documents
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {orderData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Shipping Address</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <p className="font-medium text-gray-900">{orderData.shippingAddress.name}</p>
                <p>{orderData.shippingAddress.address}</p>
                <p>{orderData.shippingAddress.city}</p>
                <p>{orderData.shippingAddress.country}</p>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-xl shadow-sm p-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-white/90 mb-4">
                Have questions about your order? Our support team is here to help.
              </p>
              <button
                onClick={() => navigate('/customer/create-ticket')}
                className="w-full px-4 py-2.5 bg-white text-[#C8102E] rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Create Support Ticket
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Support</h3>
              <div className="space-y-3">
                <a
                  href="tel:1-800-555-0123"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#C8102E] transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">1-800-555-0123</p>
                  </div>
                </a>
                <a
                  href="mailto:support@aftermarket.com"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#C8102E] transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">support@aftermarket.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Estimated Delivery
                  </h4>
                  <p className="text-sm text-blue-800 mb-2">
                    Your order is expected to arrive on <strong>March 5, 2026</strong>
                  </p>
                  <p className="text-xs text-blue-700">
                    We'll send you tracking updates via email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}