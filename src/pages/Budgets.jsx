import { useState } from "react";
import {
    BUDGET_CATEGORIES,
    calculateCategoryExpenses,
    formatCurrency,
    normalizeCategory,
} from "../utils/financeUtils";

function Budgets({
    transactions,
    budgets,
    setBudgets,
}) {
    const [category, setCategory] =
        useState("Food");

    const [limit, setLimit] =
        useState("");

    const categories = BUDGET_CATEGORIES;

    function addBudget(event) {
        event.preventDefault();

        if (!limit) return;

        setBudgets((previous) => [
            ...previous,
            {
                id: Date.now(),
                category: normalizeCategory(category),
                limit: Number(limit),
            },
        ]);

        setLimit("");
    }

    function deleteBudget(id) {
        setBudgets((previous) =>
            previous.filter(
                (budget) => budget.id !== id
            )
        );
    }

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <span className="eyebrow">
                        SPENDING CONTROL
                    </span>

                    <h2>Budgets</h2>

                    <p>
                        Set limits and stay on track.
                    </p>
                </div>

            </div>

            <form
                className="inline-form"
                onSubmit={addBudget}
            >

                <select
                    value={category}
                    onChange={(event) =>
                        setCategory(event.target.value)
                    }
                >
                    {categories.map(
                        (item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        )
                    )}
                </select>

                <input
                    type="number"
                    value={limit}
                    onChange={(event) =>
                        setLimit(event.target.value)
                    }
                    placeholder="Budget amount"
                />

                <button
                    className="primary-button"
                    type="submit"
                >
                    Add Budget
                </button>

            </form>

            <div className="budget-grid">

                {budgets.map((budget) => {

                    const spent =
                        calculateCategoryExpenses(
                            transactions,
                            budget.category
                        );

                    const percentage =
                        Math.min(
                            (spent / budget.limit) *
                            100,
                            100
                        );

                    return (
                        <div
                            className="budget-card"
                            key={budget.id}
                        >

                            <div className="budget-card-header">

                                <div>
                                    <span className="card-label">
                                        CATEGORY
                                    </span>

                                    <h3>
                                        {budget.category}
                                    </h3>
                                </div>

                                <button
                                    className="text-danger"
                                    onClick={() =>
                                        deleteBudget(
                                            budget.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                            <div className="budget-numbers">

                                <strong>
                                    {formatCurrency(spent)}
                                </strong>

                                <span>
                                    of{" "}
                                    {formatCurrency(
                                        budget.limit
                                    )}
                                </span>

                            </div>

                            <div className="progress-track">
                                <div
                                    className={`progress-fill ${percentage >= 90
                                            ? "danger-progress"
                                            : ""
                                        }`}
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />
                            </div>

                            <p className="budget-status">
                                {percentage >= 100
                                    ? "Budget exceeded"
                                    : `${Math.round(
                                        percentage
                                    )}% used`}
                            </p>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default Budgets;