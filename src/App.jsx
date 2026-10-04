import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";

import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
    const [transactions, setTransactions] = useLocalStorage(
        "finsight-transactions",
        []
    );

    const [budgets, setBudgets] = useLocalStorage(
        "finsight-budgets",
        []
    );

    const [goals, setGoals] = useLocalStorage(
        "finsight-goals",
        []
    );

    // -----------------------------
    // TRANSACTIONS
    // -----------------------------

    function addTransaction(transaction) {
        setTransactions((previous) => [
            transaction,
            ...previous,
        ]);
    }

    function updateTransaction(updatedTransaction) {
        setTransactions((previous) =>
            previous.map((transaction) =>
                transaction.id === updatedTransaction.id
                    ? updatedTransaction
                    : transaction
            )
        );
    }

    function deleteTransaction(id) {
        setTransactions((previous) =>
            previous.filter(
                (transaction) => transaction.id !== id
            )
        );
    }

    // -----------------------------
    // BUDGETS
    // -----------------------------

    function addBudget(budget) {
        setBudgets((previous) => [
            ...previous,
            budget,
        ]);
    }

    function updateBudget(updatedBudget) {
        setBudgets((previous) =>
            previous.map((budget) =>
                budget.id === updatedBudget.id
                    ? updatedBudget
                    : budget
            )
        );
    }

    function deleteBudget(id) {
        setBudgets((previous) =>
            previous.filter(
                (budget) => budget.id !== id
            )
        );
    }

    // -----------------------------
    // GOALS
    // -----------------------------

    function addGoal(goal) {
        setGoals((previous) => [
            ...previous,
            goal,
        ]);
    }

    function updateGoal(updatedGoal) {
        setGoals((previous) =>
            previous.map((goal) =>
                goal.id === updatedGoal.id
                    ? updatedGoal
                    : goal
            )
        );
    }

    function deleteGoal(id) {
        setGoals((previous) =>
            previous.filter(
                (goal) => goal.id !== id
            )
        );
    }

    // -----------------------------
    // APP LAYOUT
    // -----------------------------

    return (
        <div className="app-shell">
            <Sidebar />

            <main className="main-content">
                <Routes>

                    <Route
                        path="/"
                        element={
                            <Dashboard
                                transactions={transactions}
                                budgets={budgets}
                                goals={goals}
                            />
                        }
                    />

                    <Route
                        path="/transactions"
                        element={
                            <Transactions
                                transactions={transactions}
                                addTransaction={addTransaction}
                                updateTransaction={updateTransaction}
                                deleteTransaction={deleteTransaction}
                            />
                        }
                    />

                    <Route
                        path="/analytics"
                        element={
                            <Analytics
                                transactions={transactions}
                            />
                        }
                    />

                    <Route
                        path="/budgets"
                        element={
                            <Budgets
                                transactions={transactions}
                                budgets={budgets}
                                setBudgets={setBudgets}
                                addBudget={addBudget}
                                updateBudget={updateBudget}
                                deleteBudget={deleteBudget}
                            />
                        }
                    />

                    <Route
                        path="/goals"
                        element={
                            <Goals
                                goals={goals}
                                setGoals={setGoals}
                                addGoal={addGoal}
                                updateGoal={updateGoal}
                                deleteGoal={deleteGoal}
                            />
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <Settings
                                setTransactions={setTransactions}
                                setBudgets={setBudgets}
                                setGoals={setGoals}
                            />
                        }
                    />

                </Routes>
            </main>
        </div>
    );
}

export default App;