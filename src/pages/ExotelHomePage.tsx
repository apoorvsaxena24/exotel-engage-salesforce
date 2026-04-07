import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Users, CalendarCheck, TrendingUp, Plus, UserCheck,
  FileBarChart, Radio, Sparkles, ChevronRight, ArrowUpRight,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ChannelPill } from '../components/common/ChannelPill';
import { journeys, executions } from '../data/mock';
import { formatNumber } from '../utils';
import TemplateGalleryModal from '../components/journey/templates/TemplateGalleryModal';

const metrics = [
  { label: 'Active Journeys', value: journeys.filter(j => j.status === 'active').length, icon: Zap, color: 'text-exotel-purple', bg: 'bg-purple-50', trend: '+2 this week' },
  { label: 'Contacts Touched', value: 186700, icon: Users, color: 'text-sf-blue', bg: 'bg-blue-50', trend: '+12.4K today' },
  { label: 'Executions Today', value: 4, icon: CalendarCheck, color: 'text-amber-600', bg: 'bg-amber-50', trend: '2 running' },
  { label: 'Avg Conversion Rate', value: '54.2%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', trend: '+3.1% vs last week' },
];

const quickActions = [
  { label: 'New Execution', icon: Plus, action: 'new', desc: 'Create a new journey' },
  { label: 'AI Builder', icon: Sparkles, action: 'ai', desc: 'Build with AI prompts' },
  { label: 'Select Contacts', icon: UserCheck, action: 'contacts', desc: 'Choose your audience' },
  { label: 'From Report', icon: FileBarChart, action: 'report', desc: 'Run from Salesforce report' },
  { label: 'Live Monitor', icon: Radio, action: 'monitor', desc: 'Watch active journeys' },
];

export default function ExotelHomePage() {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  function handleQuickAction(action: string) {
    if (action === 'new') setShowTemplates(true);
    else if (action === 'monitor') navigate('/monitor');
    else if (action === 'contacts') navigate('/contacts');
    else if (action === 'report') navigate('/reports');
    else if (action === 'ai') {/* focus AI input */}
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Zap size={22} className="text-exotel-purple" /> Exotel Home
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Customer Journey Orchestrator</p>
        </div>
        <button
          onClick={() => setShowTemplates(true)}
          className="flex items-center gap-2 px-4 py-2 bg-exotel-purple text-white rounded-lg text-sm font-medium hover:bg-exotel-purple-dark transition-colors shadow-sm"
        >
          <Plus size={16} /> New Journey
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{m.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{typeof m.value === 'number' ? formatNumber(m.value) : m.value}</p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <ArrowUpRight size={12} className="text-green-500" /> {m.trend}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl ${m.bg}`}>
                  <m.icon size={20} className={m.color} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Journey Builder Prompt */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-50">
            <Sparkles size={20} className="text-exotel-purple" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              placeholder="Describe your journey... e.g. 'Create a collections campaign with SMS, WhatsApp fallback, and agent call after 3 days'"
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          <button
            onClick={() => { setAiPrompt(''); navigate('/canvas'); }}
            className="px-4 py-1.5 bg-exotel-purple text-white rounded-lg text-xs font-medium hover:bg-exotel-purple-dark transition-colors"
          >
            Generate
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Executions */}
        <Card className="lg:col-span-2 p-0">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Recent Executions</h3>
            <button onClick={() => navigate('/journeys')} className="text-xs text-sf-blue hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {executions.map(ex => (
              <div key={ex.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-semibold text-gray-800">{ex.journeyName}</span>
                    <span className="text-xs text-gray-400 ml-2">{ex.id}</span>
                  </div>
                  <Badge variant={ex.status === 'running' ? 'success' : ex.status === 'done' ? 'info' : ex.status === 'failed' ? 'error' : 'warning'} dot>
                    {ex.status.charAt(0).toUpperCase() + ex.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {ex.channels.map(ch => <ChannelPill key={ch} channel={ch} />)}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-700">{formatNumber(ex.contactCount)}</span>
                    {ex.conversionPct > 0 && <span className="text-xs text-green-600 ml-2">{ex.conversionPct}%</span>}
                  </div>
                </div>
                {ex.status === 'running' && (
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-exotel-purple to-sf-blue rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${ex.conversionPct}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-0">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="p-3 space-y-1">
            {quickActions.map(qa => (
              <button
                key={qa.action}
                onClick={() => handleQuickAction(qa.action)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-purple-50">
                  <qa.icon size={18} className="text-exotel-purple" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{qa.label}</div>
                  <div className="text-xs text-gray-500">{qa.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {showTemplates && <TemplateGalleryModal onClose={() => setShowTemplates(false)} />}
    </div>
  );
}
