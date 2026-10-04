import { useMemo, useState } from "react";

import TransactionForm from "../components/TransactionForm";

import { formatCurrency } from "../utils/financeUtils";

function Transactions({
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
}) {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [editingTransaction, setEditingTransaction] = useState(null);

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const matchesSearch =
                transaction.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                transaction.category
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesType =
                filterType === "all" ||
                transaction.type === filterType;

            return matchesSearch && matchesType;
        });
    }, [transactions, search, filterType]);

    function handleSubmit(transaction) {
        if (editingTransaction) {
            updateTransaction({
                ...transaction,
                id: editingTransaction.id,
            });

            setEditingTransaction(null);
        } else {
            addTransaction({
                ...transaction,
                id: crypto.randomUUID(),
            });
        }
    }

    function exportCSV() {
        if (transactions.length === 0) {
            alert("There are no transactions to export.");
            return;
        }

        const headers = [
            "Title",
            "Amount",
            "Type",
            "Category",
            "Date",
        ];

        const rows = transactions.map((transaction) => [
            transaction.title,
            transaction.amount,
            transaction.type,
            transaction.category,
            transaction.date,
        ]);

        const csvContent = [headers, ...rows]
            .map((row) =>
                row
                    .map(
                        (value) =>
                            `"${String(value).replaceAll('"', '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob(
            [csvContent],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "finsight-transactions.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    return (
        <div className="page">

            {/* PAGE HEADER */}
            <div className="page-header">

                <div>
                    <p className="eyebrow">
                        MONEY MANAGEMENT
                    </p>

                    <h1>
                        Transactions
                    </h1>

                    <p className="page-description">
                        Add, edit and manage your financial activity.
                    </p>
                </div>

            </div>


            {/* TRANSACTIONS AREA */}
            <div className="transactions-layout">

                {/* ADD / EDIT FORM */}
                <TransactionForm
                    onSubmit={handleSubmit}
                    editingTransaction={editingTransaction}
                    onCancelEdit={() =>
                        setEditingTransaction(null)
                    }
                />


                {/* TRANSACTIONS CARD */}
                <div className="transactions-card">

                    {/* TOOLBAR */}
                    <div className="transaction-toolbar">

                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                        <select
                            value={filterType}
                            onChange={(event) =>
                                setFilterType(event.target.value)
                            }
                        >
                            <option value="all">
                                All
                            </option>

                            <option value="income">
                                Income
                            </option>

                            <option value="expense">
                                Expenses
                            </option>
                        </select>

                        <button
                            className="secondary-button"
                            onClick={exportCSV}
                        >
                            Export CSV
                        </button>

                    </div>


                    {/* TRANSACTION LIST */}
                    <div className="transaction-list">

                        {filteredTransactions.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    ₿
                                </div>

                                <h3>
                                    No transactions found
                                </h3>

                                <p>
                                    Try changing your search or add a
                                    new transaction.
                                </p>

                            </div>

                        ) : (

                            filteredTransactions.map(
                                (transaction) => (

                                    <div
                                        className="transaction-row"
                                        key={transaction.id}
                                    >

                                        {/* LEFT */}
                                        <div className="transaction-info">

                                            <div className="transaction-icon">
                                                {transaction.type === "income"
                                                    ? "↗"
                                                    : "↘"}
                                            </div>

                                            <div>

                                                <h3>
                                                    {transaction.title}
                                                </h3>

                                                <p>
                                                    {transaction.category}
                                                    {" • "}
                                                    {transaction.date}
                                                </p>

                                            </div>

                                        </div>


                                        {/* RIGHT */}
                                        <div className="transaction-right">

                                            <strong
                                                className={
                                                    transaction.type === "income"
                                                        ? "income-text"
                                                        : "expense-text"
                                                }
                                            >
                                                {transaction.type === "income"
                                                    ? "+"
                                                    : "-"}{" "}
                                                {formatCurrency(
                                                    transaction.amount
                                                )}
                                            </strong>


                                            <div className="transaction-actions">

                                                <button
                                                    className="icon-button"
                                                    onClick={() =>
                                                        setEditingTransaction(
                                                            transaction
                                                        )
                                                    }
                                                    title="Edit transaction"
                                                >
                                                    ✎
                                                </button>


                                                <button
                                                    className="icon-button delete-button"
                                                    onClick={() => {

                                                        const confirmed =
                                                            window.confirm(
                                                                "Are you sure you want to delete this transaction?"
                                                            );

                                                        if (confirmed) {
                                                            deleteTransaction(
                                                                transaction.id
                                                            );
                                                        }

                                                    }}
                                                    title="Delete transaction"
                                                >
                                                    ×
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Transactions;