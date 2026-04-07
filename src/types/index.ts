export type ChannelType = 'sms' | 'whatsapp' | 'email' | 'call' | 'ivr' | 'voicebot' | 'contact_center';

export type JourneyStatus = 'active' | 'completed' | 'scheduled' | 'draft' | 'paused' | 'failed' | 'pending_approval';

export type ExecutionStatus = 'running' | 'done' | 'scheduled' | 'failed';

export interface JourneyTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  channels: ChannelType[];
  estimatedConversion: number;
  icon: string;
}

export interface Journey {
  id: string;
  name: string;
  status: JourneyStatus;
  version: number;
  channels: ChannelType[];
  audienceSize: number;
  contactsReached: number;
  conversionRate: number;
  responseRate: number;
  controlGroupPct: number;
  totalCost: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
  scheduledAt?: string;
  completedAt?: string;
  template?: string;
  goals: ConversionGoal[];
  approvalStatus: 'approved' | 'pending' | 'rejected' | 'not_required';
}

export interface ConversionGoal {
  name: string;
  target: number;
  achieved: number;
}

export interface Execution {
  id: string;
  journeyId: string;
  journeyName: string;
  status: ExecutionStatus;
  contactCount: number;
  conversionPct: number;
  startedAt: string;
  channels: ChannelType[];
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  avatar: string;
  engagementScore: number;
  preferredChannel: ChannelType;
  lastActiveAt: string;
  journeysParticipated: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  contacts: number;
  revenue: string;
  status: 'active' | 'inactive' | 'prospect';
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'available' | 'in_call' | 'wrap_up' | 'offline' | 'break';
  skills: string[];
  callsHandled: number;
  avgHandleTime: number;
  csat: number;
  currentCaller?: string;
  currentJourney?: string;
}

export interface ChannelStats {
  channel: ChannelType;
  sent: number;
  delivered: number;
  read: number;
  responded: number;
  converted: number;
  cost: number;
}

export interface Task {
  id: string;
  title: string;
  due: string;
  completed: boolean;
}

export type WizardStep = 'template' | 'source' | 'ingestion' | 'schedule' | 'processing' | 'ai_check' | 'approval' | 'review';

export interface WizardState {
  currentStep: WizardStep;
  template: JourneyTemplate | null;
  sourceType: 'crm' | 'excel';
  crmObject: string;
  ingestionType: 'realtime' | 'batch';
  safeguards: { queueBuffering: boolean; autoDedup: boolean; skipActive: boolean };
  scheduleType: 'onetime' | 'recurring';
  scheduleDate: string;
  scheduleTime: string;
  recurringFrequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  processingMode: 'incremental' | 'full_rerun';
  controlGroupPct: number;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}
