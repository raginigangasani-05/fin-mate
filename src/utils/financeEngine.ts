import { FinancialProfile, HealthScoreBreakdown, AIInsight, DecisionResult, BuyAnalysisResult, LoanReadinessInput, LoanReadinessResult } from "../types";

export function formatCurrency(amount: number, currencySymbol: string = "₹"): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));

  let formatted = "";
  if (currencySymbol === "₹") {
    // Indian numbering format (lakhs, crores)
    const str = absAmount.toString();
    if (str.length > 3) {
      const lastThree = str.substring(str.length - 3);
      const otherNumbers = str.substring(0, str.length - 3);
      formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    } else {
      formatted = str;
    }
  } else {
    // International standard format (thousands)
    formatted = absAmount.toLocaleString("en-US");
  }

  return `${isNegative ? "-" : ""}${currencySymbol}${formatted}`;
}

export function calculateHealthScore(profile: FinancialProfile): HealthScoreBreakdown {
  const { monthlyIncome, monthlyExpenses, monthlyEmi, savings, creditScore, creditUtilization, expenseCategories } = profile;

  const totalMonthlyCommitments = monthlyExpenses + monthlyEmi;
  const netMonthlySavings = Math.max(0, monthlyIncome - totalMonthlyCommitments);
  const savingsRatePercentage = monthlyIncome > 0 ? (netMonthlySavings / monthlyIncome) * 100 : 0;
  const debtToIncomePercentage = monthlyIncome > 0 ? (monthlyEmi / monthlyIncome) * 100 : 0;
  const emergencyRunwayMonths = totalMonthlyCommitments > 0 ? savings / totalMonthlyCommitments : 0;

  // 1. Savings Rate Score (0 - 20)
  let savingsRateScore = 0;
  if (savingsRatePercentage >= 30) savingsRateScore = 20;
  else if (savingsRatePercentage >= 20) savingsRateScore = 16;
  else if (savingsRatePercentage >= 10) savingsRateScore = 12;
  else if (savingsRatePercentage > 0) savingsRateScore = 7;
  else savingsRateScore = 2;

  // 2. Debt to Income Score (0 - 20)
  let debtToIncomeScore = 0;
  if (debtToIncomePercentage <= 20) debtToIncomeScore = 20;
  else if (debtToIncomePercentage <= 35) debtToIncomeScore = 16;
  else if (debtToIncomePercentage <= 45) debtToIncomeScore = 10;
  else if (debtToIncomePercentage <= 55) debtToIncomeScore = 5;
  else debtToIncomeScore = 2;

  // 3. Emergency Fund Runway Score (0 - 20)
  let emergencyFundScore = 0;
  if (emergencyRunwayMonths >= 6) emergencyFundScore = 20;
  else if (emergencyRunwayMonths >= 4) emergencyFundScore = 16;
  else if (emergencyRunwayMonths >= 2.5) emergencyFundScore = 12;
  else if (emergencyRunwayMonths >= 1) emergencyFundScore = 7;
  else emergencyFundScore = 3;

  // 4. Credit Health Score (0 - 20)
  let creditHealthScore = 0;
  if (creditScore >= 780) creditHealthScore = 20;
  else if (creditScore >= 740) creditHealthScore = 17;
  else if (creditScore >= 700) creditHealthScore = 13;
  else if (creditScore >= 650) creditHealthScore = 8;
  else creditHealthScore = 4;

  if (creditUtilization > 40) {
    creditHealthScore = Math.max(2, creditHealthScore - 4);
  } else if (creditUtilization > 30) {
    creditHealthScore = Math.max(3, creditHealthScore - 2);
  }

  // 5. Spending Discipline (0 - 20)
  let overBudgetCategories = 0;
  expenseCategories.forEach((cat) => {
    if (cat.amount > cat.budget) overBudgetCategories++;
  });
  let spendingDisciplineScore = 20 - overBudgetCategories * 3;
  spendingDisciplineScore = Math.max(4, Math.min(20, spendingDisciplineScore));

  const overallScore = Math.round(
    savingsRateScore + debtToIncomeScore + emergencyFundScore + creditHealthScore + spendingDisciplineScore
  );

  let rating: HealthScoreBreakdown["rating"] = "Good";
  if (overallScore >= 85) rating = "Excellent";
  else if (overallScore >= 75) rating = "Very Good";
  else if (overallScore >= 60) rating = "Good";
  else if (overallScore >= 45) rating = "Fair";
  else rating = "Poor";

  return {
    savingsRateScore,
    debtToIncomeScore,
    emergencyFundScore,
    creditHealthScore,
    spendingDisciplineScore,
    overallScore,
    rating,
    savingsRatePercentage: Math.round(savingsRatePercentage),
    debtToIncomePercentage: Math.round(debtToIncomePercentage),
    emergencyRunwayMonths: Number(emergencyRunwayMonths.toFixed(1)),
  };
}

