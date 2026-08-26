import React, { useState } from "react";
import { useFinance, NavTab } from "../context/FinanceContext";
import {
  Sparkles,
  LayoutDashboard,
  BrainCircuit,
  ShoppingBag,
  Scale,
  CreditCard,
  Target,
  UserCog,
  Bell,
  ArrowRight,
  RefreshCw,
  Menu,
  X,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { calculateHealthScore } from "../utils/financeEngine";

export const Navbar: React.FC = () => {
  const {
    profile,
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    currency,
    setCurrency,
    notifications,
    unreadNotificationCount,
    markNotificationsAsRead,
    setChatOpen,
    chatOpen,
    loadPreset,
    resetToDefault,
  } = useFinance();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const health = calculateHealthScore(profile);

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950 border-b border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-btn"
            onClick={() => setViewMode("landing")}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-black font-black text-lg transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">FinMate</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-zinc-900 text-orange-400 border border-orange-500/30">
                  Decision Engine
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block">Understand your money. Decide smarter.</p>
            </div>
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="hidden md:flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            id="nav-mode-landing"
            onClick={() => setViewMode("landing")}
            className={`px-3.5 py-1.5 rounded text-xs font-medium transition-colors ${
              viewMode === "landing"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Product Overview
          </button>
          <button
            id="nav-mode-app"
            onClick={() => setViewMode("app")}
            className={`px-3.5 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
              viewMode === "app"
                ? "bg-orange-500 text-black font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>Live Decision Workspace</span>
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          {/* Quick Demo Preset Trigger */}
          <div className="relative">
            <button
              id="demo-profiles-btn"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-200 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
              <span>Persona: <strong className="text-white">{profile.name.split(" ")[0]}</strong></span>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-zinc-800 text-xs font-semibold text-zinc-400">
                  Select Financial Persona
                </div>
                <button
                  id="preset-balanced"
                  onClick={() => {
                    loadPreset("balanced");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">Arjun Verma</p>
                    <p className="text-[11px] text-zinc-400">Balanced Professional (₹95k/mo)</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium">Default</span>
                </button>
                <button
                  id="preset-starter"
                  onClick={() => {
                    loadPreset("starter");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">Sarah Chen</p>
                    <p className="text-[11px] text-zinc-400">Early Career Starter (₹55k/mo)</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">Starter</span>
                </button>
                <button
                  id="preset-high-earner"
                  onClick={() => {
                    loadPreset("highEarner");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">Rohan Kapoor</p>
                    <p className="text-[11px] text-zinc-400">High Earner / Investor (₹2.4L/mo)</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 font-medium">High Net</span>
                </button>
                <button
                  id="preset-stressed"
                  onClick={() => {
                    loadPreset("stressed");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">Ananya Sharma</p>
                    <p className="text-[11px] text-zinc-400">Debt Recovery Mode (₹65k/mo)</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium">Restructure</span>
                </button>
                <div className="pt-2 border-t border-zinc-800">
                  <button
                    id="preset-reset-btn"
                    onClick={() => {
                      resetToDefault();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full py-1.5 text-center text-xs text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    Reset to Factory Defaults
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              id="notifications-btn"
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                if (!notifDropdownOpen) markNotificationsAsRead();
              }}
              className="p-2 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
                  <span className="text-xs font-semibold text-white">Financial Signals & Alerts</span>
                  <span className="text-[10px] text-zinc-400">{notifications.length} updates</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.actionTab) {
                          setActiveTab(n.actionTab as NavTab);
                          setViewMode("app");
                        }
                        setNotifDropdownOpen(false);
                      }}
                      className="p-2.5 bg-zinc-950 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors border border-zinc-800 text-left"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Advisor Launcher */}
          <button
            id="open-ai-chat-btn"
            onClick={() => setChatOpen(!chatOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg text-xs transition-colors"
          >
            <MessageSquareText className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Fin AI</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => {
                setViewMode("landing");
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded text-center ${
                viewMode === "landing" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400"
              }`}
            >
              Product Overview
            </button>
            <button
              onClick={() => {
                setViewMode("app");
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded text-center ${
                viewMode === "app" ? "bg-orange-500 text-black font-bold" : "text-zinc-400"
              }`}
            >
              Live Platform
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-xs">
            <button
              onClick={() => {
                loadPreset("balanced");
                setMobileMenuOpen(false);
              }}
              className="p-2 bg-zinc-900 rounded-lg text-left text-zinc-200 hover:bg-zinc-800"
            >
              Arjun (Balanced)
            </button>
            <button
              onClick={() => {
                loadPreset("starter");
                setMobileMenuOpen(false);
              }}
              className="p-2 bg-zinc-900 rounded-lg text-left text-zinc-200 hover:bg-zinc-800"
            >
              Sarah (Starter)
            </button>
            <button
              onClick={() => {
                loadPreset("highEarner");
                setMobileMenuOpen(false);
              }}
              className="p-2 bg-zinc-900 rounded-lg text-left text-zinc-200 hover:bg-zinc-800"
            >
              Rohan (High Net)
            </button>
            <button
              onClick={() => {
                loadPreset("stressed");
                setMobileMenuOpen(false);
              }}
              className="p-2 bg-zinc-900 rounded-lg text-left text-zinc-200 hover:bg-zinc-800"
            >
              Ananya (Recovery)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export const Sidebar: React.FC = () => {
  const { profile, activeTab, setActiveTab } = useFinance();
  const health = calculateHealthScore(profile);

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "decision-engine", label: "Decision Engine", icon: BrainCircuit, badge: "AI Core" },
    { id: "before-you-buy", label: "Before You Buy", icon: ShoppingBag },
    { id: "loan-readiness", label: "Loan Readiness", icon: Scale },
    { id: "payments", label: "Payments Ecosystem", icon: CreditCard },
    { id: "goals", label: "Financial Goals", icon: Target },
    { id: "profile", label: "Financial Profile", icon: UserCog },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 shrink-0 select-none">
      {/* User Mini Profile Card */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-lg border border-zinc-700 object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{profile.name}</h3>
            <p className="text-[11px] text-zinc-400 truncate">{profile.roleTitle}</p>
          </div>
        </div>

        {/* Health Score Mini Widget */}
        <div className="mt-3.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              Health Score
            </span>
            <span className="font-bold text-orange-400 font-mono">{health.overallScore}/100</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                health.overallScore >= 75
                  ? "bg-orange-500"
                  : health.overallScore >= 60
                  ? "bg-amber-400"
                  : "bg-rose-500"
              }`}
              style={{ width: `${health.overallScore}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-400 mt-1.5">
            <span>Status: <strong className="text-zinc-200">{health.rating}</strong></span>
            <span>{health.emergencyRunwayMonths} mo runway</span>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-orange-500 text-black font-bold"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-zinc-400"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                  isActive ? "bg-black/20 text-black" : "bg-zinc-800 text-orange-400 border border-orange-500/20"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Prompts box */}
      <div className="p-3 m-3 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-300">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400 mb-1">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Decision Modeling</span>
        </div>
        <p className="text-[11px] text-zinc-400 mb-2.5 leading-relaxed">
          Need a quick affordability check before a purchase?
        </p>
        <button
          id="sidebar-quick-decision-btn"
          onClick={() => setActiveTab("decision-engine")}
          className="w-full py-1.5 px-2.5 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-white rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors"
        >
          <span>Open Decision Engine</span>
          <ArrowRight className="w-3 h-3 text-orange-400" />
        </button>
      </div>
    </aside>
  );
};
