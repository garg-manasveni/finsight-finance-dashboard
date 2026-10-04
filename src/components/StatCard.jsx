function StatCard({
    title,
    value,
    description,
    icon,
    type,
}) {
    return (
        <div className={`stat-card ${type || ""}`}>

            <div className="stat-card-top">

                <div>
                    <span className="stat-title">
                        {title}
                    </span>

                    <h3>{value}</h3>
                </div>

                <div className="stat-icon">
                    {icon}
                </div>

            </div>

            <p className="stat-description">
                {description}
            </p>

        </div>
    );
}

export default StatCard;