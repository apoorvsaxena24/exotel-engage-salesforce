import type { Journey, Execution, Contact, Account, Agent, Task, ChannelStats } from '../types';

export const journeys: Journey[] = [
  {
    id: 'BJ-2026-04-0847', name: 'Q2 Collections Campaign', status: 'active', version: 3,
    channels: ['sms', 'whatsapp', 'ivr', 'call', 'contact_center'], audienceSize: 108500, contactsReached: 87200,
    conversionRate: 62, responseRate: 78, controlGroupPct: 5, totalCost: 245000, revenue: 8500000,
    createdAt: '2026-03-15T10:00:00Z', updatedAt: '2026-04-07T09:30:00Z', template: 'collections',
    goals: [
      { name: 'SMS Delivered', target: 108500, achieved: 102300 },
      { name: 'Link Clicked', target: 60000, achieved: 43400 },
      { name: 'Payment Page Visited', target: 35000, achieved: 28100 },
      { name: 'Payment Completed', target: 25000, achieved: 21700 },
    ],
    approvalStatus: 'approved',
  },
  {
    id: 'BJ-2026-04-0901', name: 'Welcome Series', status: 'completed', version: 1,
    channels: ['email', 'sms', 'whatsapp', 'voicebot'], audienceSize: 45200, contactsReached: 45200,
    conversionRate: 72, responseRate: 85, controlGroupPct: 10, totalCost: 68000, revenue: 1200000,
    createdAt: '2026-03-28T08:00:00Z', updatedAt: '2026-04-05T18:00:00Z', completedAt: '2026-04-05T18:00:00Z',
    template: 'onboarding-welcome',
    goals: [
      { name: 'Email Opened', target: 45200, achieved: 38420 },
      { name: 'Profile Completed', target: 30000, achieved: 28900 },
      { name: 'First Purchase', target: 15000, achieved: 10800 },
    ],
    approvalStatus: 'approved',
  },
  {
    id: 'BJ-2026-04-0923', name: 'Upsell Premium Plan', status: 'scheduled', version: 1,
    channels: ['email', 'whatsapp', 'call'], audienceSize: 22000, contactsReached: 0,
    conversionRate: 0, responseRate: 0, controlGroupPct: 8, totalCost: 0, revenue: 0,
    createdAt: '2026-04-06T14:00:00Z', updatedAt: '2026-04-06T14:00:00Z', scheduledAt: '2026-04-08T10:00:00Z',
    template: 'promotion-offer',
    goals: [
      { name: 'Offer Viewed', target: 22000, achieved: 0 },
      { name: 'Plan Upgraded', target: 3300, achieved: 0 },
    ],
    approvalStatus: 'approved',
  },
  {
    id: 'BJ-2026-04-0955', name: 'Payment Reminder - April', status: 'active', version: 2,
    channels: ['sms', 'whatsapp', 'ivr'], audienceSize: 67000, contactsReached: 54300,
    conversionRate: 48, responseRate: 71, controlGroupPct: 5, totalCost: 134000, revenue: 4200000,
    createdAt: '2026-04-01T09:00:00Z', updatedAt: '2026-04-07T08:00:00Z', template: 'payment-reminder',
    goals: [
      { name: 'Reminder Delivered', target: 67000, achieved: 63200 },
      { name: 'Link Clicked', target: 40000, achieved: 32100 },
      { name: 'Payment Made', target: 30000, achieved: 25600 },
    ],
    approvalStatus: 'approved',
  },
  {
    id: 'BJ-2026-04-0982', name: 'Diwali Flash Sale', status: 'draft', version: 1,
    channels: ['sms', 'whatsapp', 'email'], audienceSize: 150000, contactsReached: 0,
    conversionRate: 0, responseRate: 0, controlGroupPct: 0, totalCost: 0, revenue: 0,
    createdAt: '2026-04-07T11:00:00Z', updatedAt: '2026-04-07T11:00:00Z',
    template: 'festival-greetings',
    goals: [{ name: 'Purchase Completed', target: 25000, achieved: 0 }],
    approvalStatus: 'not_required',
  },
  {
    id: 'BJ-2026-03-0811', name: 'KYC Completion Drive', status: 'completed', version: 2,
    channels: ['whatsapp', 'sms', 'voicebot', 'contact_center'], audienceSize: 35000, contactsReached: 35000,
    conversionRate: 68, responseRate: 82, controlGroupPct: 5, totalCost: 95000, revenue: 0,
    createdAt: '2026-03-10T09:00:00Z', updatedAt: '2026-03-31T18:00:00Z', completedAt: '2026-03-31T18:00:00Z',
    template: 'kyc-verification',
    goals: [
      { name: 'KYC Link Sent', target: 35000, achieved: 34200 },
      { name: 'Documents Uploaded', target: 25000, achieved: 21300 },
      { name: 'KYC Verified', target: 20000, achieved: 17800 },
    ],
    approvalStatus: 'approved',
  },
];

