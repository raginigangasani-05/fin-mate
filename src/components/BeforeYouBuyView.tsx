import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { formatCurrency } from "../utils/financeEngine";

export const BeforeYouBuyView: React.FC = () => {
  const {
    currencySymbol,
    activeBuyAnalysis,
    runBuyAnalysis,
    isEvaluating,
  } = useFinance();

  const [itemName, setItemName] = useState("Apple MacBook Pro M3");
  const [itemPrice, setItemPrice] = useState(120000);
  const [paymentMode, setPaymentMode] = useState("Full Cash / Debit");

  const handleAnalyze = async () => {
    if (!itemPrice) return;
    await runBuyAnalysis(itemName, itemPrice, paymentMode);
  };

  const sampleProducts = [
    { name: "Apple MacBook Pro M3", price: 140000, mode: "Full Cash / Debit" },
    { name: "iPhone 16 Pro Max", price: 134000, mode: "6-Month No-Cost EMI" },
    { name: "Sony 65\" 4K OLED TV", price: 115000, mode: "12-Month EMI" },
    { name: "Weekend Luxury Resort Trip", price: 38000, mode: "Credit Card" },
    { name: "Bose Noise Cancelling Headphones", price: 29900, mode: "Full Cash / Debit" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
          <ShoppingBag className="w-4 h-4 text-orange-400" />
          <span>Purchase Intelligence</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">“Before You Buy” Purchase Simulator</h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Evaluate any product or experience before checking out. FinMate models how this purchase alters your emergency runway, existing goal milestones, and free cashflow.
        </p>
      </div>

      {/* Input Configuration Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Product Name */}
          <div className="md:col-span-5">
            <label className="text-xs font-bold text-zinc-300 block mb-1.5">
              Product / Expense Description
            </label>
            <input
              id="before-buy-item-name"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. MacBook Pro M3, Sony OLED TV"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Price */}
          <div className="md:col-span-4">
            <label className="text-xs font-bold text-zinc-300 block mb-1.5">
              Price ({currencySymbol})
            </label>
            <input
              id="before-buy-price-input"
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          {/* Payment Method */}
          <div className="md:col-span-3">
            <label className="text-xs font-bold text-zinc-300 block mb-1.5">
              Payment Mode
            </label>
            <select
              id="before-buy-payment-mode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="Full Cash / Debit">Full Cash / Debit</option>
              <option value="6-Month No-Cost EMI">6-Month No-Cost EMI</option>
              <option value="12-Month EMI">12-Month Regular EMI</option>
              <option value="Credit Card">Credit Card (Paid in Full)</option>
            </select>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div>
          <span className="text-[11px] font-semibold text-zinc-400 block mb-2">
            Quick test with popular wishlist items:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleProducts.map((p) => (
              <button
                key={p.name}
                id={`preset-buy-${p.name.substring(0, 8).replace(/\s+/g, "-")}`}
                onClick={() => {
                  setItemName(p.name);
                  setItemPrice(p.price);
                  setPaymentMode(p.mode);
                }}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <span>{p.name}</span>
                <span className="text-orange-400 font-semibold font-mono ml-1.5">({formatCurrency(p.price, currencySymbol)})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="pt-2 flex justify-end">
          <button
            id="before-buy-analyze-btn"
            disabled={isEvaluating || !itemPrice}
            onClick={handleAnalyze}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-black font-bold text-xs rounded-lg flex items-center gap-2 transition-colors"
          >
            {isEvaluating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-black" />
                <span>Simulating Purchase Impact...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>Simulate 'Before You Buy'</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Result Card */}
      {activeBuyAnalysis ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-200">
          {/* Header Score & Timing */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Recommended Timing Verdict
                </span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider border ${
                    activeBuyAnalysis.timingStatus === "optimal"
                      ? "bg-zinc-950 text-orange-400 border-orange-500/40"
                      : activeBuyAnalysis.timingStatus === "manageable_with_delay"
                      ? "bg-zinc-950 text-zinc-300 border-zinc-700"
                      : activeBuyAnalysis.timingStatus === "stretch"
                      ? "bg-zinc-950 text-amber-400 border-amber-500/40"
                      : "bg-zinc-950 text-rose-400 border-rose-500/40"
                  }`}
                >
                  {activeBuyAnalysis.timingStatus.replace(/_/g, " ")}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                “{activeBuyAnalysis.timingRecommendation}”
              </h2>
            </div>

            {/* Affordability Score Box */}
            <div className="flex items-center gap-4 bg-zinc-950 px-5 py-3.5 rounded-lg border border-zinc-800 shrink-0">
              <div>
                <span className="text-[10px] font-medium text-zinc-400 block">Affordability Score</span>
                <span className="text-2xl font-black text-orange-400 font-mono">
                  {activeBuyAnalysis.affordabilityScore}<span className="text-xs text-zinc-400 font-normal">/100</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-750 flex items-center justify-center text-orange-400 font-mono font-bold text-xs">
                {activeBuyAnalysis.affordabilityScore >= 70 ? "SAFE" : "HOLD"}
              </div>
            </div>
          </div>

          {/* Why Recommendation */}
          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 leading-relaxed">
            <strong className="text-orange-400 block mb-1">Why this recommendation was calculated:</strong>
            <p>{activeBuyAnalysis.whyRecommendation}</p>
          </div>

          {/* Emergency Runway Shift & Goal Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 font-medium">Emergency Runway Before</span>
              <div className="text-sm font-bold text-zinc-200 font-mono">{activeBuyAnalysis.financialImpact?.runwayBefore}</div>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 font-medium">Emergency Runway After</span>
              <div className="text-sm font-bold text-orange-400 font-mono">{activeBuyAnalysis.financialImpact?.runwayAfter}</div>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 font-medium">Cashflow / Buffer Change</span>
              <div className="text-sm font-bold text-white font-mono">{activeBuyAnalysis.financialImpact?.monthlyBufferChange}</div>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 font-medium">Goal Timeline Variance</span>
              <div className="text-sm font-bold text-zinc-200">{activeBuyAnalysis.financialImpact?.impactOnGoals}</div>
            </div>
          </div>

          {/* 2-Column Signals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Positive Signals</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-200">
                {activeBuyAnalysis.positiveSignals?.map((sig, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Vulnerabilities & Risk Signals</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-200">
                {activeBuyAnalysis.riskSignals?.map((sig, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">⚠</span>
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Safe Purchase Checklist */}
          <div className="p-5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>What would make this purchase safer? (Action Checklist)</span>
            </div>
            <div className="space-y-2">
              {activeBuyAnalysis.saferPurchaseChecklist?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                  <div className="w-4 h-4 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] font-mono">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Empty Prompt State */
        <div className="bg-zinc-900 border border-zinc-800 border-dashed rounded-xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 text-orange-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-white">No Purchase Simulation Run Yet</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enter an item name and price above, or pick one of our sample products to test liquid runway and goal delay estimates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
