import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, Search, Filter, Download, Eye, Edit, Plus, Building, 
  Phone, Mail, Globe, MapPin, Star, Users, Briefcase, TrendingUp
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';

interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  rating: number;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  activeJobs: number;
  totalHired: number;
  partnership: 'Active' | 'Inactive' | 'New';
  lastInteraction: string;
  establishedYear: number;
  employeeCount: string;
  description: string;
}

const companiesData: Company[] = [
  {
    id: 1,
    name: 'TCS (Tata Consultancy Services)',
    logo: '🏢',
    industry: 'IT Services',
    location: 'Mumbai, India',
    website: 'www.tcs.com',
    email: 'recruitment@tcs.com',
    phone: '+91 22 6778 9595',
    rating: 4.1,
    tier: 'Tier 1',
    activeJobs: 12,
    totalHired: 45,
    partnership: 'Active',
    lastInteraction: '2025-01-10',
    establishedYear: 1968,
    employeeCount: '500,000+',
    description: 'Leading global IT services, consulting and business solutions organization'
  },
  {
    id: 2,
    name: 'Infosys',
    logo: '💼',
    industry: 'IT Services',
    location: 'Bangalore, India',
    website: 'www.infosys.com',
    email: 'careers@infosys.com',
    phone: '+91 80 2852 0261',
    rating: 4.0,
    tier: 'Tier 1',
    activeJobs: 8,
    totalHired: 32,
    partnership: 'Active',
    lastInteraction: '2025-01-08',
    establishedYear: 1981,
    employeeCount: '250,000+',
    description: 'Digital services and consulting company'
  },
  {
    id: 3,
    name: 'Amazon',
    logo: '🛒',
    industry: 'E-commerce/Cloud',
    location: 'Hyderabad, India',
    website: 'www.amazon.jobs',
    email: 'university-recruiting@amazon.com',
    phone: '+91 40 4719 5000',
    rating: 4.3,
    tier: 'Tier 1',
    activeJobs: 15,
    totalHired: 28,
    partnership: 'Active',
    lastInteraction: '2025-01-12',
    establishedYear: 1994,
    employeeCount: '1,500,000+',
    description: 'Global technology and e-commerce company'
  },
  {
    id: 4,
    name: 'Microsoft India',
    logo: '🪟',
    industry: 'Technology',
    location: 'Hyderabad, India',
    website: 'careers.microsoft.com',
    email: 'msindia@microsoft.com',
    phone: '+91 40 4030 6000',
    rating: 4.5,
    tier: 'Tier 1',
    activeJobs: 6,
    totalHired: 18,
    partnership: 'Active',
    lastInteraction: '2025-01-15',
    establishedYear: 1975,
    employeeCount: '200,000+',
    description: 'Leading technology corporation'
  },
  {
    id: 5,
    name: 'Wipro',
    logo: '🔧',
    industry: 'IT Services',
    location: 'Bangalore, India',
    website: 'www.wipro.com',
    email: 'talentacquisition@wipro.com',
    phone: '+91 80 2844 0011',
    rating: 3.8,
    tier: 'Tier 2',
    activeJobs: 10,
    totalHired: 25,
    partnership: 'Active',
    lastInteraction: '2025-01-05',
    establishedYear: 1945,
    employeeCount: '240,000+',
    description: 'Information technology, consulting and business process services company'
  }
];

