import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, Map, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Complaints', path: '/complaints', icon: AlertTriangle },
    { name: 'Map View', path: '/map', icon: Map },
    { name: 'Teams', path: '/teams', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div style={{ width: '250px', backgroundColor: '#1e293b', color: 'white', height: '100vh', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#38bdf8' }}>CivicSync AI</h2>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              style={{
                display: 'flex', alignItems: 'center', padding: '12px', marginBottom: '10px',
                borderRadius: '8px', textDecoration: 'none',
                backgroundColor: isActive ? '#0ea5e9' : 'transparent',
                color: isActive ? 'white' : '#94a3b8'
              }}
            >
              <Icon size={20} style={{ marginRight: '10px' }} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
export default Sidebar;