export function generateDynamicInsights(profile: FinancialProfile): AIInsight[] {
  const insights: AIInsight[] = [];
  const health = calculateHealthScore(profile);
  const sym = profile.currencySymbol;

  // Insight 1: Emergency Runway
  if (health.emergencyRunwayMonths >= 4.5) {
    insights.push({
      id: "ins-1",
      title: "Strong Emergency Safety Cushion",
      description: `You currently maintain ${health.emergencyRunwayMonths} months (${formatCurrency(profile.savings, sym)}) of liquid runway against your monthly outflow of ${formatCurrency(profile.monthlyExpenses + profile.monthlyEmi, sym)}.`,
      type: "positive",
      metricImpact: `${health.emergencyRunwayMonths} mo buffer`,
      suggestedAction: "Consider allocating excess savings above 6 months into high-yield index funds.",
      actionQuery: "How should I optimize my emergency fund vs equity investments?",
    });
  } else if (health.emergencyRunwayMonths < 2) {
    insights.push({
      id: "ins-1",
      title: "Emergency Cushion is Thin",
      description: `Your liquid cash covers only ${health.emergencyRunwayMonths} months of essential expenses. A single unexpected expense could trigger reliance on high-cost revolving debt.`,
      type: "alert",
      metricImpact: `Only ${health.emergencyRunwayMonths} mo runway`,
      suggestedAction: "Pause discretionary gadgets until reaching at least 3 months of expenses.",
      actionQuery: "How do I rapidly build a 3-month emergency buffer?",
    });
  }

  // Insight 2: Credit Card Utilization
  if (profile.creditUtilization > 30) {
    insights.push({
      id: "ins-2",
      title: "Credit Card Utilization Elevated",
      description: `Your revolving credit utilization is at ${profile.creditUtilization}%. Lenders and CIBIL favor utilization under 30% to maximize credit scoring tiers.`,
      type: "warning",
      metricImpact: `${profile.creditUtilization}% (Target < 30%)`,
      suggestedAction: `Pay down ${formatCurrency((profile.creditUtilization - 28) * 1500, sym)} before your statement billing date to boost score.`,
      actionQuery: "How can I lower my credit utilization effectively?",
    });
  } else {
    insights.push({
      id: "ins-2",
      title: "Healthy Credit Utilization",
      description: `Credit utilization is well maintained at ${profile.creditUtilization}%, strengthening your credibility for future premium credit cards or mortgage rates.`,
      type: "positive",
      metricImpact: `${profile.creditUtilization}% optimal`,
      suggestedAction: "Keep automated auto-debit active for full statement balances.",
      actionQuery: "Am I eligible for a tier-1 premium credit card?",
    });
  }

  // Insight 3: Category Trend (e.g. Dining or Shopping)
  const dining = profile.expenseCategories.find(c => c.name.toLowerCase().includes("dining") || c.name.toLowerCase().includes("food"));
  if (dining && dining.amount > dining.budget) {
    const diff = dining.amount - dining.budget;
    insights.push({
      id: "ins-3",
      title: "Dining & Social Outings Exceeded Budget",
      description: `Dining out is up 18% (${formatCurrency(dining.amount, sym)} vs ${formatCurrency(dining.budget, sym)} target), creating an excess spend of ${formatCurrency(diff, sym)}.`,
      type: "warning",
      metricImpact: `+${formatCurrency(diff, sym)} over budget`,
      suggestedAction: "Batch social meals or cap weekend deliveries for the next 2 weeks.",
      actionQuery: "Where can I trim 10% from my monthly lifestyle spending?",
    });
  }

  // Insight 4: EMI / DTI Burden
  if (health.debtToIncomePercentage > 35) {
    insights.push({
      id: "ins-4",
      title: "High Monthly Debt Commitment",
      description: `EMIs consume ${health.debtToIncomePercentage}% of your take-home pay (${formatCurrency(profile.monthlyEmi, sym)}/mo). This restricts monthly capital flexibility.`,
      type: "alert",
      metricImpact: `${health.debtToIncomePercentage}% DTI ratio`,
      suggestedAction: "Prioritize aggressive prepayment of highest interest rate consumer loans first.",
      actionQuery: "Should I prepay high-cost EMIs or invest first?",
    });
  } else {
    insights.push({
      id: "ins-4",
      title: "Low Debt Obligation Burden",
      description: `Your debt-to-income ratio is in the top decile at ${health.debtToIncomePercentage}%, giving you ample surplus each month to hit financial goals ahead of schedule.`,
      type: "opportunity",
      metricImpact: `${health.debtToIncomePercentage}% low DTI`,
      suggestedAction: "Route the extra ₹10,000 monthly surplus directly towards your next milestone goal.",
      actionQuery: "How quickly can I reach my financial goals if I increase monthly contributions?",
    });
  }

  return insights;
}

