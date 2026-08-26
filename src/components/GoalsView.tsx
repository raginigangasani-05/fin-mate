import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  Target,
  Sparkles,
  Plus,
  Calendar,
} from "lucide-react";
import { formatCurrency } from "../utils/financeEngine";

export const GoalsView: React.FC = () => {
  const { profile, currencySymbol, addGoal, contributeToGoal } = useFinance();
  const [showAddModal, setShowAddModal] = useState(false);

  // New Goal Form
  const [goalTitle, setGoalTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState(100000);
  const [initialSaved, setInitialSaved] = useState(15000);
  const [targetDate, setTargetDate] = useState("2026-12-31");
  const [category, setCategory] = useState("Technology Upgrade");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle) return;

    addGoal({
      title: goalTitle,
      targetAmount,
      currentAmount: initialSaved,
      targetDate,
      category,
      priority,
      recommendedMonthlyContribution: Math.round(targetAmount / 12),
    });

    setGoalTitle("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
            <Target className="w-4 h-4 text-orange-400" />
            <span>Milestone Tracking</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Financial Goals & Ambitions</h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Track short, medium, and long-term milestones. Fin AI projects completion timelines and calculates your recommended monthly surplus allocation.
          </p>
        </div>

        <button
          id="goals-add-new-btn"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Create New Goal</span>
        </button>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.goals.map((g) => {
          const progress = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
          const remaining = Math.max(0, g.targetAmount - g.currentAmount);

          return (
            <div
              key={g.id}
              className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-5 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 font-semibold uppercase">
                    {g.category}
                  </span>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded font-mono font-bold uppercase border ${
                      g.priority === "high"
                        ? "bg-zinc-950 text-orange-400 border-orange-500/40"
                        : g.priority === "medium"
                        ? "bg-zinc-950 text-amber-400 border-amber-500/40"
                        : "bg-zinc-950 text-zinc-300 border-zinc-700"
                    }`}
                  >
                    {g.priority} Priority
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{g.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Target: {g.targetDate}</span>
                  </p>
                </div>

                {/* Progress Bar & Numbers */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-white">{formatCurrency(g.currentAmount, currencySymbol)}</span>
                    <span className="text-zinc-400">of {formatCurrency(g.targetAmount, currencySymbol)}</span>
                  </div>

                  <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>{progress}% funded</span>
                    <span>{formatCurrency(remaining, currencySymbol)} remaining</span>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-[11px] text-zinc-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recommended Allocation:</span>
                  </div>
                  <p>
                    Save <strong className="font-mono text-white">{formatCurrency(g.recommendedMonthlyContribution, currencySymbol)}/month</strong> to reach this goal on schedule.
                  </p>
                </div>
              </div>

              {/* Quick Contribution Buttons */}
              <div className="pt-2 border-t border-zinc-800 flex items-center gap-2">
                <span className="text-[10px] font-medium text-zinc-400 shrink-0 font-mono">Add Funds:</span>
                <button
                  id={`goal-add-2k-${g.id}`}
                  onClick={() => contributeToGoal(g.id, 2000)}
                  className="flex-1 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-semibold text-orange-400 rounded-lg transition-colors font-mono"
                >
                  +{currencySymbol}2k
                </button>
                <button
                  id={`goal-add-5k-${g.id}`}
                  onClick={() => contributeToGoal(g.id, 5000)}
                  className="flex-1 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-semibold text-orange-400 rounded-lg transition-colors font-mono"
                >
                  +{currencySymbol}5k
                </button>
                <button
                  id={`goal-add-10k-${g.id}`}
                  onClick={() => contributeToGoal(g.id, 10000)}
                  className="flex-1 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-semibold text-orange-400 rounded-lg transition-colors font-mono"
                >
                  +{currencySymbol}10k
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">Create New Financial Goal</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. Europe Vacation Fund, MacBook Pro, Emergency Cushion"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">
                    Target ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    required
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">
                    Initial Saved ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={initialSaved}
                    onChange={(e) => setInitialSaved(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">Target Date</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Emergency Fund">Emergency Fund</option>
                  <option value="Travel & Vacation">Travel & Vacation</option>
                  <option value="Technology Upgrade">Technology Upgrade</option>
                  <option value="Vehicle Purchase">Vehicle Purchase</option>
                  <option value="Home Down Payment">Home Down Payment</option>
                  <option value="Retirement">Retirement & Investments</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold transition-colors"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