export const CompanyManagementPage: React.FC = () => {
  const { goBack, navigateTo } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [partnershipFilter, setPartnershipFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const filteredCompanies = companiesData.filter(company => {
    const matchesSearch = searchTerm === '' || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = tierFilter === 'all' || company.tier === tierFilter;
    const matchesPartnership = partnershipFilter === 'all' || company.partnership === partnershipFilter;
    
    return matchesSearch && matchesTier && matchesPartnership;
  });

  const getTierBadgeClass = (tier: string) => {
    switch (tier) {
      case 'Tier 1': return 'success-light';
      case 'Tier 2': return 'info-light';
      case 'Tier 3': return 'warning-light';
      default: return 'warning-light';
    }
  };

  const getPartnershipBadgeClass = (partnership: string) => {
    switch (partnership) {
      case 'Active': return 'success-light';
      case 'Inactive': return 'error-light';
      case 'New': return 'info-light';
      default: return 'warning-light';
    }
  };

  const handleCompanyClick = (company: Company) => {
    navigateTo('company-detail', company, company.name);
  };

  const handleAddCompany = () => {
    navigateTo('company-add', null, 'Add New Company');
  };

  const downloadCompaniesData = () => {
    let csvContent = 'data:text/csv;charset=utf-8,Company Name,Industry,Location,Tier,Active Jobs,Total Hired,Partnership,Rating,Phone,Email\\n';
    
    filteredCompanies.forEach(company => {
      csvContent += `"${company.name}","${company.industry}","${company.location}","${company.tier}",${company.activeJobs},${company.totalHired},"${company.partnership}",${company.rating},"${company.phone}","${company.email}"\\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'companies_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statsData = [
    { label: 'Total Companies', value: companiesData.length, color: 'blue', icon: Building },
    { label: 'Active Partnerships', value: companiesData.filter(c => c.partnership === 'Active').length, color: 'green', icon: Users },
    { label: 'Tier 1 Companies', value: companiesData.filter(c => c.tier === 'Tier 1').length, color: 'purple', icon: Star },
    { label: 'Total Placements', value: companiesData.reduce((sum, c) => sum + c.totalHired, 0), color: 'orange', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Company Management</h1>
              <p className="text-slate-600">Manage university industry partnerships and recruiters</p>
            </div>
          </div>
          <Button onClick={handleAddCompany} className="bg-gradient-to-r from-primary to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-primary/20 rounded-xl p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Overview</TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Companies</TabsTrigger>
            <TabsTrigger value="partnerships" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Partnerships</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Top Companies */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Top Recruiting Partners</CardTitle>
                <CardDescription>Companies with highest placement numbers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companiesData
                    .sort((a, b) => b.totalHired - a.totalHired)
                    .slice(0, 5)
                    .map((company, index) => (
                      <div key={company.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                           onClick={() => handleCompanyClick(company)}>
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{company.logo}</div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{company.name}</h4>
                            <p className="text-sm text-slate-600">{company.industry} • {company.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-800">{company.totalHired} hired</div>
                          <div className="text-sm text-slate-600">{company.activeJobs} active jobs</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            {/* Filters */}
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={tierFilter} onValueChange={setTierFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tiers</SelectItem>
                        <SelectItem value="Tier 1">Tier 1</SelectItem>
                        <SelectItem value="Tier 2">Tier 2</SelectItem>
                        <SelectItem value="Tier 3">Tier 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={partnershipFilter} onValueChange={setPartnershipFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Partnership" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={downloadCompaniesData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <Card key={company.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => handleCompanyClick(company)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{company.logo}</div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{company.name}</h4>
                          <p className="text-slate-600">{company.industry}</p>
                          <div className="flex items-center text-sm text-slate-500 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {company.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getTierBadgeClass(company.tier)}>
                          {company.tier}
                        </Badge>
                        <Badge className={getPartnershipBadgeClass(company.partnership)}>
                          {company.partnership}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-slate-800">{company.activeJobs}</div>
                        <div className="text-xs text-slate-600">Active Jobs</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-slate-800">{company.totalHired}</div>
                        <div className="text-xs text-slate-600">Total Hired</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-slate-800 flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {company.rating}
                        </div>
                        <div className="text-xs text-slate-600">Rating</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `tel:${company.phone}`;
                      }}>
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `mailto:${company.email}`;
                      }}>
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://${company.website}`, '_blank');
                      }}>
                        <Globe className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Partnership Management</CardTitle>
                <CardDescription>Manage corporate partnerships and MOU agreements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Building className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Partnership Features</h3>
                  <p className="text-slate-600 mb-4">Advanced partnership management features will be available here.</p>
                  <Button onClick={() => navigateTo('partnership-management', null, 'Partnership Management')}>
                    Manage Partnerships
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Company Analytics</CardTitle>
                <CardDescription>Insights and trends from company partnerships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Analytics Dashboard</h3>
                  <p className="text-slate-600 mb-4">Detailed analytics and insights about company partnerships.</p>
                  <Button onClick={() => navigateTo('company-analytics', null, 'Company Analytics')}>
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};