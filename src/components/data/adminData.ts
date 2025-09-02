export const globalKPIs = [
  {
    metric: 'Total Students Placed',
    value: 847,
    target: 1000,
    change: '+12%',
    trend: 'up'
  },
  {
    metric: 'Average CTC',
    value: 88000,
    target: 90000,
    change: '+8%',
    trend: 'up'
  },
  {
    metric: 'Placement Rate',
    value: 94,
    target: 95,
    change: '+2%',
    trend: 'up'
  },
  {
    metric: 'Training Effectiveness',
    value: 87,
    target: 90,
    change: '+15%',
    trend: 'up'
  }
];

export const placementByDept = [
  { department: 'Computer Science', placed: 285, total: 320, rate: 89 },
  { department: 'Information Technology', placed: 198, total: 220, rate: 90 },
  { department: 'Electronics', placed: 145, total: 180, rate: 81 },
  { department: 'Mechanical', placed: 167, total: 210, rate: 80 },
  { department: 'Civil', placed: 89, total: 120, rate: 74 }
];

export const ctcTrends = [
  { month: 'Aug', avg: 75000, median: 72000, highest: 150000 },
  { month: 'Sep', avg: 78000, median: 75000, highest: 160000 },
  { month: 'Oct', avg: 82000, median: 78000, highest: 180000 },
  { month: 'Nov', avg: 85000, median: 82000, highest: 190000 },
  { month: 'Dec', avg: 88000, median: 85000, highest: 200000 },
  { month: 'Jan', avg: 92000, median: 88000, highest: 220000 }
];

export const trainingEffectiveness = [
  { program: 'Full Stack Development', participants: 120, preAvg: 65, postAvg: 88, improvement: 35 },
  { program: 'Data Science', participants: 85, preAvg: 70, postAvg: 91, improvement: 30 },
  { program: 'Cloud Computing', participants: 95, preAvg: 68, postAvg: 86, improvement: 26 },
  { program: 'AI/ML', participants: 75, preAvg: 72, postAvg: 89, improvement: 24 },
  { program: 'Cybersecurity', participants: 60, preAvg: 69, postAvg: 85, improvement: 23 }
];

export const outreachPerformance = [
  { quarter: 'Q4 2024', companiesContacted: 45, partnerships: 32, placements: 156 },
  { quarter: 'Q1 2025', companiesContacted: 52, partnerships: 38, placements: 184 },
  { quarter: 'Q2 2025', companiesContacted: 48, partnerships: 35, placements: 167 },
  { quarter: 'Q3 2025', companiesContacted: 55, partnerships: 42, placements: 203 }
];

export const userStats = [
  { role: 'Students', count: 2847, active: 2654, growth: '+5%' },
  { role: 'Faculty', count: 45, active: 42, growth: '+2%' },
  { role: 'Outreach Team', count: 8, active: 8, growth: '0%' },
  { role: 'Operations Team', count: 12, active: 11, growth: '+1%' },
  { role: 'Admins', count: 3, active: 3, growth: '0%' }
];