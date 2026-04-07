import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, Users, Phone, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ChannelPill } from '../components/common/ChannelPill';
import { executions, agents, channelStatsData } from '../data/mock';
import { formatNumber, channelLabel } from '../utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ChannelType } from '../types';

const channelColors: Record<string, string> = {
  sms: '#0ea5e9', whatsapp: '#25D366', email: '#8b5cf6',
  call: '#f59e0b', ivr: '#ec4899', voicebot: '#6366f1', contact_center: '#ef4444',
};

export default function LiveMonitorPage() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 3000); return () => clearInterval(t); }, []);

  const running = executions.filter(e => e.status === 'running');
  const availableAgents = agents.filter(a => a.status === 'available').length;

  const deliveryData = channelStatsData.map(cs => ({
    name: channelLabel(cs.channel as ChannelType),
    channel: cs.channel,
    sent: cs.sent,
    delivered: cs.delivered,
    responded: cs.responded,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio size={22} className="text-red-500" />
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Live Monitor</h1>
            <p className="text-sm text-gray-500">Real-time journey execution dashboard</p>
          </div>
        </div>
        <Badge variant="success" dot>Live</Badge>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Journeys', value: running.length, icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Contacts in Flow', value: formatNumber(running.reduce((a, e) => a + e.contactCount, 0)), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Agents Available', value: `${availableAgents}/${agents.length}`, icon: Phone, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Avg Conversion', value: `${Math.round(running.reduce((a, e) => a + e.conversionPct, 0) / Math.max(running.length, 1))}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</div>
                  <div className="text-2xl font-bold text-gray-800 mt-1">{s.value}</div>
                </div>
                <div className={`p-2 rounded-xl ${s.bg}`}><s.icon size={18} className={s.color} /></div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Running Journeys */}
      <Card className="p-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Active Journey Executions</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {running.map(ex => {
            const progress = Math.min(95, ex.conversionPct + (tick % 3));
            return (
              <div key={ex.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-gray-800">{ex.journeyName}</span>
                    <span className="text-xs text-gray-400 ml-2">{ex.id}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-700">{formatNumber(ex.contactCount)} contacts</div>
                    <div className="text-xs text-green-600">{ex.conversionPct}% converted</div>
                  </div>
                </div>
                <div className="flex gap-1.5 mb-2 flex-wrap">
                  {ex.channels.map(ch => <ChannelPill key={ch} channel={ch} />)}
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>Started {new Date(ex.startedAt).toLocaleTimeString()}</span>
                  <span>{progress}% complete</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Delivery Stats */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Channel Delivery Stats</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deliveryData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => formatNumber(Number(v))} />
              <Bar dataKey="delivered" radius={[4, 4, 0, 0]}>
                {deliveryData.map(d => <Cell key={d.channel} fill={channelColors[d.channel] || '#94a3b8'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Agent Availability */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Agent Availability</h3>
          <div className="grid grid-cols-2 gap-3">
            {agents.slice(0, 6).map(agent => (
              <div key={agent.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-sf-blue text-white flex items-center justify-center text-xs font-bold">{agent.avatar}</div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    agent.status === 'available' ? 'bg-green-500' : agent.status === 'in_call' ? 'bg-red-500' : agent.status === 'wrap_up' ? 'bg-amber-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-700 truncate">{agent.name}</div>
                  <div className="text-[10px] text-gray-400 capitalize">{agent.status.replace('_', ' ')}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-purple-50 rounded-lg flex items-center gap-2">
            <Sparkles size={14} className="text-exotel-purple" />
            <span className="text-xs text-purple-700">AI Optimizer: Path A outperforming by 18% — auto-routing 70% traffic</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
