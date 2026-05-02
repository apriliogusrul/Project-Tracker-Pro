import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit } from 'lucide-react';
import { useProjectContext } from '../context/ProjectContext';
import EditTaskModal from './EditTaskModal';

const TaskCard = ({ task }) => {
  const { deleteTask, updateTask } = useProjectContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: { stage: task.stage }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'auto',
    zIndex: isDragging ? 999 : 1,
    position: 'relative'
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="task-card"
    >
      <div 
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.75rem',
          boxShadow: isDragging ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
          transition: 'all 0.15s ease',
          position: 'relative',
        }}
      >
        <div className="flex justify-between items-start mb-2" style={{ marginBottom: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flex: 1 }}>
            <span 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const statuses = ['Pending', 'Running', 'Finished'];
                const currentIndex = statuses.indexOf(task.status || 'Pending');
                const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                updateTask(task.id, { status: nextStatus });
              }}
              style={{ 
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              marginTop: '4px',
              border: `2px solid ${task.status === 'Finished' ? '#10b981' : task.status === 'Running' ? '#3b82f6' : '#6b7280'}`,
              background: task.status === 'Finished' ? '#10b981' : 'transparent',
              cursor: 'pointer',
              flexShrink: 0
            }} title={task.status || 'Pending'} />
            
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 500, paddingRight: '20px', lineHeight: '1.4' }}>{task.title}</h4>
          </div>
          <div className="flex gap-1" style={{ position: 'absolute', top: '0.5rem', right: '0.25rem' }}>
            <button 
              className="btn-icon" 
              style={{ padding: '0.15rem' }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditModalOpen(true);
              }}
              title="Edit Task"
            >
              <Edit size={14} />
            </button>
            <button 
              className="btn-icon" 
              style={{ padding: '0.15rem' }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if(window.confirm('Delete this task?')) deleteTask(task.id);
              }}
              title="Delete Task"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <p style={{ margin: '0 0 0 20px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </p>
        
        <div 
          className="flex justify-between items-center" 
          style={{ marginTop: '0.5rem', marginLeft: '20px' }}
        >
          <div 
            {...attributes} 
            {...listeners} 
            style={{ cursor: 'grab', color: 'var(--text-dark)', padding: '0.15rem', marginLeft: '-0.15rem' }}
          >
            <GripVertical size={14} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {task.deadline && (
              <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: 500 }}>
                Due: {new Date(task.deadline).toLocaleDateString()}
              </span>
            )}
            <span style={{ fontSize: '11px', color: 'var(--text-dark)' }}>
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditTaskModal 
          task={task} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default TaskCard;
