export type CurrencyType = "INR" | "USD" | "EUR" | "GBP";

export interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  budget: number;
  color: string;
  iconName: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountType: "Savings" | "Salary" | "Current" | "Fixed Deposit";
  accountNumber: string;
  balance: number;
}

export interface CreditCard {
  id: string;
  bankName: string;
  cardName: string;
  cardNumber: string;
  limit: number;
  currentBalance: number;
  dueDate: string;
  minDue: number;
}

export interface LoanItem {
  id: string;
  loanType: "Home Loan" | "Personal Loan" | "Auto Loan" | "Education Loan" | "Consumer Durable";
  lender: string;
  principalAmount: number;
  outstandingBalance: number;
  monthlyEmi: number;
  interestRate: number;
  tenureRemainingMonths: number;
}

export interface Goal {
  id: string;
  title: string;
  category: "Safety" | "Tech & Gadgets" | "Travel" | "Investment" | "Debt Payoff" | "Milestone";
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyContribution: number;
  iconName: string;
}

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense" | "emi" | "payment" | "investment";
  date: string;
  status: "Completed" | "Pending" | "Scheduled";
  paymentMethod: string;
}

export interface FinancialProfile {
  name: string;
  roleTitle: string;
  avatarUrl: string;
  currency: CurrencyType;
  currencySymbol: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  totalDebt: number;
  monthlyEmi: number;
  creditScore: number;
  creditUtilization: number;
  employmentType: "Salaried" | "Self-Employed" | "Freelance" | "Business Owner";
  accounts: BankAccount[];
  creditCards: CreditCard[];
  loans: LoanItem[];
  expenseCategories: ExpenseCategory[];
  goals: Goal[];
  transactions: Transaction[];
  monthlyHistory: {
    month: string;
    income: number;
    expenses: number;
    savings: number;
    emi: number;
  }[];
}

export interface HealthScoreBreakdown {
  savingsRateScore: number; // /20
  debtToIncomeScore: number; // /20
  emergencyFundScore: number; // /20
  creditHealthScore: number; // /20
  spendingDisciplineScore: number; // /20
  overallScore: number; // /100
  rating: "Poor" | "Fair" | "Good" | "Very Good" | "Excellent";
  savingsRatePercentage: number;
  debtToIncomePercentage: number;
  emergencyRunwayMonths: number;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: "positive" | "warning" | "opportunity" | "alert";
  metricImpact?: string;
  suggestedAction?: string;
  actionQuery?: string;
}

export interface DecisionResult {
  affordabilityScore: number; // 0-100
  recommendation: string;
  verdictType: "safe" | "caution" | "risky" | "critical";
  confidenceScore: number;
  positiveFactors: string[];
  riskFactors: string[];
  financialImpact: {
    monthlyDiscretionaryImpact: string;
    emergencyRunwayImpact: string;
    dtiChange: string;
    goalDelayEstimate: string;
  };
  suggestedActions: string[];
  detailedReasoning?: string;
}

export interface BuyAnalysisResult {
  affordabilityScore: number;
  timingRecommendation: string;
  timingStatus: "optimal" | "manageable_with_delay" | "stretch" | "critical";
  whyRecommendation: string;
  financialImpact: {
    runwayBefore: string;
    runwayAfter: string;
    monthlyBufferChange: string;
    impactOnGoals: string;
  };
  saferPurchaseChecklist: string[];
  positiveSignals: string[];
  riskSignals: string[];
}

export interface LoanReadinessInput {
  monthlyIncome: number;
  employmentType: "Salaried" | "Self-Employed" | "Freelance";
  creditScore: number;
  existingLoansTotal: number;
  existingMonthlyEmi: number;
  creditUtilization: number;
  repaymentHistory: "100% On-Time" | "Minor Delay (1-29 days)" | "Major Delinquency";
  existingCreditAccounts: number;
  loanAmountRequested: number;
  loanTenureMonths: number;
  loanType: "Personal Loan" | "Home Loan" | "Car Loan" | "Education Loan";
}

export interface LoanReadinessResult {
  readinessScore: number; // 0-100
  verdict: "High Readiness" | "Moderate Readiness" | "Low Readiness" | "Critical Risk";
  estimatedEmi: number;
  estimatedInterestRate: number;
  currentDtiRatio: number;
  projectedDtiRatio: number;
  positiveFactors: string[];
  areasToImprove: string[];
  improvementSuggestions: string[];
  maxAffordableLoan: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  structuredDecision?: DecisionResult;
  suggestedPrompts?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "alert" | "insight" | "payment" | "goal";
  actionTab?: string;
}
