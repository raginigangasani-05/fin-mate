import React from "react";
import { FinanceProvider, useFinance } from "./context/FinanceContext";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { DashboardView } from "./components/DashboardView";
import { DecisionEngineView } from "./components/DecisionEngineView";
import { BeforeYouBuyView } from "./components/BeforeYouBuyView";
import { LoanReadinessView } from "./components/LoanReadinessView";
import { PaymentsView } from "./components/PaymentsView";
import { GoalsView } from "./components/GoalsView";
import { ProfileView } from "./components/ProfileView";
import { AiChatDrawer } from "./components/AiChatDrawer";
import { Sparkles } from "lucide-react";

const MainContent: React.FC = () => {
  const { viewMode, activeTab, setIsChatOpen, isChatOpen } = useFinance();

  if (viewMode === "landing") {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-orange-500 selection:text-black">
        <Navbar />
        <main className="flex-1">
          <LandingPage />
        </main>
        <AiChatDrawer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-orange-500 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "decision-engine" && <DecisionEngineView />}
        {activeTab === "before-you-buy" && <BeforeYouBuyView />}
        {activeTab === "loan-readiness" && <LoanReadinessView />}
        {activeTab === "payments" && <PaymentsView />}
        {activeTab === "goals" && <GoalsView />}
        {activeTab === "profile" && <ProfileView />}
      </main>

      {/* Floating Ask AI Button */}
      {!isChatOpen && (
        <button
          id="floating-ask-ai-btn"
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs rounded-lg border border-orange-400 shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Fin AI</span>
        </button>
      )}

      {/* AI Chat Drawer Component */}
      <AiChatDrawer />
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <MainContent />
    </FinanceProvider>
  );
}
