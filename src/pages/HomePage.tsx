import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { tasks, contacts, executions } from '../data/mock';
import { formatCurrency } from '../utils';

export default function HomePage() {
  const navigate = useNavigate();
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-xl font-bold text-gray-800">🏠 Home</div>
      <div className="text-lg text-gray-600">{greeting}, Apoorv Saxena</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <Card className="lg:col-span-2 p-0">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">📋 My Tasks</h3>
            <span className="text-xs text-gray-500">{tasks.filter(t => !t.completed).length} open</span>
          </div>
          <div className="divide-y divide-gray-50">
            {tasks.map(t => (
              <div key={t.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                {t.completed
                  ? <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                  : <Circle size={18} className="text-gray-300 shrink-0" />
                }
                <span className={`flex-1 text-sm ${t.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{t.title}</span>
                <span className="text-xs text-gray-400">{t.due}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Metrics */}
        <Card className="p-5 space-y-4">
          <h3 className="font-semibold text-gray-800">📊 Key Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Open Opportunities</span>
              <span className="text-lg font-bold text-gray-800">{formatCurrency(24000000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Won This Month</span>
              <span className="text-lg font-bold text-green-600">{formatCurrency(8700000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Contacts Reached (Exotel)</span>
              <span className="text-lg font-bold text-exotel-purple">1.2M</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Records */}
        <Card className="p-0">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">⚡ Recent Records</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {contacts.slice(0, 5).map(c => (
              <div key={c.id} onClick={() => navigate(`/contacts/${c.id}`)} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-9 h-9 rounded-full bg-sf-blue text-white flex items-center justify-center text-xs font-bold shrink-0">{c.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.company} · {c.title}</div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        </Card>

        {/* Exotel Activity */}
        <Card className="p-0">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">⚡ Exotel Activity</h3>
            <button onClick={() => navigate('/exotel')} className="text-xs text-sf-blue hover:underline">View All</button>
          </div>
          <div className="p-4 text-sm text-gray-600 space-y-1 mb-1">Recent journey executions</div>
          <div className="divide-y divide-gray-50">
            {executions.slice(0, 4).map(ex => (
              <div key={ex.id} className="flex items-center gap-3 px-5 py-3">
                <span className="text-lg">{ex.status === 'running' ? '▶' : ex.status === 'done' ? '✓' : '⏰'}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{ex.journeyName}</div>
                  <div className="text-xs text-gray-500">{ex.id} · {ex.contactCount.toLocaleString()}{ex.conversionPct > 0 && ` · ${ex.conversionPct}%`}</div>
                </div>
                <Badge variant={ex.status === 'running' ? 'success' : ex.status === 'done' ? 'info' : 'warning'} dot>
                  {ex.status === 'running' ? 'Running' : ex.status === 'done' ? 'Done' : 'Sched'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