export function evaluateDecisionLocally(query: string, profile: FinancialProfile): DecisionResult {
  const sym = profile.currencySymbol;
  const q = query.toLowerCase();
  const health = calculateHealthScore(profile);
  const totalCommitments = profile.monthlyExpenses + profile.monthlyEmi;
  const freeMonthlyCash = Math.max(0, profile.monthlyIncome - totalCommitments);

  // Scenario 1: Laptop or High-ticket Gadget purchase (e.g. 1 Lakh laptop)
  if (q.includes("laptop") || q.includes("gadget") || q.includes("macbook") || q.includes("phone") || q.includes("1,00,000") || q.includes("1 lakh")) {
    const cost = 100000;
    const canAffordCash = profile.savings > cost * 2;
    const runwayAfter = totalCommitments > 0 ? (profile.savings - cost) / totalCommitments : 0;
    const score = canAffordCash && runwayAfter >= 3 ? 74 : (profile.savings >= cost ? 58 : 34);

    return {
      affordabilityScore: score,
      recommendation: score >= 70
        ? "Manageable, but waiting 4–6 weeks would be financially healthier."
        : "High risk: Purchase will severely deplete your emergency runway. Postpone or save incrementally.",
      verdictType: score >= 70 ? "caution" : "risky",
      confidenceScore: 92,
      positiveFactors: [
        `Stable monthly income of ${formatCurrency(profile.monthlyIncome, sym)}`,
        `Current savings balance of ${formatCurrency(profile.savings, sym)} covers the cost`,
        "Positive credit history with regular on-time payments",
      ],
      riskFactors: [
        `Existing monthly EMI burden is ${formatCurrency(profile.monthlyEmi, sym)} (${health.debtToIncomePercentage}% of income)`,
        `One-time cash outflow of ${formatCurrency(cost, sym)} lowers emergency runway from ${health.emergencyRunwayMonths} months to ${runwayAfter.toFixed(1)} months`,
        "May delay target progress for other active milestone goals",
      ],
      financialImpact: {
        monthlyDiscretionaryImpact: `Immediate ${formatCurrency(cost, sym)} reduction in liquid reserves`,
        emergencyRunwayImpact: `Decreases from ${health.emergencyRunwayMonths} mo → ${runwayAfter.toFixed(1)} mo`,
        dtiChange: "No change if paid in cash; +7% DTI if taken on 12-mo EMI",
        goalDelayEstimate: "Estimated 28 days delay on emergency fund completion",
      },
      suggestedActions: [
        `Accumulate an extra ${formatCurrency(20000, sym)} over the next 4–6 weeks before completing checkout`,
        "Look for a 0% interest 6-month no-cost EMI option if it doesn't incur processing charges",
        "Sell or exchange existing electronic equipment to offset ₹15,000+ of the cost",
      ],
      detailedReasoning: `While your current liquid savings of ${formatCurrency(profile.savings, sym)} can technically absorb the ${formatCurrency(cost, sym)} cost, your total monthly outflow is ${formatCurrency(totalCommitments, sym)}. Preserving at least 3-4 months of pristine runway is essential before locking capital into depreciating consumer electronics.`,
    };
  }

  // Scenario 2: Credit Card inquiry
  if (q.includes("credit card") || q.includes("card") || q.includes("new card")) {
    const isGoodScore = profile.creditScore >= 750;
    const isLowUtil = profile.creditUtilization < 30;
    const score = isGoodScore && isLowUtil ? 82 : (isGoodScore ? 65 : 40);

    return {
      affordabilityScore: score,
      recommendation: score >= 75
        ? "Recommended: Adding a lifetime-free or reward-matching card will expand your total credit limit and lower utilization."
        : "Caution: Focus on bringing current utilization below 30% first before submitting inquiries.",
      verdictType: score >= 75 ? "safe" : "caution",
      confidenceScore: 89,
      positiveFactors: [
        `Strong credit score of ${profile.creditScore} indicates high lender confidence`,
        "Existing card repayment records show 100% on-time settlement",
        "Higher overall limit will mathematically depress your credit utilization ratio",
      ],
      riskFactors: [
        "A hard credit inquiry will cause a temporary 3–6 point dip in CIBIL score for 90 days",
        "Multiple cards increase administrative complexity and missed due-date risk",
        `Current total card balances stand at ${formatCurrency(profile.creditCards.reduce((s, c) => s + c.currentBalance, 0), sym)}`,
      ],
      financialImpact: {
        monthlyDiscretionaryImpact: "Zero direct cost (if choosing LTF / no-annual-fee card)",
        emergencyRunwayImpact: "No impact on cash reserves",
        dtiChange: "Neutral (until balance carried)",
        goalDelayEstimate: "0 days impact on existing goals",
      },
      suggestedActions: [
        "Select a card that aligns directly with your top spend category (e.g. Cashback on Groceries / Flights)",
        "Set up mandatory auto-debit for 'Total Amount Due' immediately upon activation",
        "Ensure no other loan or card applications are submitted within 60 days",
      ],
      detailedReasoning: "With a healthy credit score, expanding your revolving credit line improves your overall financial credibility, provided you avoid carrying revolving interest-bearing balances.",
    };
  }

  // Scenario 3: Loan Inquiry (5 lakh personal loan, etc.)
  if (q.includes("loan") || q.includes("5 lakh") || q.includes("personal loan") || q.includes("borrow")) {
    const loanAmt = 500000;
    const estNewEmi = 13500;
    const projectedDti = profile.monthlyIncome > 0 ? ((profile.monthlyEmi + estNewEmi) / profile.monthlyIncome) * 100 : 0;
    const score = projectedDti <= 40 ? 68 : (projectedDti <= 50 ? 46 : 28);

    return {
      affordabilityScore: score,
      recommendation: projectedDti <= 35
        ? "Manageable, but review interest rates carefully to minimize compounding cost."
        : `High EMI load: New ${formatCurrency(estNewEmi, sym)}/mo EMI pushes DTI to ${projectedDti.toFixed(0)}%, surpassing safe thresholds.`,
      verdictType: score >= 65 ? "caution" : "risky",
      confidenceScore: 94,
      positiveFactors: [
        `Consistent monthly income of ${formatCurrency(profile.monthlyIncome, sym)}`,
        `Solid CIBIL score of ${profile.creditScore} qualifies you for competitive interest rates (~11.5% - 13%)`,
      ],
      riskFactors: [
        `Combined monthly EMI would rise from ${formatCurrency(profile.monthlyEmi, sym)} to ${formatCurrency(profile.monthlyEmi + estNewEmi, sym)}`,
        `Debt-to-income jumps to ${projectedDti.toFixed(1)}% (Safe recommended ceiling is 35%)`,
        `Total interest paid across 48 months tenure exceeds ${formatCurrency(148000, sym)}`,
      ],
      financialImpact: {
        monthlyDiscretionaryImpact: `Reduces monthly discretionary buffer by ${formatCurrency(estNewEmi, sym)}`,
        emergencyRunwayImpact: "Increases monthly burn rate, effectively reducing runway",
        dtiChange: `Increases from ${health.debtToIncomePercentage}% → ${projectedDti.toFixed(1)}%`,
        goalDelayEstimate: "Delays savings milestone goals by 8-12 months",
      },
      suggestedActions: [
        "Evaluate if part of the requirement can be met through liquid non-emergency funds",
        "Consider a shorter tenure or partial prepayment clause to avoid compounding interest",
        "Do not proceed if the loan is intended for speculative or non-essential lifestyle spending",
      ],
      detailedReasoning: `Adding ${formatCurrency(estNewEmi, sym)} in monthly non-negotiable outflows significantly reduces your monthly agility. At ${projectedDti.toFixed(1)}% DTI, any income perturbation could cause severe cashflow pressure.`,
    };
  }

  // Default dynamic reasoning for any other query
  return {
    affordabilityScore: Math.min(90, Math.max(40, health.overallScore - 5)),
    recommendation: `Based on your ${health.rating.toLowerCase()} financial health (${health.overallScore}/100) and ${formatCurrency(freeMonthlyCash, sym)}/mo surplus, proceed with prudent budgeting.`,
    verdictType: health.overallScore >= 75 ? "safe" : "caution",
    confidenceScore: 88,
    positiveFactors: [
      `Monthly income of ${formatCurrency(profile.monthlyIncome, sym)} provides baseline security`,
      `Liquid reserves cover ${health.emergencyRunwayMonths} months of essential needs`,
      `Credit score of ${profile.creditScore} is in good standing`,
    ],
    riskFactors: [
      `Monthly non-discretionary commitments total ${formatCurrency(totalCommitments, sym)}`,
      `Revolving credit utilization is at ${profile.creditUtilization}%`,
    ],
    financialImpact: {
      monthlyDiscretionaryImpact: `Current monthly net surplus: ${formatCurrency(freeMonthlyCash, sym)}`,
      emergencyRunwayImpact: `Liquid runway stands at ${health.emergencyRunwayMonths} months`,
      dtiChange: `Current DTI is ${health.debtToIncomePercentage}%`,
      goalDelayEstimate: "Minimal variance based on current trajectory",
    },
    suggestedActions: [
      "Review high-spend categories like dining and lifestyle shopping",
      "Automate 20% of monthly income directly into emergency and investment goals",
      "Keep total loan commitments strictly below 35% of monthly income",
    ],
    detailedReasoning: `Your overall financial structure is robust with an overall health score of ${health.overallScore}/100. Maintaining a steady savings discipline of ${health.savingsRatePercentage}% while avoiding impulsive high-interest credit will keep your financial independence timeline on track.`,
  };
}

