import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';
import { 
  Building, 
  Handshake, 
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  Target,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Star,
  Eye,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface Partnership {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  partnershipType: 'Placement' | 'Training' | 'Research' | 'Internship' | 'Mixed';
  status: 'Active' | 'Pending' | 'Inactive' | 'Expired';
  startDate: string;
  endDate: string;
  renewalDate?: string;
  studentsHired: number;
  averageSalary: number;
  satisfactionRating: number;
  lastActivity: string;
  notes: string;
  documents: string[];
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  priority: 'High' | 'Medium' | 'Low';
}

const PartnershipManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Sample partnerships data
  const [partnerships, setPartnerships] = useState<Partnership[]>([
    {
      id: 'PART001',
      companyName: 'Microsoft India',
      contactPerson: 'Rahul Krishnan',
      email: 'rahul.krishnan@microsoft.com',
      phone: '+91 9876501234',
      industry: 'Technology',
      location: 'Hyderabad',
      partnershipType: 'Mixed',
      status: 'Active',
      startDate: '2019-08-15',
      endDate: '2024-08-15',
      renewalDate: '2024-06-15',
      studentsHired: 89,
      averageSalary: 1850000,
      satisfactionRating: 4.8,
      lastActivity: '2024-01-20',
      notes: 'Premium technology partner with excellent growth opportunities',
      documents: ['MOU.pdf', 'Terms.pdf', 'Contact_List.xlsx'],
      tier: 'Tier 1',
      priority: 'High'
    },
    {
      id: 'PART002',
      companyName: 'TCS Digital',
      contactPerson: 'Suresh Babu',
      email: 'suresh.babu@tcs.com',
      phone: '+91 9876501235',
      industry: 'IT Services',
      location: 'Chennai',
      partnershipType: 'Placement',
      status: 'Active',
      startDate: '2015-03-20',
      endDate: '2025-03-20',
      studentsHired: 156,
      averageSalary: 650000,
      satisfactionRating: 4.5,
      lastActivity: '2024-01-18',
      notes: 'Largest recruiter with diverse opportunities across domains',
      documents: ['Agreement.pdf', 'Process_Guide.pdf'],
      tier: 'Tier 1',
      priority: 'High'
    },
    {
      id: 'PART003',
      companyName: 'StartupXYZ',
      contactPerson: 'Priya Sharma',
      email: 'priya@startupxyz.com',
      phone: '+91 9876501236',
      industry: 'Technology',
      location: 'Bangalore',
      partnershipType: 'Internship',
      status: 'Pending',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      studentsHired: 0,
      averageSalary: 450000,
      satisfactionRating: 0,
      lastActivity: '2024-01-22',
      notes: 'New startup focusing on AI/ML solutions. High growth potential.',
      documents: ['Initial_Proposal.pdf'],
      tier: 'Tier 3',
      priority: 'Medium'
    },
    {
      id: 'PART004',
      companyName: 'Goldman Sachs',
      contactPerson: 'Michael Chen',
      email: 'michael.chen@gs.com',
      phone: '+91 9876501237',
      industry: 'Finance',
      location: 'Mumbai',
      partnershipType: 'Placement',
      status: 'Active',
      startDate: '2020-06-10',
      endDate: '2025-06-10',
      studentsHired: 23,
      averageSalary: 2850000,
      satisfactionRating: 4.9,
      lastActivity: '2024-01-15',
      notes: 'Premium financial services partner with highest compensation packages',
      documents: ['Partnership_Agreement.pdf', 'Compliance_Guidelines.pdf'],
      tier: 'Tier 1',
      priority: 'High'
    }
  ]);

  // Filter partnerships
  const filteredPartnerships = partnerships.filter(partnership => {
    const matchesSearch = partnership.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || partnership.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesTier = tierFilter === 'all' || partnership.tier === tierFilter;
    const matchesIndustry = industryFilter === 'all' || partnership.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesTier && matchesIndustry;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Pending': return 'bg-warning text-warning-foreground';
      case 'Inactive': return 'bg-muted text-muted-foreground';
      case 'Expired': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Get tier color
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Tier 1': return 'bg-primary text-primary-foreground';
      case 'Tier 2': return 'bg-info text-info-foreground';
      case 'Tier 3': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  // Handle partnership actions
  const handleEditPartnership = (partnershipId: string) => {
    toast.info(`Editing partnership ${partnershipId}`);
  };

  const handleDeletePartnership = (partnershipId: string) => {
    setPartnerships(partnerships.filter(p => p.id !== partnershipId));
    toast.success('Partnership deleted successfully');
  };

  const handleViewDetails = (partnershipId: string) => {
    toast.info(`Viewing details for partnership ${partnershipId}`);
  };

  const handleExportPartnerships = () => {
    const csvData = filteredPartnerships.map(partnership => ({
      'Company Name': partnership.companyName,
      'Contact Person': partnership.contactPerson,
      'Email': partnership.email,
      'Phone': partnership.phone,
      'Industry': partnership.industry,
      'Location': partnership.location,
      'Partnership Type': partnership.partnershipType,
      'Status': partnership.status,
      'Tier': partnership.tier,
      'Start Date': partnership.startDate,
      'End Date': partnership.endDate,
      'Students Hired': partnership.studentsHired,
      'Average Salary': partnership.averageSalary,
      'Satisfaction Rating': partnership.satisfactionRating,
      'Last Activity': partnership.lastActivity
    }));
    
    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `partnerships_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Partnerships data exported successfully!');
  };

  // Calculate statistics
  const totalHirings = partnerships.reduce((sum, p) => sum + p.studentsHired, 0);
  const averageSatisfaction = partnerships.reduce((sum, p) => sum + p.satisfactionRating, 0) / partnerships.length;
  const activePartnerships = partnerships.filter(p => p.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Partnership Management</h1>
          <p className="text-muted-foreground">Manage corporate partnerships and relationships</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportPartnerships}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Partnership
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Partners</p>
                <p className="text-2xl font-bold text-foreground">{partnerships.length}</p>
              </div>
              <Building className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Partners</p>
                <p className="text-2xl font-bold text-foreground">{activePartnerships}</p>
              </div>
              <Handshake className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Students Hired</p>
                <p className="text-2xl font-bold text-foreground">{totalHirings}</p>
              </div>
              <Users className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Satisfaction</p>
                <p className="text-2xl font-bold text-foreground">{averageSatisfaction.toFixed(1)}/5</p>
              </div>
              <Star className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search partnerships by company or contact person..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="Tier 1">Tier 1</SelectItem>
                <SelectItem value="Tier 2">Tier 2</SelectItem>
                <SelectItem value="Tier 3">Tier 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="IT Services">IT Services</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Partnerships List */}
      <div className="space-y-4">
        {filteredPartnerships.map((partnership) => (
          <Card key={partnership.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{partnership.companyName}</h3>
                    <p className="text-muted-foreground">{partnership.industry} • {partnership.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getTierColor(partnership.tier)}>{partnership.tier}</Badge>
                      <Badge className={getStatusColor(partnership.status)}>{partnership.status}</Badge>
                      <span className={`text-sm font-medium ${getPriorityColor(partnership.priority)}`}>
                        {partnership.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(partnership.id)}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditPartnership(partnership.id)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeletePartnership(partnership.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-medium">{partnership.contactPerson}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Mail className="w-3 h-3 mr-1" />
                    {partnership.email}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Phone className="w-3 h-3 mr-1" />
                    {partnership.phone}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Partnership Details</p>
                  <p className="font-medium">{partnership.partnershipType}</p>
                  <p className="text-xs text-muted-foreground">
                    Start: {partnership.startDate}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    End: {partnership.endDate}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className="font-medium">{partnership.studentsHired} students hired</p>
                  <p className="text-xs text-muted-foreground">
                    Avg Salary: ₹{(partnership.averageSalary / 100000).toFixed(1)}L
                  </p>
                  <div className="flex items-center text-xs">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    {partnership.satisfactionRating}/5.0
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                  <p className="font-medium">{partnership.lastActivity}</p>
                  <p className="text-xs text-muted-foreground">
                    {partnership.documents.length} documents
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Notes:</p>
                <p className="text-sm">{partnership.notes}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPartnerships.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Handshake className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No partnerships found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' || tierFilter !== 'all' || industryFilter !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : 'You haven\'t added any partnerships yet.'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Partnership
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PartnershipManagementPage;