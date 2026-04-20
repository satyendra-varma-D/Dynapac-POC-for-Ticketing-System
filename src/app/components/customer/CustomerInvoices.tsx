import { useState } from 'react';
import { Search, Download, FileText, CheckCircle, Clock, AlertCircle, CreditCard, DollarSign } from 'lucide-react';

const invoices = [
  {
    id: 'INV-2024-1234',
    orderNumber: 'ORD-45678',
    invoiceDate: '2024-12-15',
    dueDate: '2025-01-14',
    amount: 2450.00,
    status: 'paid',
    paidDate: '2024-12-20',
    paymentMethod: 'Credit Card',
    items: [
      { description: 'Hydraulic Seal Kit HSK-3000-A', quantity: 1, unitPrice: 450.00 },
      { description: 'Oil Filter OF-HP3K', quantity: 2, unitPrice: 75.00 },
      { description: 'Labor - Preventive Maintenance', quantity: 3, unitPrice: 250.00 },
    ],
  },
  {
    id: 'INV-2024-1198',
    orderNumber: 'ORD-45321',
    invoiceDate: '2024-12-08',
    dueDate: '2025-01-07',
    amount: 1850.00,
    status: 'pending',
    paidDate: null,
    paymentMethod: null,
    items: [
      { description: 'Spindle Bearing Set SBS-M500', quantity: 1, unitPrice: 850.00 },
      { description: 'Drive Belt DB-M500-X', quantity: 1, unitPrice: 120.00 },
      { description: 'Labor - Repair Service', quantity: 5, unitPrice: 176.00 },
    ],
  },
  {
    id: 'INV-2024-1145',
    orderNumber: 'ORD-44987',
    invoiceDate: '2024-11-25',
    dueDate: '2024-12-25',
    amount: 3200.00,
    status: 'overdue',
    paidDate: null,
    paymentMethod: null,
    items: [
      { description: 'Premium Parts Package', quantity: 1, unitPrice: 2100.00 },
      { description: 'Installation Service', quantity: 8, unitPrice: 137.50 },
    ],
  },
  {
    id: 'INV-2024-1089',
    orderNumber: 'ORD-44756',
    invoiceDate: '2024-11-10',
    dueDate: '2024-12-10',
    amount: 890.00,
    status: 'paid',
    paidDate: '2024-11-15',
    paymentMethod: 'Bank Transfer',
    items: [
      { description: 'Pressure Relief Valve PRV-AC200', quantity: 1, unitPrice: 280.00 },
      { description: 'Labor - Emergency Repair', quantity: 2, unitPrice: 305.00 },
    ],
  },
  {
    id: 'INV-2024-1023',
    orderNumber: 'ORD-44523',
    invoiceDate: '2024-10-28',
    dueDate: '2024-11-27',
    amount: 1560.00,
    status: 'paid',
    paidDate: '2024-11-05',
    paymentMethod: 'Credit Card',
    items: [
      { description: 'Conveyor Rollers CR-CS1K', quantity: 8, unitPrice: 95.00 },
      { description: 'Drive Chain DC-CS1K-HD', quantity: 1, unitPrice: 340.00 },
      { description: 'Labor - Preventive Maintenance', quantity: 4, unitPrice: 105.00 },
    ],
  },
];

export default function CustomerInvoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return { color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-700', icon: Clock };
      case 'overdue':
        return { color: 'bg-red-100 text-red-700', icon: AlertCircle };
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: FileText };
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const outstandingAmount = invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Invoices & Billing
          </h1>
          <p className="text-sm text-gray-500">
            View and manage all your invoices and payment history
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Invoiced</p>
                <p className="text-3xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Paid</p>
                <p className="text-3xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Outstanding</p>
                <p className="text-3xl font-bold text-[#C8102E]">${outstandingAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#C8102E]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Methods</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by invoice or order number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('paid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'paid' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'pending' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus('overdue')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'overdue' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Overdue
              </button>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Invoice ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order Number</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Invoice Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredInvoices.flatMap((invoice) => {
                  const statusConfig = getStatusConfig(invoice.status);
                  const StatusIcon = statusConfig.icon;
                  const isExpanded = expandedInvoice === invoice.id;

                  const rows = [
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900 font-mono">{invoice.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{invoice.orderNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">${invoice.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium ${statusConfig.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setExpandedInvoice(isExpanded ? null : invoice.id)}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                          >
                            {isExpanded ? 'Hide' : 'Details'}
                          </button>
                          <button className="text-sm font-medium text-[#C8102E] hover:underline flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" />
                            PDF
                          </button>
                          {invoice.status !== 'paid' && (
                            <button className="text-sm font-medium text-green-600 hover:underline">
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ];

                  if (isExpanded) {
                    rows.push(
                      <tr key={`${invoice.id}-details`}>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Invoice Items</h4>
                              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Description</th>
                                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Quantity</th>
                                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Unit Price</th>
                                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                    {invoice.items.map((item, idx) => (
                                      <tr key={idx}>
                                        <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 text-right">{item.quantity}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 text-right">${item.unitPrice.toFixed(2)}</td>
                                        <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                                          ${(item.quantity * item.unitPrice).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))}
                                    <tr className="bg-gray-50">
                                      <td colSpan={3} className="px-4 py-2 text-sm font-semibold text-gray-900 text-right">
                                        Total Amount:
                                      </td>
                                      <td className="px-4 py-2 text-sm font-bold text-gray-900 text-right">
                                        ${invoice.amount.toFixed(2)}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            {invoice.paidDate && (
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-600">
                                  <strong>Paid on:</strong> {new Date(invoice.paidDate).toLocaleDateString()}
                                </span>
                                <span className="text-gray-600">
                                  <strong>Payment method:</strong> {invoice.paymentMethod}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  return rows;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}