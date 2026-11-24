import React, { useState, useEffect } from 'react';
import { getComplaints } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, critical: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getComplaints();
      setStats({
        total: data.length,
        pending: data.filter(c => c.status === 'SUBMITTED' || c.status === 'UNDER REVIEW').length,
        resolved: data.filter(c => c.status === 'RESOLVED' || c.status === 'CLOSED').length,
        critical: data.filter(c => c.priority === 'Critical').length
      });
    } catch (error) {
      console.error("Error fetching dashboard stats", error);
    }
  };

  const Card = ({ title, value, color }) => (
    <div style={{ padding: '20px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1, margin: '10px', borderLeft: `4px solid ${color}` }}>
      <h3 style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{title}</h3>
      <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>{value}</p>
    </div>
  );

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '20px', color: '#1e293b' }}>Dashboard Overview</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card title="Total Complaints" value={stats.total} color="#3b82f6" />
        <Card title="Awaiting Verification" value={stats.pending} color="#f59e0b" />
        <Card title="Resolved Issues" value={stats.resolved} color="#10b981" />
        <Card title="Critical Priority" value={stats.critical} color="#ef4444" />
      </div>
    </div>
  );
};

export default Dashboard;