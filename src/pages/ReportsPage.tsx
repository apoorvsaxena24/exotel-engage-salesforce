import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, DollarSign, Users,
  Sparkles, Target,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { journeys, channelStatsData } from '../data/mock';
import { formatCurrency, formatNumber, channelLabel } from '../utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart as RePie, Pie } from 'recharts';
import type { ChannelType } from '../types';

const channelColors: Record<string, string> = {
  sms: '#0ea5e9', whatsapp: '#25D366', email: '#8b5cf6',
  call: '#f59e0b', ivr: '#ec4899', voicebot: '#6366f1', contact_center: '#ef4444',
};

export default function ReportsPage() {
  const totalCost = journeys.reduce((a, j) => a + j.totalCost, 0);
  const totalRevenue = journeys.reduce((a, j) => a + j.revenue, 0);
  const avgConversion = Math.round(journeys.filter(j => j.conversionRate > 0).reduce((a, j) => a + j.conversionRate, 0) / journeys.filter(j => j.conversionRate > 0).length);

  const channelROI = channelStatsData.map(cs => ({
    name: channelLabel(cs.channel as ChannelType),
    channel: cs.channel,
    conversionRate: cs.delivered > 0 ? Math.round((cs.converted / cs.delivered) * 100) : 0,
    costPerConversion: cs.converted > 0 ? Math.round(cs.cost / cs.converted) : 0,
  }));

  const pieData = channelStatsData.map(cs => ({
    name: channelLabel(cs.channel as ChannelType),
    value: cs.converted,
    color: channelColors[cs.channel],
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2"><BarChart3 size={22} /> Reports</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Spend', value: formatCurrency(totalCost), icon: DollarSign, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Blended ROI', value: `${(totalRevenue / Math.max(totalCost, 1)).toFixed(1)}x`, icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Avg Conversion', value: `${avgConversion}%`, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{m.label}</div>
                  <div className="text-xl font-bold text-gray-800 mt-1">{m.value}</div>
                </div>
                <div className={`p-2 rounded-xl ${m.bg}`}><m.icon size={18} className={m.color} /></div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Conversion */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Channel Conversion Rate (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={channelROI}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="conversionRate" radius={[6, 6, 0, 0]}>
                {channelROI.map(entry => <Cell key={entry.channel} fill={channelColors[entry.channel]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Conversion Distribution */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Conversions by Channel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RePie>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={(v) => formatNumber(Number(v))} />
            </RePie>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Journey Performance Table */}
      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Journey Performance</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Journey</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Audience</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Conversion</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Cost</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Revenue</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">ROI</th>
            </tr>
          </thead>
          <tbody>
            {journeys.filter(j => j.totalCost > 0).map(j => (
              <tr key={j.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3 font-medium text-gray-800">{j.name}</td>
                <td className="px-5 py-3 text-gray-600">{formatNumber(j.audienceSize)}</td>
                <td className="px-5 py-3 text-green-600 font-semibold">{j.conversionRate}%</td>
                <td className="px-5 py-3 text-gray-600">{formatCurrency(j.totalCost)}</td>
                <td className="px-5 py-3 font-semibold">{formatCurrency(j.revenue)}</td>
                <td className="px-5 py-3 font-bold text-exotel-purple">{(j.revenue / j.totalCost).toFixed(1)}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* AI Insights */}
      <Card className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-exotel-purple shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">AI Insights</h3>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li>• WhatsApp has <strong>3.2x higher response rate</strong> than SMS for payment reminders. Consider increasing WhatsApp allocation.</li>
              <li>• Adding a <strong>call fallback improved conversion by 47%</strong> in collections journeys — voice channels are key for high-value contacts.</li>
              <li>• <strong>Contact Center calls</strong> have the highest per-contact conversion (75%) but highest cost. Reserve for VIP/high-value segments.</li>
              <li>• Optimal send time across all channels: <strong>10:00 AM - 11:00 AM IST</strong> (23% higher open rates).</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
