import { useState, useEffect, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Package, Truck, Sparkles, Info, Calendar, AlertTriangle, FileText, Paperclip, Loader2, ChevronRight, Edit2, Send, MessageCircle, Mic, MicOff, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

const availableOrders = [
  'ORD-45678901',
  'ORD-98765432',
  'ORD-12345678',
  'ORD-55443322',
  'ORD-11223344',
  'ORD-88776655',
];

export default function CustomerCreateTicket() {
  const navigate = useNavigate();
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  
  // Form state
  const [issueTitle, setIssueTitle] = useState('');
  const [issueType, setIssueType] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [shipmentId, setShipmentId] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  
  // AI and system state
  const [currentStep, setCurrentStep] = useState(1); // 1: description, 2: order number, 3: AI processing
  const [orderFetched, setOrderFetched] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiCompleted, setAiCompleted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false); // AI toggle state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignedAgent, setAssignedAgent] = useState<{
    name: string;
    email: string;
    region: string;
    expertise: string;
    avatar: string;
  } | null>(null);

  // Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = 'en-US';

      recog.onresult = (event: any) => {
        let interimTranscript = '';
        console.log("event.results:", event.results);
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setDescription(prev => prev + ' ' + event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recog.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recog);
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Auto-focus description on mount
  useEffect(() => {
    if (aiEnabled && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [aiEnabled]);

  // Handle Order Selection for Preview
  useEffect(() => {
    if (orderNumber) {
      // Simulate fetching order/shipment info as soon as an order is selected
      setOrderFetched(true);
      if (!shipmentId) {
        setShipmentId('SHIP-' + orderNumber.split('-')[1]);
      }
    } else {
      setOrderFetched(false);
      setShipmentId('');
    }
  }, [orderNumber]);

  const handleDescriptionNext = () => {
    if (description.length > 10) {
      setCurrentStep(2);
    }
  };

  const handleOrderNumberSubmit = () => {
    if (orderNumber) {
      setCurrentStep(3);
      setIsAnalyzing(true);
      
      // Simulate AI analysis and system data fetch
      setTimeout(() => {
        // Fetch order details
        setOrderFetched(true);
        setShipmentId('SHIP-789456123');
        
        // AI auto-fills fields based on description
        setIssueTitle('Part Missing from Order');
        setIssueType('part-missing');
        setIssueCategory('delivery');
        setPriority('high');
        setPartNumber('P-45892');
        
        setIsAnalyzing(false);
        setAiCompleted(true);
        
        // Show the complete form after 1 second
        setTimeout(() => {
          setShowForm(true);
        }, 1000);
      }, 2500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowAssignmentModal(true);
    
    // Simulate AI agent assignment based on region and category
    setTimeout(() => {
      // Mock agent assignment logic
      const agents = [
        {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@aftermarket.com',
          region: 'North America',
          expertise: 'Delivery & Logistics',
          avatar: 'SJ',
        },
        {
          name: 'Michael Chen',
          email: 'michael.chen@aftermarket.com',
          region: 'Asia Pacific',
          expertise: 'Technical Support',
          avatar: 'MC',
        },
        {
          name: 'Emma Williams',
          email: 'emma.williams@aftermarket.com',
          region: 'Europe',
          expertise: 'Product Quality',
          avatar: 'EW',
        },
      ];
      
      // Select agent based on category
      let selectedAgent = agents[0]; // Default to Sarah for delivery issues
      if (issueCategory === 'technical') {
        selectedAgent = agents[1];
      } else if (issueCategory === 'product') {
        selectedAgent = agents[2];
      }
      
      setAssignedAgent(selectedAgent);
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <div className="h-full overflow-auto bg-[#F5F6F8]">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Header with AI Toggle */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create Support Ticket</h1>
            <p className="text-sm text-gray-500">
              {aiEnabled 
                ? "Tell us what happened, and our AI will help create your ticket" 
                : "Fill in the form below to create your support ticket"}
            </p>
          </div>

          {/* AI Toggle */}
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className={`w-5 h-5 transition-colors ${aiEnabled ? 'text-purple-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Enable AI Assistant</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setAiEnabled(!aiEnabled);
                // Reset state when toggling
                setCurrentStep(1);
                setOrderFetched(false);
                setIsAnalyzing(false);
                setAiCompleted(false);
                setShowForm(false);
              }}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                aiEnabled ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
                  aiEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Conversational Flow or Traditional Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {aiEnabled ? (
                <>
                  {/* AI-ASSISTED FLOW */}
                  {/* Step 1: Issue Description */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          What's the issue you're experiencing?
                        </h3>
                        <p className="text-sm text-gray-500">
                          Describe your problem in your own words. Our AI will understand and categorize it for you.
                        </p>
                      </div>
                    </div>

                    <div className="ml-14">
                      <div className="relative">
                        <textarea
                          ref={descriptionRef}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey) {
                              handleDescriptionNext();
                            }
                          }}
                          placeholder="Example: I ordered a hydraulic pump (Part P-45892) with order ORD-45678901, but when it arrived, the pump was missing from the box..."
                          rows={6}
                          disabled={currentStep > 1}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all resize-none disabled:bg-gray-50 disabled:text-gray-700 pr-12"
                        />
                        {currentStep === 1 && recognition && (
                          <button
                            type="button"
                            onClick={toggleListening}
                            className={`absolute bottom-4 right-4 p-2.5 rounded-full transition-all flex items-center justify-center ${
                              isListening 
                                ? 'bg-[#C8102E] text-white animate-pulse shadow-lg scale-110' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            title={isListening ? 'Stop Listening' : 'Speak Description'}
                          >
                            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                          </button>
                        )}
                        {isListening && (
                          <div className="absolute top-3 right-4 flex items-center gap-2 px-2 py-1 bg-red-50 rounded-md border border-red-100 animate-pulse">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C8102E]"></div>
                            <span className="text-[10px] font-semibold text-[#C8102E] uppercase">Listening...</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                          {currentStep === 1 ? 'Be as detailed as possible' : '✓ Description received'}
                        </p>
                        {currentStep === 1 ? (
                          <button
                            type="button"
                            onClick={handleDescriptionNext}
                            disabled={description.length < 10}
                            className="px-4 py-2 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#A00D25] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            Next
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentStep(1);
                              setAiCompleted(false);
                              setShowForm(false);
                            }}
                            className="text-sm text-[#C8102E] hover:underline flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Order Number */}
                  {currentStep >= 2 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold ${
                          currentStep === 2 ? 'bg-[#C8102E]' : 'bg-green-600'
                        }`}>
                          {currentStep === 2 ? '2' : '✓'}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            What's your order number?
                          </h3>
                          <p className="text-sm text-gray-500">
                            We'll fetch all the details from our system to speed things up.
                          </p>
                        </div>
                      </div>

                      <div className="ml-14">
                        <select
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)}
                          disabled={currentStep > 2}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-700 font-mono"
                        >
                          <option value="">Select an order number...</option>
                          {availableOrders.map((ord) => (
                            <option key={ord} value={ord}>{ord}</option>
                          ))}
                        </select>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            {currentStep === 2 ? 'Format: ORD-XXXXXXXX' : '✓ Order details loaded'}
                          </p>
                          {currentStep === 2 && (
                            <button
                              type="button"
                              onClick={handleOrderNumberSubmit}
                              disabled={!orderNumber}
                              className="px-4 py-2 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#A00D25] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              Continue
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: AI Processing */}
                  {currentStep >= 3 && isAnalyzing && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 animate-fade-in">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-white animate-pulse" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            AI is analyzing your issue...
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Reading your description</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Fetching order details from system</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Categorizing issue and setting priority</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Filling in ticket details</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Completion Summary */}
                  {aiCompleted && !showForm && (
                    <div className="bg-green-50 rounded-xl border border-green-200 p-6 animate-fade-in">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            ✨ Ticket ready!
                          </h3>
                          <p className="text-sm text-gray-700 mb-4">
                            I've analyzed your issue and filled in all the details. Review and submit your ticket below.
                          </p>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">Issue Type:</span>
                              <span className="ml-2 font-medium text-gray-900">Part Missing</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Category:</span>
                              <span className="ml-2 font-medium text-gray-900">Delivery</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Priority:</span>
                              <span className="ml-2 font-medium text-red-600">High</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Shipment ID:</span>
                              <span className="ml-2 font-medium text-gray-900">SHIP-789456123</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Complete Form (After AI Processing) */}
                  {showForm && (
                    <>
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#C8102E]" />
                            Review Ticket Details
                          </h2>
                          <span className="text-xs text-gray-500 bg-purple-100 px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 inline mr-1" />
                            AI Generated
                          </span>
                        </div>

                        <div className="space-y-5">
                          {/* Issue Title */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Issue Title <span className="text-[#C8102E]">*</span>
                            </label>
                            <input
                              type="text"
                              value={issueTitle}
                              onChange={(e) => setIssueTitle(e.target.value)}
                              required
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                            />
                          </div>

                          {/* Issue Type and Category */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Issue Type <span className="text-[#C8102E]">*</span>
                              </label>
                              <select
                                value={issueType}
                                onChange={(e) => setIssueType(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              >
                                <option value="">Select issue type...</option>
                                <option value="part-missing">Part Missing</option>
                                <option value="wrong-part">Wrong Part Delivered</option>
                                <option value="damaged">Damaged Item</option>
                                <option value="delay">Delivery Delay</option>
                                <option value="quality">Quality Issue</option>
                                <option value="warranty">Warranty Claim</option>
                                <option value="technical">Technical Support</option>
                                <option value="other">Other</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Issue Category <span className="text-[#C8102E]">*</span>
                              </label>
                              <select
                                value={issueCategory}
                                onChange={(e) => setIssueCategory(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              >
                                <option value="">Select category...</option>
                                <option value="delivery">Delivery</option>
                                <option value="product">Product Issue</option>
                                <option value="billing">Billing</option>
                                <option value="technical">Technical</option>
                                <option value="returns">Returns & Refunds</option>
                                <option value="documentation">Documentation</option>
                              </select>
                            </div>
                          </div>

                          {/* Order and Shipment */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order Number <span className="text-[#C8102E]">*</span>
                              </label>
                              <input
                                type="text"
                                value={orderNumber}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shipment ID
                              </label>
                              <input
                                type="text"
                                value={shipmentId}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                              />
                            </div>
                          </div>

                          {/* Part Number and Priority */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Part Number
                              </label>
                              <input
                                type="text"
                                value={partNumber}
                                onChange={(e) => setPartNumber(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Priority <span className="text-[#C8102E]">*</span>
                              </label>
                              <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              >
                                <option value="">Select priority...</option>
                                <option value="low">Low - Minor inconvenience</option>
                                <option value="medium">Medium - Moderate impact</option>
                                <option value="high">High - Significant impact</option>
                                <option value="urgent">Urgent - Business critical</option>
                              </select>
                            </div>
                          </div>

                          {/* Attachments */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Attachments (Optional)
                            </label>
                            <div
                              onClick={() => document.getElementById('file-upload')?.click()}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#C8102E] transition-colors cursor-pointer bg-gray-50 hover:bg-white"
                            >
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-1">
                                Add photos or documents
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF, JPG, PNG up to 10MB
                              </p>
                              <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileUpload}
                                className="hidden"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              />
                            </div>

                            {files.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {files.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <Paperclip className="w-4 h-4 text-gray-400" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                        <p className="text-xs text-gray-500">
                                          {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile(index)}
                                      className="text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 animate-fade-in">
                        <button
                          type="button"
                          onClick={() => navigate('/customer/tickets')}
                          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-[#C8102E] text-white rounded-lg font-medium hover:bg-[#A00D25] transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                          <Send className="w-5 h-5" />
                          Submit Ticket
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* TRADITIONAL FORM */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#C8102E]" />
                          Ticket Information
                        </h2>

                        <div className="space-y-5">
                          {/* Issue Title */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Issue Title <span className="text-[#C8102E]">*</span>
                            </label>
                            <input
                              type="text"
                              value={issueTitle}
                              onChange={(e) => setIssueTitle(e.target.value)}
                              placeholder="Brief summary of your issue"
                              required
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                            />
                          </div>

                          {/* Issue Description */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Issue Description <span className="text-[#C8102E]">*</span>
                            </label>
                            <div className="relative">
                              <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Please describe your issue in detail..."
                                rows={6}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all resize-none pr-12"
                              />
                              {recognition && (
                                <button
                                  type="button"
                                  onClick={toggleListening}
                                  className={`absolute bottom-4 right-4 p-2.5 rounded-full transition-all flex items-center justify-center ${
                                    isListening 
                                      ? 'bg-[#C8102E] text-white animate-pulse shadow-lg scale-110' 
                                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                  }`}
                                  title={isListening ? 'Stop Listening' : 'Speak Description'}
                                >
                                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {description.length} / 2000 characters
                            </p>
                          </div>

                          {/* Issue Type and Category */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Issue Type <span className="text-[#C8102E]">*</span>
                              </label>
                              <select
                                value={issueType}
                                onChange={(e) => setIssueType(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              >
                                <option value="">Select issue type...</option>
                                <option value="part-missing">Part Missing</option>
                                <option value="wrong-part">Wrong Part Delivered</option>
                                <option value="damaged">Damaged Item</option>
                                <option value="delay">Delivery Delay</option>
                                <option value="quality">Quality Issue</option>
                                <option value="warranty">Warranty Claim</option>
                                <option value="technical">Technical Support</option>
                                <option value="other">Other</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Issue Category <span className="text-[#C8102E]">*</span>
                              </label>
                              <select
                                value={issueCategory}
                                onChange={(e) => setIssueCategory(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              >
                                <option value="">Select category...</option>
                                <option value="delivery">Delivery</option>
                                <option value="product">Product Issue</option>
                                <option value="billing">Billing</option>
                                <option value="technical">Technical</option>
                                <option value="returns">Returns & Refunds</option>
                                <option value="documentation">Documentation</option>
                              </select>
                            </div>
                          </div>

                          {/* Order Number and Shipment ID */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order Number <span className="text-[#C8102E]">*</span>
                              </label>
                              <select
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all font-mono"
                              >
                                <option value="">Select an order number...</option>
                                {availableOrders.map((ord) => (
                                  <option key={ord} value={ord}>{ord}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shipment ID (Optional)
                              </label>
                              <input
                                type="text"
                                value={shipmentId}
                                onChange={(e) => setShipmentId(e.target.value)}
                                placeholder="SHIP-XXXXXXXXX"
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              />
                            </div>
                          </div>

                          {/* Part Number and Priority */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Part Number (Optional)
                              </label>
                              <input
                                type="text"
                                value={partNumber}
                                onChange={(e) => setPartNumber(e.target.value)}
                                placeholder="P-987654"
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Priority <span className="text-[#C8102E]">*</span>
                              </label>
                              <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                              >
                                <option value="">Select priority...</option>
                                <option value="low">Low - Minor inconvenience</option>
                                <option value="medium">Medium - Moderate impact</option>
                                <option value="high">High - Significant impact</option>
                                <option value="urgent">Urgent - Business critical</option>
                              </select>
                            </div>
                          </div>

                          {/* Attachments */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Attachments
                              <span className="text-xs text-gray-500 font-normal ml-2">
                                (Optional - Images, PDFs, or documents)
                              </span>
                            </label>
                            <div
                              onClick={() => document.getElementById('file-upload-trad')?.click()}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#C8102E] transition-colors cursor-pointer bg-gray-50 hover:bg-white"
                            >
                              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                              <p className="text-sm text-gray-600 mb-1 font-medium">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF, JPG, PNG, DOC up to 10MB each (Max 5 files)
                              </p>
                              <input
                                id="file-upload-trad"
                                type="file"
                                onChange={handleFileUpload}
                                className="hidden"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              />
                            </div>

                            {files.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {files.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <Paperclip className="w-4 h-4 text-gray-400" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                        <p className="text-xs text-gray-500">
                                          {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile(index)}
                                      className="text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons for Traditional Form */}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => navigate('/customer/tickets')}
                          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-[#C8102E] text-white rounded-lg font-medium hover:bg-[#A00D25] transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                          <Send className="w-5 h-5" />
                          Submit Ticket
                        </button>
                      </div>
                    </>
              )}
            </div>

            {/* RIGHT SIDEBAR: PROACTIVE SUPPORT & PREVIEW */}
            <div className="lg:col-span-1 space-y-6">
              {/* 1. Recommended Articles (Deflection) */}
              {description.length > 10 && (
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border-2 border-red-50 p-6 animate-fade-in sticky top-8 z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-6 bg-[#C8102E] rounded-full"></div>
                    <h3 className="font-bold text-gray-900 uppercase tracking-tight text-sm">Recommended Articles</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-6">
                    Based on your description, these guides might resolve your issue faster:
                  </p>
                  <div className="space-y-3">
                    {[
                      { id: 1, title: 'Order Tracking Process', icon: Package, time: '4 min' },
                      { id: 2, title: 'Track Shipment Using DHL', icon: Truck, time: '6 min' },
                      { id: 3, title: 'Wrong Part Received', icon: AlertTriangle, time: '5 min' }
                    ].map((article) => {
                      const Icon = article.icon;
                      return (
                        <button
                          key={article.id}
                          type="button"
                          onClick={() => navigate('/customer/knowledge-base')}
                          className="w-full text-left p-4 bg-gray-50 border border-transparent rounded-xl hover:bg-white hover:border-[#C8102E] hover:shadow-lg transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                              <Icon className="w-4 h-4 text-[#C8102E]" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-gray-900 group-hover:text-[#C8102E] line-clamp-2">{article.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.time} read</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Or use AI Help</p>
                    <button 
                      type="button"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-[#C8102E]" /> Ask AI Assistant
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Order Preview (Live Data) */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                {orderFetched ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Live Order Preview
                    </h3>

                    <div className="space-y-4">
                      <div className="pb-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Order Status</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                            In Transit
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 font-mono tracking-tight">{orderNumber}</p>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">
                            Delivery Status
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">On the way to your location</p>
                        <p className="text-xs text-gray-500 mt-1">Last updated: 3 hours ago</p>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Estimated Arrival</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">March 5, 2026</p>
                        <p className="text-xs text-gray-500">2 days remaining</p>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Tracking Number</span>
                        </div>
                        <p className="text-sm font-medium text-[#C8102E]">
                          TRK-8923764521
                        </p>
                        <button className="text-xs text-[#C8102E] hover:underline mt-1">
                          Track shipment
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">
                            Warehouse Stock
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">Parts available</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        💡 If the preview shows your issue is already resolved, you may not
                        need to create a ticket.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">
                      {aiEnabled ? 'Enter an order number to see order details' : 'Order preview will appear here'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* AI Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-fade-in">
            {isSubmitting ? (
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      AI is assigning your ticket...
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Analyzing region, order category, and agent expertise
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                        <span>Analyzing order region: North America</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                        <span>Matching issue category: {issueCategory || 'Delivery'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                        <span>Finding best available agent...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : assignedAgent ? (
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    ✅ Ticket Successfully Assigned!
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your ticket has been created and assigned to the best available agent
                  </p>
                </div>

                {/* Agent Card */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                      {assignedAgent.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {assignedAgent.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">{assignedAgent.email}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Region:</span>
                          <p className="font-medium text-gray-900">{assignedAgent.region}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expertise:</span>
                          <p className="font-medium text-gray-900">{assignedAgent.expertise}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignment Reason */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-semibold text-blue-900 mb-1">
                        Why this agent?
                      </h5>
                      <p className="text-sm text-blue-800">
                        {assignedAgent.name} was selected based on their expertise in <strong>{assignedAgent.expertise}</strong>, 
                        regional coverage for <strong>{assignedAgent.region}</strong>, and current workload availability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ticket Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ticket ID:</span>
                    <span className="font-medium text-gray-900">TKT-{Math.floor(Math.random() * 100000)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Priority:</span>
                    <span className="font-medium text-red-600">{priority === 'high' ? 'High' : 'Medium'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected Response:</span>
                    <span className="font-medium text-gray-900">Within 2-4 hours</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => navigate(`/customer/tickets/TKT-${Math.floor(Math.random() * 100000)}`)}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Start Live Chat with {assignedAgent.name}
                  </button>
                  <button
                    onClick={() => navigate('/customer/tickets')}
                    className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    View My Tickets
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}