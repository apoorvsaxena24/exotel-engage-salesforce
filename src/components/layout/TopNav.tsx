import { Menu, Bell, Settings, HelpCircle, Search } from 'lucide-react';

export function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-12 bg-sf-nav flex items-center justify-between px-4 text-white border-b border-white/10 shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 hover:bg-white/10 rounded">
          <Menu size={20} />
        </button>
        <span className="text-sm font-semibold tracking-wide hidden sm:block">Sales</span>
        <div className="hidden md:flex items-center gap-1 ml-4 bg-white/10 rounded-lg px-3 py-1.5">
          <Search size={14} className="text-white/60" />
          <input
            type="text"
            placeholder="Search Salesforce..."
            className="bg-transparent text-sm text-white placeholder-white/50 outline-none w-56"
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Settings size={18} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <HelpCircle size={18} />
        </button>
        <div className="ml-2 w-8 h-8 rounded-full bg-exotel-purple flex items-center justify-center text-xs font-bold">
          AS
        </div>
      </div>
    </header>
  );
}
