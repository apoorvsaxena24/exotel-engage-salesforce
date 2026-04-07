import { motion } from 'framer-motion';
import {
  Headphones, Phone, PhoneOff, Clock, UserCheck,
  Smile, Meh, Frown, BarChart3, Shield,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { agents } from '../data/mock';

void [UserCheck, Phone, PhoneOff, Clock];

export default function ContactCenterPage() {
  const available = agents.filter(a => a.status === 'available').length;
  const inCall = agents.filter(a => a.status === 'in_call').length;
  const wrapUp = agents.filter(a => a.status === 'wrap_up').length;
  const avgHandleTime = (agents.reduce((a, ag) => a + ag.avgHandleTime, 0) / agents.length).toFixed(1);
  const avgCsat = (agents.reduce((a, ag) => a + ag.csat, 0) / agents.length).toFixed(1);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Headphones size={22} className="text-exotel-purple" /> Contact Center</h1>
        <p className="text-sm text-gray-500">Supervisor Dashboard — Journey-linked calls</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Available', value: available, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'In Call', value: inCall, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Wrap Up', value: wrapUp, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Avg Handle Time', value: `${avgHandleTime}m`, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg CSAT', value: `${avgCsat}/5`, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{m.value}</div>
              <div className="text-xs text-gray-500 mt-1">{m.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Smart Routing Config */}
      <Card className="p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><Shield size={16} className="text-exotel-purple" /> Smart Routing Configuration</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Skill-based Routing', desc: 'Match agent skills to journey type', active: true },
            { label: 'Sticky Agent', desc: 'Same agent for returning callers', active: true },
            { label: 'VIP Priority', desc: 'High-value contacts jump the queue', active: true },
            { label: 'Language-based', desc: 'Route by preferred language', active: false },
          ].map(r => (
            <div key={r.label} className={`p-3 rounded-lg border ${r.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center gap-1 mb-1">
                <div className={`w-2 h-2 rounded-full ${r.active ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-xs font-semibold text-gray-700">{r.label}</span>
              </div>
              <div className="text-[10px] text-gray-500">{r.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Agent Grid */}
      <Card className="p-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Agent Grid</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {agents.map((agent, i) => {
            return (
              <motion.div key={agent.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-sf-blue text-white flex items-center justify-center text-sm font-bold">{agent.avatar}</div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        agent.status === 'available' ? 'bg-green-500' : agent.status === 'in_call' ? 'bg-red-500' : agent.status === 'wrap_up' ? 'bg-amber-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{agent.name}</div>
                      <Badge variant={agent.status === 'available' ? 'success' : agent.status === 'in_call' ? 'error' : 'warning'}>
                        {agent.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  {agent.currentCaller && (
                    <div className="bg-red-50 rounded-lg p-2 mb-2 text-xs">
                      <div className="text-red-700 font-medium">On call: {agent.currentCaller}</div>
                      <div className="text-red-500">{agent.currentJourney}</div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {agent.skills.map(s => <span key={s} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{s}</span>)}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div><div className="font-bold text-gray-800">{agent.callsHandled}</div><div className="text-gray-400">Calls</div></div>
                    <div><div className="font-bold text-gray-800">{agent.avgHandleTime}m</div><div className="text-gray-400">AHT</div></div>
                    <div><div className="font-bold text-gray-800">{agent.csat}</div><div className="text-gray-400">CSAT</div></div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Call Sentiment */}
      <Card className="p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><BarChart3 size={16} /> Call Sentiment Analysis</h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <Smile size={28} className="mx-auto text-green-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">64%</div>
            <div className="text-xs text-gray-500">Positive</div>
          </div>
          <div>
            <Meh size={28} className="mx-auto text-amber-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">28%</div>
            <div className="text-xs text-gray-500">Neutral</div>
          </div>
          <div>
            <Frown size={28} className="mx-auto text-red-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">8%</div>
            <div className="text-xs text-gray-500">Negative</div>
          </div>
        </div>
        <div className="mt-4 h-3 flex rounded-full overflow-hidden">
          <div className="bg-green-500 h-full" style={{ width: '64%' }} />
          <div className="bg-amber-500 h-full" style={{ width: '28%' }} />
          <div className="bg-red-500 h-full" style={{ width: '8%' }} />
        </div>
      </Card>
    </div>
  );
}
