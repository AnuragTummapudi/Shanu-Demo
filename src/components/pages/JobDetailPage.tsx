import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PageHeader } from '../common/PageHeader';
import { useNavigation } from '../navigation/NavigationProvider';
import { 
  Building, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Clock, 
  Users, 
  CheckCircle,
  FileText,
  Share2,
  Bookmark,
  Send,
  Phone,
  Mail
} from 'lucide-react';

interface JobDetailPageProps {
  job: any; // Using any to handle different job interfaces
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({ job }) => {
  const { navigateTo } = useNavigation();
  const [applied, setApplied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Safe access to job properties with fallbacks
  const safeJob = {
    id: job?.id || 0,
    title: job?.title || 'Job Title',
    company: job?.company || 'Company Name',
    location: job?.location || 'Location',
    type: job?.type || 'Full-time',
    ctc: job?.ctc || 'Not specified',
    stipend: job?.stipend,
    description: job?.description || 'Job description not available.',
    requirements: job?.requirements || [],
    benefits: job?.benefits || [],
    skills: job?.skills || job?.tags || [], // Use skills or tags, whichever is available
    applicationDeadline: job?.applicationDeadline || job?.deadline || 'Not specified',
    applicants: job?.applicants || job?.applications || 0,
    shortlisted: job?.shortlisted || 0,
    workMode: job?.workMode || 'On-site',
    bondPeriod: job?.bondPeriod,
    duration: job?.duration,
    experience: job?.experience || 'Freshers',
    postedDate: job?.postedDate || 'Not specified'
  };

  const handleApply = () => {
    setApplied(true);
    alert(`Application submitted successfully for ${safeJob.title} at ${safeJob.company}!`);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    alert(`Job ${bookmarked ? 'removed from' : 'added to'} bookmarks!`);
  };

  const handleCallCompany = () => {
    alert(`Calling ${safeJob.company}... This would initiate a call to the company's HR department.`);
  };

  const handleEmailCompany = () => {
    window.location.href = `mailto:hr@${safeJob.company.toLowerCase().replace(' ', '')}.com?subject=Inquiry about ${safeJob.title} position`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${safeJob.title} at ${safeJob.company}`,
        text: `Check out this job opportunity: ${safeJob.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Job link copied to clipboard!');
    }
  };

  const isInternship = safeJob.type === 'Internship';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <PageHeader 
        title={safeJob.title}
        description={`${safeJob.type} at ${safeJob.company}`}
        actions={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleBookmark}>
              <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current text-primary' : ''}`} />
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        }
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Overview */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-800">{safeJob.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-slate-600">{safeJob.company}</CardDescription>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className={isInternship ? 'warning-light' : 'success-light'}>
                          {safeJob.type}
                        </Badge>
                        <div className="flex items-center text-sm text-slate-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {safeJob.location}
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Building className="w-4 h-4 mr-1" />
                          {safeJob.workMode}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-slate-600">
                        {isInternship ? 'Stipend' : 'CTC'}
                      </div>
                      <div className="font-semibold text-slate-800">
                        {isInternship ? safeJob.stipend : safeJob.ctc}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-sm text-slate-600">Deadline</div>
                      <div className="font-semibold text-slate-800">{safeJob.applicationDeadline}</div>
                    </div>
                  </div>
                  {isInternship && safeJob.duration && (
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="text-sm text-slate-600">Duration</div>
                        <div className="font-semibold text-slate-800">{safeJob.duration}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <Users className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-sm text-slate-600">Applicants</div>
                      <div className="font-semibold text-slate-800">{safeJob.applicants}</div>
                    </div>
                  </div>
                </div>

                {/* Skills/Tags Section */}
                {safeJob.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {safeJob.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-slate-50 hover:bg-slate-100">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="text-sm text-slate-600">Experience</div>
                    <div className="font-medium text-slate-800">{safeJob.experience}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Posted Date</div>
                    <div className="font-medium text-slate-800">{safeJob.postedDate}</div>
                  </div>
                  {safeJob.bondPeriod && (
                    <div>
                      <div className="text-sm text-slate-600">Bond Period</div>
                      <div className="font-medium text-slate-800">{safeJob.bondPeriod}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Tabs defaultValue="description" className="bg-white rounded-xl shadow-lg">
              <TabsList className="grid w-full grid-cols-4 bg-slate-50 rounded-xl p-1">
                <TabsTrigger value="description" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Description</TabsTrigger>
                <TabsTrigger value="requirements" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Requirements</TabsTrigger>
                <TabsTrigger value="benefits" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Benefits</TabsTrigger>
                <TabsTrigger value="company" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Company</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Job Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-slate-700 leading-relaxed">{safeJob.description}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Requirements & Qualifications</h3>
                  {safeJob.requirements.length > 0 ? (
                    <ul className="space-y-3">
                      {safeJob.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-600">No specific requirements listed.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="mt-6">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Benefits & Perks</h3>
                  {safeJob.benefits.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {safeJob.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-slate-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">Benefits information will be shared during the interview process.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="company" className="mt-6">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">About {safeJob.company}</h3>
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      {safeJob.company} is a leading technology company that specializes in innovative solutions 
                      for modern businesses. We are committed to fostering talent and providing excellent 
                      growth opportunities for our employees.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => navigateTo('company-detail', { companyName: safeJob.company, ...job }, `${safeJob.company} - Company Profile`)}
                      >
                        <Building className="w-4 h-4 mr-2" />
                        View Company Profile
                      </Button>
                      <Button variant="outline" onClick={handleCallCompany}>
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Company
                      </Button>
                      <Button variant="outline" onClick={handleEmailCompany}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email Company
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Status */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-800">Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{safeJob.applicants}</div>
                    <div className="text-sm text-slate-600">Applied</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{safeJob.shortlisted}</div>
                    <div className="text-sm text-slate-600">Shortlisted</div>
                  </div>
                </div>
                
                {applied ? (
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-medium text-green-800">Application Submitted</div>
                    <div className="text-sm text-green-600">You'll hear back soon!</div>
                  </div>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" onClick={handleApply}>
                    <Send className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                )}
                
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  View Application Details
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigateTo('student-management', null, 'Eligible Students')}>
                  <Users className="w-4 h-4 mr-2" />
                  View Eligible Students
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert('Downloading job description...')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Download JD
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleCallCompany}>
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Company
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleEmailCompany}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Company
                </Button>
              </CardContent>
            </Card>

            {/* Similar Opportunities */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-800">Similar Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'Backend Developer', company: 'Wipro Technologies', type: 'Full-time', ctc: '₹7L - ₹10L' },
                  { title: 'React Developer Intern', company: 'Zoho Corporation', type: 'Internship', ctc: '₹20,000/month' },
                  { title: 'Full Stack Developer', company: 'Flipkart Group', type: 'Full-time', ctc: '₹12L - ₹15L' }
                ].map((similar, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="font-medium text-slate-800">{similar.title}</div>
                    <div className="text-sm text-slate-600">{similar.company}</div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        {similar.type}
                      </Badge>
                      <span className="text-xs font-medium text-slate-700">{similar.ctc}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};