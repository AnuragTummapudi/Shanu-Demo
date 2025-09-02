export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: 'training' | 'interview' | 'meeting' | 'drive' | 'presentation' | 'session';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  participants: string[];
  location: string;
  organizer: string;
  priority: 'low' | 'medium' | 'high';
  department?: string;
  school?: string;
  tags: string[];
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
}

// Student Schedule Data
export const studentSchedule: ScheduleEvent[] = [
  {
    id: 'STU001',
    title: 'Machine Learning Workshop',
    description: 'Advanced ML concepts and hands-on implementation with TensorFlow',
    startDate: '2025-01-20',
    endDate: '2025-01-20',
    startTime: '10:00',
    endTime: '12:00',
    type: 'training',
    status: 'scheduled',
    participants: ['arjun.reddy@srmap.edu.in', 'meera.krishnan@srmap.edu.in'],
    location: 'AI Lab 301',
    organizer: 'priya.narasimhan@srmap.edu.in',
    priority: 'high',
    department: 'CSE',
    school: 'SET',
    tags: ['AI', 'Machine Learning', 'Technical Training']
  },
  {
    id: 'STU002',
    title: 'TCS Technical Interview',
    description: 'Technical interview round for Software Engineer position',
    startDate: '2025-01-22',
    endDate: '2025-01-22',
    startTime: '14:00',
    endTime: '15:30',
    type: 'interview',
    status: 'scheduled',
    participants: ['arjun.reddy@srmap.edu.in'],
    location: 'Interview Room A1',
    organizer: 'ramesh.naidu@srmap.edu.in',
    priority: 'high',
    department: 'CSE',
    school: 'SET',
    tags: ['TCS', 'Interview', 'Software Engineer']
  },
  {
    id: 'STU003',
    title: 'Resume Building Session',
    description: 'Interactive session on building effective technical resumes',
    startDate: '2025-01-25',
    endDate: '2025-01-25',
    startTime: '15:00',
    endTime: '16:30',
    type: 'session',
    status: 'scheduled',
    participants: ['arjun.reddy@srmap.edu.in', 'ananya.nair@srmap.edu.in'],
    location: 'Seminar Hall B',
    organizer: 'priya.narasimhan@srmap.edu.in',
    priority: 'medium',
    department: 'CSE',
    school: 'SET',
    tags: ['Career Development', 'Resume', 'Soft Skills']
  },
  {
    id: 'STU004',
    title: 'Infosys HR Round',
    description: 'Human Resources interview for internship position',
    startDate: '2025-01-27',
    endDate: '2025-01-27',
    startTime: '11:00',
    endTime: '12:00',
    type: 'interview',
    status: 'scheduled',
    participants: ['meera.krishnan@srmap.edu.in'],
    location: 'Conference Room 1',
    organizer: 'ramesh.naidu@srmap.edu.in',
    priority: 'high',
    department: 'IT',
    school: 'SET',
    tags: ['Infosys', 'HR Interview', 'Internship']
  }
];

// Faculty Schedule Data
export const facultySchedule: ScheduleEvent[] = [
  {
    id: 'FAC001',
    title: 'Data Structures & Algorithms - Advanced',
    description: 'Advanced concepts in DSA with competitive programming focus',
    startDate: '2025-01-21',
    endDate: '2025-01-21',
    startTime: '09:00',
    endTime: '11:00',
    type: 'training',
    status: 'scheduled',
    participants: ['CSE-A Students', 'CSE-B Students'],
    location: 'Lab 301',
    organizer: 'priya.narasimhan@srmap.edu.in',
    priority: 'high',
    department: 'CSE',
    school: 'SET',
    tags: ['DSA', 'Programming', 'Technical Training'],
    recurring: {
      frequency: 'weekly',
      interval: 1,
      endDate: '2025-04-15'
    }
  },
  {
    id: 'FAC002',
    title: 'Faculty Development Meeting',
    description: 'Monthly meeting to discuss curriculum updates and student feedback',
    startDate: '2025-01-23',
    endDate: '2025-01-23',
    startTime: '14:00',
    endTime: '16:00',
    type: 'meeting',
    status: 'scheduled',
    participants: ['priya.narasimhan@srmap.edu.in', 'Other Faculty'],
    location: 'Faculty Meeting Room',
    organizer: 'krishnamurthy.rao@srmap.edu.in',
    priority: 'medium',
    department: 'CSE',
    school: 'SET',
    tags: ['Faculty Development', 'Curriculum', 'Meeting']
  },
  {
    id: 'FAC003',
    title: 'System Design Workshop',
    description: 'Industry-oriented system design concepts for final year students',
    startDate: '2025-01-26',
    endDate: '2025-01-26',
    startTime: '10:30',
    endTime: '12:30',
    type: 'training',
    status: 'scheduled',
    participants: ['Final Year CSE Students'],
    location: 'Auditorium A',
    organizer: 'priya.narasimhan@srmap.edu.in',
    priority: 'high',
    department: 'CSE',
    school: 'SET',
    tags: ['System Design', 'Industry Preparation', 'Technical Training']
  },
  {
    id: 'FAC004',
    title: 'Student Performance Review',
    description: 'Individual performance review sessions with students',
    startDate: '2025-01-28',
    endDate: '2025-01-28',
    startTime: '13:00',
    endTime: '17:00',
    type: 'session',
    status: 'scheduled',
    participants: ['Individual Students'],
    location: 'Faculty Office',
    organizer: 'priya.narasimhan@srmap.edu.in',
    priority: 'medium',
    department: 'CSE',
    school: 'SET',
    tags: ['Performance Review', 'Mentoring', 'Student Development']
  }
];

