import React from 'react';
import { AppRoute, UserProfile } from '../types';
import { 
  LayoutDashboard, 
  Calculator, 
  ListChecks, 
  Building2, 
  FileText, 
  Crown, 
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  user: UserProfile;
}

const NavItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick, 
  premium = false 
}: { 
  icon: any; 
  label: string; 
  active: boolean; 
  onClick: () => void;
  premium?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-slate-800 text-white shadow-md' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon size={20} className={active ? 'text-indigo-400' : ''} />
    <span className="font-medium">{label}</span>
    {premium && (
      <Crown size={14} className="ml-auto text-amber-500 fill-amber-500" />
    )}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentRoute, onNavigate, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { route: AppRoute.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { route: AppRoute.PREDICTOR, label: 'Predictor', icon: Calculator },
    { route: AppRoute.CHOICE_FILLING, label: 'Choice Filling', icon: ListChecks },
    { route: AppRoute.PSU_TRACKER, label: 'PSU Tracker', icon: Building2 },
    { route: AppRoute.DOCUMENTS, label: 'Documents', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-serif">G</span>
            GATEWay
          </h1>
          <p className="text-xs text-slate-400 mt-1">Admissions Assistant</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.route}
              icon={item.icon}
              label={item.label}
              active={currentRoute === item.route}
              onClick={() => onNavigate(item.route)}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-900 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Plan</span>
              {user.isPremium ? (
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded">PRO</span>
              ) : (
                <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-[10px] font-bold rounded">FREE</span>
              )}
            </div>
            {!user.isPremium && (
               <button 
               onClick={() => onNavigate(AppRoute.PREMIUM)}
               className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 rounded-lg font-medium transition-colors"
             >
               Upgrade for $1/mo
             </button>
            )}
            {user.isPremium && (
              <p className="text-xs text-slate-400">All features unlocked.</p>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white z-20 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-serif text-sm">G</span>
            GATEWay
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-10 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
           <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-2xl p-4 pt-16" onClick={e => e.stopPropagation()}>
             <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.route}
                    icon={item.icon}
                    label={item.label}
                    active={currentRoute === item.route}
                    onClick={() => {
                      onNavigate(item.route);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                ))}
             </nav>
             <div className="mt-8 pt-4 border-t border-slate-100">
                {!user.isPremium && (
                  <button 
                  onClick={() => {
                    onNavigate(AppRoute.PREMIUM);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Upgrade to Premium
                  </button>
                )}
             </div>
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 mt-14 md:mt-0 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
