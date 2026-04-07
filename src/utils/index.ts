import type { ChannelType } from '../types';

export function generateJourneyId(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `BJ-${now.getFullYear()}-${month}-${seq}`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatCurrency(n: number): string {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(1)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(1)}K`;
  return `₹${n}`;
}

export function channelLabel(ch: ChannelType): string {
  const map: Record<ChannelType, string> = {
    sms: 'SMS', whatsapp: 'WhatsApp', email: 'Email',
    call: 'Call', ivr: 'IVR', voicebot: 'Voicebot', contact_center: 'Contact Center',
  };
  return map[ch];
}

export function channelColor(ch: ChannelType): string {
  const map: Record<ChannelType, string> = {
    sms: '#0ea5e9', whatsapp: '#25D366', email: '#8b5cf6',
    call: '#f59e0b', ivr: '#ec4899', voicebot: '#6366f1', contact_center: '#ef4444',
  };
  return map[ch];
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    active: '#2E844A', running: '#2E844A', completed: '#0176D3', done: '#0176D3',
    scheduled: '#DD7A01', draft: '#706e6b', paused: '#706e6b',
    failed: '#EA001E', pending_approval: '#DD7A01',
  };
  return map[status] || '#706e6b';
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