export function evaluateBeforeYouBuyLocally(
  item: string,
  price: number,
  paymentMode: string,
  profile: FinancialProfile
): BuyAnalysisResult {
  const sym = profile.currencySymbol;
  const health = calculateHealthScore(profile);
  const totalMonthlyCommitments = profile.monthlyExpenses + profile.monthlyEmi;
  const freeMonthlyCash = Math.max(0, profile.monthlyIncome - totalMonthlyCommitments);

  const priceNum = Math.max(100, price);
  const currentRunway = health.emergencyRunwayMonths;
  const runwayAfter = totalMonthlyCommitments > 0 ? Math.max(0, (profile.savings - priceNum) / totalMonthlyCommitments) : 0;

  let affordabilityScore = 75;
  let timingRecommendation = "Optimal time to buy";
  let timingStatus: BuyAnalysisResult["timingStatus"] = "optimal";

  const priceRatioToSavings = (priceNum / Math.max(1, profile.savings)) * 100;
  const priceRatioToMonthlyIncome = (priceNum / Math.max(1, profile.monthlyIncome)) * 100;

  if (priceRatioToSavings > 60 || runwayAfter < 2) {
    affordabilityScore = 32;
    timingRecommendation = "High Risk: Postpone purchase until you rebuild emergency reserves.";
    timingStatus = "critical";
  } else if (priceRatioToSavings > 35 || runwayAfter < 3.5) {
    affordabilityScore = 54;
    timingRecommendation = "Manageable with 6-8 weeks delay to save dedicated cash.";
    timingStatus = "manageable_with_delay";
  } else if (priceRatioToMonthlyIncome > 80 && freeMonthlyCash < priceNum * 0.3) {
    affordabilityScore = 68;
    timingRecommendation = "Feasible, but waiting 3-4 weeks creates a safer buffer.";
    timingStatus = "stretch";
  } else {
    affordabilityScore = 88;
    timingRecommendation = "Safe to purchase: Your liquid reserves and surplus comfortably absorb this.";
    timingStatus = "optimal";
  }

  const whyRecommendation = affordabilityScore >= 75
    ? `Your existing liquid savings of ${formatCurrency(profile.savings, sym)} will retain a healthy ${runwayAfter.toFixed(1)} months of emergency cushion after this ${formatCurrency(priceNum, sym)} purchase.`
    : `Spending ${formatCurrency(priceNum, sym)} immediately would reduce your emergency runway from ${currentRunway} months down to ${runwayAfter.toFixed(1)} months, increasing vulnerability to unexpected shocks.`;

  return {
    affordabilityScore,
    timingRecommendation,
    timingStatus,
    whyRecommendation,
    financialImpact: {
      runwayBefore: `${currentRunway} months`,
      runwayAfter: `${runwayAfter.toFixed(1)} months`,
      monthlyBufferChange: paymentMode.includes("EMI")
        ? `-${formatCurrency(priceNum / 6, sym)}/month for 6 months`
        : `One-time ${formatCurrency(priceNum, sym)} liquid outflow`,
      impactOnGoals: priceNum > 50000
        ? `May extend 'Emergency Fund' completion date by approx ${Math.round(priceNum / Math.max(1, freeMonthlyCash) * 20)} days`
        : "Negligible impact on long-term milestone goals",
    },
    saferPurchaseChecklist: [
      `Ensure you still retain at least ${formatCurrency(totalMonthlyCommitments * 3, sym)} in untouched emergency savings`,
      priceNum > 30000 ? "Apply the 48-Hour Rule before confirming final payment" : "Check for applicable card discounts or cashbacks",
      "Avoid converting this to revolving high-interest credit card debt (>3.5%/month)",
      `Aim to offset at least ${formatCurrency(priceNum * 0.2, sym)} by trimming non-essential dining/shopping this month`,
    ],
    positiveSignals: [
      `Monthly income of ${formatCurrency(profile.monthlyIncome, sym)} provides ongoing cash replenishment`,
      `Current savings balance: ${formatCurrency(profile.savings, sym)}`,
      paymentMode.includes("No-Cost") ? "0% financing avoids compounding interest cost" : "Full cash settlement prevents recurring monthly EMI overhead",
    ],
    riskSignals: [
      `Liquid runway drops by ${(currentRunway - runwayAfter).toFixed(1)} months post-purchase`,
      `Represents ${priceRatioToMonthlyIncome.toFixed(0)}% of your monthly take-home pay`,
    ],
  };
}

