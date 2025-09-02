export const jobPostingsData = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp Solutions',
    type: 'Full-time',
    ctc: '$75,000 - $95,000',
    eligibleStudents: 45,
    applications: 32,
    shortlisted: 8,
    selected: 2,
    deadline: '2025-02-01',
    status: 'active',
    postedDate: '2025-01-10'
  },
  {
    id: 2,
    title: 'Software Engineering Intern',
    company: 'Innovation Labs',
    type: 'Internship',
    ctc: '$4,000/month',
    eligibleStudents: 67,
    applications: 54,
    shortlisted: 12,
    selected: 3,
    deadline: '2025-01-25',
    status: 'active',
    postedDate: '2025-01-08'
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Analytics Hub',
    type: 'Full-time',
    ctc: '$70,000 - $90,000',
    eligibleStudents: 38,
    applications: 28,
    shortlisted: 6,
    selected: 1,
    deadline: '2025-02-05',
    status: 'completed',
    postedDate: '2025-01-05'
  }
];

export const eligibleStudents = [
  {
    id: 1,
    name: 'Alex Johnson',
    rollNo: 'CS21001',
    department: 'Computer Science',
    cgpa: 8.5,
    skills: ['React', 'JavaScript', 'Python'],
    experience: 'Intern at StartupXYZ',
    eligible: true,
    applied: false,
    shortlisted: false,
    selected: false
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    rollNo: 'CS21002',
    department: 'Computer Science',
    cgpa: 9.1,
    skills: ['Java', 'Spring', 'SQL'],
    experience: 'Project Lead in college',
    eligible: true,
    applied: true,
    shortlisted: true,
    selected: false
  },
  {
    id: 3,
    name: 'Mike Chen',
    rollNo: 'CS21003',
    department: 'Computer Science',
    cgpa: 7.8,
    skills: ['Python', 'Django', 'PostgreSQL'],
    experience: 'Freelance developer',
    eligible: true,
    applied: true,
    shortlisted: false,
    selected: false
  },
  {
    id: 4,
    name: 'Emma Davis',
    rollNo: 'IT21001',
    department: 'Information Technology',
    cgpa: 8.9,
    skills: ['React', 'Node.js', 'MongoDB'],
    experience: 'Tech club president',
    eligible: true,
    applied: false,
    shortlisted: false,
    selected: false
  }
];

export const driveProgressData = [
  {
    drive: 'TechCorp Drive',
    jdUploaded: 100,
    studentsApplied: 80,
    shortlisted: 60,
    finalSelection: 30
  },
  {
    drive: 'Innovation Labs',
    jdUploaded: 100,
    studentsApplied: 95,
    shortlisted: 70,
    finalSelection: 45
  },
  {
    drive: 'Analytics Hub',
    jdUploaded: 100,
    studentsApplied: 75,
    shortlisted: 55,
    finalSelection: 25
  }
];

export const applicationStatusData = [
  { name: 'Applied', value: 45, color: '#3b82f6' },
  { name: 'Shortlisted', value: 18, color: '#f59e0b' },
  { name: 'Selected', value: 8, color: '#10b981' },
  { name: 'Rejected', value: 12, color: '#ef4444' }
];