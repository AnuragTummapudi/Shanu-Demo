import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { PageHeader } from '../common/PageHeader';
import { useNavigation } from '../navigation/NavigationProvider';
import { 
  ArrowLeft, Send, AlertCircle, CheckCircle, Clock, User, Mail, 
  Phone, Building, Target, FileText, Paperclip, Calendar, Star
} from 'lucide-react';

interface RaiseTicketPageProps {
  userEmail?: string;
  userRole?: string;
  userName?: string;
}

// Mock existing tickets data
const existingTickets = [
  {
    id: 'TK001',
    title: 'Job Portal Access Issue',
    description: 'Unable to access job portal from mobile device',
    category: 'Technical',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2025-01-14T10:30:00',
    updatedAt: '2025-01-15T14:20:00',
    assignedTo: 'Kavitha Sharma',
    responses: 2
  },
  {
    id: 'TK002',
    title: 'Training Session Schedule Conflict',
    description: 'Machine Learning session conflicts with exam schedule',
    category: 'Academic',
    priority: 'High',
    status: 'Open',
    createdAt: '2025-01-13T16:45:00',
    updatedAt: '2025-01-13T16:45:00',
    assignedTo: 'Unassigned',
    responses: 0
  },
  {
    id: 'TK003',
    title: 'Profile Update Request',
    description: 'Need to update contact information in system',
    category: 'Profile',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2025-01-12T09:15:00',
    updatedAt: '2025-01-14T11:30:00',
    assignedTo: 'Suresh Babu',
    responses: 3
  }
];

export const RaiseTicketPage: React.FC<RaiseTicketPageProps> = ({ 
  userEmail = 'user@srmap.edu.in', 
  userRole = 'student',
  userName = 'User'
}) => {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    description: '',
    attachments: [] as File[]
  });

  const categories = [
    { value: 'technical', label: 'Technical Support', icon: '🔧' },
    { value: 'academic', label: 'Academic Query', icon: '📚' },
    { value: 'placement', label: 'Placement Related', icon: '💼' },
    { value: 'profile', label: 'Profile/Account', icon: '👤' },
    { value: 'training', label: 'Training Sessions', icon: '🎓' },
    { value: 'other', label: 'Other', icon: '❓' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'success-light' },
    { value: 'medium', label: 'Medium', color: 'warning-light' },
    { value: 'high', label: 'High', color: 'error-light' },
    { value: 'urgent', label: 'Urgent', color: 'error' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Simulate ticket creation
    alert(`Ticket "${formData.title}" has been created successfully! You will receive updates via email.`);
    
    // Reset form
    setFormData({
      title: '',
      category: '',
      priority: '',
      description: '',
      attachments: []
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <PageHeader 
        title="Support Ticket System"
        description="Get help from our operations team with any issues or queries"
        actions={
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        }
      />

      <div className="p-6">
        {/* User Info Card */}
        <Card className="bg-white border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{userName}</h3>
                <p className="text-slate-600">{userEmail}</p>
                <Badge variant="outline" className="mt-1 capitalize">{userRole}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl border border-primary/20 mb-6">
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'new'
                ? 'bg-primary text-white shadow-lg'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('new')}
          >
            <FileText className="w-4 h-4 mr-2 inline" />
            Create New Ticket
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'existing'
                ? 'bg-primary text-white shadow-lg'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('existing')}
          >
            <Clock className="w-4 h-4 mr-2 inline" />
            My Tickets ({existingTickets.length})
          </button>
        </div>

        {activeTab === 'new' ? (
          /* New Ticket Form */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Create Support Ticket</CardTitle>
                  <CardDescription>Provide detailed information about your issue for faster resolution</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Ticket Title *
                      </label>
                      <Input
                        placeholder="Brief description of your issue"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Category *
                        </label>
                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                <span className="mr-2">{category.icon}</span>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Priority
                        </label>
                        <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description *
                      </label>
                      <Textarea
                        placeholder="Provide detailed information about your issue, including steps to reproduce if applicable"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={6}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Attachments (Optional)
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Paperclip className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-600">Click to upload files or drag and drop</p>
                          <p className="text-sm text-slate-500 mt-1">PNG, JPG, PDF, DOC up to 10MB</p>
                        </label>
                        {formData.attachments.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-slate-600">{formData.attachments.length} file(s) selected</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline">
                        Save as Draft
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Ticket
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Help Sidebar */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-800 mb-4">💡 Quick Tips</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Be specific about the issue</li>
                    <li>• Include error messages if any</li>
                    <li>• Mention your browser/device</li>
                    <li>• Attach screenshots if helpful</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-800 mb-4">📞 Contact Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Mail className="w-4 h-4 mr-2" />
                      support@srmap.edu.in
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Phone className="w-4 h-4 mr-2" />
                      +91 8080-123-456
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Building className="w-4 h-4 mr-2" />
                      Operations Office, Block A
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-800 mb-2">🎯 Response Time</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">High Priority:</span>
                      <span className="font-medium text-slate-800">2-4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Medium Priority:</span>
                      <span className="font-medium text-slate-800">8-24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Low Priority:</span>
                      <span className="font-medium text-slate-800">1-2 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Existing Tickets */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Your Support Tickets</h3>
                <p className="text-slate-600">Track the status of your submitted tickets</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {existingTickets.filter(t => t.status !== 'Resolved').length} Active
                </Badge>
                <Badge className="success-light">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {existingTickets.filter(t => t.status === 'Resolved').length} Resolved
                </Badge>
              </div>
            </div>

            <div className="grid gap-6">
              {existingTickets.map((ticket) => (
                <Card key={ticket.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-slate-800">{ticket.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {ticket.id}
                          </Badge>
                          {getStatusIcon(ticket.status)}
                          <Badge className={
                            ticket.status === 'Resolved' ? 'success-light' :
                            ticket.status === 'In Progress' ? 'info-light' :
                            'warning-light'
                          }>
                            {ticket.status}
                          </Badge>
                        </div>
                        <p className="text-slate-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>Created: {formatDate(ticket.createdAt)}</span>
                          <span>•</span>
                          <span>Updated: {formatDate(ticket.updatedAt)}</span>
                          <span>•</span>
                          <span>Assigned: {ticket.assignedTo}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {ticket.category}
                        </Badge>
                        <div className="text-sm text-slate-600">
                          {ticket.responses} responses
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          ticket.priority === 'High' ? 'error-light' :
                          ticket.priority === 'Medium' ? 'warning-light' :
                          'success-light'
                        }>
                          {ticket.priority} Priority
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {ticket.status !== 'Resolved' && (
                          <Button size="sm">
                            Add Response
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};