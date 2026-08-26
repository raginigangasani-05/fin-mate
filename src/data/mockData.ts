import { FinancialProfile, Goal, ExpenseCategory, Transaction, BankAccount, CreditCard, LoanItem } from "../types";

export const defaultExpenseCategories: ExpenseCategory[] = [
  { id: "cat-1", name: "Housing & Rent", amount: 22000, budget: 25000, color: "#3B82F6", iconName: "Home" },
  { id: "cat-2", name: "Food & Groceries", amount: 9500, budget: 11000, color: "#10B981", iconName: "Utensils" },
  { id: "cat-3", name: "Dining & Social", amount: 5800, budget: 5000, color: "#F59E0B", iconName: "Coffee" },
  { id: "cat-4", name: "Transport & Fuel", amount: 4200, budget: 5500, color: "#8B5CF6", iconName: "Car" },
  { id: "cat-5", name: "Utilities & Subscriptions", amount: 3500, budget: 4000, color: "#06B6D4", iconName: "Zap" },
  { id: "cat-6", name: "Shopping & Lifestyle", amount: 4800, budget: 4000, color: "#EC4899", iconName: "ShoppingBag" },
  { id: "cat-7", name: "Health & Wellness", amount: 2200, budget: 3000, color: "#14B8A6", iconName: "HeartPulse" },
];

export const defaultAccounts: BankAccount[] = [
  { id: "acc-1", bankName: "HDFC Bank", accountType: "Salary", accountNumber: "•••• 4821", balance: 142500 },
  { id: "acc-2", bankName: "ICICI Bank", accountType: "Savings", accountNumber: "•••• 9104", balance: 77500 },
  { id: "acc-3", bankName: "SBI Mutual Fund / FD", accountType: "Fixed Deposit", accountNumber: "•••• 3319", balance: 100000 },
];

export const defaultCreditCards: CreditCard[] = [
  { id: "card-1", bankName: "HDFC Regalia Gold", cardName: "Regalia Visa Signature", cardNumber: "•••• 8829", limit: 250000, currentBalance: 68000, dueDate: "2026-09-04", minDue: 3400 },
  { id: "card-2", bankName: "ICICI Amazon Pay", cardName: "Amazon Pay ICICI", cardNumber: "•••• 1942", limit: 150000, currentBalance: 24000, dueDate: "2026-09-12", minDue: 1200 },
];

export const defaultLoans: LoanItem[] = [
  { id: "loan-1", loanType: "Auto Loan", lender: "Kotak Mahindra Prime", principalAmount: 600000, outstandingBalance: 320000, monthlyEmi: 14500, interestRate: 8.75, tenureRemainingMonths: 24 },
  { id: "loan-2", loanType: "Consumer Durable", lender: "Bajaj Finserv", principalAmount: 85000, outstandingBalance: 28000, monthlyEmi: 7000, interestRate: 0, tenureRemainingMonths: 4 },
];

export const defaultGoals: Goal[] = [
  { id: "goal-1", title: "Emergency Fund (6 Months)", category: "Safety", targetAmount: 300000, currentAmount: 220000, targetDate: "2026-12-31", monthlyContribution: 15000, iconName: "ShieldCheck" },
  { id: "goal-2", title: "Apple MacBook Pro M3", category: "Tech & Gadgets", targetAmount: 140000, currentAmount: 65000, targetDate: "2026-11-15", monthlyContribution: 10000, iconName: "Laptop" },
  { id: "goal-3", title: "Vacation in Tokyo", category: "Travel", targetAmount: 220000, currentAmount: 85000, targetDate: "2027-04-10", monthlyContribution: 8000, iconName: "Plane" },
  { id: "goal-4", title: "Prepay Car Loan Balance", category: "Debt Payoff", targetAmount: 320000, currentAmount: 90000, targetDate: "2027-02-28", monthlyContribution: 12000, iconName: "Award" },
];

