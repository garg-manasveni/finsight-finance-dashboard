import {
    Wallet,
    TrendingUp,
    TrendingDown,
    PiggyBank,
} from "lucide-react";

import StatCard from "../components/StatCard";

import {
    calculateTotals,
    getCurrentMonthTotals,
    formatCurrency,
} from "../utils/financeUtils";

function Dashboard({
    transactions,
    budgets,
    goals,
}) {
    const totals = calculateTotals(transactions);

    const currentMonth = getCurrentMonthTotals(transactions);
    const income = totals.income;
    const expenses = totals.expenses;
    const balance = totals.balance;

    const recentTransactions =
        [...transactions]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )
            .slice(0, 5);

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <span className="eyebrow">
                        FINANCIAL OVERVIEW
                    </span>

                    <h2>
                        Welcome back, Manasveni.
                    </h2>

                    <p>
                        Here's a clear look at your
                        financial activity.
                    </p>
                </div>

                <div className="date-badge">
                    {new Date().toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }
                    )}
                </div>

            </div>

            <section className="stats-grid">

                <StatCard
                    title="Total Balance"
                    value={formatCurrency(balance)}
                    description="Current available balance"
                    icon={<Wallet />}
                    type="balance"
                />

                <StatCard
                    title="Total Income"
                    value={formatCurrency(income)}
                    description="Money received"
                    icon={<TrendingUp />}
                    type="income"
                />

                <StatCard
                    title="Total Expenses"
                    value={formatCurrency(expenses)}
                    description="Money spent"
                    icon={<TrendingDown />}
                    type="expense"
                />

                <StatCard
                    title="This Month"
                    value={formatCurrency(
                        currentMonth.income - currentMonth.expenses
                    )}
                    description="This month's net savings"
                    icon={<PiggyBank />}
                    type="savings"
                />

            </section>

            <section className="dashboard-grid">

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>
                            <span className="card-label">
                                ACTIVITY
                            </span>

                            <h3>
                                Recent transactions
                            </h3>
                        </div>

                    </div>

                    <div className="transaction-list">

                        {recentTransactions.length === 0 ? (
                            <div className="empty-state">
                                <p>No transactions yet.</p>
                            </div>
                        ) : (
                            recentTransactions.map(
                                (transaction) => (
                                    <div
                                        className="transaction-row"
                                        key={transaction.id}
                                    >

                                        <div className="transaction-info">

                                            <div className="transaction-icon">
                                                {transaction.type ===
                                                    "income"
                                                    ? "+"
                                                    : "−"}
                                            </div>

                                            <div>
                                                <strong>
                                                    {transaction.title}
                                                </strong>

                                                <span>
                                                    {transaction.category}
                                                </span>
                                            </div>

                                        </div>

                                        <strong
                                            className={
                                                transaction.type ===
                                                    "income"
                                                    ? "amount income-text"
                                                    : "amount expense-text"
                                            }
                                        >
                                            {transaction.type ===
                                                "income"
                                                ? "+"
                                                : "-"}
                                            {formatCurrency(
                                                transaction.amount
                                            )}
                                        </strong>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </div>

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>
                            <span className="card-label">
                                SAVINGS
                            </span>

                            <h3>
                                Your goals
                            </h3>
                        </div>

                    </div>

                    <div className="goal-mini-list">

                        {goals.slice(0, 3).map((goal) => {

                            const percentage = Math.min(
                                (goal.saved / goal.target) *
                                100,
                                100
                            );

                            return (
                                <div
                                    className="goal-mini"
                                    key={goal.id}
                                >

                                    <div className="goal-mini-header">
                                        <strong>
                                            {goal.title}
                                        </strong>

                                        <span>
                                            {Math.round(
                                                percentage
                                            )}
                                            %
                                        </span>
                                    </div>

                                    <div className="progress-track">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <p>
                                        {formatCurrency(
                                            goal.saved
                                        )}{" "}
                                        of{" "}
                                        {formatCurrency(
                                            goal.target
                                        )}
                                    </p>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;