export const executions: Execution[] = [
  { id: 'EX-001', journeyId: 'BJ-2026-04-0847', journeyName: 'Q2 Collections Campaign', status: 'running', contactCount: 108500, conversionPct: 62, startedAt: '2026-04-07T06:00:00Z', channels: ['sms', 'whatsapp', 'ivr', 'call', 'contact_center'] },
  { id: 'EX-002', journeyId: 'BJ-2026-04-0901', journeyName: 'Welcome Series', status: 'done', contactCount: 45200, conversionPct: 72, startedAt: '2026-04-05T08:00:00Z', channels: ['email', 'sms', 'whatsapp', 'voicebot'] },
  { id: 'EX-003', journeyId: 'BJ-2026-04-0923', journeyName: 'Upsell Premium Plan', status: 'scheduled', contactCount: 22000, conversionPct: 0, startedAt: '2026-04-08T10:00:00Z', channels: ['email', 'whatsapp', 'call'] },
  { id: 'EX-004', journeyId: 'BJ-2026-04-0955', journeyName: 'Payment Reminder - April', status: 'running', contactCount: 67000, conversionPct: 48, startedAt: '2026-04-07T09:00:00Z', channels: ['sms', 'whatsapp', 'ivr'] },
  { id: 'EX-005', journeyId: 'BJ-2026-03-0811', journeyName: 'KYC Completion Drive', status: 'done', contactCount: 35000, conversionPct: 68, startedAt: '2026-03-28T09:00:00Z', channels: ['whatsapp', 'sms', 'voicebot', 'contact_center'] },
];

export const contacts: Contact[] = [
  { id: 'C-001', name: 'Rajesh Kumar', company: 'Acme Corp', title: 'VP Finance', email: 'rajesh@acme.com', phone: '+91 98765 43210', avatar: 'RK', engagementScore: 85, preferredChannel: 'whatsapp', lastActiveAt: '2026-04-07T10:30:00Z', journeysParticipated: 4, sentiment: 'positive', tags: ['VIP', 'High-Value'] },
  { id: 'C-002', name: 'Priya Sharma', company: 'TechVista', title: 'Head of Ops', email: 'priya@techvista.com', phone: '+91 98765 43211', avatar: 'PS', engagementScore: 72, preferredChannel: 'email', lastActiveAt: '2026-04-06T15:00:00Z', journeysParticipated: 3, sentiment: 'neutral', tags: ['Active'] },
  { id: 'C-003', name: 'Amit Patel', company: 'GlobalFin', title: 'CFO', email: 'amit@globalfin.com', phone: '+91 98765 43212', avatar: 'AP', engagementScore: 91, preferredChannel: 'call', lastActiveAt: '2026-04-07T09:00:00Z', journeysParticipated: 6, sentiment: 'positive', tags: ['VIP', 'Decision-Maker'] },
  { id: 'C-004', name: 'Neha Gupta', company: 'DataSync', title: 'COO', email: 'neha@datasync.io', phone: '+91 98765 43213', avatar: 'NG', engagementScore: 65, preferredChannel: 'whatsapp', lastActiveAt: '2026-04-05T11:00:00Z', journeysParticipated: 2, sentiment: 'neutral', tags: ['New'] },
  { id: 'C-005', name: 'Vikram Singh', company: 'CloudNine', title: 'CTO', email: 'vikram@cloudnine.com', phone: '+91 98765 43214', avatar: 'VS', engagementScore: 78, preferredChannel: 'sms', lastActiveAt: '2026-04-07T08:00:00Z', journeysParticipated: 5, sentiment: 'positive', tags: ['Tech-Savvy'] },
  { id: 'C-006', name: 'Meera Reddy', company: 'FinServe', title: 'VP Sales', email: 'meera@finserve.in', phone: '+91 98765 43215', avatar: 'MR', engagementScore: 88, preferredChannel: 'call', lastActiveAt: '2026-04-06T16:00:00Z', journeysParticipated: 7, sentiment: 'positive', tags: ['VIP', 'High-Value'] },
  { id: 'C-007', name: 'Arjun Mehta', company: 'RetailMax', title: 'Marketing Head', email: 'arjun@retailmax.com', phone: '+91 98765 43216', avatar: 'AM', engagementScore: 55, preferredChannel: 'email', lastActiveAt: '2026-04-04T14:00:00Z', journeysParticipated: 1, sentiment: 'negative', tags: ['At-Risk'] },
  { id: 'C-008', name: 'Sanya Kapoor', company: 'HealthPlus', title: 'CEO', email: 'sanya@healthplus.com', phone: '+91 98765 43217', avatar: 'SK', engagementScore: 94, preferredChannel: 'whatsapp', lastActiveAt: '2026-04-07T11:00:00Z', journeysParticipated: 8, sentiment: 'positive', tags: ['VIP', 'Champion'] },
];

