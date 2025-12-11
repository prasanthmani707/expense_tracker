import { CATEGORIES } from '../utils/categories';

const ExpenseFilter = ({ filters, onFilterChange, onClearFilters }) => {
    const months = [
        { value: '', label: 'All Months' },
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    const hasActiveFilters = filters.month || filters.category;

    return (
        <div className="glass rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl font-bold gradient-text">Filter Expenses</h2>

                <div className="flex flex-col sm:flex-row gap-3 flex-1 md:max-w-2xl">
                    {/* Month Filter */}
                    <div className="flex-1">
                        <select
                            value={filters.month}
                            onChange={(e) => onFilterChange('month', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        >
                            {months.map(month => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div className="flex-1">
                        <select
                            value={filters.category}
                            onChange={(e) => onFilterChange('category', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        >
                            <option value="">All Categories</option>
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 animate-scale-in"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpenseFilter;
