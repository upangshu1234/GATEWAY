import React, { useState } from 'react';
import { UserProfile, ChoiceItem } from '../types';
import { INITIAL_CHOICES } from '../constants';
import { analyzeChoices } from '../services/gemini';
import { GripVertical, Trash2, Plus, Sparkles, AlertTriangle } from 'lucide-react';

interface ChoiceFillingProps {
  user: UserProfile;
}

export const ChoiceFilling: React.FC<ChoiceFillingProps> = ({ user }) => {
  const [choices, setChoices] = useState<ChoiceItem[]>(INITIAL_CHOICES);
  const [analyzing, setAnalyzing] = useState(false);
  const [newCollege, setNewCollege] = useState('');
  const [newProgram, setNewProgram] = useState('');

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === choices.length - 1) return;

    const newChoices = [...choices];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newChoices[index], newChoices[targetIndex]] = [newChoices[targetIndex], newChoices[index]];
    setChoices(newChoices);
  };

  const handleAdd = () => {
    if (!newCollege || !newProgram) return;
    const newItem: ChoiceItem = {
      id: Date.now().toString(),
      college: newCollege,
      program: newProgram,
      type: 'Unknown'
    };
    setChoices([...choices, newItem]);
    setNewCollege('');
    setNewProgram('');
  };

  const handleRemove = (id: string) => {
    setChoices(choices.filter(c => c.id !== id));
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const updated = await analyzeChoices(choices, user);
    setChoices(updated);
    setAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* List Area */}
      <div className="lg:col-span-2 space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-800">Choice Filling Assistant</h1>
          <p className="text-slate-500">Arrange your CCMT/COAP preferences. AI will flag risks.</p>
        </header>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex gap-2">
             <input 
               type="text" 
               placeholder="College (e.g., NIT Trichy)" 
               className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
               value={newCollege}
               onChange={(e) => setNewCollege(e.target.value)}
             />
             <input 
               type="text" 
               placeholder="Program (e.g., Power Electronics)" 
               className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
               value={newProgram}
               onChange={(e) => setNewProgram(e.target.value)}
             />
             <button 
               onClick={handleAdd}
               className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded transition-colors"
             >
               <Plus size={20} />
             </button>
          </div>

          <div className="divide-y divide-slate-100">
            {choices.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-sm">
                    No choices added yet. Add colleges to start.
                </div>
            )}
            {choices.map((choice, index) => (
              <div key={choice.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
                <div className="flex flex-col items-center gap-1 text-slate-300">
                   <button 
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="hover:text-slate-600 disabled:opacity-30">▲</button>
                   <span className="text-xs font-mono font-bold text-slate-400">{index + 1}</span>
                   <button 
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === choices.length - 1}
                    className="hover:text-slate-600 disabled:opacity-30">▼</button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                     <h3 className="font-semibold text-slate-800">{choice.college}</h3>
                     {choice.type !== 'Unknown' && (
                       <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${
                         choice.type === 'Safe' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                         choice.type === 'Moderate' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                         choice.type === 'Ambitious' ? 'bg-rose-50 text-rose-600 border-rose-100' : ''
                       }`}>
                         {choice.type}
                       </span>
                     )}
                  </div>
                  <p className="text-sm text-slate-500">{choice.program}</p>
                </div>

                <button 
                  onClick={() => handleRemove(choice.id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Analysis */}
      <div className="space-y-6">
        <div className="bg-indigo-900 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-amber-400" />
            <h3 className="font-bold text-lg">AI Risk Check</h3>
          </div>
          <p className="text-indigo-200 text-sm mb-6">
            Our algorithms check past 5-year trends to identify if your ordering maximizes your admission probability.
          </p>
          <button 
            onClick={handleAnalyze}
            disabled={analyzing || choices.length === 0}
            className="w-full bg-white text-indigo-900 font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {analyzing ? 'Analyzing...' : 'Analyze My List'}
          </button>
        </div>

        {!user.isPremium && (
             <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
               <div className="flex items-start gap-3">
                 <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                 <div>
                    <h4 className="font-bold text-amber-900 text-sm">Hidden Strategy</h4>
                    <p className="text-xs text-amber-700 mt-1">
                        Premium users get detailed "Why" explanations for each risk flag and alternative college suggestions.
                    </p>
                 </div>
               </div>
             </div>
        )}
      </div>
    </div>
  );
};
