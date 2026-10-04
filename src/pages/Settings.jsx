import { useEffect, useState } from "react";

function Settings({
    setTransactions,
    setBudgets,
    setGoals,
}) {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("finsight-dark-mode") === "true"
    );

    useEffect(() => {
        document.body.classList.toggle(
            "dark-mode",
            darkMode
        );

        localStorage.setItem(
            "finsight-dark-mode",
            darkMode
        );
    }, [darkMode]);


    function resetEverything() {
        const confirmed =
            window.confirm(
                "This will delete all your saved finance data. Continue?"
            );

        if (!confirmed) return;

        setTransactions([]);
        setBudgets([]);
        setGoals([]);

        localStorage.removeItem(
            "finsight-transactions"
        );

        localStorage.removeItem(
            "finsight-budgets"
        );

        localStorage.removeItem(
            "finsight-goals"
        );

        alert("All data has been reset.");
    }


    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <span className="eyebrow">
                        PREFERENCES
                    </span>

                    <h2>
                        Settings
                    </h2>

                    <p>
                        Manage your application
                        preferences.
                    </p>
                </div>

            </div>


            {/* DARK MODE */}

            <div className="settings-card">

                <div>
                    <span className="card-label">
                        APPEARANCE
                    </span>

                    <h3>
                        Dark Mode
                    </h3>

                    <p>
                        Switch between light and dark
                        appearance.
                    </p>
                </div>


                <button
                    className={`toggle ${
                        darkMode ? "active" : ""
                    }`}
                    onClick={() =>
                        setDarkMode(!darkMode)
                    }
                    aria-label="Toggle dark mode"
                >
                    <span></span>
                </button>

            </div>


            {/* DATA MANAGEMENT */}

            <div className="settings-card">

                <div>
                    <span className="card-label">
                        DATA MANAGEMENT
                    </span>

                    <h3>
                        Reset financial data
                    </h3>

                    <p>
                        Permanently remove all
                        transactions, budgets and
                        savings goals stored in this
                        browser.
                    </p>
                </div>

                <button
                    className="danger-button"
                    onClick={resetEverything}
                >
                    Reset Everything
                </button>

            </div>

        </div>
    );
}

export default Settings;