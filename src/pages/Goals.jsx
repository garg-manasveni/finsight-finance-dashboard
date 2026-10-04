import { useState } from "react";
import { formatCurrency } from "../utils/financeUtils";

function Goals({
    goals,
    setGoals,
}) {
    const [title, setTitle] =
        useState("");

    const [target, setTarget] =
        useState("");

    const [deadline, setDeadline] =
        useState("");

    function addGoal(event) {
        event.preventDefault();

        if (!title || !target) return;

        setGoals((previous) => [
            ...previous,
            {
                id: Date.now(),
                title,
                target: Number(target),
                saved: 0,
                deadline,
            },
        ]);

        setTitle("");
        setTarget("");
        setDeadline("");
    }

    function deleteGoal(id) {
        setGoals((previous) =>
            previous.filter(
                (goal) => goal.id !== id
            )
        );
    }

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <span className="eyebrow">
                        FUTURE PLANS
                    </span>

                    <h2>Savings Goals</h2>

                    <p>
                        Track the things you're
                        saving toward.
                    </p>
                </div>

            </div>

            <form
                className="goal-form"
                onSubmit={addGoal}
            >

                <input
                    placeholder="Goal name"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Target amount"
                    value={target}
                    onChange={(event) =>
                        setTarget(event.target.value)
                    }
                />

                <input
                    type="date"
                    value={deadline}
                    onChange={(event) =>
                        setDeadline(event.target.value)
                    }
                />

                <button
                    className="primary-button"
                    type="submit"
                >
                    Create Goal
                </button>

            </form>

            <div className="goal-grid">

                {goals.map((goal) => {

                    const percentage =
                        Math.min(
                            (goal.saved /
                                goal.target) *
                            100,
                            100
                        );

                    return (
                        <div
                            className="goal-card"
                            key={goal.id}
                        >

                            <div className="goal-card-top">

                                <div>
                                    <span className="card-label">
                                        SAVINGS GOAL
                                    </span>

                                    <h3>
                                        {goal.title}
                                    </h3>
                                </div>

                                <button
                                    className="text-danger"
                                    onClick={() =>
                                        deleteGoal(
                                            goal.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                            <div className="goal-progress">

                                <div
                                    className="goal-circle"
                                    style={{
                                        "--progress":
                                            `${percentage}%`,
                                    }}
                                >
                                    <strong>
                                        {Math.round(
                                            percentage
                                        )}
                                        %
                                    </strong>
                                </div>

                                <div>

                                    <strong>
                                        {formatCurrency(
                                            goal.saved
                                        )}
                                    </strong>

                                    <span>
                                        of{" "}
                                        {formatCurrency(
                                            goal.target
                                        )}
                                    </span>

                                </div>

                            </div>

                            {goal.deadline && (
                                <p>
                                    Deadline:{" "}
                                    {new Date(
                                        goal.deadline
                                    ).toLocaleDateString(
                                        "en-IN"
                                    )}
                                </p>
                            )}

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default Goals;