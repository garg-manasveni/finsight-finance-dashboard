import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import {
    getCategoryTotals,
    getMonthlyTotals,
    formatCurrency,
} from "../utils/financeUtils";

const CATEGORY_COLORS = [
    "#8b5cf6",
    "#22c55e",
    "#f97316",
    "#06b6d4",
    "#ef476f",
    "#eab308",
    "#3b82f6",
    "#d946ef",
    "#14b8a6",
    "#f472b6",
];

function Analytics({ transactions }) {
    const categoryData = getCategoryTotals(transactions);
    const monthlyData = getMonthlyTotals(transactions);
    const totalCategoryExpenses = categoryData.reduce(
        (total, category) => total + category.value,
        0
    );

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <p className="eyebrow">FINANCIAL INSIGHTS</p>

                    <h1>Analytics</h1>

                    <p className="page-description">
                        Understand your spending patterns and financial trends.
                    </p>
                </div>
            </div>

            <div className="analytics-grid">

                {/* Monthly Trend */}

                <div className="chart-card chart-card-large">

                    <div className="chart-card-header">
                        <div>
                            <h2>Income vs Expenses</h2>

                            <p>
                                Monthly financial performance
                            </p>
                        </div>
                    </div>

                    {monthlyData.length === 0 ? (
                        <div className="empty-chart">
                            <span>📊</span>

                            <h3>No financial data yet</h3>

                            <p>
                                Add some transactions to see your financial
                                trends.
                            </p>
                        </div>
                    ) : (
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyData}>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis dataKey="month" />

                                    <YAxis />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(value)
                                        }
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#6b8f71"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        name="Income"
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="expenses"
                                        stroke="#c47c8a"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        name="Expenses"
                                    />

                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>


                {/* Category Breakdown */}

                <div className="chart-card">

                    <div className="chart-card-header">
                        <div>
                            <h2>Spending by Category</h2>

                            <p>
                                Where your money goes
                            </p>
                        </div>
                    </div>

                    {categoryData.length === 0 ? (
                        <div className="empty-chart">
                            <span>🥧</span>

                            <h3>No expenses yet</h3>

                            <p>
                                Add an expense to see category distribution.
                            </p>
                        </div>
                    ) : (
                        <div className="category-chart-content">
                            <div className="pie-container">

                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>

                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={55}
                                        paddingAngle={3}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    CATEGORY_COLORS[
                                                        index % CATEGORY_COLORS.length
                                                    ]
                                                }
                                                stroke="var(--surface)"
                                                strokeWidth={2}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(value)
                                        }
                                    />

                                </PieChart>
                            </ResponsiveContainer>

                            <div className="pie-center-label">
                                <span>Total expenses</span>
                                <strong>
                                    {formatCurrency(totalCategoryExpenses)}
                                </strong>
                            </div>
                            </div>
                            <div className="category-legend">
                                {categoryData.map((category, index) => {
                                    const percentage =
                                        totalCategoryExpenses > 0
                                            ? Math.round(
                                                (category.value /
                                                    totalCategoryExpenses) *
                                                    100
                                            )
                                            : 0;

                                    return (
                                        <div
                                            className="category-legend-item"
                                            key={category.name}
                                        >
                                            <span
                                                className="category-legend-swatch"
                                                style={{
                                                    backgroundColor:
                                                        CATEGORY_COLORS[
                                                            index %
                                                                CATEGORY_COLORS.length
                                                        ],
                                                }}
                                                aria-hidden="true"
                                            />
                                            <span className="category-legend-name">
                                                {category.name}
                                            </span>
                                            <span className="category-legend-percent">
                                                {percentage}%
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Analytics;