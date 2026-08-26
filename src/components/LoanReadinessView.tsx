import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Info,
} from "lucide-react";
import { formatCurrency } from "../utils/financeEngine";
import { LoanReadinessInput } from "../types";

export const LoanReadinessView: React.FC = () => {
  const { profile, currencySymbol, runLoanAnalysis } = useFinance();

  const [inputs, setInputs] = useState<LoanReadinessInput>({
    monthlyIncome: profile.monthlyIncome,
    employmentType: profile.employmentType === "Business Owner" ? "Self-Employed" : (profile.employmentType as any),
    creditScore: profile.creditScore,
    existingLoansTotal: profile.totalDebt,
    existingMonthlyEmi: profile.monthlyEmi,
    creditUtilization: profile.creditUtilization,
    repaymentHistory: "100% On-Time",
    existingCreditAccounts: profile.creditCards.length + profile.loans.length,
    loanAmountRequested: 500000,
    loanTenureMonths: 36,
    loanType: "Personal Loan",
  });

  const result = runLoanAnalysis(inputs);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
          <Scale className="w-4 h-4 text-orange-400" />
          <span>Lender Simulation Framework</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Loan Eligibility & Readiness Analyzer</h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Evaluate your loan approval probability before submitting formal applications. Models your Debt-to-Income (DTI), Fixed Obligation to Income Ratio (FOIR), and CIBIL credit tier without triggering hard credit bureau inquiries.
        </p>
      </div>

      {/* Main Grid: Form Inputs + Live Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Inputs */}
        <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Loan Application Parameters
            </h3>
            <button
              onClick={() => {
                setInputs({
                  monthlyIncome: profile.monthlyIncome,
                  employmentType: "Salaried",
                  creditScore: profile.creditScore,
                  existingLoansTotal: profile.totalDebt,
                  existingMonthlyEmi: profile.monthlyEmi,
                  creditUtilization: profile.creditUtilization,
                  repaymentHistory: "100% On-Time",
                  existingCreditAccounts: profile.creditCards.length + profile.loans.length,
                  loanAmountRequested: 500000,
                  loanTenureMonths: 36,
                  loanType: "Personal Loan",
                });
              }}
              className="text-[11px] text-orange-400 hover:underline font-medium"
            >
              Sync from Profile
            </button>
          </div>

          <div className="space-y-4">
            {/* Loan Type & Amount */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">Loan Type</label>
                <select
                  id="loan-type-select"
                  value={inputs.loanType}
                  onChange={(e) => setInputs({ ...inputs, loanType: e.target.value as any })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Personal Loan">Personal Loan (11-14%)</option>
                  <option value="Home Loan">Home Loan (8.4-9.2%)</option>
                  <option value="Car Loan">Auto / Car Loan (8.8-10%)</option>
                  <option value="Education Loan">Education Loan (9.5-11%)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                  Requested Amount ({currencySymbol})
                </label>
                <input
                  id="loan-amount-input"
                  type="number"
                  value={inputs.loanAmountRequested}
                  onChange={(e) => setInputs({ ...inputs, loanAmountRequested: Number(e.target.value) })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-medium text-zinc-300 mb-1">
                <span>Loan Tenure (Months)</span>
                <span className="text-orange-400 font-bold font-mono">{inputs.loanTenureMonths} Months ({Math.round(inputs.loanTenureMonths / 12)} Yrs)</span>
              </div>
              <input
                id="loan-tenure-slider"
                type="range"
                min="12"
                max="84"
                step="6"
                value={inputs.loanTenureMonths}
                onChange={(e) => setInputs({ ...inputs, loanTenureMonths: Number(e.target.value) })}
                className="w-full accent-orange-500 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Monthly Income & Employment Type */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                  Monthly Take-Home ({currencySymbol})
                </label>
                <input
                  id="loan-income-input"
                  type="number"
                  value={inputs.monthlyIncome}
                  onChange={(e) => setInputs({ ...inputs, monthlyIncome: Number(e.target.value) })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">Employment Type</label>
                <select
                  id="loan-employment-select"
                  value={inputs.employmentType}
                  onChange={(e) => setInputs({ ...inputs, employmentType: e.target.value as any })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Salaried">Salaried (Full Time)</option>
                  <option value="Self-Employed">Self-Employed / Business</option>
                  <option value="Freelance">Independent Freelancer</option>
                </select>
              </div>
            </div>

            {/* Credit Score Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-medium text-zinc-300 mb-1">
                <span>CIBIL / Credit Score</span>
                <span className="text-orange-400 font-bold font-mono">{inputs.creditScore}</span>
              </div>
              <input
                id="loan-credit-score-slider"
                type="range"
                min="300"
                max="900"
                step="5"
                value={inputs.creditScore}
                onChange={(e) => setInputs({ ...inputs, creditScore: Number(e.target.value) })}
                className="w-full accent-orange-500 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 mt-0.5 font-mono">
                <span>300 (Poor)</span>
                <span>650 (Fair)</span>
                <span>750 (Prime)</span>
                <span>900 (Excellent)</span>
              </div>
            </div>

            {/* Existing Monthly EMI & Credit Utilization */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                  Existing Monthly EMIs ({currencySymbol})
                </label>
                <input
                  id="loan-existing-emi-input"
                  type="number"
                  value={inputs.existingMonthlyEmi}
                  onChange={(e) => setInputs({ ...inputs, existingMonthlyEmi: Number(e.target.value) })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                  Credit Card Utilization (%)
                </label>
                <input
                  id="loan-utilization-input"
                  type="number"
                  value={inputs.creditUtilization}
                  onChange={(e) => setInputs({ ...inputs, creditUtilization: Number(e.target.value) })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>
            </div>

            {/* Repayment History */}
            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">Repayment Track Record</label>
              <select
                id="loan-repayment-history-select"
                value={inputs.repaymentHistory}
                onChange={(e) => setInputs({ ...inputs, repaymentHistory: e.target.value as any })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              >
                <option value="100% On-Time">100% Spotless On-Time Settlements</option>
                <option value="Minor Delay (1-29 days)">Occasional 1–29 Day Minor Delay</option>
                <option value="Major Delinquency">Major Late Payment / Delinquency</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Live Score Output */}
        <div className="lg:col-span-6 space-y-6">
          {/* Readiness Score Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Approval Probability Audit
                </span>
                <h3 className="text-base font-bold text-white">Estimated Loan Readiness</h3>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded font-mono font-bold uppercase tracking-wider border ${
                  result.verdict === "High Readiness"
                    ? "bg-zinc-950 text-orange-400 border-orange-500/40"
                    : result.verdict === "Moderate Readiness"
                    ? "bg-zinc-950 text-zinc-300 border-zinc-700"
                    : result.verdict === "Low Readiness"
                    ? "bg-zinc-950 text-amber-400 border-amber-500/40"
                    : "bg-zinc-950 text-rose-400 border-rose-500/40"
                }`}
              >
                {result.verdict}
              </span>
            </div>

            {/* Score Radial + Metrics */}
            <div className="flex items-center gap-6 pb-2">
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-zinc-800" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-orange-500 transition-all duration-500"
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * result.readinessScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white font-mono">{result.readinessScore}</span>
                  <span className="text-[10px] text-zinc-400">/ 100</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 flex-1">
                <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-medium block">Estimated EMI</span>
                  <span className="text-xs font-bold text-orange-400 font-mono">{formatCurrency(result.estimatedEmi, currencySymbol)}/mo</span>
                </div>
                <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-medium block">Est. Interest Rate</span>
                  <span className="text-xs font-bold text-white font-mono">{result.estimatedInterestRate}% p.a.</span>
                </div>
                <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-medium block">Projected DTI / FOIR</span>
                  <span className={`text-xs font-bold font-mono ${result.projectedDtiRatio <= 40 ? "text-orange-400" : "text-amber-400"}`}>
                    {result.projectedDtiRatio}%
                  </span>
                </div>
                <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-medium block">Max Safe Loan</span>
                  <span className="text-xs font-bold text-white font-mono">{formatCurrency(result.maxAffordableLoan, currencySymbol)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Positive vs Negative Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Positive Strengths</span>
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {result.positiveFactors.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Areas to Improve</span>
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {result.areasToImprove.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">⚠</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Readiness Optimization Roadmap</span>
            </div>
            <div className="space-y-2 text-xs text-zinc-300">
              {result.improvementSuggestions.map((sug, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] font-mono">
                    {i + 1}
                  </div>
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory / Educational Disclaimer */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Illustrative Prototype Notice:</strong> This score is a simulated readiness model calculated from DTI and credit rules. It is designed for personal planning and does not represent a legally binding lender loan approval or formal underwriting commitment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
