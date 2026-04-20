import { useState } from 'react';
import { Star, Send, CheckCircle, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const feedbackHistory = [
  {
    id: 'FB-001',
    serviceId: 'SRV-2024-089',
    serviceName: 'Preventive Maintenance - HP-3000',
    date: '2024-11-25',
    rating: 5,
    comment: 'Excellent service! The technician was professional and thorough. Equipment is running better than ever.',
    status: 'submitted',
    response: 'Thank you for your feedback! We\'re glad Mike provided excellent service.',
  },
  {
    id: 'FB-002',
    serviceId: 'SRV-2024-078',
    serviceName: 'Repair Service - M-500',
    date: '2024-12-08',
    rating: 4,
    comment: 'Good service overall. Would have appreciated more communication during the repair process.',
    status: 'submitted',
    response: 'We appreciate your feedback and will work on improving our communication process.',
  },
  {
    id: 'FB-003',
    serviceId: 'TKT-10198',
    serviceName: 'Support Ticket - Delivery Delay',
    date: '2024-12-10',
    rating: 3,
    comment: 'Issue was resolved but took longer than expected. Better initial estimate would help.',
    status: 'pending',
    response: null,
  },
];

export default function CustomerFeedback() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const averageRating = feedbackHistory.reduce((sum, fb) => sum + fb.rating, 0) / feedbackHistory.length;

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Feedback & Surveys
          </h1>
          <p className="text-sm text-gray-500">
            Share your experience and help us improve our services
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Feedback</p>
                <p className="text-3xl font-bold text-gray-900">{feedbackHistory.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Positive Reviews</p>
                <p className="text-3xl font-bold text-green-600">
                  {feedbackHistory.filter(fb => fb.rating >= 4).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">
                  {feedbackHistory.filter(fb => fb.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Feedback Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit Feedback</h2>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service/Ticket
                </label>
                <select className="w-full px-4 py-2 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent">
                  <option>Recent Service - HP-3000 Maintenance</option>
                  <option>Ticket TKT-10234 - Part Missing</option>
                  <option>Order ORD-45678 Delivery</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate this service?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setSelectedRating(rating)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          rating <= (hoveredRating || selectedRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-none text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {selectedRating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedRating === 5 && 'Excellent!'}
                    {selectedRating === 4 && 'Very Good'}
                    {selectedRating === 3 && 'Good'}
                    {selectedRating === 2 && 'Fair'}
                    {selectedRating === 1 && 'Needs Improvement'}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={5}
                  className="w-full px-4 py-3 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none"
                />
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors font-medium">
                <Send className="w-4 h-4" />
                Submit Feedback
              </button>
            </div>

            {/* Improvement Actions */}
            <div className="bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-xl shadow-sm p-6 mt-6 text-white">
              <h3 className="font-semibold mb-2">Your Voice Matters</h3>
              <p className="text-sm text-white/90 mb-4">
                We've implemented 12 improvements based on customer feedback this quarter
              </p>
              <button className="w-full bg-white text-[#C8102E] px-4 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                View Improvements
              </button>
            </div>
          </div>

          {/* Feedback History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Your Feedback History</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {feedbackHistory.map((feedback) => (
                  <div key={feedback.id} className="px-6 py-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{feedback.serviceName}</h3>
                        <p className="text-sm text-gray-600">
                          {feedback.serviceId} • {new Date(feedback.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < feedback.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-none text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm text-gray-700 leading-relaxed">{feedback.comment}</p>
                    </div>

                    {feedback.response && (
                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-[#C8102E]">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#C8102E] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-gray-900 mb-1">Our Response:</p>
                            <p className="text-sm text-gray-700">{feedback.response}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {feedback.status === 'pending' && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <MessageSquare className="w-4 h-4" />
                        <span>Awaiting response from our team</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
