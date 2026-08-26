import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  Settings,
  RotateCcw,
  CheckCircle2,
  Save,
} from "lucide-react";

export const ProfileView: React.FC = () => {
  const {
    profile,
    updateProfile,
    currencySymbol,
    setCurrencySymbol,
    loadPreset,
    resetToDefault,
  } = useFinance();

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    monthlyIncome: profile.monthlyIncome,
    monthlyExpenses: profile.monthlyExpenses,
    savings: profile.savings,
    creditScore: profile.creditScore,
    creditUtilization: profile.creditUtilization,
    employmentType: profile.employmentType,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      monthlyIncome: Number(formData.monthlyIncome),
      monthlyExpenses: Number(formData.monthlyExpenses),
      savings: Number(formData.savings),
      creditScore: Number(formData.creditScore),
      creditUtilization: Number(formData.creditUtilization),
      employmentType: formData.employmentType,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
            <Settings className="w-4 h-4 text-orange-400" />
            <span>Financial Configuration</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Profile & Preferences</h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Customize your income, baseline expenses, credit parameters, or switch between pre-configured sandbox personas to test how Fin AI responds.
          </p>
        </div>

        <button
          id="profile-reset-defaults-btn"
          onClick={resetToDefault}
          className="px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Preset Personas Switcher */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white">Sample Prototype Personas (Demo Mode)</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Instantly swap the entire dataset with one click:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => {
              loadPreset("balanced");
              setFormData({
                name: "Arjun Verma",
                email: "arjun.verma@example.com",
                monthlyIncome: 95000,
                monthlyExpenses: 46000,
                savings: 280000,
                creditScore: 765,
                creditUtilization: 24,
                employmentType: "Salaried",
              });
            }}
            className="p-4 rounded-lg bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500/50 text-left transition-colors space-y-1.5"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">Arjun Verma</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-orange-400 border border-orange-500/30 font-semibold">
                Balanced
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">Income: {currencySymbol}95,000/mo</p>
            <p className="text-[10px] text-zinc-500">Score: 78 • Moderate EMIs</p>
          </button>

          <button
            onClick={() => {
              loadPreset("starter");
              setFormData({
                name: "Sarah Chen",
                email: "sarah.chen@example.com",
                monthlyIncome: 55000,
                monthlyExpenses: 34000,
                savings: 90000,
                creditScore: 710,
                creditUtilization: 38,
                employmentType: "Salaried",
              });
            }}
            className="p-4 rounded-lg bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500/50 text-left transition-colors space-y-1.5"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">Sarah Chen</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-700 font-semibold">
                Starter
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">Income: {currencySymbol}55,000/mo</p>
            <p className="text-[10px] text-zinc-500">Score: 68 • Building Buffer</p>
          </button>

          <button
            onClick={() => {
              loadPreset("highEarner");
              setFormData({
                name: "Rohan Kapoor",
                email: "rohan.kapoor@example.com",
                monthlyIncome: 240000,
                monthlyExpenses: 85000,
                savings: 1250000,
                creditScore: 812,
                creditUtilization: 14,
                employmentType: "Salaried",
              });
            }}
            className="p-4 rounded-lg bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500/50 text-left transition-colors space-y-1.5"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">Rohan Kapoor</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-orange-400 border border-orange-500/30 font-semibold">
                High Net
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">Income: {currencySymbol}2,40,000/mo</p>
            <p className="text-[10px] text-zinc-500">Score: 88 • 812 CIBIL</p>
          </button>

          <button
            onClick={() => {
              loadPreset("stressed");
              setFormData({
                name: "Ananya Sharma",
                email: "ananya.sharma@example.com",
                monthlyIncome: 65000,
                monthlyExpenses: 42000,
                savings: 45000,
                creditScore: 640,
                creditUtilization: 62,
                employmentType: "Self-Employed",
              });
            }}
            className="p-4 rounded-lg bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500/50 text-left transition-colors space-y-1.5"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">Ananya Sharma</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-amber-400 border border-amber-500/30 font-semibold">
                Recovery
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">Income: {currencySymbol}65,000/mo</p>
            <p className="text-[10px] text-zinc-500">Score: 48 • High EMIs</p>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="text-sm font-bold text-white">Edit Financial Parameters</h3>
          {savedSuccess && (
            <span className="text-xs text-orange-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
              <span>Saved & Recalculated!</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Display Currency</label>
            <select
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="₹">₹ INR (Indian Rupee)</option>
              <option value="$">$ USD (US Dollar)</option>
              <option value="€">€ EUR (Euro)</option>
              <option value="£">£ GBP (British Pound)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">
              Monthly Take-Home ({currencySymbol})
            </label>
            <input
              type="number"
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">
              Monthly Base Expenses ({currencySymbol})
            </label>
            <input
              type="number"
              value={formData.monthlyExpenses}
              onChange={(e) => setFormData({ ...formData, monthlyExpenses: Number(e.target.value) })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">
              Total Liquid Cash / Savings ({currencySymbol})
            </label>
            <input
              type="number"
              value={formData.savings}
              onChange={(e) => setFormData({ ...formData, savings: Number(e.target.value) })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Credit Score (CIBIL)</label>
            <input
              type="number"
              value={formData.creditScore}
              onChange={(e) => setFormData({ ...formData, creditScore: Number(e.target.value) })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Credit Utilization (%)</label>
            <input
              type="number"
              value={formData.creditUtilization}
              onChange={(e) => setFormData({ ...formData, creditUtilization: Number(e.target.value) })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Employment Type</label>
            <select
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="Salaried">Salaried (Full Time)</option>
              <option value="Self-Employed">Self-Employed / Business</option>
              <option value="Freelancer">Freelancer / Independent</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            id="profile-save-btn"
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4 text-black" />
            <span>Save Financial Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
