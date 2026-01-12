import { TimelineEvent, PSUJob, ChoiceItem } from './types';

export const TIMELINE_DATA: TimelineEvent[] = [
  { id: '1', title: 'GATE Results Announcement', date: '2025-03-16', type: 'GOAPS', status: 'Upcoming' },
  { id: '2', title: 'COAP Registration Starts', date: '2025-03-20', type: 'GOAPS', status: 'Upcoming' },
  { id: '3', title: 'CCMT Registration Opens', date: '2025-05-24', type: 'CCMT', status: 'Upcoming' },
  { id: '4', title: 'IOCL Application Deadline', date: '2025-04-10', type: 'PSU', status: 'Upcoming' },
];

export const MOCK_PSUS: PSUJob[] = [
  { id: '1', name: 'IOCL', role: 'Graduate Engineer Trainee', minGateScore: 650, deadline: '2025-04-10', status: 'Open' },
  { id: '2', name: 'NTPC', role: 'Executive Trainee', minGateScore: 700, deadline: '2025-04-15', status: 'Open' },
  { id: '3', name: 'ONGC', role: 'AEE', minGateScore: 750, deadline: '2025-04-01', status: 'Closing Soon' },
  { id: '4', name: 'PGCIL', role: 'Engineer Trainee', minGateScore: 680, deadline: '2025-05-01', status: 'Open' },
];

export const INITIAL_CHOICES: ChoiceItem[] = [
  { id: 'c1', college: 'NIT Trichy', program: 'Computer Science', type: 'Unknown' },
  { id: 'c2', college: 'NIT Warangal', program: 'Computer Science', type: 'Unknown' },
  { id: 'c3', college: 'IIIT Allahabad', program: 'IT', type: 'Unknown' },
];