// Operations Schedule Data
export const operationsSchedule: ScheduleEvent[] = [
  {
    id: 'OPS001',
    title: 'TechMahindra Campus Drive',
    description: 'Full-day recruitment drive including technical and HR rounds',
    startDate: '2025-01-24',
    endDate: '2025-01-24',
    startTime: '09:00',
    endTime: '18:00',
    type: 'drive',
    status: 'scheduled',
    participants: ['Eligible CSE/IT Students'],
    location: 'Main Auditorium & Interview Rooms',
    organizer: 'ramesh.naidu@srmap.edu.in',
    priority: 'high',
    department: 'CSE, IT',
    school: 'SET',
    tags: ['TechMahindra', 'Campus Drive', 'Recruitment']
  },
  {
    id: 'OPS002',
    title: 'Pre-placement Talk - Wipro',
    description: 'Company presentation and Q&A session with students',
    startDate: '2025-01-22',
    endDate: '2025-01-22',
    startTime: '15:00',
    endTime: '16:30',
    type: 'presentation',
    status: 'scheduled',
    participants: ['All Eligible Students'],
    location: 'Seminar Hall A',
    organizer: 'ramesh.naidu@srmap.edu.in',
    priority: 'medium',
    department: 'All',
    school: 'SET',
    tags: ['Wipro', 'Pre-placement', 'Company Presentation']
  },
  {
    id: 'OPS003',
    title: 'Interview Coordination Meeting',
    description: 'Planning and coordination for upcoming recruitment drives',
    startDate: '2025-01-20',
    endDate: '2025-01-20',
    startTime: '11:00',
    endTime: '12:30',
    type: 'meeting',
    status: 'scheduled',
    participants: ['ramesh.naidu@srmap.edu.in', 'srilakshmi.venkatesh@srmap.edu.in'],
    location: 'Operations Office',
    organizer: 'ramesh.naidu@srmap.edu.in',
    priority: 'medium',
    department: 'Placement Cell',
    school: 'SET',
    tags: ['Coordination', 'Planning', 'Operations']
  },
  {
    id: 'OPS004',
    title: 'Student Eligibility Review',
    description: 'Review and update student eligibility for upcoming opportunities',
    startDate: '2025-01-29',
    endDate: '2025-01-29',
    startTime: '10:00',
    endTime: '13:00',
    type: 'session',
    status: 'scheduled',
    participants: ['Operations Team'],
    location: 'Operations Office',
    organizer: 'ramesh.naidu@srmap.edu.in',
    priority: 'medium',
    department: 'All',
    school: 'SET',
    tags: ['Eligibility', 'Student Management', 'Review']
  }
];

