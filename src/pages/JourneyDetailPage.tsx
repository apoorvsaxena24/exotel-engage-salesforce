import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, GitBranch, Play, Pencil, BarChart3,
  Users, DollarSign, Target, TrendingUp,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ChannelPill } from '../components/common/ChannelPill';
import { journeys, channelStatsData } from '../data/mock';
import { formatNumber, formatCurrency, channelLabel } from '../utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ChannelType } from '../types';

const channelColors: Record<string, string> = {
  sms: '#0ea5e9', whatsapp: '#25D366', email: '#8b5cf6',
  call: '#f59e0b', ivr: '#ec4899', voicebot: '#6366f1', contact_center: '#ef4444',
};

export default function JourneyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const journey = journeys.find(j => j.id === id);

  if (!journey) return <div className="p-6 text-gray-500">Journey not found.</div>;

  const relevantChannels = channelStatsData.filter(cs => journey.channels.includes(cs.channel));
  const channelCompare = relevantChannels.map(cs => ({
    name: channelLabel(cs.channel as ChannelType),
    channel: cs.channel,
    deliveryRate: Math.round((cs.delivered / cs.sent) * 100),
    responseRate: Math.round((cs.responded / cs.delivered) * 100),
    conversionRate: Math.round((cs.converted / cs.delivered) * 100),
    costPerConversion: cs.converted > 0 ? Math.round(cs.cost / cs.converted) : 0,
  }));

  const roi = journey.totalCost > 0 ? (journey.revenue / journey.totalCost).toFixed(1) : '—';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <button onClick={() => navigate('/journeys')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={16} /> Back to Journeys
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{journey.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-gray-500 font-mono">{journey.id}</span>
            <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"><GitBranch size={10} /> v{journey.version}</span>
            <Badge variant={journey.status === 'active' ? 'success' : journey.status === 'completed' ? 'info' : 'warning'} dot>
              {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/canvas')} className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"><Pencil size={14} /> Edit Canvas</button>
          {journey.status === 'active' && (
            <button className="flex items-center gap-2 px-3 py-2 bg-exotel-purple text-white rounded-lg text-sm hover:bg-exotel-purple-dark transition-colors"><Play size={14} /> Live Edit</button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: 'Audience', value: formatNumber(journey.audienceSize), icon: Users },
          { label: 'Reached', value: formatNumber(journey.contactsReached), icon: TrendingUp },
          { label: 'Conversion', value: `${journey.conversionRate}%`, icon: Target },
          { label: 'Total Cost', value: formatCurrency(journey.totalCost), icon: DollarSign },
          { label: 'Revenue', value: formatCurrency(journey.revenue), icon: BarChart3 },
          { label: 'ROI', value: `${roi}x`, icon: TrendingUp },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-3 text-center">
              <m.icon size={16} className="mx-auto text-gray-400 mb-1" />
              <div className="text-lg font-bold text-gray-800">{m.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">{m.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Channels + Goals */}
      <div className="flex gap-1.5 flex-wrap">
        {journey.channels.map(ch => <ChannelPill key={ch} channel={ch} size="md" />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><Target size={16} className="text-green-600" /> Conversion Goal Funnel</h3>
          <div className="space-y-3">
            {journey.goals.map((g, i) => {
              const pct = g.target > 0 ? Math.round((g.achieved / g.target) * 100) : 0;
              return (
                <div key={g.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{g.name}</span>
                    <span className="font-semibold">{formatNumber(g.achieved)} <span className="text-gray-400">/ {formatNumber(g.target)}</span></span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #5A2D82, ${i === journey.goals.length - 1 ? '#2E844A' : '#0176D3'})` }}
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: i * 0.2 }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{pct}% achieved</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Channel Performance */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-sf-blue" /> Channel Conversion Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={channelCompare}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="conversionRate" radius={[6, 6, 0, 0]}>
                {channelCompare.map(entry => (
                  <Cell key={entry.channel} fill={channelColors[entry.channel] || '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Control Group & ROI */}
      {journey.controlGroupPct > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Control Group Impact</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500">Journey Group</div>
                <div className="text-2xl font-bold text-green-600">{journey.conversionRate}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Control Group</div>
                <div className="text-2xl font-bold text-gray-500">{Math.round(journey.conversionRate * 0.35)}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Incremental Lift</div>
                <div className="text-2xl font-bold text-exotel-purple">+{Math.round(journey.conversionRate * 0.65)}%</div>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-3">ROI Breakdown</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500">Total Spend</div>
                <div className="text-lg font-bold text-gray-800">{formatCurrency(journey.totalCost)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Revenue</div>
                <div className="text-lg font-bold text-green-600">{formatCurrency(journey.revenue)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">ROI</div>
                <div className="text-lg font-bold text-exotel-purple">{roi}x</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
