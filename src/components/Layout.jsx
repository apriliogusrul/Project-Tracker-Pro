import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-layout">
      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={closeSidebar}
      />
      
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <main className="app-main">
        {/* Mobile Header */}
        <div className="mobile-header">
          <button onClick={toggleSidebar} className="btn-icon" style={{ padding: '0.25rem', color: 'var(--text-main)' }}>
            <Menu size={24} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '20px', height: '20px', filter: 'invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.5))', mixBlendMode: 'screen' }} />
            <span style={{ fontWeight: 600, fontSize: '15px' }}>Tracker</span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
