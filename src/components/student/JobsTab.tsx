import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  MapPin, 
  Clock, 
  DollarSign,
  Building,
  Calendar,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import { indianJobs } from '../data/indianData';
import { useNavigation } from '../navigation/NavigationProvider';

export const JobsTab: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleJobClick = (job: any) => {
    navigateTo('job-detail', job, job.title);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-blue-900">Job Opportunities & Internships</h2>
          <p className="text-blue-600">Explore available positions and internships</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {indianJobs.map((job) => (
          <Card key={job.id} className={`bg-white border-blue-100 cursor-pointer hover:shadow-lg transition-shadow ${job.status === 'active' ? '' : 'opacity-60'}`}
                onClick={() => handleJobClick(job)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-blue-900">{job.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>{job.company}</span>
                  </CardDescription>
                </div>
                <div className="flex flex-col space-y-1">
                  <Badge className={job.type === 'Internship' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}>
                    {job.type}
                  </Badge>
                  {job.status === 'active' && (
                    <Badge className="bg-blue-100 text-blue-800">
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {job.type === 'Internship' ? job.stipend : job.ctc}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Deadline: {job.deadline}
                </div>
                {job.type === 'Internship' && job.duration && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Duration: {job.duration}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {job.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {job.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.tags.length - 3} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {job.applications} applications
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};