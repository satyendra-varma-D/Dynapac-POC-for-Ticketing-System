import { useState } from 'react';
import { Download, Search, FileText, File, Grid3x3, List, MoreVertical, Clock } from 'lucide-react';

const documents = [
  {
    id: 1,
    type: 'invoice',
    name: 'Invoice_ORD-45678.pdf',
    orderNumber: 'ORD-45678',
    date: 'Feb 28, 2026',
    size: '245 KB',
  },
  {
    id: 2,
    type: 'delivery-note',
    name: 'Delivery_Note_ORD-44987.pdf',
    orderNumber: 'ORD-44987',
    date: 'Feb 25, 2026',
    size: '128 KB',
  },
  {
    id: 3,
    type: 'order-confirmation',
    name: 'Order_Confirmation_ORD-45321.pdf',
    orderNumber: 'ORD-45321',
    date: 'Feb 25, 2026',
    size: '89 KB',
  },
  {
    id: 4,
    type: 'invoice',
    name: 'Invoice_ORD-44756.pdf',
    orderNumber: 'ORD-44756',
    date: 'Feb 15, 2026',
    size: '312 KB',
  },
  {
    id: 5,
    type: 'delivery-note',
    name: 'Delivery_Note_ORD-44756.pdf',
    orderNumber: 'ORD-44756',
    date: 'Feb 20, 2026',
    size: '156 KB',
  },
];

export default function CustomerDocuments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const getDocumentIcon = (type: string) => {
    return <FileText className="w-8 h-8 text-[#C8102E]" />;
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'invoice':
        return 'Invoice';
      case 'delivery-note':
        return 'Delivery Note';
      case 'order-confirmation':
        return 'Order Confirmation';
      default:
        return 'Document';
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Documents Center</h1>
        <p className="text-sm text-gray-500">
          Access invoices, delivery notes, and order confirmations
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
          />
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
        >
          <option value="all">All Types</option>
          <option value="invoice">Invoices</option>
          <option value="delivery-note">Delivery Notes</option>
          <option value="order-confirmation">Order Confirmations</option>
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center">
                {getDocumentIcon(doc.type)}
              </div>
              <span className="text-xs text-gray-500">{doc.size}</span>
            </div>

            <div className="mb-4">
              <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md mb-2">
                {getDocumentTypeLabel(doc.type)}
              </span>
              <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                {doc.name}
              </h3>
              <p className="text-xs text-gray-500">Order: {doc.orderNumber}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">{doc.date}</span>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-[#C8102E] text-white rounded-lg text-xs font-medium hover:bg-[#A00D25] transition-colors">
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <File className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No documents found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}