import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Receipt,
    BarChart3,
    WalletCards,
    Target,
    Settings,
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Transactions",
        path: "/transactions",
        icon: Receipt,
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: BarChart3,
    },
    {
        name: "Budgets",
        path: "/budgets",
        icon: WalletCards,
    },
    {
        name: "Goals",
        path: "/goals",
        icon: Target,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="brand">
                <div className="brand-mark">
                    F
                </div>

                <div>
                    <h1>FinSight</h1>
                    <span>Personal Finance</span>
                </div>
            </div>

            <nav className="sidebar-nav">

                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            <Icon size={19} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}

            </nav>

            <div className="sidebar-footer">
                <p>Your money, clearly organized.</p>
            </div>

        </aside>
    );
}

export default Sidebar;