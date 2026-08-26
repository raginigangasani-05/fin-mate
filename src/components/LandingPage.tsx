import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  ShoppingBag,
  Scale,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
  Sliders,
} from "lucide-react";
import { calculateHealthScore } from "../utils/financeEngine";

export const LandingPage: React.FC = () => {
  const { switchToApp, setActiveTab, profile, currencySymbol, loadPreset } = useFinance();
  const health = calculateHealthScore(profile);

  // Mini live hero simulator
  const [testItem, setTestItem] = useState("Apple MacBook Pro");
  const [testPrice, setTestPrice] = useState(120000);
  const [testMode, setTestMode] = useState("Full Cash");

  const runwayAfter = Math.max(
    0,
    (profile.savings - testPrice) / (profile.monthlyExpenses + profile.monthlyEmi)
  ).toFixed(1);

  const miniAffordability = profile.savings >= testPrice * 1.5 ? 76 : 48;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-orange-500 selection:text-black">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Next-Generation Financial Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Your Money. <span className="text-orange-500">Understood.</span> <br />
              Your Decisions. <span className="text-zinc-300">Smarter.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              FinMate is an intelligent financial decision engine powered by Fin AI that models your real cashflow, debt commitments, and emergency buffer before you spend.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-explore-finances-btn"
                onClick={() => switchToApp()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 transition-colors"
              >
                <span>Explore Your Finances</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                id="hero-see-how-btn"
                onClick={() => scrollToSection("how-it-works")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Deterministic Cashflow Modeling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Pre-application Loan Readiness</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Context-Aware AI Decision Engine</span>
              </div>
            </div>
          </div>

          {/* Right Live Interactive Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-orange-500 text-black flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Live Decision Simulator</h4>
                    <p className="text-[10px] text-zinc-400">Try modeling an expense in real-time</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-orange-400 font-semibold border border-orange-500/20">
                  Interactive
                </span>
              </div>

              {/* Mini Decision Form */}
              <div className="mt-4 space-y-3.5">
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                    What are you considering buying?
                  </label>
                  <input
                    type="text"
                    value={testItem}
                    onChange={(e) => setTestItem(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    placeholder="e.g. MacBook Pro M3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-zinc-400 block mb-1">Price ({currencySymbol})</label>
                    <input
                      type="number"
                      value={testPrice}
                      onChange={(e) => setTestPrice(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-zinc-400 block mb-1">Payment Mode</label>
                    <select
                      value={testMode}
                      onChange={(e) => setTestMode(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="Full Cash">Full Cash</option>
                      <option value="6-Month No-Cost EMI">6-Mo No-Cost EMI</option>
                      <option value="Credit Card">Credit Card</option>
                    </select>
                  </div>
                </div>

                {/* Live Real-Time Output Card */}
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-300">Affordability Score</span>
                    <span className="text-sm font-extrabold text-orange-400 font-mono">{miniAffordability}/100</span>
                  </div>

                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        miniAffordability >= 70 ? "bg-orange-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${miniAffordability}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-zinc-300 leading-snug">
                    {miniAffordability >= 70
                      ? `Verdict: Manageable. Your liquid emergency runway will adjust from ${health.emergencyRunwayMonths} mo → ${runwayAfter} mo.`
                      : `Verdict: Caution recommended. Waiting 4-6 weeks to accumulate ₹25,000 extra buffer is safer.`}
                  </p>
                </div>

                {/* Launch full app button */}
                <button
                  id="preview-launch-full-engine-btn"
                  onClick={() => {
                    setActiveTab("before-you-buy");
                    switchToApp();
                  }}
                  className="w-full py-2.5 rounded bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-xs font-semibold text-orange-400 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Deep 'Before You Buy' Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-16 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">The Problem & The Solution</span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              Your financial life is scattered across apps.
            </h2>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              You check banking apps for balances, credit card apps for statements, EMI schedules in emails, and investments in broker portals. None of them tell you if you can actually afford your next decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 text-rose-400 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Traditional Banking & Dashboard Apps</h3>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Show static backward-looking lists of what you already spent.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Offer zero guidance when you are about to buy a ₹1,00,000 laptop.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Leave you guessing if taking another personal loan will wreck your debt ratio.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Fragmented accounts give you a false sense of liquid purchasing power.</span>
                </li>
              </ul>
            </div>

            {/* The FinMate Way */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-orange-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">The FinMate Decision Engine</h3>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span><strong>Unified Intelligence:</strong> Aggregates income, expenses, liquid runway, EMIs, and goals with Fin AI.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span><strong>Decision Scoring:</strong> Analyzes affordability mathematically before you commit capital.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span><strong>Transparent Loan Readiness:</strong> Estimates pre-application readiness without hard credit hits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span><strong>Proactive AI Recommendations:</strong> Outlines exact timing and trade-offs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principle: DATA -> ANALYSIS -> UNDERSTANDING -> RECOMMENDATION -> ACTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">Our Core Framework</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            The Decision Intelligence Pipeline
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            Every module follows a disciplined 5-stage transformation pipeline:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {[
            { step: "01", name: "DATA", desc: "Aggregates income, fixed commitments, debts, liquid cash, and credit variables.", icon: Layers },
            { step: "02", name: "ANALYSIS", desc: "Computes debt-to-income, emergency runway, and spending velocity.", icon: Sliders },
            { step: "03", name: "UNDERSTANDING", desc: "Identifies vulnerabilities, credit headroom, and cashflow pinch-points.", icon: ShieldCheck },
            { step: "04", name: "RECOMMENDATION", desc: "Generates clear score ratings, timing advice, and risk flags.", icon: BrainCircuit },
            { step: "05", name: "ACTION", desc: "Provides step-by-step checklists to execute safely.", icon: CheckCircle2 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-orange-400 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded">
                    {item.step}
                  </span>
                  <Icon className="w-4 h-4 text-zinc-400" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide">{item.name}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works (5 Steps) */}
      <section id="how-it-works" className="py-16 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">Workflow</span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              How FinMate Clarifies Your Finances
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              5 intuitive steps from uncertainty to high-confidence financial clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                num: "1",
                title: "Connect & Configure",
                desc: "Enter your income, loans, and expenses or select an instant prototype persona.",
              },
              {
                num: "2",
                title: "Diagnose Health",
                desc: "Get an audited 100-point Financial Health Score across 5 critical pillars.",
              },
              {
                num: "3",
                title: "Ask Any Question",
                desc: "Ask 'Can I afford a laptop?' or test high-ticket purchases in 'Before You Buy'.",
              },
              {
                num: "4",
                title: "Receive Intelligence",
                desc: "Review positive factors, risks, emergency runway shifts, and timing advice.",
              },
              {
                num: "5",
                title: "Execute Smarter",
                desc: "Follow concrete actions, pay simulated EMIs, and hit milestone goals.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3"
              >
                <div className="w-8 h-8 rounded bg-orange-500 text-black font-black text-sm flex items-center justify-center">
                  {step.num}
                </div>
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">Platform Capabilities</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Built for High-Stakes Financial Decisions
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            Explore the specialized modules engineered to give you total decision confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Decision Engine */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              AI Decision Engine
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ask open-ended queries like "Should I get another credit card?" or "Can I take a ₹5 lakh personal loan?". Get structured verdicts with risk factors and action plans.
            </p>
            <button
              onClick={() => {
                setActiveTab("decision-engine");
                switchToApp();
              }}
              className="text-xs font-semibold text-orange-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>Try Decision Engine</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>

          {/* Card 2: Before You Buy */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded bg-zinc-800 text-orange-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              "Before You Buy" Simulator
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Test big purchases before checkout. Models how an expense impacts liquid emergency runway, goal target dates, and monthly discretionary cashflow.
            </p>
            <button
              onClick={() => {
                setActiveTab("before-you-buy");
                switchToApp();
              }}
              className="text-xs font-semibold text-orange-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>Test a Purchase</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>

          {/* Card 3: Loan Readiness */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded bg-zinc-800 text-orange-400 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Loan Readiness Analyzer
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Calculates an estimated Loan Readiness Score (0-100) based on DTI, CIBIL, FOIR, and credit utilization. Identifies exact steps to improve approval odds.
            </p>
            <button
              onClick={() => {
                setActiveTab("loan-readiness");
                switchToApp();
              }}
              className="text-xs font-semibold text-orange-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>Check Loan Readiness</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>

          {/* Card 4: Financial Health Score */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded bg-zinc-800 text-orange-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Holistic Health Score
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Audits savings rate, debt-to-income, emergency runway, credit tier, and budget adherence into an actionable 100-point score with peer benchmarking.
            </p>
            <button
              onClick={() => {
                setActiveTab("dashboard");
                switchToApp();
              }}
              className="text-xs font-semibold text-orange-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>View Health Audit</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>

          {/* Card 5: Goals & Milestones */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded bg-zinc-800 text-orange-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Smart Financial Goals
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Track emergency funds, tech upgrades, vacations, or debt payoffs. Automatically projects completion dates and recommended monthly allocation.
            </p>
            <button
              onClick={() => {
                setActiveTab("goals");
                switchToApp();
              }}
              className="text-xs font-semibold text-orange-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>Explore Goals</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>

          {/* Card 6: Payments & Profile */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded bg-zinc-800 text-orange-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Payments Ecosystem & Profile
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Simulate credit card settlements, EMI debits, utility bills, and UPI transactions. Edit numbers in real-time to watch the entire dashboard adapt.
            </p>
            <button
              onClick={() => {
                setActiveTab("payments");
                switchToApp();
              }}
              className="text-xs font-semibold text-orange-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>Open Payments Center</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Demo Persona Switcher Banner */}
      <section className="py-16 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">Interactive Sandbox</span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              Try Demo with Realistic Sample Profiles
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl mx-auto">
              Select any pre-configured scenario to see how the Fin AI Decision Engine adapts to different salary levels and debt burdens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div
              onClick={() => {
                loadPreset("balanced");
                switchToApp();
              }}
              className="p-4 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500 cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Arjun Verma</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-orange-400 font-semibold border border-orange-500/20">Default</span>
              </div>
              <p className="text-[11px] text-zinc-400">Balanced Professional</p>
              <div className="text-xs font-semibold text-zinc-200 font-mono">
                Income: {currencySymbol}95,000/mo
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Score: 78/100 • 23% DTI</div>
            </div>

            <div
              onClick={() => {
                loadPreset("starter");
                switchToApp();
              }}
              className="p-4 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500 cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Sarah Chen</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold">Starter</span>
              </div>
              <p className="text-[11px] text-zinc-400">Junior Engineer</p>
              <div className="text-xs font-semibold text-zinc-200 font-mono">
                Income: {currencySymbol}55,000/mo
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Score: 68/100 • Building Buffer</div>
            </div>

            <div
              onClick={() => {
                loadPreset("highEarner");
                switchToApp();
              }}
              className="p-4 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500 cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Rohan Kapoor</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-orange-400 font-semibold border border-orange-500/20">High Net</span>
              </div>
              <p className="text-[11px] text-zinc-400">Engineering Director</p>
              <div className="text-xs font-semibold text-zinc-200 font-mono">
                Income: {currencySymbol}2,40,000/mo
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Score: 88/100 • 812 CIBIL</div>
            </div>

            <div
              onClick={() => {
                loadPreset("stressed");
                switchToApp();
              }}
              className="p-4 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500 cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Ananya Sharma</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-amber-400 font-semibold">Recovery</span>
              </div>
              <p className="text-[11px] text-zinc-400">Brand Consultant</p>
              <div className="text-xs font-semibold text-zinc-200 font-mono">
                Income: {currencySymbol}65,000/mo
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Score: 48/100 • High EMIs</div>
            </div>
          </div>

          <div className="pt-4">
            <button
              id="landing-cta-bottom-btn"
              onClick={() => switchToApp()}
              className="px-8 py-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-sm shadow-xl inline-flex items-center gap-2.5 transition-colors"
            >
              <span>Launch Live Intelligence Platform</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-zinc-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            FinMate AI Financial Decision Engine • Powered by Fin AI
          </p>
          <p className="text-[11px] text-zinc-600">
            Financial health scores and readiness estimates are mathematical simulations designed for educational planning, not formal credit sanctions.
          </p>
        </div>
      </footer>
    </div>
  );
};
