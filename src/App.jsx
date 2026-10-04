import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";

import Sidebar from "./components/Sidebar";

import useLocalStorage from "./hooks/useLocalStorage";

import {
  initialTransactions,
  initialBudgets,
  initialGoals,
} from "./data/initialData";

function App() {
  const [transactions, setTransactions] = useLocalStorage(
        "finsight-transactions",
        initialTransactions
    );

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

  const [budgets, setBudgets] =
    useLocalStorage(
      "finsight-budgets",
      initialBudgets
    );

  const [goals, setGoals] =
    useLocalStorage(
      "finsight-goals",
      initialGoals
    );

  return (
    <BrowserRouter>
      <div className="app-layout">
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
                />
              }
            />

            <Route
              path="/goals"
              element={
                <Goals
                  goals={goals}
                  setGoals={setGoals}
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
    </BrowserRouter>
  );
}

export default App;