import { useEffect, useState } from "react";

const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Education",
    "Health",
    "Salary",
    "Freelance",
    "Other",
];

function TransactionForm({
    onSubmit,
    editingTransaction,
    onCancelEdit,
}) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (editingTransaction) {
            setFormData({
                title: editingTransaction.title,
                amount: editingTransaction.amount,
                type: editingTransaction.type,
                category: editingTransaction.category,
                date: editingTransaction.date,
            });
        }
    }, [editingTransaction]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.title.trim()) {
            alert("Please enter a transaction title.");
            return;
        }

        if (!formData.amount || Number(formData.amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        onSubmit({
            ...formData,
            amount: Number(formData.amount),
        });

        if (!editingTransaction) {
            setFormData({
                title: "",
                amount: "",
                type: "expense",
                category: "Food",
                date: new Date().toISOString().split("T")[0],
            });
        }
    }

    return (
        <div className="form-card">

            <div className="form-card-header">
                <div>
                    <p className="eyebrow">
                        {editingTransaction
                            ? "UPDATE TRANSACTION"
                            : "NEW TRANSACTION"}
                    </p>

                    <h2>
                        {editingTransaction
                            ? "Edit transaction"
                            : "Add transaction"}
                    </h2>
                </div>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Grocery shopping"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-row">

                    <div className="form-group">
                        <label>Amount</label>

                        <input
                            type="number"
                            name="amount"
                            placeholder="₹0"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label>Type</label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="expense">
                                Expense
                            </option>

                            <option value="income">
                                Income
                            </option>
                        </select>
                    </div>

                </div>


                <div className="form-row">

                    <div className="form-group">
                        <label>Category</label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Date</label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                </div>


                <div className="form-actions">

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        {editingTransaction
                            ? "Update Transaction"
                            : "Add Transaction"}
                    </button>


                    {editingTransaction && (
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onCancelEdit}
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </form>

        </div>
    );
}

export default TransactionForm;