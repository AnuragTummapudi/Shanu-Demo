import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Plus, Search, Filter, Eye, MessageCircle, Clock, CheckCircle, 
  AlertTriangle, User, Phone, Mail, Calendar, FileText, Upload
} from 'lucide-react';
import { ticketsData } from '../data/enhancedIndianData';

interface EnhancedTicketSystemProps {
  userRole: 'student' | 'faculty' | 'outreach' | 'operations' | 'admin';
  userName: string;
  userEmail: string;
}

export function EnhancedTicketSystem({ userRole, userName, userEmail }: EnhancedTicketSystemProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium'
  });

  const handleCreateTicket = () => {
    alert(`Ticket created: ${newTicket.title}\nThis would be submitted to the operations team.`);
    setShowCreateTicket(false);
    setNewTicket({ title: '', description: '', category: 'general', priority: 'medium' });
  };

  const handleTicketResponse = (ticketId: string) => {
    alert(`Responding to ticket ${ticketId}. This would open a detailed response interface.`);
  };

  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Support Ticket System</h3>
          <p className="text-slate-600">Comprehensive ticket management for all user queries</p>
        </div>
        <Button onClick={() => setShowCreateTicket(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Create Ticket Modal */}
      {showCreateTicket && (
        <Card className="bg-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-800">Create New Ticket</CardTitle>
            <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <Input
                placeholder="Brief description of your issue"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <Textarea
                placeholder="Detailed description of your issue"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <Select value={newTicket.category} onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="placement">Placement</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateTicket} className="flex-1">
                Create Ticket
              </Button>
              <Button variant="outline" onClick={() => setShowCreateTicket(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tickets List */}
      <div className="grid gap-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-slate-800">{ticket.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {ticket.ticketId}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{ticket.description}</p>
                  <div className="flex items-center text-sm text-slate-500 space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {ticket.createdBy}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {ticket.createdDate}
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {ticket.category}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={
                      ticket.priority === 'urgent' ? 'error-light' :
                      ticket.priority === 'high' ? 'warning-light' :
                      ticket.priority === 'medium' ? 'info-light' : 'success-light'
                    }>
                      {ticket.priority === 'urgent' ? <AlertTriangle className="w-3 h-3 mr-1" /> :
                       ticket.priority === 'high' ? <Clock className="w-3 h-3 mr-1" /> :
                       <CheckCircle className="w-3 h-3 mr-1" />}
                      {ticket.priority}
                    </Badge>
                    <Badge className={
                      ticket.status === 'resolved' ? 'success-light' :
                      ticket.status === 'in-progress' ? 'info-light' :
                      ticket.status === 'closed' ? 'success-light' : 'warning-light'
                    }>
                      {ticket.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">
                    Assigned to: {ticket.assignedTo}
                  </div>
                </div>
              </div>
              
              {ticket.responses.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-slate-700 mb-1">
                        <strong>Latest Response:</strong>
                      </div>
                      <div className="text-sm text-slate-600">
                        {ticket.responses[0].message}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {ticket.responses[0].timestamp}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => handleTicketResponse(ticket.ticketId)}>
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleTicketResponse(ticket.ticketId)}>
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Respond
                </Button>
                {userRole === 'operations' || userRole === 'admin' ? (
                  <Button size="sm" variant="outline">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Resolve
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h3 className="text-slate-800 mb-2">No tickets found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || filterPriority !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your filters or search terms.' 
                : 'Create your first support ticket to get help from our team.'}
            </p>
            <Button onClick={() => setShowCreateTicket(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Ticket
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}