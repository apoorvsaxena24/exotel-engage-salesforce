import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { journeyTemplates } from '../../../data/templates';
import { ChannelPill } from '../../common/ChannelPill';
import type { JourneyTemplate } from '../../../types';

const categories = ['All', ...Array.from(new Set(journeyTemplates.map(t => t.category)))];

export default function TemplateGalleryModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = journeyTemplates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || t.category === category;
    return matchSearch && matchCat;
  });

  function selectTemplate(template: JourneyTemplate) {
    navigate('/wizard', { state: { template } });
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col"
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Choose a Journey Template</h2>
              <p className="text-sm text-gray-500">Select a template or build from scratch</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
          </div>

          <div className="px-6 py-3 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1 w-full sm:w-auto">
              <Search size={16} className="text-gray-400" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search templates..." className="bg-transparent text-sm outline-none flex-1"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {categories.map(c => (
                <button
                  key={c} onClick={() => setCategory(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    category === c ? 'bg-exotel-purple text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >{c}</button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Build from scratch */}
              <button
                onClick={() => { navigate('/canvas'); onClose(); }}
                className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-exotel-purple hover:bg-purple-50/50 transition-all min-h-[180px]"
              >
                <div className="p-3 rounded-xl bg-gray-100">
                  <Wrench size={24} className="text-gray-500" />
                </div>
                <div className="text-sm font-semibold text-gray-700">Build from Scratch</div>
                <div className="text-xs text-gray-500 text-center">Design your own journey on the visual canvas</div>
              </button>

              {filtered.map((t, i) => (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => selectTemplate(t)}
                  className="border border-gray-200 rounded-xl p-5 text-left hover:shadow-md hover:border-exotel-purple/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{t.icon}</span>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{t.category}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mb-1">{t.name}</div>
                  <div className="text-xs text-gray-500 mb-3 line-clamp-2">{t.description}</div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {t.channels.map(ch => <ChannelPill key={ch} channel={ch} />)}
                  </div>
                  <div className="text-xs text-green-600 font-medium">~{t.estimatedConversion}% conversion</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
