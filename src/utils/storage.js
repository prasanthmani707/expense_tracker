const STORAGE_KEY = 'expense_tracker_expenses';
const BUDGET_KEY = 'expense_tracker_budget';

/**
 * Load expenses from localStorage
 * @returns {Array} Array of expense objects
 */
export const loadExpenses = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    } catch (error) {
        console.error('Error loading expenses from localStorage:', error);
        return [];
    }
};

/**
 * Save expenses to localStorage
 * @param {Array} expenses - Array of expense objects to save
 */
export const saveExpenses = (expenses) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded. Unable to save expenses.');
            alert('Storage limit reached. Please delete some expenses.');
        } else {
            console.error('Error saving expenses to localStorage:', error);
        }
    }
};

/**
 * Load budget from localStorage
 * @returns {number} Budget amount or 0 if not set
 */
export const loadBudget = () => {
    try {
        const stored = localStorage.getItem(BUDGET_KEY);
        if (stored) {
            return parseFloat(stored);
        }
        return 0;
    } catch (error) {
        console.error('Error loading budget from localStorage:', error);
        return 0;
    }
};

/**
 * Save budget to localStorage
 * @param {number} budget - Budget amount to save
 */
export const saveBudget = (budget) => {
    try {
        localStorage.setItem(BUDGET_KEY, budget.toString());
    } catch (error) {
        console.error('Error saving budget to localStorage:', error);
    }
};
