import React, { useState } from 'react';
import { UserProfile, PredictionResult } from '../types';
import { getAdmissionPrediction } from '../services/gemini';
import { Loader2, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

interface PredictorProps {
  user: UserProfile;
}

export const Predictor: React.FC<PredictorProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult[] | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    // Simulate slight delay for UX
    const data = await getAdmissionPrediction(user);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Admission Probability Predictor</h1>
        <p className="text-slate-500 mt-2">AI-driven estimates based on past COAP/CCMT rounds.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Score</span>
            <div className="text-xl font-bold text-slate-900">{user.gateScore}</div>
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Rank</span>
            <div className="text-xl font-bold text-slate-900">{user.gateRank}</div>
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Category</span>
            <div className="text-xl font-bold text-slate-900">{user.category}</div>
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Branch</span>
            <div className="text-xl font-bold text-slate-900">{user.branch}</div>
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Analyzing 3 years of data...
            </>
          ) : (
            'Generate Prediction'
          )}
        </button>
      </div>

      {results && (
        <div className="space-y-4 animate-fade-in">
           {/* Disclaimer */}
           <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>Predictions are estimates. Official cutoffs depend on applicant pool dynamics. Always fill more choices than just these.</p>
           </div>

           {!user.isPremium && (
             <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-lg flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <Lock className="text-amber-400" />
                  <div>
                    <h4 className="font-bold text-sm">Unlock Detailed Analysis</h4>
                    <p className="text-xs text-slate-300">See 10+ more colleges and spot round trends.</p>
                  </div>
                </div>
                <button className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded">Upgrade</button>
             </div>
           )}

          <div className="space-y-3">
            {results.map((res, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-300 transition-colors">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{res.college}</h3>
                  <p className="text-slate-600 font-medium">{res.program}</p>
                  <p className="text-sm text-slate-500 mt-1">{res.comment}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Probability</div>
                    <div className={`font-bold ${
                      res.probability === 'High' ? 'text-emerald-600' : 
                      res.probability === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {res.probability}
                    </div>
                  </div>
                  <div className={`w-2 h-12 rounded-full ${
                      res.probability === 'High' ? 'bg-emerald-100' : 
                      res.probability === 'Medium' ? 'bg-amber-100' : 'bg-rose-100'
                  }`}>
                    <div className={`w-full rounded-full ${
                      res.probability === 'High' ? 'h-full bg-emerald-500' : 
                      res.probability === 'Medium' ? 'h-2/3 bg-amber-500' : 'h-1/3 bg-rose-500'
                    }`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
