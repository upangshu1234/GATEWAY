import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Predictor } from './pages/Predictor';
import { ChoiceFilling } from './pages/ChoiceFilling';
import { PSUTracker } from './pages/PSUTracker';
import { Documents } from './pages/Documents';
import { AppRoute, UserProfile, Category, Branch } from './types';
import { Crown, Check } from 'lucide-react';

const INITIAL_USER: UserProfile = {
  name: 'Aarav Sharma',
  gateScore: 650,
  gateRank: 1240,
  category: Category.GEN,
  branch: Branch.CS,
  isPwd: false,
  isPremium: false
};

const PremiumPage: React.FC<{ onUpgrade: () => void }> = ({ onUpgrade }) => (
  <div className="max-w-2xl mx-auto text-center space-y-8 py-10">
    <div>
       <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg mb-6">
          <Crown size={32} className="text-white" />
       </div>
       <h1 className="text-3xl font-bold text-slate-800">Upgrade to GATEWay Pro</h1>
       <p className="text-slate-500 mt-2 text-lg">Make decisions with data, not guesses.</p>
    </div>

    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-8 shadow-xl relative overflow-hidden">
       <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
         RECOMMENDED
       </div>
       <div className="text-4xl font-bold text-indigo-900 mb-2">$1<span className="text-lg text-slate-400 font-normal">/month</span></div>
       <p className="text-sm text-slate-500 mb-8">Less than the cost of a chai per week.</p>

       <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
          {[
            'Unlimited Admission Predictions',
            'Advanced Choice Filling Analysis',
            'Real-time Deadline Alerts (SMS/Email)',
            'Past 5-Year Cutoff Visualization',
            'Priority Support'
          ].map((feat, i) => (
             <div key={i} className="flex items-center gap-3">
               <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-emerald-600" />
               </div>
               <span className="text-slate-700 font-medium">{feat}</span>
             </div>
          ))}
       </div>

       <button 
         onClick={onUpgrade}
         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
       >
         Unlock Everything
       </button>
       <p className="text-xs text-slate-400 mt-4">Secure payment via Razorpay/Stripe. Cancel anytime.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.DASHBOARD);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  const handleUpgrade = () => {
    // Mock upgrade flow
    alert("Welcome to Premium! Features unlocked.");
    setUser({ ...user, isPremium: true });
    setCurrentRoute(AppRoute.DASHBOARD);
  };

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.DASHBOARD:
        return <Dashboard user={user} setRoute={setCurrentRoute} />;
      case AppRoute.PREDICTOR:
        return <Predictor user={user} />;
      case AppRoute.CHOICE_FILLING:
        return <ChoiceFilling user={user} />;
      case AppRoute.PSU_TRACKER:
        return <PSUTracker user={user} />;
      case AppRoute.DOCUMENTS:
        return <Documents />;
      case AppRoute.PREMIUM:
        return <PremiumPage onUpgrade={handleUpgrade} />;
      default:
        return <Dashboard user={user} setRoute={setCurrentRoute} />;
    }
  };

  return (
    <Layout currentRoute={currentRoute} onNavigate={setCurrentRoute} user={user}>
      {renderContent()}
    </Layout>
  );
};

export default App;
