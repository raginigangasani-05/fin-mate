import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { calculateHealthScore } from "../utils/financeEngine";
import { sampleDecisionQueries } from "../data/mockData";

export const DecisionEngineView: React.FC = () => {
  const {
    profile,
    activeDecision,
    runDecisionQuery,
    isEvaluating,
  } = useFinance();

  const [customQuery, setCustomQuery] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const health = calculateHealthScore(profile);

  const handleEvaluate = async (q: string) => {
    if (!q.trim()) return;
    setSelectedPrompt(q);
    await runDecisionQuery(q);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
          <BrainCircuit className="w-4 h-4 text-orange-400" />
          <span>Core AI Intelligence</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">AI Financial Decision Engine</h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Ask any real-world purchase, loan, or credit question. The engine models your cashflow, debt commitments, and liquid runway before delivering an objective verdict.
        </p>
      </div>

      {/* Interactive Query Console */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
        <div>
          <label className="text-xs font-bold text-zinc-300 block mb-2">
            Ask a Financial Decision Question
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="decision-custom-query-input"
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEvaluate(customQuery);
              }}
              placeholder="e.g. Can I afford a ₹1,00,000 laptop? or Can I take a ₹5 lakh personal loan?"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 placeholder:text-zinc-500 font-sans"
            />
            <button
              id="decision-evaluate-btn"
              disabled={isEvaluating || !customQuery.trim()}
              onClick={() => handleEvaluate(customQuery)}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-black font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0"
            >
              {isEvaluating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-black" />
                  <span>Modeling Decision...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4 text-black" />
                  <span>Evaluate Decision</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Suggested Quick Decision Chips */}
        <div>
          <span className="text-[11px] font-semibold text-zinc-400 block mb-2">
            Or select a benchmark decision scenario:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleDecisionQueries.map((item) => (
              <button
                key={item.query}
                id={`decision-chip-${item.query.substring(0, 10).replace(/\s+/g, "-")}`}
                onClick={() => {
                  setCustomQuery(item.query);
                  handleEvaluate(item.query);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors text-left ${
                  selectedPrompt === item.query
                    ? "bg-zinc-850 border-orange-500 text-orange-400 font-semibold"
                    : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <span>{item.query}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decision Output Card */}
      {activeDecision ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-200">
          {/* Top Verdict Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Scenario Verdict
                </span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider border ${
                    activeDecision.verdictType === "safe"
                      ? "bg-zinc-950 text-orange-400 border-orange-500/40"
                      : activeDecision.verdictType === "caution"
                      ? "bg-zinc-950 text-amber-400 border-amber-500/40"
                      : "bg-zinc-950 text-rose-400 border-rose-500/40"
                  }`}
                >
                  {activeDecision.verdictType}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                “{activeDecision.recommendation}”
              </h2>
            </div>

            {/* Score Box */}
            <div className="flex items-center gap-4 bg-zinc-950 px-5 py-3.5 rounded-lg border border-zinc-800 shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-medium text-zinc-400 block">Affordability Score</span>
                <span className="text-2xl font-black text-orange-400 font-mono">
                  {activeDecision.affordabilityScore}<span className="text-xs text-zinc-400 font-normal">/100</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-750 flex items-center justify-center text-orange-400 font-mono font-bold text-xs">
                {activeDecision.confidenceScore || 90}%
              </div>
            </div>
          </div>

          {/* 2-Column Positive vs Risk Signals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Positive Factors */}
            <div className="p-5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Positive Financial Factors Considered</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-200">
                {activeDecision.positiveFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span className="leading-relaxed">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Factors */}
            <div className="p-5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Financial Risk & Constraint Factors</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-200">
                {activeDecision.riskFactors.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">⚠</span>
                    <span className="leading-relaxed">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Financial Impact Breakdown Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Projected Balance Sheet & Cashflow Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-400 font-medium">Discretionary Cash Impact</span>
                <p className="text-xs font-semibold text-white">
                  {activeDecision.financialImpact?.monthlyDiscretionaryImpact || "Liquid outflow recorded"}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-400 font-medium">Emergency Runway Shift</span>
                <p className="text-xs font-semibold text-white font-mono">
                  {activeDecision.financialImpact?.emergencyRunwayImpact || `${health.emergencyRunwayMonths} mo buffer`}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-400 font-medium">Debt-to-Income (DTI) Delta</span>
                <p className="text-xs font-semibold text-white font-mono">
                  {activeDecision.financialImpact?.dtiChange || "Neutral"}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-400 font-medium">Goal Timeline Impact</span>
                <p className="text-xs font-semibold text-white">
                  {activeDecision.financialImpact?.goalDelayEstimate || "0 days variance"}
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Actions Checklist */}
          <div className="p-5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Suggested Next Action Checklist</span>
            </div>
            <div className="space-y-2">
              {activeDecision.suggestedActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                  <div className="w-4 h-4 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] font-mono">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Reasoning */}
          {activeDecision.detailedReasoning && (
            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
              <span className="font-semibold text-white block mb-1">Financial Strategist Reasoning:</span>
              <p>{activeDecision.detailedReasoning}</p>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-zinc-900 border border-zinc-800 border-dashed rounded-xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 text-orange-400 flex items-center justify-center mx-auto">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-white">Ready for your financial queries</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Type any question above or click one of the suggested prompts to evaluate affordability, risk, and cashflow impact instantly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
