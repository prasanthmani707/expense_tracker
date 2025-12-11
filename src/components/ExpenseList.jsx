import { CATEGORY_BADGE_COLORS } from '../utils/categories';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
    if (expenses.length === 0) {
        return (
            <div className="glass rounded-2xl p-12 text-center animate-fade-in">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No expenses yet</h3>
                <p className="text-slate-500">Start tracking your expenses by adding one above!</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-6 animate-fade-in">Your Expenses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {expenses.map((expense, index) => (
                    <div
                        key={expense.id}
                        className="glass rounded-xl p-5 hover-lift animate-scale-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        {/* Category Badge */}
                        <div className="flex items-start justify-between mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_BADGE_COLORS[expense.category]}`}>
                                {expense.category}
                            </span>
                            <button
                                onClick={() => onDeleteExpense(expense.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
                                aria-label="Delete expense"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-800 mb-2 truncate" title={expense.title}>
                            {expense.title}
                        </h3>

                        {/* Amount */}
                        <div className="text-2xl font-extrabold gradient-text mb-3">
                            {formatAmount(expense.amount)}
                        </div>

                        {/* Date */}
                        <div className="flex items-center text-sm text-slate-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {formatDate(expense.date)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
