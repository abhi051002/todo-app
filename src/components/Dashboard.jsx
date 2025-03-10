import React from "react";

const Dashboard = ({ stats }) => {
  return (
    <div className="dashboard">
      <div className="stats-panel">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card completed">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
