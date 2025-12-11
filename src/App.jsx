import { useState, useEffect, useMemo } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSummary from './components/ExpenseSummary';
import { loadExpenses, saveExpenses, loadBudget, saveBudget } from './utils/storage';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    month: '',
    category: ''
  });
  const [budget, setBudget] = useState(0);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = loadExpenses();
    setExpenses(savedExpenses);
    const savedBudget = loadBudget();
    setBudget(savedBudget);
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (expenses.length > 0 || expenses.length === 0) {
      saveExpenses(expenses);
    }
  }, [expenses]);

  // Save budget to localStorage whenever it changes
  useEffect(() => {
    saveBudget(budget);
  }, [budget]);

  // Add new expense
  const handleAddExpense = (expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  // Delete expense
  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Update filters
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      month: '',
      category: ''
    });
  };

  // Set budget
  const handleSetBudget = (newBudget) => {
    setBudget(newBudget);
  };

  // Filter expenses based on current filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      // Filter by month
      if (filters.month) {
        const expenseMonth = expense.date.split('-')[1];
        if (expenseMonth !== filters.month) {
          return false;
        }
      }

      // Filter by category
      if (filters.category && expense.category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [expenses, filters]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-3 drop-shadow-lg">
            💰 Expense Tracker
          </h1>
          <p className="text-black text-lg md:text-xl font-medium opacity-90">
            Track your spending, manage your budget
          </p>
        </header>

        {/* Summary */}
        <ExpenseSummary
          expenses={filteredExpenses}
          budget={budget}
          onSetBudget={handleSetBudget}
        />

        {/* Add Expense Form */}
        <ExpenseForm onAddExpense={handleAddExpense} />

        {/* Filters */}
        {expenses.length > 0 && (
          <ExpenseFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Expense List */}
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />

        {/* Footer */}
        <footer className="text-center mt-12 text-white opacity-75 text-sm animate-fade-in">
          <p>Built with React + Vite + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