export function evaluateLoanReadinessLocally(inputs: LoanReadinessInput, currencySymbol: string = "₹"): LoanReadinessResult {
  const {
    monthlyIncome,
    creditScore,
    existingMonthlyEmi,
    creditUtilization,
    repaymentHistory,
    loanAmountRequested,
    loanTenureMonths,
    loanType,
  } = inputs;

  // Interest rate estimation
  let baseRate = 10.5;
  if (loanType === "Home Loan") baseRate = 8.5;
  else if (loanType === "Car Loan") baseRate = 8.9;
  else if (loanType === "Education Loan") baseRate = 9.5;
  else baseRate = 12.0;

  // Adjust interest rate by credit score
  if (creditScore >= 780) baseRate -= 0.5;
  else if (creditScore < 700) baseRate += 2.0;

  const monthlyRate = baseRate / (12 * 100);
  const tenure = Math.max(6, loanTenureMonths);
  const emiFactor = (Math.pow(1 + monthlyRate, tenure) * monthlyRate) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const estimatedEmi = Math.round(loanAmountRequested * emiFactor);

  const currentDtiRatio = monthlyIncome > 0 ? (existingMonthlyEmi / monthlyIncome) * 100 : 0;
  const projectedDtiRatio = monthlyIncome > 0 ? ((existingMonthlyEmi + estimatedEmi) / monthlyIncome) * 100 : 0;

  // Calculate Readiness Score (0-100)
  let score = 50;

  // 1. Credit Score weight (30 pts)
  if (creditScore >= 780) score += 30;
  else if (creditScore >= 740) score += 24;
  else if (creditScore >= 700) score += 16;
  else if (creditScore >= 650) score += 8;
  else score -= 10;

  // 2. DTI / FOIR weight (30 pts)
  if (projectedDtiRatio <= 35) score += 20;
  else if (projectedDtiRatio <= 45) score += 10;
  else if (projectedDtiRatio <= 55) score += 0;
  else score -= 15;

  // 3. Repayment History weight (20 pts)
  if (repaymentHistory === "100% On-Time") score += 15;
  else if (repaymentHistory === "Minor Delay (1-29 days)") score += 5;
  else score -= 20;

  // 4. Credit Utilization weight (10 pts)
  if (creditUtilization <= 25) score += 10;
  else if (creditUtilization <= 40) score += 5;
  else score -= 8;

  score = Math.max(15, Math.min(98, score));

  let verdict: LoanReadinessResult["verdict"] = "Moderate Readiness";
  if (score >= 80) verdict = "High Readiness";
  else if (score >= 65) verdict = "Moderate Readiness";
  else if (score >= 45) verdict = "Low Readiness";
  else verdict = "Critical Risk";

  const positiveFactors: string[] = [];
  const areasToImprove: string[] = [];
  const improvementSuggestions: string[] = [];

  if (creditScore >= 740) {
    positiveFactors.push(`Strong credit score of ${creditScore} puts you in prime borrower tier`);
  } else {
    areasToImprove.push(`Credit score (${creditScore}) is below prime tier (750+)`);
    improvementSuggestions.push("Maintain 6 months of spotless on-time payments to boost credit rating.");
  }

  if (repaymentHistory === "100% On-Time") {
    positiveFactors.push("Impeccable historical repayment track record across all credit lines");
  } else {
    areasToImprove.push("Recent payment delays noted on past statements");
    improvementSuggestions.push("Set up automated standing instructions with your primary salary account.");
  }

  if (projectedDtiRatio <= 40) {
    positiveFactors.push(`Projected DTI (${projectedDtiRatio.toFixed(1)}%) is well within the lender safety threshold (50% max)`);
  } else {
    areasToImprove.push(`High projected DTI (${projectedDtiRatio.toFixed(1)}%) will restrict lender sanction amounts`);
    improvementSuggestions.push(`Reduce existing revolving debts to bring monthly commitments below ${formatCurrency(monthlyIncome * 0.35, currencySymbol)}.`);
  }

  if (creditUtilization > 35) {
    areasToImprove.push(`Credit utilization (${creditUtilization}%) is higher than optimal benchmark (< 30%)`);
    improvementSuggestions.push("Pay down active credit card statements before closing billing cycles.");
  } else {
    positiveFactors.push(`Disciplined credit card utilization at ${creditUtilization}%`);
  }

  improvementSuggestions.push("Avoid submitting multiple simultaneous loan inquiries on aggregator portals.");

  const maxAffordableEmi = Math.max(0, monthlyIncome * 0.45 - existingMonthlyEmi);
  const maxAffordableLoan = Math.round(maxAffordableEmi / emiFactor);

  return {
    readinessScore: score,
    verdict,
    estimatedEmi,
    estimatedInterestRate: baseRate,
    currentDtiRatio: Math.round(currentDtiRatio),
    projectedDtiRatio: Math.round(projectedDtiRatio),
    positiveFactors,
    areasToImprove,
    improvementSuggestions,
    maxAffordableLoan: Math.max(0, maxAffordableLoan),
  };
}
