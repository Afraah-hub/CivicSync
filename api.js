import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getComplaints = async () => {
  const response = await api.get('/complaints'); // Maps to backend GET /api/complaints
  return response.data;
};

export const updateComplaintStatus = async (id, status) => {
  // Assuming a patch endpoint exists: PATCH /api/admin/complaints/<id>/status
  // For MVP fallback if admin route isn't separated, adjust URL accordingly
  const response = await api.patch(`/admin/complaints/${id}/status`, { status });
  return response.data;
};

export default api;