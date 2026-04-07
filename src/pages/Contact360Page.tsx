import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Mail, Phone, Star, MessageSquare, TrendingUp,
  Clock, Sparkles, Activity, CheckCircle2, AlertTriangle, HeartPulse,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ChannelPill } from '../components/common/ChannelPill';
import { contacts } from '../data/mock';
import { channelLabel } from '../utils';

const interactionTimeline = [
  { type: 'sms' as const, action: 'SMS sent: Payment reminder for ₹15,000', time: '2 hours ago', status: 'delivered' },
  { type: 'whatsapp' as const, action: 'WhatsApp: Payment link clicked', time: '1 hour ago', status: 'read' },
  { type: 'call' as const, action: 'IVR Call: Pressed 1 (Pay Now)', time: '45 min ago', status: 'completed' },
  { type: 'email' as const, action: 'Email: Monthly statement opened', time: 'Yesterday', status: 'opened' },
  { type: 'contact_center' as const, action: 'Agent call: Discussed payment plan (Agent: Rohit Verma)', time: '3 days ago', status: 'resolved' },
  { type: 'whatsapp' as const, action: 'WhatsApp: Promotional offer sent', time: '5 days ago', status: 'read' },
];

const callTranscripts = [
  {
    date: '3 days ago', agent: 'Rohit Verma', duration: '4m 32s', sentiment: 'positive' as const,
    summary: 'Customer agreed to a 3-month payment plan of ₹5,000/month. Expressed satisfaction with flexibility offered. Follow-up scheduled for next month.',
  },
  {
    date: '2 weeks ago', agent: 'Suresh Nair', duration: '6m 15s', sentiment: 'neutral' as const,
    summary: 'Initial discussion about overdue payment. Customer requested additional time. No commitment made. Escalated to payment plan team.',
  },
];

export default function Contact360Page() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find(c => c.id === id);

  if (!contact) return <div className="p-6 text-gray-500">Contact not found.</div>;

  const sentimentIcon = contact.sentiment === 'positive' ? '😊' : contact.sentiment === 'neutral' ? '😐' : '😟';

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={16} /> Back
      </button>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-sf-blue text-white flex items-center justify-center text-xl font-bold shrink-0">
            {contact.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-gray-800">{contact.name}</h1>
              {contact.tags.map(t => <Badge key={t} variant={t === 'VIP' ? 'purple' : t === 'At-Risk' ? 'error' : 'info'}>{t}</Badge>)}
            </div>
            <div className="text-sm text-gray-500 mt-0.5">{contact.title} · {contact.company}</div>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1"><Mail size={14} /> {contact.email}</span>
              <span className="flex items-center gap-1"><Phone size={14} /> {contact.phone}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-3xl">{sentimentIcon}</div>
            <div className="text-xs text-gray-500 mt-1 capitalize">{contact.sentiment}</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Engagement Score', value: contact.engagementScore, icon: Star, color: 'text-amber-500' },
          { label: 'Journeys', value: contact.journeysParticipated, icon: Activity, color: 'text-purple-500' },
          { label: 'Preferred Channel', value: channelLabel(contact.preferredChannel), icon: MessageSquare, color: 'text-blue-500' },
          { label: 'Last Active', value: new Date(contact.lastActiveAt).toLocaleDateString(), icon: Clock, color: 'text-green-500' },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4 text-center">
              <m.icon size={18} className={`mx-auto ${m.color} mb-1`} />
              <div className="text-lg font-bold text-gray-800">{m.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">{m.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interaction Timeline */}
        <Card className="p-0">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Channel Interaction Timeline</h3>
          </div>
          <div className="p-4 space-y-3">
            {interactionTimeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5"><ChannelPill channel={item.type} /></div>
                <div className="flex-1">
                  <div className="text-sm text-gray-700">{item.action}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    {item.time}
                    <Badge variant={item.status === 'resolved' || item.status === 'completed' ? 'success' : 'info'}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Call Transcripts */}
        <Card className="p-0">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <HeartPulse size={16} className="text-exotel-purple" /> Call Transcripts & Sentiment
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {callTranscripts.map((ct, i) => (
              <div key={i} className={`p-3 rounded-xl border ${ct.sentiment === 'positive' ? 'border-green-200 bg-green-50/50' : (ct.sentiment as string) === 'negative' ? 'border-red-200 bg-red-50/50' : 'border-gray-200 bg-gray-50/50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800">{ct.agent}</span>
                    <span className="text-xs text-gray-400">{ct.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">{ct.date}</span>
                    {ct.sentiment === 'positive' ? <CheckCircle2 size={14} className="text-green-500" /> : <AlertTriangle size={14} className="text-amber-500" />}
                  </div>
                </div>
                <div className="text-sm text-gray-600">{ct.summary}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Recommendation */}
      <Card className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-exotel-purple shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">AI Recommendation</h3>
            <p className="text-sm text-gray-600">
              Based on {contact.name}'s engagement pattern, <strong>WhatsApp at 10:00 AM</strong> has the highest response probability (78%). 
              Follow up on the payment plan agreement with a friendly reminder. Suggested message: 
              "Hi {contact.name.split(' ')[0]}, just a reminder about your ₹5,000 payment due on April 15th. Tap here to pay instantly 💳"
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <TrendingUp size={14} className="text-purple-600" />
          <span className="text-xs text-purple-700">Next Best Action: WhatsApp → 10 AM → Payment reminder</span>
        </div>
      </Card>
    </div>
  );
}