export const defaultTransactions: Transaction[] = [
  { id: "tx-1", title: "TechCorp Monthly Salary", category: "Income", amount: 95000, type: "income", date: "2026-08-01", status: "Completed", paymentMethod: "Direct Bank Transfer" },
  { id: "tx-2", title: "Kotak Auto Loan EMI", category: "Loan EMI", amount: 14500, type: "emi", date: "2026-08-05", status: "Completed", paymentMethod: "Auto Debit (HDFC)" },
  { id: "tx-3", title: "Bajaj Finserv Appliance EMI", category: "Loan EMI", amount: 7000, type: "emi", date: "2026-08-07", status: "Completed", paymentMethod: "Auto Debit (ICICI)" },
  { id: "tx-4", title: "Apartment Rent Payment", category: "Housing & Rent", amount: 22000, type: "expense", date: "2026-08-03", status: "Completed", paymentMethod: "UPI Transfer" },
  { id: "tx-5", title: "Nature's Basket Organic Groceries", category: "Food & Groceries", amount: 4320, type: "expense", date: "2026-08-12", status: "Completed", paymentMethod: "ICICI Amazon Pay" },
  { id: "tx-6", title: "Smoke House Deli Dinner", category: "Dining & Social", amount: 2850, type: "expense", date: "2026-08-15", status: "Completed", paymentMethod: "HDFC Regalia" },
  { id: "tx-7", title: "Shell Petrol Station", category: "Transport & Fuel", amount: 2100, type: "expense", date: "2026-08-14", status: "Completed", paymentMethod: "UPI Transfer" },
  { id: "tx-8", title: "Airtel Fiber & Mobile Postpaid", category: "Utilities & Subscriptions", amount: 1899, type: "expense", date: "2026-08-10", status: "Completed", paymentMethod: "UPI (Google Pay)" },
  { id: "tx-9", title: "SIP Investment - Nifty 50 Index", category: "Investment", amount: 10000, type: "investment", date: "2026-08-10", status: "Completed", paymentMethod: "HDFC Mandate" },
];

export const defaultMonthlyHistory = [
  { month: "Mar '26", income: 90000, expenses: 48000, savings: 20500, emi: 21500 },
  { month: "Apr '26", income: 90000, expenses: 46500, savings: 22000, emi: 21500 },
  { month: "May '26", income: 95000, expenses: 51200, savings: 22300, emi: 21500 },
  { month: "Jun '26", income: 95000, expenses: 49000, savings: 24500, emi: 21500 },
  { month: "Jul '26", income: 95000, expenses: 47800, savings: 25700, emi: 21500 },
  { month: "Aug '26", income: 95000, expenses: 45000, savings: 28500, emi: 21500 },
];

export const defaultProfile: FinancialProfile = {
  name: "Arjun Verma",
  roleTitle: "Product Designer & Tech Consultant",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  currency: "INR",
  currencySymbol: "₹",
  monthlyIncome: 95000,
  monthlyExpenses: 45000,
  savings: 320000,
  totalDebt: 348000,
  monthlyEmi: 21500,
  creditScore: 768,
  creditUtilization: 23, // 92k of 400k
  employmentType: "Salaried",
  accounts: defaultAccounts,
  creditCards: defaultCreditCards,
  loans: defaultLoans,
  expenseCategories: defaultExpenseCategories,
  goals: defaultGoals,
  transactions: defaultTransactions,
  monthlyHistory: defaultMonthlyHistory,
};

