import React from 'react';
import { UserProfile, TimelineEvent } from '../types';
import { TIMELINE_DATA } from '../constants';
import { Calendar, Bell, ArrowRight, TrendingUp } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  setRoute: (r: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, setRoute }) => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user.name}</h1>
        <p className="text-slate-500">GATE 2025 • {user.branch} • Score: {user.gateScore}</p>
      </header>

      {/* Quick Stats / Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-lg relative overflow-hidden group cursor-pointer" onClick={() => setRoute('predictor')}>
          <div className="relative z-10">
            <h3 className="font-semibold text-lg mb-1">Admission Probability</h3>
            <p className="text-indigo-100 text-sm mb-4">Check your chances at IITs & NITs based on your score.</p>
            <span className="inline-flex items-center text-xs font-bold bg-white/20 px-3 py-1 rounded-full group-hover:bg-white/30 transition-colors">
              Check Now <ArrowRight size={14} className="ml-1" />
            </span>
          </div>
          <TrendingUp className="absolute -bottom-4 -right-4 text-indigo-500/50 w-32 h-32" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setRoute('psu-tracker')}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">2 Active</span>
          </div>
          <h3 className="font-semibold text-slate-800">PSU Applications</h3>
          <p className="text-sm text-slate-500 mt-1">Track deadlines for IOCL, ONGC, NTPC.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setRoute('choice-filling')}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <ListChecks className="w-6 h-6" />
            </div>
          </div>
          <h3 className="font-semibold text-slate-800">Choice Assistant</h3>
          <p className="text-sm text-slate-500 mt-1">Optimize your CCMT/COAP preference list.</p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-400" />
            Important Dates
          </h2>
          <button className="text-sm text-indigo-600 font-medium hover:underline">Sync to Calendar</button>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {TIMELINE_DATA.map((event, index) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon */}
              <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 group-hover:bg-indigo-500 group-hover:scale-125 transition-all shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white text-[10px]">
                {/* Status indicator dot */}
              </div>

              {/* Card */}
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        event.type === 'GOAPS' ? 'bg-blue-50 text-blue-600' :
                        event.type === 'CCMT' ? 'bg-purple-50 text-purple-600' :
                        'bg-orange-50 text-orange-600'
                    }`}>
                        {event.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{event.date}</span>
                 </div>
                 <h3 className="text-sm font-semibold text-slate-800">{event.title}</h3>
                 <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Bell size={12} />
                    <span>{event.status}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import { Building2, ListChecks } from 'lucide-react';
