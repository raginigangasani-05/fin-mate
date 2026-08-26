import React from "react";
import { useFinance } from "../context/FinanceContext";
import {
  ShieldCheck,
  Wallet,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Utensils,
  Home,
  Coffee,
  Car,
  Zap,
  ShoppingBag,
  HeartPulse,
  BrainCircuit,
  Scale,
  CheckCircle2,
} from "lucide-react";
import {
  calculateHealthScore,
  generateDynamicInsights,
  formatCurrency,
} from "../utils/financeEngine";

export const DashboardView: React.FC = () => {
  const { profile, currencySymbol, setActiveTab, runDecisionQuery } = useFinance();
  const health = calculateHealthScore(profile);
  const insights = generateDynamicInsights(profile);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Home": return Home;
      case "Utensils": return Utensils;
      case "Coffee": return Coffee;
      case "Car": return Car;
      case "Zap": return Zap;
      case "ShoppingBag": return ShoppingBag;
      case "HeartPulse": return HeartPulse;
      default: return Wallet;
    }
  };

  const totalBudget = profile.expenseCategories.reduce((s, c) => s + c.budget, 0);
  const totalActualExpense = profile.expenseCategories.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Financial Intelligence Dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Welcome back, {profile.name.split(" ")[0]}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Your finances at a glance. Model decisions and optimize cashflow with real-time intelligence.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="dash-quick-before-buy"
            onClick={() => setActiveTab("before-you-buy")}
            className="px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
            <span>Before You Buy</span>
          </button>
          <button
            id="dash-quick-loan-check"
            onClick={() => setActiveTab("loan-readiness")}
            className="px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-zinc-300" />
            <span>Loan Readiness</span>
          </button>
          <button
            id="dash-quick-ai-engine"
            onClick={() => setActiveTab("decision-engine")}
            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-black" />
            <span>AI Decision Engine</span>
          </button>
        </div>
      </div>

      {/* Financial Health Score & Sub-Pillars Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Health Score Meter */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 text-orange-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-white">Financial Health Score</h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-zinc-950 border border-orange-500/30 text-orange-400 font-semibold font-mono">
              {health.rating}
            </span>
          </div>

          <div className="flex items-center gap-6 my-auto">
            {/* Circular Gauge */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-zinc-800"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-orange-500 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * health.overallScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white font-mono">{health.overallScore}</span>
                <span className="text-[10px] font-medium text-zinc-400">/ 100</span>
              </div>
            </div>

            {/* Health Highlights */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded bg-orange-500" />
                <span className="text-zinc-300">Savings Rate: <strong className="font-mono text-white">{health.savingsRatePercentage}%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded bg-zinc-500" />
                <span className="text-zinc-300">Debt-to-Income: <strong className="font-mono text-white">{health.debtToIncomePercentage}%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded bg-orange-400" />
                <span className="text-zinc-300">Emergency Buffer: <strong className="font-mono text-white">{health.emergencyRunwayMonths} mo</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded bg-zinc-400" />
                <span className="text-zinc-300">Credit Score: <strong className="font-mono text-white">{profile.creditScore}</strong></span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed">
            💡 <strong>Score Audit:</strong> {health.overallScore >= 75
              ? "Your financial foundation is robust with low revolving debt and strong liquidity cushion."
              : "Focus on reducing high-cost EMIs and building at least 3 months of liquid emergency funds."}
          </div>
        </div>

        {/* Right 5 Pillar Breakdown */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            5 Core Pillars of Your Health Score
          </h3>

          <div className="space-y-3.5">
            {/* Pillar 1 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">1. Savings & Surplus Rate</span>
                <span className="text-orange-400 font-bold font-mono">{health.savingsRateScore}/20 pts ({health.savingsRatePercentage}%)</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(health.savingsRateScore / 20) * 100}%` }} />
              </div>
            </div>

            {/* Pillar 2 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">2. Debt-to-Income / EMI Burden</span>
                <span className="text-orange-400 font-bold font-mono">{health.debtToIncomeScore}/20 pts ({health.debtToIncomePercentage}% DTI)</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(health.debtToIncomeScore / 20) * 100}%` }} />
              </div>
            </div>

            {/* Pillar 3 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">3. Emergency Runway Cushion</span>
                <span className="text-orange-400 font-bold font-mono">{health.emergencyFundScore}/20 pts ({health.emergencyRunwayMonths} mo)</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(health.emergencyFundScore / 20) * 100}%` }} />
              </div>
            </div>

            {/* Pillar 4 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">4. Credit Score & Utilization</span>
                <span className="text-orange-400 font-bold font-mono">{health.creditHealthScore}/20 pts ({profile.creditScore} CIBIL / {profile.creditUtilization}%)</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(health.creditHealthScore / 20) * 100}%` }} />
              </div>
            </div>

            {/* Pillar 5 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300 font-medium">5. Monthly Spending Discipline</span>
                <span className="text-orange-400 font-bold font-mono">{health.spendingDisciplineScore}/20 pts</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(health.spendingDisciplineScore / 20) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Financial Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Income */}
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-400">Monthly Income</span>
          <div className="text-lg font-bold text-white font-mono">{formatCurrency(profile.monthlyIncome, currencySymbol)}</div>
          <div className="text-[10px] text-orange-400 flex items-center gap-0.5 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            <span>Regular Inflow</span>
          </div>
        </div>

        {/* Card 2: Expenses */}
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-400">Monthly Expenses</span>
          <div className="text-lg font-bold text-white font-mono">{formatCurrency(profile.monthlyExpenses, currencySymbol)}</div>
          <div className="text-[10px] text-zinc-400 font-mono">
            {Math.round((profile.monthlyExpenses / profile.monthlyIncome) * 100)}% of income
          </div>
        </div>

        {/* Card 3: Savings */}
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-400">Liquid Savings</span>
          <div className="text-lg font-bold text-orange-400 font-mono">{formatCurrency(profile.savings, currencySymbol)}</div>
          <div className="text-[10px] text-zinc-400 font-mono">
            {health.emergencyRunwayMonths} mo buffer
          </div>
        </div>

        {/* Card 4: Outstanding Loans */}
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-400">Total Debt Balance</span>
          <div className="text-lg font-bold text-white font-mono">{formatCurrency(profile.totalDebt, currencySymbol)}</div>
          <div className="text-[10px] text-zinc-400">{profile.loans.length} active commitments</div>
        </div>

        {/* Card 5: Monthly EMI */}
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-400">Monthly EMI Burden</span>
          <div className="text-lg font-bold text-white font-mono">{formatCurrency(profile.monthlyEmi, currencySymbol)}</div>
          <div className="text-[10px] text-orange-400 font-mono">{health.debtToIncomePercentage}% DTI</div>
        </div>

        {/* Card 6: Credit Utilization */}
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-400">Credit Utilization</span>
          <div className="text-lg font-bold text-white font-mono">{profile.creditUtilization}%</div>
          <div className={`text-[10px] font-medium ${profile.creditUtilization <= 30 ? "text-orange-400" : "text-amber-400"}`}>
            {profile.creditUtilization <= 30 ? "Optimal (<30%)" : "High (Pay down)"}
          </div>
        </div>
      </div>

      {/* Charts & Spending Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Chart */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Monthly Cashflow Trajectory</h3>
              <p className="text-[11px] text-zinc-400">Income vs Total Outflow</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-orange-500" /> Income
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-zinc-600" /> Outflow
              </span>
            </div>
          </div>

          {/* Bar Visualization */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2">
            {profile.monthlyHistory.map((item) => {
              const maxVal = Math.max(...profile.monthlyHistory.map(h => h.income)) * 1.1;
              const incomeHeight = (item.income / maxVal) * 100;
              const outflowHeight = ((item.expenses + item.emi) / maxVal) * 100;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-36">
                    {/* Income Bar */}
                    <div
                      className="w-1/2 bg-orange-500 rounded-t transition-colors relative"
                      style={{ height: `${incomeHeight}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 border border-zinc-800 text-white text-[10px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap transition-opacity pointer-events-none font-mono">
                        {formatCurrency(item.income, currencySymbol)}
                      </div>
                    </div>

                    {/* Outflow Bar */}
                    <div
                      className="w-1/2 bg-zinc-700 rounded-t transition-colors relative"
                      style={{ height: `${outflowHeight}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 border border-zinc-800 text-white text-[10px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap transition-opacity pointer-events-none font-mono">
                        {formatCurrency(item.expenses + item.emi, currencySymbol)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Spending Breakdown */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Category Spend vs Budget</h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                Total: {formatCurrency(totalActualExpense, currencySymbol)} of {formatCurrency(totalBudget, currencySymbol)}
              </p>
            </div>
            <button
              onClick={() => setActiveTab("profile")}
              className="text-[11px] text-orange-400 hover:underline font-medium"
            >
              Edit Budgets
            </button>
          </div>

          <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
            {profile.expenseCategories.map((cat) => {
              const Icon = getCategoryIcon(cat.iconName);
              const percent = Math.min(100, Math.round((cat.amount / cat.budget) * 100));
              const isOver = cat.amount > cat.budget;

              return (
                <div key={cat.id} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="font-medium text-white">{cat.name}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-semibold text-white">{formatCurrency(cat.amount, currencySymbol)}</span>
                      <span className="text-[10px] text-zinc-400"> / {formatCurrency(cat.budget, currencySymbol)}</span>
                    </div>
                  </div>

                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isOver ? "bg-rose-500" : "bg-orange-500"}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-zinc-950 border border-zinc-800 text-orange-400 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Fin AI Insights & Signals</h3>
              <p className="text-[11px] text-zinc-400">Derived in real-time from your cashflow and debt parameters</p>
            </div>
          </div>
          <span className="text-xs text-zinc-400">{insights.length} active insights</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((ins) => {
            const isAlert = ins.type === "alert" || ins.type === "warning";
            return (
              <div
                key={ins.id}
                className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-3 hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      {isAlert ? (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      )}
                      {ins.title}
                    </span>
                    {ins.metricImpact && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-semibold font-mono">
                        {ins.metricImpact}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{ins.description}</p>
                </div>

                {ins.suggestedAction && (
                  <div className="pt-2 border-t border-zinc-850 flex items-center justify-between gap-2">
                    <p className="text-[11px] text-orange-300 font-medium truncate">
                      👉 {ins.suggestedAction}
                    </p>
                    {ins.actionQuery && (
                      <button
                        onClick={() => {
                          runDecisionQuery(ins.actionQuery!);
                          setActiveTab("decision-engine");
                        }}
                        className="text-[10px] px-2.5 py-1 bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 rounded text-zinc-200 shrink-0 font-medium"
                      >
                        Ask AI
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
