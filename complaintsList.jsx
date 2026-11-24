import React, { useState, useEffect } from 'react';
import { getComplaints, updateComplaintStatus } from '../services/api';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch complaints", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      loadComplaints(); // Refresh table
    } catch (error) {
      alert("Failed to update status. Ensure backend PATCH route is implemented.");
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '20px', color: '#1e293b' }}>Complaint Management</h1>
      
      {loading ? <p>Loading...</p> : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '12px 16px', color: '#475569' }}>ID</th>
                <th style={{ padding: '12px 16px', color: '#475569' }}>Category</th>
                <th style={{ padding: '12px 16px', color: '#475569' }}>Priority</th>
                <th style={{ padding: '12px 16px', color: '#475569' }}>Status</th>
                <th style={{ padding: '12px 16px', color: '#475569' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px' }}>{c.complaint_number}</td>
                  <td style={{ padding: '12px 16px' }}>{c.category}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 'bold', color: c.priority === 'Critical' ? 'red' : 'inherit' }}>
                    {c.priority}
                  </td>
                  <td style={{ padding: '12px 16px' }}>{c.status}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <select 
                      value={c.status} 
                      onChange={(e) => handleStatusChange(c.id, e.target.value)}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="SUBMITTED">Submitted</option>
                      <option value="UNDER REVIEW">Under Review</option>
                      <option value="VERIFIED">Verified</option>
                      <option value="ASSIGNED">Assigned</option>
                      <option value="IN PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;