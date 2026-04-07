import { motion } from 'framer-motion';
import { Building2, Search } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { accounts } from '../data/mock';

export default function AccountsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Building2 size={22} /> Accounts</h1>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-64">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search accounts..." className="bg-transparent text-sm outline-none flex-1" />
        </div>
      </div>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Account</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Industry</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Contacts</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Revenue</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a, i) => (
              <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-3 font-medium text-gray-800">{a.name}</td>
                <td className="px-5 py-3 text-gray-600">{a.industry}</td>
                <td className="px-5 py-3 text-gray-600">{a.contacts}</td>
                <td className="px-5 py-3 font-semibold text-gray-700">{a.revenue}</td>
                <td className="px-5 py-3">
                  <Badge variant={a.status === 'active' ? 'success' : a.status === 'prospect' ? 'warning' : 'neutral'}>{a.status}</Badge>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
