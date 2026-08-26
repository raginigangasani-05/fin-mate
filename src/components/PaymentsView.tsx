import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  History,
  Building,
} from "lucide-react";
import { formatCurrency } from "../utils/financeEngine";

export const PaymentsView: React.FC = () => {
  const { profile, currencySymbol, makePayment } = useFinance();
  const [activeSubTab, setActiveSubTab] = useState<"cards" | "emis" | "utilities" | "upi">("cards");

  // Payment State
  const [upiId, setUpiId] = useState("merchant.store@oksbi");
  const [upiAmount, setUpiAmount] = useState(1500);
  const [upiNote, setUpiNote] = useState("Team Lunch Re-imbursement");

  const [utilityType, setUtilityType] = useState("Electricity - Tata Power");
  const [utilityAmount, setUtilityAmount] = useState(2450);

  const [lastReceipt, setLastReceipt] = useState<{
    title: string;
    amount: number;
    category: string;
    method: string;
    date: string;
    refId: string;
  } | null>(null);

  const handlePay = (title: string, amount: number, category: string, method: string) => {
    const success = makePayment(title, amount, category, method);
    if (success) {
      setLastReceipt({
        title,
        amount,
        category,
        method,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        refId: `FINMATE-TX-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
          <CreditCard className="w-4 h-4 text-orange-400" />
          <span>Simulated Payments Center</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Payments Ecosystem</h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Simulate credit card settlements, EMI debits, utility bills, and instant UPI payments. All transactions update your live balances and emergency runway dynamically.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto">
        <button
          id="pay-tab-cards"
          onClick={() => setActiveSubTab("cards")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
            activeSubTab === "cards"
              ? "bg-orange-500 text-black font-bold"
              : "bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800"
          }`}
        >
          Credit Card Bills ({profile.creditCards.length})
        </button>
        <button
          id="pay-tab-emis"
          onClick={() => setActiveSubTab("emis")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
            activeSubTab === "emis"
              ? "bg-orange-500 text-black font-bold"
              : "bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800"
          }`}
        >
          Active Loans & EMIs ({profile.loans.length})
        </button>
        <button
          id="pay-tab-utilities"
          onClick={() => setActiveSubTab("utilities")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
            activeSubTab === "utilities"
              ? "bg-orange-500 text-black font-bold"
              : "bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800"
          }`}
        >
          Utility Bills
        </button>
        <button
          id="pay-tab-upi"
          onClick={() => setActiveSubTab("upi")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
            activeSubTab === "upi"
              ? "bg-orange-500 text-black font-bold"
              : "bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800"
          }`}
        >
          UPI Instant Transfer
        </button>
      </div>

      {/* Tab 1: Credit Cards */}
      {activeSubTab === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.creditCards.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">
                    {card.bankName}
                  </span>
                  <h3 className="text-sm font-bold text-white">{card.cardName}</h3>
                </div>
                <CreditCard className="w-6 h-6 text-orange-400" />
              </div>

              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-mono">Total Due Balance</span>
                  <span className="text-sm font-bold text-white font-mono">
                    {formatCurrency(card.currentBalance, currencySymbol)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block font-mono">Min Due (Due {card.dueDate})</span>
                  <span className="text-sm font-bold text-orange-400 font-mono">
                    {formatCurrency(card.minDue, currencySymbol)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  id={`pay-card-min-${card.id}`}
                  onClick={() =>
                    handlePay(
                      `${card.cardName} Minimum Due`,
                      card.minDue,
                      "Credit Card Bill",
                      "Savings Account Transfer"
                    )
                  }
                  className="flex-1 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 rounded-lg transition-colors font-mono"
                >
                  Pay Min Due ({formatCurrency(card.minDue, currencySymbol)})
                </button>
                <button
                  id={`pay-card-full-${card.id}`}
                  onClick={() =>
                    handlePay(
                      `${card.cardName} Full Balance`,
                      card.currentBalance,
                      "Credit Card Bill",
                      "Primary Salary Account"
                    )
                  }
                  className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs rounded-lg transition-colors"
                >
                  Pay Total Balance
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: EMIs */}
      {activeSubTab === "emis" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.loans.map((loan) => (
            <div
              key={loan.id}
              className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">
                    {loan.lender}
                  </span>
                  <h3 className="text-sm font-bold text-white">{loan.loanType}</h3>
                </div>
                <Building className="w-5 h-5 text-zinc-400" />
              </div>

              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-mono">Monthly EMI</span>
                  <span className="text-sm font-bold text-orange-400 font-mono">
                    {formatCurrency(loan.monthlyEmi, currencySymbol)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block font-mono">Outstanding</span>
                  <span className="text-sm font-bold text-white font-mono">
                    {formatCurrency(loan.outstandingBalance, currencySymbol)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block font-mono">Tenure Left</span>
                  <span className="text-sm font-bold text-zinc-300 font-mono">{loan.tenureRemainingMonths} mo</span>
                </div>
              </div>

              <button
                id={`pay-loan-emi-${loan.id}`}
                onClick={() =>
                  handlePay(
                    `${loan.lender} ${loan.loanType} Monthly EMI`,
                    loan.monthlyEmi,
                    "Loan EMI Payment",
                    "Auto-Debit Simulation"
                  )
                }
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs rounded-lg transition-colors font-mono"
              >
                Pay Current Month EMI ({formatCurrency(loan.monthlyEmi, currencySymbol)})
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Utilities */}
      {activeSubTab === "utilities" && (
        <div className="max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Pay Household & Digital Utilities</h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1">Biller / Service Provider</label>
              <select
                value={utilityType}
                onChange={(e) => setUtilityType(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
              >
                <option value="Electricity - Tata Power">Electricity - Tata Power / BESCOM</option>
                <option value="Airtel Xstream Fiber Broadband">Airtel Xstream Fiber (₹1,899)</option>
                <option value="Municipal Water & Sewerage Board">Municipal Water Board (₹650)</option>
                <option value="Piped Natural Gas (Adani Gas)">Piped Natural Gas (₹980)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1">Bill Amount ({currencySymbol})</label>
              <input
                type="number"
                value={utilityAmount}
                onChange={(e) => setUtilityAmount(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <button
              id="pay-utility-submit-btn"
              onClick={() => handlePay(utilityType, utilityAmount, "Utilities & Bills", "UPI Mandate")}
              className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs rounded-lg transition-colors font-mono"
            >
              Pay Utility Bill ({formatCurrency(utilityAmount, currencySymbol)})
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: UPI Transfer */}
      {activeSubTab === "upi" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Instant UPI Virtual Payment</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">Receiver UPI ID / Phone</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. friend@okhdfcbank"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">Transfer Amount ({currencySymbol})</label>
                <input
                  type="number"
                  value={upiAmount}
                  onChange={(e) => setUpiAmount(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">Note (Optional)</label>
                <input
                  type="text"
                  value={upiNote}
                  onChange={(e) => setUpiNote(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                id="pay-upi-submit-btn"
                onClick={() => handlePay(`UPI Transfer: ${upiId}`, upiAmount, "UPI Payment", "HDFC Primary UPI")}
                className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs rounded-lg transition-colors font-mono"
              >
                Send {formatCurrency(upiAmount, currencySymbol)} via UPI
              </button>
            </div>
          </div>

          <div className="md:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <QrCode className="w-28 h-28 text-black" />
            </div>
            <p className="text-xs font-semibold text-white">Simulated Merchant QR</p>
            <p className="text-[11px] text-zinc-400 max-w-xs leading-relaxed">
              Scan-to-pay simulator. In live integration, connects with payment gateways and bank account aggregators.
            </p>
          </div>
        </div>
      )}

      {/* Transaction History Log */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">Simulated Transaction Log</h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">{profile.transactions.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-[10px] uppercase font-semibold">
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {profile.transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-850 transition-colors">
                  <td className="py-3 px-3 font-medium text-white">{tx.title}</td>
                  <td className="py-3 px-3 text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px]">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-400 text-[11px] font-mono">{tx.date}</td>
                  <td className="py-3 px-3 text-zinc-400 text-[11px]">{tx.paymentMethod}</td>
                  <td
                    className={`py-3 px-3 text-right font-bold font-mono ${
                      tx.type === "income" ? "text-orange-400" : "text-zinc-200"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {formatCurrency(tx.amount, currencySymbol)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {lastReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-zinc-950 border border-orange-500 text-orange-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-orange-400" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">Payment Confirmed</h3>
              <p className="text-xs text-zinc-400">Simulated transaction successful</p>
            </div>

            <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Item:</span>
                <span className="font-semibold text-white truncate max-w-[180px]">{lastReceipt.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Amount Paid:</span>
                <span className="font-bold text-orange-400 font-mono">{formatCurrency(lastReceipt.amount, currencySymbol)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Payment Mode:</span>
                <span className="text-zinc-200">{lastReceipt.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Transaction ID:</span>
                <span className="font-mono text-zinc-400">{lastReceipt.refId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Date:</span>
                <span className="text-zinc-300 font-mono">{lastReceipt.date}</span>
              </div>
            </div>

            <button
              onClick={() => setLastReceipt(null)}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs rounded-lg transition-colors"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
