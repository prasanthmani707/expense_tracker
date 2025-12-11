import { useState } from 'react';
import { CATEGORIES } from '../utils/categories';

const ExpenseForm = ({ onAddExpense }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: '',
        category: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const expense = {
                id: Date.now().toString(),
                title: formData.title.trim(),
                amount: parseFloat(formData.amount),
                date: formData.date,
                category: formData.category
            };

            onAddExpense(expense);

            // Reset form
            setFormData({
                title: '',
                amount: '',
                date: '',
                category: ''
            });
            setErrors({});
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="glass rounded-2xl p-6 md:p-8 mb-8 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-6">Add New Expense</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title Input */}
                    <div className="md:col-span-2">
                        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.title
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-slate-200 bg-white hover:border-purple-300'
                                }`}
                            placeholder="e.g., Grocery shopping"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1 animate-slide-in">{errors.title}</p>
                        )}
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                            Amount ($)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.amount
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-slate-200 bg-white hover:border-purple-300'
                                }`}
                            placeholder="0.00"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1 animate-slide-in">{errors.amount}</p>
                        )}
                    </div>

                    {/* Date Input */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-slate-700 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.date
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-slate-200 bg-white hover:border-purple-300'
                                }`}
                        />
                        {errors.date && (
                            <p className="text-red-500 text-sm mt-1 animate-slide-in">{errors.date}</p>
                        )}
                    </div>

                    {/* Category Select */}
                    <div className="md:col-span-2">
                        <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.category
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-slate-200 bg-white hover:border-purple-300'
                                }`}
                        >
                            <option value="">Select a category</option>
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1 animate-slide-in">{errors.category}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
