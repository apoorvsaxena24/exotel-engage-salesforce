import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, ChevronRight, GitBranch } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ChannelPill } from '../components/common/ChannelPill';
import { journeys } from '../data/mock';
import { formatNumber, formatCurrency } from '../utils';
import type { JourneyStatus } from '../types';

const statusFilters: { label: string; value: JourneyStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Completed', value: 'completed' },
  { label: 'Draft', value: 'draft' },
];

const statusBadge: Record<string, { variant: 'success' | 'warning' | 'info' | 'neutral' | 'error' | 'purple'; label: string }> = {
  active: { variant: 'success', label: 'Active' },
  completed: { variant: 'info', label: 'Completed' },
  scheduled: { variant: 'warning', label: 'Scheduled' },
  draft: { variant: 'neutral', label: 'Draft' },
  paused: { variant: 'neutral', label: 'Paused' },
  failed: { variant: 'error', label: 'Failed' },
  pending_approval: { variant: 'warning', label: 'Pending' },
};

export default function JourneyExecutionPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<JourneyStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = journeys.filter(j => {
    const matchStatus = filter === 'all' || j.status === filter;
    const matchSearch = j.name.toLowerCase().includes(search.toLowerCase()) || j.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Journey Execution</h1>
          <p className="text-sm text-gray-500">{journeys.length} journeys total</p>
        </div>
        <button
          onClick={() => navigate('/exotel')}
          className="flex items-center gap-2 px-4 py-2 bg-exotel-purple text-white rounded-lg text-sm font-medium hover:bg-exotel-purple-dark transition-colors"
        >
          <Plus size={16} /> New Journey
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 w-full sm:w-auto">
          <Search size={16} className="text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search journeys..." className="bg-transparent text-sm outline-none flex-1" />
        </div>
        <div className="flex gap-1">
          {statusFilters.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f.value ? 'bg-exotel-purple text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((j, i) => {
          const badge = statusBadge[j.status] || statusBadge.draft;
          return (
            <motion.div key={j.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5 hover:shadow-md transition-shadow" hover onClick={() => navigate(`/journeys/${j.id}`)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">{j.name}</span>
                      <span className="text-xs text-gray-400 font-mono">{j.id}</span>
                      <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"><GitBranch size={10} /> v{j.version}</span>
                    </div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {j.channels.map(ch => <ChannelPill key={ch} channel={ch} />)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={badge.variant} dot>{badge.label}</Badge>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
                  <div><div className="text-xs text-gray-500">Audience</div><div className="font-semibold">{formatNumber(j.audienceSize)}</div></div>
                  <div><div className="text-xs text-gray-500">Reached</div><div className="font-semibold">{formatNumber(j.contactsReached)}</div></div>
                  <div><div className="text-xs text-gray-500">Conversion</div><div className="font-semibold text-green-600">{j.conversionRate}%</div></div>
                  <div><div className="text-xs text-gray-500">Cost</div><div className="font-semibold">{formatCurrency(j.totalCost)}</div></div>
                  <div><div className="text-xs text-gray-500">Revenue</div><div className="font-semibold text-exotel-purple">{formatCurrency(j.revenue)}</div></div>
                </div>
                {j.status === 'active' && (
                  <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-exotel-purple to-green-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${(j.contactsReached / j.audienceSize) * 100}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
