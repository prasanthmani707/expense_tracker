const ExpenseSummary = ({ expenses, budget, onSetBudget }) => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remaining = budget - total;
    const count = expenses.length;
    const percentageUsed = budget > 0 ? (total / budget) * 100 : 0;

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const handleBudgetSubmit = (e) => {
        e.preventDefault();
        const budgetInput = e.target.budget.value;
        if (budgetInput && parseFloat(budgetInput) > 0) {
            onSetBudget(parseFloat(budgetInput));
            e.target.reset();
        }
    };

    return (
        <div className="space-y-6 mb-8">
            {/* Budget Input Section */}
            {budget === 0 && (
                <div className="glass rounded-2xl p-6 md:p-8 animate-fade-in">
                    <h2 className="text-2xl font-bold gradient-text mb-4">Set Your Budget</h2>
                    <form onSubmit={handleBudgetSubmit} className="flex gap-3">
                        <input
                            type="number"
                            name="budget"
                            step="0.01"
                            min="0"
                            placeholder="Enter your budget amount"
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 bg-white hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Set Budget
                        </button>
                    </form>
                </div>
            )}

            {/* Budget Overview */}
            {budget > 0 && (
                <div className="glass-dark rounded-2xl p-6 md:p-8 animate-fade-in overflow-hidden relative">
                    {/* Background gradient based on budget status */}
                    <div
                        className={`absolute inset-0 opacity-10 {remaining < 0
                                ? 'bg-gradient-to-br from-red-500 to-pink-500'
                                : remaining < budget * 0.2
                                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                                    : 'bg-gradient-to-br from-green-500 to-emerald-500'
                            }`}
                    ></div>

                    <div className="relative z-10">
                        {/* Header with Reset Budget */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-black">Budget Overview</h2>
                            <button
                                onClick={() => onSetBudget(0)}
                                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-black text-sm font-medium rounded-lg transition-all duration-300"
                            >
                                Reset Budget
                            </button>
                        </div>

                        {/* Budget Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {/* Initial Budget */}
                            <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                                <p className="text-black text-sm font-medium mb-1">Initial Budget</p>
                                <div className="text-3xl font-bold text-black">{formatAmount(budget)}</div>
                            </div>

                            {/* Total Spent */}
                            <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                                <p className="text-black text-sm font-medium mb-1">Total Spent</p>
                                <div className="text-3xl font-bold text-black">{formatAmount(total)}</div>
                            </div>

                            {/* Remaining */}
                            <div className={`bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm {remaining < 0 ? 'ring-2 ring-red-400' : ''
                                }`}>
                                <p className="text-black text-sm font-medium mb-1">
                                    {remaining < 0 ? 'Over Budget' : 'Remaining'}
                                </p>
                                <div className={`text-3xl font-bold {remaining < 0 ? 'text-red-300' : 'text-black'
                                    }`}>
                                    {formatAmount(Math.abs(remaining))}
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-black text-sm font-medium">Budget Usage</span>
                                <span className="text-black text-sm font-bold">
                                    {percentageUsed.toFixed(1)}%
                                </span>
                            </div>
                            <div className="h-4 bg-white bg-opacity-20 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ease-out {percentageUsed > 100
                                            ? 'bg-gradient-to-r from-red-500 to-pink-500'
                                            : percentageUsed > 80
                                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                                : 'bg-gradient-to-r from-green-400 to-emerald-500'
                                        }`}
                                    style={{ width: `{Math.min(percentageUsed, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Additional Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-20">
                            <div className="text-center">
                                <p className="text-black text-xs font-medium mb-1">Transactions</p>
                                <div className="text-2xl font-bold text-black">{count}</div>
                            </div>
                            {count > 0 && (
                                <div className="text-center">
                                    <p className="text-black text-xs font-medium mb-1">Average</p>
                                    <div className="text-2xl font-bold text-black">
                                        {formatAmount(total / count)}
                                    </div>
                                </div>
                            )}
                            {remaining < 0 && (
                                <div className="text-center">
                                    <p className="text-red-300 text-xs font-medium mb-1">⚠️ Alert</p>
                                    <div className="text-sm font-semibold text-red-300">
                                        Budget Exceeded
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseSummary;
