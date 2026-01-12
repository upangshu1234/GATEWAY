export enum AppRoute {
  DASHBOARD = 'dashboard',
  PREDICTOR = 'predictor',
  CHOICE_FILLING = 'choice-filling',
  PSU_TRACKER = 'psu-tracker',
  DOCUMENTS = 'documents',
  PREMIUM = 'premium'
}

export enum Category {
  GEN = 'General',
  OBC = 'OBC-NCL',
  EWS = 'EWS',
  SC = 'SC',
  ST = 'ST'
}

export enum Branch {
  CS = 'Computer Science',
  ECE = 'Electronics & Comm.',
  EE = 'Electrical Engg.',
  ME = 'Mechanical Engg.',
  CE = 'Civil Engg.',
  IN = 'Instrumentation',
  CH = 'Chemical Engg.'
}

export interface UserProfile {
  name: string;
  gateScore: number;
  gateRank: number;
  category: Category;
  branch: Branch;
  isPwd: boolean;
  isPremium: boolean;
}

export interface PredictionResult {
  college: string;
  program: string;
  probability: 'High' | 'Medium' | 'Low';
  cutoffTrend: string; // e.g., "Stable" or "Increasing"
  comment: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  type: 'GOAPS' | 'CCMT' | 'PSU';
  status: 'Upcoming' | 'Active' | 'Closed';
}

export interface ChoiceItem {
  id: string;
  college: string;
  program: string;
  type: 'Safe' | 'Moderate' | 'Ambitious' | 'Unknown';
}

export interface PSUJob {
  id: string;
  name: string;
  role: string;
  minGateScore: number;
  deadline: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
}
