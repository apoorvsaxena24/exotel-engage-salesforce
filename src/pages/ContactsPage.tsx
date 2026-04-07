import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookUser, Search, Star } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ChannelPill } from '../components/common/ChannelPill';
import { contacts } from '../data/mock';

export default function ContactsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2"><BookUser size={22} /> Contacts</h1>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-64">
          <Search size={16} className="text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts..." className="bg-transparent text-sm outline-none flex-1" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="p-4" hover onClick={() => navigate(`/contacts/${c.id}`)}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-sf-blue text-white flex items-center justify-center text-sm font-bold shrink-0">{c.avatar}</div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.title} · {c.company}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <ChannelPill channel={c.preferredChannel} />
                <div className="flex items-center gap-1 text-xs text-amber-500"><Star size={12} fill="currentColor" /> {c.engagementScore}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {c.tags.map(t => <Badge key={t} variant={t === 'VIP' ? 'purple' : t === 'At-Risk' ? 'error' : t === 'Champion' ? 'success' : 'info'}>{t}</Badge>)}
              </div>
              <div className="text-[10px] text-gray-400 mt-2">{c.journeysParticipated} journeys · Sentiment: {c.sentiment}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
