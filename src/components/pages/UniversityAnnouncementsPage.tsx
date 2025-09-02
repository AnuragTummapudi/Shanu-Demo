import React, { useState } from 'react';
import { ArrowLeft, Download, Plus, Megaphone, Calendar, Users, Eye, Send, Edit, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { exportToCSV } from '../utils/csvExport';

interface UniversityAnnouncementsPageProps {
  onBack: () => void;
}

const UniversityAnnouncementsPage: React.FC<UniversityAnnouncementsPageProps> = ({ onBack }) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<string | null>(null);

  // Announcements Data
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ANN001',
      title: 'Semester End Examination Schedule Released',
      content: `Dear Students and Faculty,

The semester end examination schedule for Winter 2024 has been released. Please note the following important dates:

• Examination Period: January 20 - February 5, 2025
• Last date for examination form submission: January 10, 2025
• Admit card download: Starting January 15, 2025

Important Instructions:
1. Students must carry their admit cards and ID cards to the examination hall
2. Reporting time is 30 minutes before the exam
3. Mobile phones and electronic devices are strictly prohibited
4. Any form of unfair means will result in disqualification

For any queries, contact the examination office.

Best regards,
Controller of Examinations`,
      category: 'Academic',
      priority: 'High',
      status: 'Published',
      publishedAt: '2024-01-10 09:00:00',
      publishedBy: 'Dr. Rajesh Venkatesh',
      targetAudience: ['Students', 'Faculty'],
      expiryDate: '2025-02-10',
      views: 2847,
      department: 'All Departments'
    },
    {
      id: 'ANN002',
      title: 'New Industry Partnership with TCS',
      content: `We are pleased to announce a strategic partnership with Tata Consultancy Services (TCS) for enhanced placement opportunities and industry exposure.

Key Benefits:
• Dedicated placement drives for our students
• Industry mentorship programs
• Internship opportunities
• Guest lectures by TCS experts
• Skill development workshops

This partnership will provide our students with better career prospects and industry-relevant skills. The first placement drive will be conducted in February 2025.

Stay tuned for more updates!

Best regards,
Placement Cell`,
      category: 'Placement',
      priority: 'High',
      status: 'Published',
      publishedAt: '2024-01-12 14:30:00',
      publishedBy: 'Priya Krishnamurthy',
      targetAudience: ['Students', 'Faculty', 'Operations'],
      expiryDate: '2025-03-15',
      views: 1923,
      department: 'Placement Cell'
    },
    {
      id: 'ANN003',
      title: 'Library Renovation and New Facilities',
      content: `The university library will undergo renovation to provide better facilities for students and faculty.

Renovation Timeline:
• Phase 1: January 15-31, 2025 (Ground Floor)
• Phase 2: February 1-15, 2025 (First Floor)
• Phase 3: February 16-28, 2025 (Reading Halls)

New Facilities:
• Digital library with 500+ e-books
• 24/7 study rooms
• Group discussion areas
• High-speed Wi-Fi connectivity
• Comfortable seating arrangements

During renovation, temporary reading facilities will be available in the auditorium.

Library Team`,
      category: 'Infrastructure',
      priority: 'Medium',
      status: 'Draft',
      publishedAt: null,
      publishedBy: 'Kavitha Sharma',
      targetAudience: ['Students', 'Faculty'],
      expiryDate: '2025-04-01',
      views: 0,
      department: 'Infrastructure'
    },
    {
      id: 'ANN004',
      title: 'Annual Sports Meet 2025',
      content: `The Annual Sports Meet 2025 will be held from March 10-15, 2025.

Events Include:
• Track and Field Events
• Team Sports (Cricket, Football, Basketball)
• Indoor Games (Table Tennis, Badminton, Chess)
• Cultural Performances

Registration:
• Online registration starts: February 1, 2025
• Last date for registration: February 25, 2025
• Registration fee: ₹500 per student

Awards and Prizes:
• Cash prizes for winners
• Certificates for all participants
• Overall championship trophy

Contact the Sports Department for more details.

Sports Committee`,
      category: 'Events',
      priority: 'Medium',
      status: 'Scheduled',
      publishedAt: '2024-01-15 10:00:00',
      publishedBy: 'Sports Committee',
      targetAudience: ['Students'],
      expiryDate: '2025-03-20',
      views: 1456,
      department: 'Sports Department'
    },
    {
      id: 'ANN005',
      title: 'Faculty Development Program on AI/ML',
      content: `Faculty Development Program on "Artificial Intelligence and Machine Learning in Education" will be conducted.

Program Details:
• Duration: 5 days (February 20-24, 2025)
• Mode: Hybrid (Online + Offline)
• Participants: Faculty from all departments
• Registration deadline: February 10, 2025

Topics Covered:
• Introduction to AI/ML
• Applications in Education
• Hands-on workshops
• Research opportunities
• Industry trends

Certificate will be provided to all participants.

Academic Development Cell`,
      category: 'Faculty Development',
      priority: 'Medium',
      status: 'Published',
      publishedAt: '2024-01-08 11:30:00',
      publishedBy: 'Dr. Priya Narasimhan',
      targetAudience: ['Faculty'],
      expiryDate: '2025-02-25',
      views: 245,
      department: 'Academic Development'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: 'General',
    priority: 'Medium',
    targetAudience: ['Students'],
    expiryDate: '',
    department: 'Administration'
  });

  const categories = ['Academic', 'Placement', 'Infrastructure', 'Events', 'Faculty Development', 'General'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const audiences = ['Students', 'Faculty', 'Operations', 'Outreach', 'All'];

  const handleCreateNew = () => {
    setIsCreatingNew(true);
  };

  const handleSaveAnnouncement = () => {
    const announcement = {
      id: `ANN${String(announcements.length + 1).padStart(3, '0')}`,
      ...newAnnouncement,
      status: 'Draft',
      publishedAt: null,
      publishedBy: 'Dr. Rajesh Venkatesh',
      views: 0
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({
      title: '',
      content: '',
      category: 'General',
      priority: 'Medium',
      targetAudience: ['Students'],
      expiryDate: '',
      department: 'Administration'
    });
    setIsCreatingNew(false);
  };

  const handlePublishAnnouncement = (id: string) => {
    const updatedAnnouncements = announcements.map(ann =>
      ann.id === id 
        ? { ...ann, status: 'Published', publishedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) }
        : ann
    );
    setAnnouncements(updatedAnnouncements);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  const handleExportAnnouncements = () => {
    const announcementData = announcements.map(ann => ({
      'Announcement ID': ann.id,
      'Title': ann.title,
      'Category': ann.category,
      'Priority': ann.priority,
      'Status': ann.status,
      'Published At': ann.publishedAt || 'Not Published',
      'Published By': ann.publishedBy,
      'Target Audience': ann.targetAudience.join(', '),
      'Department': ann.department,
      'Views': ann.views,
      'Expiry Date': ann.expiryDate
    }));

    exportToCSV(announcementData, 'university_announcements_report');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'default';
      case 'Draft': return 'secondary';
      case 'Scheduled': return 'outline';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">University Announcements</h1>
            <p className="text-muted-foreground">Create and manage university-wide announcements</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportAnnouncements}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-success">{announcements.filter(a => a.status === 'Published').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-warning">{announcements.filter(a => a.status === 'Draft').length}</p>
              </div>
              <Edit className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-primary">{announcements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-error">{announcements.filter(a => a.priority === 'High' || a.priority === 'Urgent').length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-error" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Announcement */}
      {isCreatingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="Enter announcement title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newAnnouncement.category}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                  className="w-full p-2 border border-border rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                  className="w-full p-2 border border-border rounded-md"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newAnnouncement.department}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, department: e.target.value })}
                  placeholder="Department name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={newAnnouncement.expiryDate}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, expiryDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                placeholder="Enter announcement content..."
                rows={8}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSaveAnnouncement}>
                Save as Draft
              </Button>
              <Button variant="outline" onClick={() => setIsCreatingNew(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    <span>{announcement.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant={getStatusColor(announcement.status)}>
                      {announcement.status}
                    </Badge>
                    <Badge variant={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                    <Badge variant="outline">{announcement.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {announcement.publishedAt ? `Published: ${announcement.publishedAt}` : 'Not Published'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {announcement.status === 'Draft' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublishAnnouncement(announcement.id)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-lg">
                    {announcement.content}
                  </pre>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-6">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Target:</span>
                      <span className="ml-2 font-medium">{announcement.targetAudience.join(', ')}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="ml-2 font-medium">{announcement.department}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Views:</span>
                      <span className="ml-2 font-medium">{announcement.views.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Expires:</span>
                      <span className="ml-2 font-medium">{announcement.expiryDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UniversityAnnouncementsPage;