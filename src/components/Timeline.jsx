import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Helpers ---
export const generateDateWindow = (days = 14) => {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
};

export const formatDateHeader = (date) => {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateString);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

export const isSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
};

export const getStatusIcon = (status) => {
  if (status === 'Finished') return <CheckCircle2 size={14} color="#10b981" />;
  if (status === 'Running') return <Clock size={14} color="#3b82f6" />;
  return <AlertCircle size={14} color="#6b7280" />;
};

// --- Components ---

export const TimelineTaskCard = ({ task }) => {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-sm)',
      padding: '0.75rem',
      marginBottom: '0.75rem',
      boxShadow: 'var(--shadow-sm)',
      cursor: 'pointer',
      transition: 'all 0.15s ease'
    }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-focus)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}>
      <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
        <h5 style={{ margin: 0, fontSize: '13px', fontWeight: 500, lineHeight: 1.3 }}>
          {task.title}
        </h5>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        Stage: {task.stage}
      </div>
      <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '11px', color: 'var(--text-dark)' }}>
          <User size={12} /> Unassigned
        </div>
        {getStatusIcon(task.status)}
      </div>
    </div>
  );
};

export const TimelineColumn = ({ title, tasks, isOverdueCol }) => {
  return (
    <div style={{
      minWidth: '260px',
      maxWidth: '260px',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--border-color)',
      background: isOverdueCol ? 'rgba(239, 68, 68, 0.05)' : 'transparent'
    }}>
      <div style={{
        padding: '0.75rem 1rem',
        borderBottom: '1px solid var(--border-color)',
        fontSize: '12px',
        fontWeight: 600,
        color: isOverdueCol ? '#ef4444' : 'var(--text-muted)',
        textAlign: 'center',
        background: isOverdueCol ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-elevated)',
        letterSpacing: '0.05em'
      }}>
        {title}
      </div>
      <div style={{ padding: '1rem', flex: 1, minHeight: '150px' }}>
        {tasks.map(task => (
          <TimelineTaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && !isOverdueCol && (
          <div style={{ textAlign: 'center', color: 'var(--text-dark)', fontSize: '12px', marginTop: '1rem' }}>
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};

export const TimelineProjectRow = ({ project, tasks, dateWindow, index }) => {
  // Dark Sea theme colors for the left panel based on index
  const colors = [
    { bg: 'rgba(13, 148, 136, 0.15)', border: '#0d9488', badge: '#0f766e' }, // Teal
    { bg: 'rgba(6, 182, 212, 0.15)', border: '#06b6d4', badge: '#0891b2' },  // Cyan
    { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', badge: '#059669' }, // Sea Green
    { bg: 'rgba(14, 165, 233, 0.15)', border: '#0ea5e9', badge: '#0284c7' }, // Sky Blue
    { bg: 'rgba(45, 212, 191, 0.15)', border: '#2dd4bf', badge: '#14b8a6' }  // Aqua
  ];
  const colorTheme = colors[index % colors.length];

  // Group tasks
  const overdueTasks = tasks.filter(t => t.deadline && isOverdue(t.deadline) && t.status !== 'Finished');

  const getTasksForDate = (date) => {
    return tasks.filter(t => t.deadline && isSameDay(new Date(t.deadline), date));
  };

  const projectDeadlineStr = project.deadline ? new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No deadline';

  return (
    <div className="flex-responsive" style={{
      display: 'flex',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: '1.5rem',
      boxShadow: 'var(--shadow-sm)'
    }}>

      {/* Left Panel */}
      <div className="w-full-responsive" style={{
        width: '240px',
        flexShrink: 0,
        background: colorTheme.bg,
        borderRight: `2px solid ${colorTheme.border}`,
        padding: '1.5rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
        {overdueTasks.length > 0 && (
          <div style={{
            background: 'white', color: '#ef4444',
            border: '1px solid #ef4444', padding: '0.25rem 0.5rem',
            borderRadius: '4px', fontSize: '11px', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
            marginBottom: '1rem', width: 'fit-content'
          }}>
            <AlertCircle size={12} /> {overdueTasks.length} Overdue
          </div>
        )}
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          {project.type}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-main)', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px' }}>
          Complete by<br />
          <span style={{ fontSize: '14px', display: 'block', marginTop: '0.25rem' }}>{projectDeadlineStr}</span>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
          <Link to={`/project/${project.id}`} className="btn btn-outline" style={{ width: '100%', fontSize: '12px', padding: '0.4rem', background: 'var(--bg-elevated)', border: 'none', color: 'var(--text-main)' }}>
            Open Project <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Right Panel (Timeline) */}
      <div style={{
        flex: 1,
        overflowX: 'auto',
        display: 'flex',
        background: 'var(--bg-color)',
        scrollBehavior: 'smooth'
      }}>
        {overdueTasks.length > 0 && (
          <TimelineColumn title="OVERDUE" tasks={overdueTasks} isOverdueCol={true} />
        )}

        {dateWindow.map((date, idx) => {
          const dayTasks = getTasksForDate(date);
          const isToday = idx === 0;
          return (
            <TimelineColumn
              key={date.toISOString()}
              title={isToday ? `TODAY - ${formatDateHeader(date)}` : formatDateHeader(date)}
              tasks={dayTasks}
            />
          );
        })}
      </div>

    </div>
  );
};
