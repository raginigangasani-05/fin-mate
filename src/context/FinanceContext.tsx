import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  FinancialProfile,
  Goal,
  Transaction,
  NotificationItem,
  ChatMessage,
  DecisionResult,
  BuyAnalysisResult,
  CurrencyType,
  LoanReadinessInput,
  LoanReadinessResult,
} from "../types";
import { defaultProfile, presetProfiles } from "../data/mockData";
import {
  evaluateDecisionLocally,
  evaluateBeforeYouBuyLocally,
  evaluateLoanReadinessLocally,
  calculateHealthScore,
} from "../utils/financeEngine";

export type NavTab =
  | "dashboard"
  | "decision-engine"
  | "before-you-buy"
  | "loan-readiness"
  | "payments"
  | "goals"
  | "profile";

interface FinanceContextType {
  profile: FinancialProfile;
  activeTab: NavTab;
  viewMode: "landing" | "app";
  currency: CurrencyType;
  currencySymbol: string;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  activeDecision: DecisionResult | null;
  activeBuyAnalysis: BuyAnalysisResult | null;
  isEvaluating: boolean;
  setActiveTab: (tab: NavTab) => void;
  setViewMode: (mode: "landing" | "app") => void;
  setCurrency: (currency: CurrencyType) => void;
  setCurrencySymbol: (sym: string) => void;
  updateProfile: (updates: Partial<FinancialProfile>) => void;
  loadPreset: (presetKey: string) => void;
  addGoal: (goal: Omit<Goal, "id">) => void;
  contributeToGoal: (goalId: string, amount: number) => void;
  makePayment: (title: string, amount: number, category: string, method: string) => boolean;
  runDecisionQuery: (query: string) => Promise<DecisionResult>;
  runBuyAnalysis: (item: string, price: number, paymentMode: string) => Promise<BuyAnalysisResult>;
  runLoanAnalysis: (input: LoanReadinessInput) => LoanReadinessResult;
  sendChatMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  markNotificationsAsRead: () => void;
  resetToDefault: () => void;
  switchToApp: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const STORAGE_KEY = "finmate_financial_profile_v1";

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Monthly Salary Credited",
    message: "₹95,000 received from TechCorp Global on Aug 1st.",
    time: "2 days ago",
    read: false,
    type: "payment",
    actionTab: "payments",
  },
  {
    id: "notif-2",
    title: "Dining Spend Spike Detected",
    message: "Dining expenses are up 18% compared to last month.",
    time: "Yesterday",
    read: false,
    type: "insight",
    actionTab: "dashboard",
  },
  {
    id: "notif-3",
    title: "Goal Milestone in Sight",
    message: "Emergency Fund is now at 73% of target. Only ₹80,000 to reach 6-month buffer.",
    time: "3 hours ago",
    read: false,
    type: "goal",
    actionTab: "goals",
  },
];

