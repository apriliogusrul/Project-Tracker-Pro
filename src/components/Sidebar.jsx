import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Mic, Home as HomeIcon, Calendar, CheckSquare, LayoutDashboard, MessageCircle, Bell, Settings } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`app-sidebar ${isOpen ? 'open' : ''}`} style={{ 
      padding: '1.5rem 1.25rem', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      backgroundColor: 'var(--bg-color)',
      borderRight: 'none',
      gap: '1.5rem'
    }}>
      
      {/* App Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem' }}>
        <img 
          src="/logo.png" 
          alt="Lionardo Logo" 
          style={{ width: '28px', height: '28px', filter: 'invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.5))', mixBlendMode: 'screen' }} 
        />
        <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>Lionardo</span>
      </div>

      {/* Top Search Bar & Mic */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div style={{ 
          flex: 1,
          display: 'flex', alignItems: 'center', gap: '0.75rem', 
          background: 'var(--bg-elevated)', padding: '0.6rem 1rem', 
          borderRadius: '9999px', color: 'var(--text-muted)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="search" 
            style={{ 
              background: 'transparent', border: 'none', outline: 'none', 
              color: 'var(--text-main)', fontSize: '14px', width: '100%',
              fontWeight: 500
            }} 
          />
        </div>
        <button style={{
          width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
          background: 'var(--bg-elevated)', color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)', cursor: 'pointer', border: 'none'
        }}>
          <Mic size={18} />
        </button>
      </div>

      {/* Main Navigation Bubble */}
      <div style={{ 
        background: 'var(--bg-elevated)', 
        borderRadius: '24px', 
        padding: '1rem 0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {[
          { to: '/', icon: HomeIcon, label: 'Home', end: true },
          { to: '/scheduled', icon: Calendar, label: 'Schedule' },
          { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
          { to: '/projects', icon: LayoutDashboard, label: 'Projects' }
        ].map((item) => (
          <NavLink 
            key={item.label}
            to={item.to} 
            end={item.end}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: isActive ? '0.5rem 1rem' : '0.75rem 1rem',
              borderRadius: '9999px',
              color: isActive ? '#fff' : 'var(--text-muted)',
              background: isActive ? 'var(--primary)' : 'transparent',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s ease'
            })}
          >
            {({ isActive }) => (
              <>
                <div style={{
                  background: isActive ? 'var(--bg-color)' : 'transparent',
                  borderRadius: '50%',
                  padding: isActive ? '0.35rem' : '0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}>
                  <item.icon size={18} color={isActive ? '#fff' : 'currentColor'} />
                </div>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Copyright Bubble */}
      <div style={{ 
        background: 'var(--bg-elevated)', 
        borderRadius: '24px', 
        padding: '1.25rem 1rem',
        marginTop: 'auto',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'monospace',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <span style={{ color: '#10b981' }}>user@app</span>
        <span style={{ color: 'var(--text-main)' }}>:~$ </span>
        created_by_Lionardo
      </div>

    </div>
  );
};

export default Sidebar;
