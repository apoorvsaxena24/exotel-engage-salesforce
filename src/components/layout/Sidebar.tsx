import { NavLink } from 'react-router-dom';
import {
  Home, Users, BookUser, BarChart3, Zap, Play, Radio,
  Headphones, X, LayoutDashboard,
} from 'lucide-react';
import { cn } from '../../utils';

const navItems = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Accounts', icon: Users, to: '/accounts' },
  { label: 'Contacts', icon: BookUser, to: '/contacts' },
  { label: 'Reports', icon: BarChart3, to: '/reports' },
  { type: 'divider' as const },
  { label: 'Exotel Home', icon: Zap, to: '/exotel' },
  { label: 'Journey Execution', icon: Play, to: '/journeys' },
  { label: 'Journey Canvas', icon: LayoutDashboard, to: '/canvas' },
  { label: 'Live Monitor', icon: Radio, to: '/monitor' },
  { label: 'Contact Center', icon: Headphones, to: '/contact-center' },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-full w-60 bg-sf-nav text-white flex flex-col transition-transform duration-300 lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full',
      )}>
        <div className="flex items-center justify-between h-14 px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-exotel-purple flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide">Exotel Engage</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          {navItems.map((item, i) => {
            if ('type' in item && item.type === 'divider') {
              return <div key={i} className="my-2 mx-2 border-t border-white/10" />;
            }
            const nav = item as { label: string; icon: React.ElementType; to: string };
            return (
              <NavLink
                key={nav.to}
                to={nav.to}
                onClick={onClose}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-0.5',
                  isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/8 hover:text-white',
                )}
              >
                <nav.icon size={18} />
                {nav.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="text-[10px] text-white/40 text-center">Powered by Exotel</div>
        </div>
      </aside>
    </>
  );
}