export const presetProfiles: Record<string, FinancialProfile> = {
  balanced: defaultProfile,
  starter: {
    name: "Sarah Chen",
    roleTitle: "Junior Software Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    currency: "INR",
    currencySymbol: "₹",
    monthlyIncome: 55000,
    monthlyExpenses: 32000,
    savings: 110000,
    totalDebt: 45000,
    monthlyEmi: 4500,
    creditScore: 720,
    creditUtilization: 35,
    employmentType: "Salaried",
    accounts: [
      { id: "acc-s1", bankName: "Axis Bank", accountType: "Salary", accountNumber: "•••• 3012", balance: 65000 },
      { id: "acc-s2", bankName: "Kotak 811", accountType: "Savings", accountNumber: "•••• 8820", balance: 45000 },
    ],
    creditCards: [
      { id: "card-s1", bankName: "Axis Neo", cardName: "Neo Credit Card", cardNumber: "•••• 4410", limit: 80000, currentBalance: 28000, dueDate: "2026-09-08", minDue: 1500 },
    ],
    loans: [
      { id: "loan-s1", loanType: "Consumer Durable", lender: "ZestMoney", principalAmount: 45000, outstandingBalance: 18000, monthlyEmi: 4500, interestRate: 0, tenureRemainingMonths: 4 },
    ],
    expenseCategories: [
      { id: "cat-1", name: "Housing / PG", amount: 16000, budget: 18000, color: "#3B82F6", iconName: "Home" },
      { id: "cat-2", name: "Food & Meals", amount: 7500, budget: 8000, color: "#10B981", iconName: "Utensils" },
      { id: "cat-3", name: "Social & Outings", amount: 4200, budget: 3500, color: "#F59E0B", iconName: "Coffee" },
      { id: "cat-4", name: "Commute / Metro", amount: 2300, budget: 3000, color: "#8B5CF6", iconName: "Car" },
      { id: "cat-5", name: "Subscriptions", amount: 2000, budget: 2000, color: "#06B6D4", iconName: "Zap" },
    ],
    goals: [
      { id: "g-s1", title: "3-Month Emergency Shield", category: "Safety", targetAmount: 100000, currentAmount: 55000, targetDate: "2026-11-30", monthlyContribution: 10000, iconName: "ShieldCheck" },
      { id: "g-s2", title: "Upgrade Workstation Laptop", category: "Tech & Gadgets", targetAmount: 90000, currentAmount: 30000, targetDate: "2027-01-15", monthlyContribution: 6000, iconName: "Laptop" },
    ],
    transactions: defaultTransactions.slice(0, 5),
    monthlyHistory: defaultMonthlyHistory.map(h => ({
      month: h.month,
      income: 55000,
      expenses: 32000,
      savings: 18500,
      emi: 4500,
    })),
  },
  highEarner: {
    name: "Rohan Kapoor",
    roleTitle: "Engineering Director & Angel Investor",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    currency: "INR",
    currencySymbol: "₹",
    monthlyIncome: 240000,
    monthlyExpenses: 82000,
    savings: 1450000,
    totalDebt: 1850000,
    monthlyEmi: 42000,
    creditScore: 812,
    creditUtilization: 14,
    employmentType: "Salaried",
    accounts: [
      { id: "acc-h1", bankName: "Citibank / Axis Wealth", accountType: "Salary", accountNumber: "•••• 7701", balance: 620000 },
      { id: "acc-h2", bankName: "HDFC Private Banking", accountType: "Savings", accountNumber: "•••• 5590", balance: 430000 },
      { id: "acc-h3", bankName: "Zerodha Liquid Funds", accountType: "Fixed Deposit", accountNumber: "•••• 1120", balance: 400000 },
    ],
    creditCards: [
      { id: "card-h1", bankName: "HDFC Infinia Metal", cardName: "Infinia Visa Infinite", cardNumber: "•••• 9901", limit: 800000, currentBalance: 95000, dueDate: "2026-09-18", minDue: 4750 },
      { id: "card-h2", bankName: "American Express Platinum", cardName: "Platinum Charge Card", cardNumber: "•••• 3004", limit: 500000, currentBalance: 42000, dueDate: "2026-09-22", minDue: 2100 },
    ],
    loans: [
      { id: "loan-h1", loanType: "Home Loan", lender: "SBI Home Finance", principalAmount: 2500000, outstandingBalance: 1850000, monthlyEmi: 42000, interestRate: 8.4, tenureRemainingMonths: 60 },
    ],
    expenseCategories: [
      { id: "cat-1", name: "Luxury Apartment Maintenance & Rent", amount: 40000, budget: 45000, color: "#3B82F6", iconName: "Home" },
      { id: "cat-2", name: "Premium Dining & Entertaining", amount: 18000, budget: 20000, color: "#F59E0B", iconName: "Coffee" },
      { id: "cat-3", name: "Gourmet Groceries", amount: 12000, budget: 15000, color: "#10B981", iconName: "Utensils" },
      { id: "cat-4", name: "Travel & Lifestyle", amount: 8000, budget: 12000, color: "#EC4899", iconName: "ShoppingBag" },
      { id: "cat-5", name: "Wellness & Golf Club", amount: 4000, budget: 6000, color: "#14B8A6", iconName: "HeartPulse" },
    ],
    goals: [
      { id: "g-h1", title: "Commercial Real Estate Downpayment", category: "Investment", targetAmount: 2500000, currentAmount: 1200000, targetDate: "2027-08-30", monthlyContribution: 75000, iconName: "Building" },
      { id: "g-h2", title: "Family Vacation to Swiss Alps", category: "Travel", targetAmount: 500000, currentAmount: 380000, targetDate: "2026-12-20", monthlyContribution: 30000, iconName: "Plane" },
    ],
    transactions: defaultTransactions,
    monthlyHistory: defaultMonthlyHistory.map(h => ({
      month: h.month,
      income: 240000,
      expenses: 82000,
      savings: 116000,
      emi: 42000,
    })),
  },
  stressed: {
    name: "Ananya Sharma",
    roleTitle: "Independent Brand Consultant",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    currency: "INR",
    currencySymbol: "₹",
    monthlyIncome: 65000,
    monthlyExpenses: 44000,
    savings: 42000,
    totalDebt: 580000,
    monthlyEmi: 28500,
    creditScore: 642,
    creditUtilization: 72,
    employmentType: "Freelance",
    accounts: [
      { id: "acc-st1", bankName: "SBI Savings", accountType: "Savings", accountNumber: "•••• 2291", balance: 42000 },
    ],
    creditCards: [
      { id: "card-st1", bankName: "RBL Bank Platinum", cardName: "Iconic Credit Card", cardNumber: "•••• 6672", limit: 120000, currentBalance: 88000, dueDate: "2026-09-02", minDue: 5500 },
      { id: "card-st2", bankName: "HDFC MoneyBack", cardName: "MoneyBack Plus", cardNumber: "•••• 3381", limit: 80000, currentBalance: 56000, dueDate: "2026-09-05", minDue: 3500 },
    ],
    loans: [
      { id: "loan-st1", loanType: "Personal Loan", lender: "Tata Capital", principalAmount: 400000, outstandingBalance: 320000, monthlyEmi: 18500, interestRate: 14.5, tenureRemainingMonths: 22 },
      { id: "loan-st2", loanType: "Consumer Durable", lender: "Bajaj Finserv", principalAmount: 120000, outstandingBalance: 76000, monthlyEmi: 10000, interestRate: 16.0, tenureRemainingMonths: 8 },
    ],
    expenseCategories: [
      { id: "cat-1", name: "Rent & Utilities", amount: 24000, budget: 20000, color: "#3B82F6", iconName: "Home" },
      { id: "cat-2", name: "Groceries & Food", amount: 12000, budget: 10000, color: "#10B981", iconName: "Utensils" },
      { id: "cat-3", name: "Credit Card Minimum Fees & Interest", amount: 5000, budget: 2000, color: "#EF4444", iconName: "AlertTriangle" },
      { id: "cat-4", name: "Transport & Phone", amount: 3000, budget: 3000, color: "#8B5CF6", iconName: "Car" },
    ],
    goals: [
      { id: "g-st1", title: "Aggressive Credit Card Debt Clearance", category: "Debt Payoff", targetAmount: 144000, currentAmount: 15000, targetDate: "2027-03-31", monthlyContribution: 10000, iconName: "TrendingDown" },
      { id: "g-st2", title: "Minimal 1-Month Emergency Stash", category: "Safety", targetAmount: 65000, currentAmount: 20000, targetDate: "2026-11-30", monthlyContribution: 5000, iconName: "ShieldCheck" },
    ],
    transactions: defaultTransactions.slice(0, 6),
    monthlyHistory: defaultMonthlyHistory.map(h => ({
      month: h.month,
      income: 65000,
      expenses: 44000,
      savings: -7500,
      emi: 28500,
    })),
  },
};

export const sampleDecisionQueries = [
  {
    query: "Can I afford a ₹1,00,000 laptop?",
    category: "Gadget Purchase",
    tag: "High Value Asset",
  },
  {
    query: "Should I get another credit card?",
    category: "Credit Strategy",
    tag: "Credit Health",
  },
  {
    query: "Can I take a ₹5 lakh personal loan?",
    category: "Borrowing Decision",
    tag: "Debt Capacity",
  },
  {
    query: "Why is my financial health score at 78?",
    category: "Diagnostics",
    tag: "Score Audit",
  },
  {
    query: "Where am I spending too much this month?",
    category: "Spending Analysis",
    tag: "Expense Optimization",
  },
  {
    query: "Should I prepay ₹1,00,000 of my car loan or invest in SIPs?",
    category: "Opportunity Cost",
    tag: "Wealth Growth",
  },
];
