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
    Legend,
} from "recharts";

import {
    getCategoryTotals,
    getMonthlyTotals,
    formatCurrency,
} from "../utils/financeUtils";

function Analytics({ transactions }) {
    const categoryData = getCategoryTotals(transactions);
    const monthlyData = getMonthlyTotals(transactions);

    const COLORS = [
        "#8b5cf6",
        "#a78bfa",
        "#c4b5fd",
        "#d8b4fe",
        "#f0abfc",
        "#f9a8d4",
        "#93c5fd",
        "#86efac",
    ];

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
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(value)
                                        }
                                    />

                                    <Legend />

                                </PieChart>
                            </ResponsiveContainer>

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Analytics;