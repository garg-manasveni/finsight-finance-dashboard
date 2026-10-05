// =========================================
// FINANCE UTILITY FUNCTIONS
// =========================================

export function calculateTotals(transactions) {
    const income = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount),
            0
        );

    const expenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount),
            0
        );

    return {
        income,
        expenses,
        balance: income - expenses,
    };
}


// =========================================
// FORMAT CURRENCY
// =========================================

export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
}

export const EXPENSE_CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Education",
    "Health",
    "Other",
];

export const INCOME_CATEGORIES = [
    "Salary",
    "Freelance",
];

export const TRANSACTION_CATEGORIES = [
    ...EXPENSE_CATEGORIES,
    ...INCOME_CATEGORIES,
];

export const BUDGET_CATEGORIES = EXPENSE_CATEGORIES;

export const CATEGORY_ALIASES = {
    Travel: "Transport",
};

export function normalizeCategory(category) {
    const safeCategory = String(category ?? "").trim();

    if (!safeCategory) {
        return "Other";
    }

    return CATEGORY_ALIASES[safeCategory] ?? safeCategory;
}


// =========================================
// CATEGORY TOTALS
// =========================================

export function getCategoryTotals(transactions) {
    const categoryTotals = {};

    transactions
        .filter((transaction) => transaction.type === "expense")
        .forEach((transaction) => {
            const category = normalizeCategory(
                transaction.category
            );

            if (!categoryTotals[category]) {
                categoryTotals[category] = 0;
            }

            categoryTotals[category] += Number(
                transaction.amount
            );
        });

    return Object.entries(categoryTotals).map(
        ([name, value]) => ({
            name,
            value,
        })
    );
}


// =========================================
// CATEGORY EXPENSES
// Used by Budgets.jsx
// =========================================

// =========================================
// CATEGORY EXPENSES
// Used by Budgets.jsx
// =========================================

export function calculateCategoryExpenses(transactions, category) {
    const normalizedCategory = normalizeCategory(category);

    return transactions
        .filter(
            (transaction) =>
                transaction.type === "expense" &&
                normalizeCategory(transaction.category) ===
                    normalizedCategory
        )
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount),
            0
        );
}


// =========================================
// MONTHLY TOTALS
// =========================================

export function getMonthlyTotals(transactions) {
    const monthlyData = {};

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date);

        if (Number.isNaN(date.getTime())) {
            return;
        }

        const month = date.toLocaleString("en-IN", {
            month: "short",
        });

        if (!monthlyData[month]) {
            monthlyData[month] = {
                income: 0,
                expenses: 0,
            };
        }

        if (transaction.type === "income") {
            monthlyData[month].income += Number(
                transaction.amount
            );
        } else {
            monthlyData[month].expenses += Number(
                transaction.amount
            );
        }
    });

    return Object.entries(monthlyData).map(
        ([month, values]) => ({
            month,
            income: values.income,
            expenses: values.expenses,
        })
    );
}


// =========================================
// CURRENT MONTH TOTALS
// =========================================

export function getCurrentMonthTotals(transactions) {
    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions.reduce(
        (totals, transaction) => {
            const date = new Date(transaction.date);

            if (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            ) {
                if (transaction.type === "income") {
                    totals.income += Number(
                        transaction.amount
                    );
                } else {
                    totals.expenses += Number(
                        transaction.amount
                    );
                }
            }

            return totals;
        },
        {
            income: 0,
            expenses: 0,
        }
    );
}