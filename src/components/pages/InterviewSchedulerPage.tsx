import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  ArrowLeft, Calendar as CalendarIcon, Clock, User, Building, Mail, 
  Phone, MapPin, Video, Save, Send, Users, Bell
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { format } from 'date-fns';

interface InterviewSchedulerPageProps {
  application?: any;
}

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

const interviewTypes = [
  { value: 'technical', label: 'Technical Interview', duration: '60 mins' },
  { value: 'hr', label: 'HR Interview', duration: '30 mins' },
  { value: 'behavioral', label: 'Behavioral Interview', duration: '45 mins' },
  { value: 'managerial', label: 'Managerial Round', duration: '45 mins' },
  { value: 'final', label: 'Final Round', duration: '30 mins' }
];

const venues = [
  { value: 'campus', label: 'On Campus - Conference Room A', capacity: 20 },
  { value: 'virtual', label: 'Virtual Meeting', capacity: 100 },
  { value: 'company', label: 'Company Office', capacity: 50 },
  { value: 'hybrid', label: 'Hybrid (Campus + Virtual)', capacity: 30 }
];

export const InterviewSchedulerPage: React.FC<InterviewSchedulerPageProps> = ({ application }) => {
  const { goBack, navigateTo } = useNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [interviewType, setInterviewType] = useState('');
  const [venue, setVenue] = useState('');
  const [interviewers, setInterviewers] = useState('');
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [reminderTime, setReminderTime] = useState('30');

  // Mock data for demonstration
  const applicationData = application || {
    id: 1,
    studentName: 'Arjun Raghavan',
    rollNo: 'AP24322130125',
    email: 'arjun_raghavan@srmap.edu.in',
    phone: '+91 9876543125',
    company: 'Microsoft India',
    jobTitle: 'Software Engineer',
    department: 'Computer Science Engineering',
    currentRound: 'Technical Round 1'
  };

  const handleScheduleInterview = () => {
    if (!selectedDate || !selectedTime || !interviewType || !venue) {
      alert('Please fill all required fields.');
      return;
    }

    const interviewDetails = {
      student: applicationData,
      date: selectedDate,
      time: selectedTime,
      type: interviewType,
      venue: venue,
      interviewers: interviewers,
      notes: notes,
      reminderTime: reminderTime
    };

    // Simulate scheduling
    alert(`Interview scheduled successfully!\n\nDetails:\nStudent: ${applicationData.studentName}\nDate: ${format(selectedDate, 'PPP')}\nTime: ${selectedTime}\nType: ${interviewTypes.find(t => t.value === interviewType)?.label}\nVenue: ${venues.find(v => v.value === venue)?.label}`);
    
    goBack();
  };

  const handleSendNotification = () => {
    alert(`Notification sent to ${applicationData.studentName} at ${applicationData.email}`);
  };

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
              <h1 className="text-2xl font-bold text-slate-800">Schedule Interview</h1>
              <p className="text-slate-600">Coordinate interview sessions with students and companies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student/Application Details */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-xl sticky top-6">
              <CardHeader>
                <CardTitle className="text-slate-800">Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{applicationData.studentName}</h4>
                    <p className="text-sm text-slate-600">{applicationData.rollNo}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {applicationData.email}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {applicationData.phone}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Building className="w-4 h-4 mr-2" />
                    {applicationData.company}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h5 className="font-medium text-slate-800 mb-2">Position Details</h5>
                  <Badge className="success-light mb-2">{applicationData.jobTitle}</Badge>
                  <p className="text-sm text-slate-600">{applicationData.department}</p>
                  <p className="text-sm text-slate-600">Current Round: {applicationData.currentRound}</p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSendNotification}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notify Student
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Interview Scheduling Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Interview Schedule</CardTitle>
                <CardDescription>Set up interview date, time, and logistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Interview Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Time Slot</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {time}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Interview Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Interview Type</label>
                  <Select value={interviewType} onValueChange={setInterviewType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{type.label}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {type.duration}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Venue Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Interview Venue</label>
                  <Select value={venue} onValueChange={setVenue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((v) => (
                        <SelectItem key={v.value} value={v.value}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              {v.value === 'virtual' ? (
                                <Video className="w-4 h-4 mr-2" />
                              ) : (
                                <MapPin className="w-4 h-4 mr-2" />
                              )}
                              {v.label}
                            </div>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {v.capacity} capacity
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Interviewers */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Interviewers</label>
                  <Input
                    placeholder="Enter interviewer names (comma separated)"
                    value={interviewers}
                    onChange={(e) => setInterviewers(e.target.value)}
                  />
                  <p className="text-xs text-slate-500">
                    Example: Dr. Priya Narasimhan, Rajesh Kumar (Microsoft), Deepika Reddy (HR)
                  </p>
                </div>

                {/* Reminder Settings */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Reminder</label>
                  <Select value={reminderTime} onValueChange={setReminderTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes before</SelectItem>
                      <SelectItem value="30">30 minutes before</SelectItem>
                      <SelectItem value="60">1 hour before</SelectItem>
                      <SelectItem value="1440">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Additional Notes</label>
                  <Textarea
                    placeholder="Add any special instructions or requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleScheduleInterview} className="flex-1 bg-gradient-to-r from-primary to-purple-600">
                    <Save className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" onClick={() => {
                    // Save as draft
                    alert('Interview details saved as draft.');
                  }}>
                    Save Draft
                  </Button>
                  <Button variant="outline" onClick={handleSendNotification}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Interviews */}
            <Card className="bg-white border-0 shadow-xl mt-6">
              <CardHeader>
                <CardTitle className="text-slate-800">Upcoming Interviews</CardTitle>
                <CardDescription>Recently scheduled interviews for this student</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: '2025-01-20', time: '10:00 AM', type: 'Technical Round', company: 'TCS' },
                    { date: '2025-01-22', time: '02:00 PM', type: 'HR Round', company: 'Infosys' }
                  ].map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <div className="font-medium text-slate-800">{interview.type}</div>
                          <div className="text-sm text-slate-600">{interview.company}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-800">{interview.date}</div>
                        <div className="text-sm text-slate-600">{interview.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};