export const accounts: Account[] = [
  { id: 'A-001', name: 'Acme Corp', industry: 'Manufacturing', contacts: 12, revenue: '₹4.2 Cr', status: 'active' },
  { id: 'A-002', name: 'TechVista', industry: 'Technology', contacts: 8, revenue: '₹2.8 Cr', status: 'active' },
  { id: 'A-003', name: 'GlobalFin', industry: 'Financial Services', contacts: 15, revenue: '₹8.5 Cr', status: 'active' },
  { id: 'A-004', name: 'DataSync', industry: 'SaaS', contacts: 5, revenue: '₹1.2 Cr', status: 'prospect' },
  { id: 'A-005', name: 'CloudNine', industry: 'Cloud Services', contacts: 10, revenue: '₹3.6 Cr', status: 'active' },
  { id: 'A-006', name: 'FinServe', industry: 'Banking', contacts: 20, revenue: '₹12.1 Cr', status: 'active' },
  { id: 'A-007', name: 'RetailMax', industry: 'Retail', contacts: 6, revenue: '₹0.8 Cr', status: 'inactive' },
  { id: 'A-008', name: 'HealthPlus', industry: 'Healthcare', contacts: 9, revenue: '₹5.4 Cr', status: 'active' },
];

export const agents: Agent[] = [
  { id: 'AG-001', name: 'Rohit Verma', avatar: 'RV', status: 'in_call', skills: ['Hindi', 'Collections', 'Finance'], callsHandled: 23, avgHandleTime: 4.2, csat: 4.5, currentCaller: 'Rajesh Kumar', currentJourney: 'Q2 Collections Campaign' },
  { id: 'AG-002', name: 'Anita Das', avatar: 'AD', status: 'available', skills: ['English', 'Tamil', 'Onboarding'], callsHandled: 18, avgHandleTime: 3.8, csat: 4.7, },
  { id: 'AG-003', name: 'Suresh Nair', avatar: 'SN', status: 'in_call', skills: ['Malayalam', 'Hindi', 'Collections'], callsHandled: 31, avgHandleTime: 3.5, csat: 4.3, currentCaller: 'Meera Reddy', currentJourney: 'Q2 Collections Campaign' },
  { id: 'AG-004', name: 'Kavita Joshi', avatar: 'KJ', status: 'wrap_up', skills: ['English', 'KYC', 'Support'], callsHandled: 15, avgHandleTime: 5.1, csat: 4.6 },
  { id: 'AG-005', name: 'Deepak Sharma', avatar: 'DS', status: 'available', skills: ['Hindi', 'English', 'Sales'], callsHandled: 27, avgHandleTime: 4.0, csat: 4.4 },
  { id: 'AG-006', name: 'Fatima Begum', avatar: 'FB', status: 'in_call', skills: ['Urdu', 'Hindi', 'Collections'], callsHandled: 20, avgHandleTime: 3.9, csat: 4.8, currentCaller: 'Arjun Mehta', currentJourney: 'Payment Reminder - April' },
  { id: 'AG-007', name: 'Ravi Patel', avatar: 'RP', status: 'break', skills: ['Gujarati', 'Hindi', 'Finance'], callsHandled: 12, avgHandleTime: 4.5, csat: 4.2 },
  { id: 'AG-008', name: 'Lakshmi Iyer', avatar: 'LI', status: 'available', skills: ['Tamil', 'English', 'Premium Support'], callsHandled: 19, avgHandleTime: 3.7, csat: 4.9 },
];

export const tasks: Task[] = [
  { id: 'T-001', title: 'Follow up with Amit Patel on Q2 deal', due: 'Today', completed: false },
  { id: 'T-002', title: 'Review Overdue Payments report', due: 'Today', completed: false },
  { id: 'T-003', title: 'Prepare onboarding deck for DataSync', due: 'Yesterday', completed: true },
  { id: 'T-004', title: 'Send pricing proposal to CloudNine', due: 'Tomorrow', completed: false },
  { id: 'T-005', title: 'Update CRM data for Zenith Ltd', due: 'Apr 3', completed: true },
];

export const channelStatsData: ChannelStats[] = [
  { channel: 'sms', sent: 175500, delivered: 168200, read: 134560, responded: 67280, converted: 42100, cost: 87750 },
  { channel: 'whatsapp', sent: 142000, delivered: 139800, read: 125820, responded: 89600, converted: 54200, cost: 142000 },
  { channel: 'email', sent: 67200, delivered: 64100, read: 32050, responded: 12820, converted: 6410, cost: 13440 },
  { channel: 'call', sent: 28500, delivered: 22800, read: 22800, responded: 18240, converted: 14820, cost: 142500 },
  { channel: 'ivr', sent: 45000, delivered: 38200, read: 38200, responded: 24830, converted: 16700, cost: 112500 },
  { channel: 'voicebot', sent: 18000, delivered: 16200, read: 16200, responded: 12960, converted: 9720, cost: 72000 },
  { channel: 'contact_center', sent: 8200, delivered: 7800, read: 7800, responded: 7020, converted: 5850, cost: 164000 },
];