const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-init",
    sender: "ai",
    text: "Hello! I'm Fin AI, your personal financial strategist at FinMate. I have your full financial profile loaded. What purchase decision, loan scenario, or money question would you like to evaluate together?",
    timestamp: "Just now",
    suggestedPrompts: [
      "Can I afford a ₹1,00,000 laptop?",
      "Should I get another credit card?",
      "Can I take a ₹5 lakh personal loan?",
      "Why is my health score at 78?",
      "Where am I spending too much?",
    ],
  },
];

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<FinancialProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    return defaultProfile;
  });

  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [viewMode, setViewMode] = useState<"landing" | "app">("landing");
  const [currency, setCurrencyState] = useState<CurrencyType>("INR");
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeDecision, setActiveDecision] = useState<DecisionResult | null>(null);
  const [activeBuyAnalysis, setActiveBuyAnalysis] = useState<BuyAnalysisResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn("LocalStorage save error", e);
    }
  }, [profile]);

  const currencySymbol = profile.currencySymbol || "₹";

  const setCurrency = (newCurr: CurrencyType) => {
    setCurrencyState(newCurr);
    let symbol = "₹";
    if (newCurr === "USD") symbol = "$";
    if (newCurr === "EUR") symbol = "€";
    if (newCurr === "GBP") symbol = "£";
    setProfile(prev => ({ ...prev, currency: newCurr, currencySymbol: symbol }));
  };

  const setCurrencySymbol = (sym: string) => {
    setProfile(prev => ({ ...prev, currencySymbol: sym }));
  };

  const updateProfile = (updates: Partial<FinancialProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const loadPreset = (presetKey: string) => {
    if (presetProfiles[presetKey]) {
      setProfile(presetProfiles[presetKey]);
      setActiveDecision(null);
      setActiveBuyAnalysis(null);
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: `Preset Switched: ${presetProfiles[presetKey].name}`,
          message: `Loaded profile for ${presetProfiles[presetKey].roleTitle} with ${presetProfiles[presetKey].currencySymbol}${presetProfiles[presetKey].monthlyIncome.toLocaleString()} monthly income.`,
          time: "Just now",
          read: false,
          type: "insight",
        },
        ...prev,
      ]);
    }
  };

  const switchToApp = () => {
    setViewMode("app");
  };

  const addGoal = (newGoal: Omit<Goal, "id">) => {
    const goal: Goal = {
      ...newGoal,
      id: `goal-${Date.now()}`,
    };
    setProfile(prev => ({
      ...prev,
      goals: [goal, ...prev.goals],
    }));
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: "New Goal Created",
        message: `Goal '${goal.title}' with target ${currencySymbol}${goal.targetAmount.toLocaleString()} added.`,
        time: "Just now",
        read: false,
        type: "goal",
        actionTab: "goals",
      },
      ...prev,
    ]);
  };

  const contributeToGoal = (goalId: string, amount: number) => {
    setProfile(prev => {
      const updatedGoals = prev.goals.map(g => {
        if (g.id === goalId) {
          return { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + amount) };
        }
        return g;
      });

      const updatedSavings = Math.max(0, prev.savings - amount);

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        title: `Goal Allocation: ${prev.goals.find(g => g.id === goalId)?.title || "Savings Goal"}`,
        category: "Investment",
        amount,
        type: "investment",
        date: new Date().toISOString().split("T")[0],
        status: "Completed",
        paymentMethod: "Account Transfer",
      };

      return {
        ...prev,
        goals: updatedGoals,
        savings: updatedSavings,
        transactions: [newTx, ...prev.transactions],
      };
    });
  };

  const makePayment = (title: string, amount: number, category: string, method: string): boolean => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title,
      category,
      amount,
      type: category.includes("EMI") ? "emi" : "payment",
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
      paymentMethod: method,
    };

    setProfile(prev => {
      const updatedSavings = Math.max(0, prev.savings - amount);
      let updatedCards = prev.creditCards;
      let updatedLoans = prev.loans;

      if (category.toLowerCase().includes("credit card")) {
        updatedCards = prev.creditCards.map(c => {
          if (title.includes(c.cardName) || title.includes(c.bankName)) {
            return { ...c, currentBalance: Math.max(0, c.currentBalance - amount) };
          }
          return c;
        });
      }

      if (category.toLowerCase().includes("emi") || category.toLowerCase().includes("loan")) {
        updatedLoans = prev.loans.map(l => {
          if (title.includes(l.lender) || title.includes(l.loanType)) {
            return {
              ...l,
              outstandingBalance: Math.max(0, l.outstandingBalance - amount),
              tenureRemainingMonths: Math.max(0, l.tenureRemainingMonths - 1),
            };
          }
          return l;
        });
      }

      return {
        ...prev,
        savings: updatedSavings,
        creditCards: updatedCards,
        loans: updatedLoans,
        transactions: [newTx, ...prev.transactions],
      };
    });

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: "Payment Processed",
        message: `Successfully paid ${currencySymbol}${amount.toLocaleString()} for ${title}.`,
        time: "Just now",
        read: false,
        type: "payment",
        actionTab: "payments",
      },
      ...prev,
    ]);

    return true;
  };

  const runDecisionQuery = async (query: string): Promise<DecisionResult> => {
    setIsEvaluating(true);
    try {
      const res = await fetch("/api/gemini/decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, profile }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && json.data.affordabilityScore !== undefined) {
          setActiveDecision(json.data);
          setIsEvaluating(false);
          return json.data;
        }
      }
    } catch (e) {
      console.warn("AI decision API returned fallback signal, running local model:", e);
    }

    // High quality deterministic fallback
    const localResult = evaluateDecisionLocally(query, profile);
    setActiveDecision(localResult);
    setIsEvaluating(false);
    return localResult;
  };

  const runBuyAnalysis = async (
    item: string,
    price: number,
    paymentMode: string
  ): Promise<BuyAnalysisResult> => {
    setIsEvaluating(true);
    try {
      const res = await fetch("/api/gemini/buy-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, price, paymentMode, profile }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && json.data.affordabilityScore !== undefined) {
          setActiveBuyAnalysis(json.data);
          setIsEvaluating(false);
          return json.data;
        }
      }
    } catch (e) {
      console.warn("AI buy analysis returned fallback signal, running local model:", e);
    }

    const localResult = evaluateBeforeYouBuyLocally(item, price, paymentMode, profile);
    setActiveBuyAnalysis(localResult);
    setIsEvaluating(false);
    return localResult;
  };

  const runLoanAnalysis = (input: LoanReadinessInput): LoanReadinessResult => {
    return evaluateLoanReadinessLocally(input, currencySymbol);
  };

  const sendChatMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: chatMessages.slice(-6),
          profile,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setChatMessages(prev => [
            ...prev,
            {
              id: `ai-${Date.now()}`,
              sender: "ai",
              text: data.reply,
              timestamp: "Just now",
            },
          ]);
          setIsChatLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("AI Chat API failed, using intelligent companion fallback:", e);
    }

    // High quality contextual fallback
    const decision = evaluateDecisionLocally(text, profile);
    const health = calculateHealthScore(profile);
    const fallbackReply = `**Fin AI Analysis for:** "${text}"\n\n` +
      `• **Decision Score:** ${decision.affordabilityScore}/100 (${decision.verdictType.toUpperCase()})\n` +
      `• **Recommendation:** ${decision.recommendation}\n\n` +
      `**Key Financial Factors:**\n` +
      decision.positiveFactors.map(p => `✓ ${p}`).join("\n") + "\n" +
      decision.riskFactors.map(r => `⚠ ${r}`).join("\n") + "\n\n" +
      `**Suggested Action:** ${decision.suggestedActions[0] || "Review non-essential budget categories before committing."}`;

    setChatMessages(prev => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: fallbackReply,
        timestamp: "Just now",
        structuredDecision: decision,
      },
    ]);
    setIsChatLoading(false);
  };

  const clearChat = () => {
    setChatMessages(initialChatMessages);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToDefault = () => {
    setProfile(defaultProfile);
    setActiveDecision(null);
    setActiveBuyAnalysis(null);
    setNotifications(initialNotifications);
    setChatMessages(initialChatMessages);
    localStorage.removeItem(STORAGE_KEY);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <FinanceContext.Provider
      value={{
        profile,
        activeTab,
        viewMode,
        currency,
        currencySymbol,
        notifications,
        unreadNotificationCount,
        isChatOpen,
        setIsChatOpen,
        chatOpen: isChatOpen,
        setChatOpen: setIsChatOpen,
        chatMessages,
        isChatLoading,
        activeDecision,
        activeBuyAnalysis,
        isEvaluating,
        setActiveTab,
        setViewMode,
        setCurrency,
        setCurrencySymbol,
        updateProfile,
        loadPreset,
        addGoal,
        contributeToGoal,
        makePayment,
        runDecisionQuery,
        runBuyAnalysis,
        runLoanAnalysis,
        sendChatMessage,
        clearChat,
        markNotificationsAsRead,
        resetToDefault,
        switchToApp,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};
