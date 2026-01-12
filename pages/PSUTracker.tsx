import React from 'react';
import { MOCK_PSUS } from '../constants';
import { UserProfile } from '../types';
import { ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react';

interface PSUTrackerProps {
  user: UserProfile;
}

export const PSUTracker: React.FC<PSUTrackerProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">PSU Application Tracker</h1>
        <p className="text-slate-500">Based on GATE {user.gateScore} ({user.branch})</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PSUS.map((psu) => {
          const isEligible = user.gateScore >= psu.minGateScore;
          return (
            <div key={psu.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
               {/* Status Banner */}
               <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider ${
                   psu.status === 'Closing Soon' ? 'bg-rose-100 text-rose-600' :
                   psu.status === 'Open' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
               }`}>
                   {psu.status}
               </div>

               <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 font-bold text-lg">
                       {psu.name[0]}
                   </div>
                   <div>
                       <h3 className="font-bold text-slate-800">{psu.name}</h3>
                       <p className="text-xs text-slate-500">{psu.role}</p>
                   </div>
               </div>

               <div className="space-y-3 mb-6">
                   <div className="flex items-center justify-between text-sm">
                       <span className="text-slate-500">Min. Score Estimate</span>
                       <span className="font-medium text-slate-800">{psu.minGateScore}</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                       <span className="text-slate-500">Deadline</span>
                       <span className="font-medium text-rose-600 flex items-center gap-1">
                           <Clock size={12} /> {psu.deadline}
                       </span>
                   </div>
                   <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100">
                       <span className="text-slate-500">Your Eligibility</span>
                       {isEligible ? (
                           <span className="text-emerald-600 flex items-center gap-1 font-medium">
                               <CheckCircle size={14} /> Likely
                           </span>
                       ) : (
                           <span className="text-slate-400 flex items-center gap-1 font-medium">
                               <XCircle size={14} /> Low Chance
                           </span>
                       )}
                   </div>
               </div>

               <button className="w-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                   View Notification <ExternalLink size={14} />
               </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
