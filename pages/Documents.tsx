import React, { useState } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';

export const Documents: React.FC = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'GATE Score Card', required: true, checked: false },
    { id: 2, label: 'Class 10th Marksheet (DOB Proof)', required: true, checked: false },
    { id: 3, label: 'Class 12th Marksheet', required: true, checked: false },
    { id: 4, label: 'B.Tech Consolidated Marksheet', required: true, checked: false },
    { id: 5, label: 'Provisional Degree Certificate / Degree', required: true, checked: false },
    { id: 6, label: 'OBC-NCL / EWS Certificate', required: false, checked: false, note: 'Must be issued after 1st April 2025' },
    { id: 7, label: 'PwD Certificate (Format V/VI/VII)', required: false, checked: false },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const progress = Math.round((checklist.filter(c => c.checked).length / checklist.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
       <header>
        <h1 className="text-2xl font-bold text-slate-800">Document Checklist</h1>
        <p className="text-slate-500">Ensure these are ready before CCMT/COAP rounds begin.</p>
      </header>

      {/* Progress */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-700">Readiness</span>
            <span className="font-bold text-indigo-600">{progress}%</span>
         </div>
         <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {checklist.map((item) => (
              <div key={item.id} className={`p-4 border-b border-slate-100 last:border-0 flex items-start gap-4 transition-colors ${item.checked ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
                  <button 
                    onClick={() => toggleCheck(item.id)}
                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent hover:border-emerald-400'
                    }`}
                  >
                      <Check size={14} />
                  </button>
                  <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium ${item.checked ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                            {item.label}
                        </h3>
                        {item.required && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">Required</span>}
                      </div>
                      {item.note && (
                          <div className="flex items-center gap-1.5 mt-1 text-amber-600 text-xs bg-amber-50 inline-block px-2 py-1 rounded">
                              <AlertCircle size={12} />
                              {item.note}
                          </div>
                      )}
                  </div>
                  <label className="cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors">
                      <input type="file" className="hidden" />
                      <Upload size={18} />
                  </label>
              </div>
          ))}
      </div>
      
      <div className="bg-slate-50 p-4 rounded-lg text-xs text-slate-500 text-center">
         Note: This app does not store your files. The upload button is for you to verify file availability locally.
      </div>
    </div>
  );
};