// Outreach Schedule Data
export const outreachSchedule: ScheduleEvent[] = [
  {
    id: 'OUT001',
    title: 'Microsoft Partnership Meeting',
    description: 'Strategic meeting to discuss internship and full-time opportunities',
    startDate: '2025-01-21',
    endDate: '2025-01-21',
    startTime: '14:00',
    endTime: '16:00',
    type: 'meeting',
    status: 'scheduled',
    participants: ['srilakshmi.venkatesh@srmap.edu.in', 'Microsoft HR Team'],
    location: 'Conference Room Executive',
    organizer: 'srilakshmi.venkatesh@srmap.edu.in',
    priority: 'high',
    department: 'Placement Cell',
    school: 'SET',
    tags: ['Microsoft', 'Partnership', 'Strategic Meeting']
  },
  {
    id: 'OUT002',
    title: 'Company Visit - Zoho Chennai',
    description: 'Visit to Zoho Chennai office for partnership discussions',
    startDate: '2025-01-25',
    endDate: '2025-01-25',
    startTime: '10:00',
    endTime: '17:00',
    type: 'meeting',
    status: 'scheduled',
    participants: ['srilakshmi.venkatesh@srmap.edu.in'],
    location: 'Zoho Chennai Office',
    organizer: 'srilakshmi.venkatesh@srmap.edu.in',
    priority: 'high',
    department: 'Placement Cell',
    school: 'SET',
    tags: ['Zoho', 'Company Visit', 'Partnership Development']
  },
  {
    id: 'OUT003',
    title: 'Industry Connect Webinar',
    description: 'Monthly webinar connecting students with industry professionals',
    startDate: '2025-01-27',
    endDate: '2025-01-27',
    startTime: '16:00',
    endTime: '17:30',
    type: 'presentation',
    status: 'scheduled',
    participants: ['Students', 'Industry Professionals'],
    location: 'Virtual - Zoom',
    organizer: 'srilakshmi.venkatesh@srmap.edu.in',
    priority: 'medium',
    department: 'All',
    school: 'SET',
    tags: ['Industry Connect', 'Webinar', 'Networking']
  },
  {
    id: 'OUT004',
    title: 'Startup Pitch Session',
    description: 'Session with local startups for potential collaboration',
    startDate: '2025-01-30',
    endDate: '2025-01-30',
    startTime: '13:00',
    endTime: '15:00',
    type: 'meeting',
    status: 'scheduled',
    participants: ['srilakshmi.venkatesh@srmap.edu.in', 'Startup Representatives'],
    location: 'Innovation Hub',
    organizer: 'srilakshmi.venkatesh@srmap.edu.in',
    priority: 'medium',
    department: 'Placement Cell',
    school: 'SET',
    tags: ['Startups', 'Innovation', 'Collaboration']
  }
];

// Combined schedule getter functions
export const getScheduleByRole = (role: string): ScheduleEvent[] => {
  switch (role) {
    case 'student':
      return studentSchedule;
    case 'faculty':
      return facultySchedule;
    case 'operations':
      return operationsSchedule;
    case 'outreach':
      return outreachSchedule;
    default:
      return [];
  }
};

export const getAllSchedules = (): ScheduleEvent[] => {
  return [
    ...studentSchedule,
    ...facultySchedule,
    ...operationsSchedule,
    ...outreachSchedule
  ];
};

export const getScheduleByDateRange = (startDate: string, endDate: string, role?: string): ScheduleEvent[] => {
  const schedules = role ? getScheduleByRole(role) : getAllSchedules();
  return schedules.filter(event => 
    event.startDate >= startDate && event.startDate <= endDate
  );
};

export const getUpcomingEvents = (role?: string, limit: number = 5): ScheduleEvent[] => {
  const schedules = role ? getScheduleByRole(role) : getAllSchedules();
  const today = new Date().toISOString().split('T')[0];
  
  return schedules
    .filter(event => event.startDate >= today && event.status !== 'cancelled')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit);
};

export const getTodaysEvents = (role?: string): ScheduleEvent[] => {
  const today = new Date().toISOString().split('T')[0];
  return getScheduleByDateRange(today, today, role);
};

// Calendar helper functions
export const formatEventTime = (startTime: string, endTime: string): string => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

export const getEventDuration = (startTime: string, endTime: string): number => {
  const start = new Date(`2000-01-01 ${startTime}`);
  const end = new Date(`2000-01-01 ${endTime}`);
  return (end.getTime() - start.getTime()) / (1000 * 60); // Duration in minutes
};

export const getEventsByMonth = (year: number, month: number, role?: string): ScheduleEvent[] => {
  const schedules = role ? getScheduleByRole(role) : getAllSchedules();
  return schedules.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
};