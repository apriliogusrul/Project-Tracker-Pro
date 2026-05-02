import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const KanbanColumn = ({ stage, tasks, onAddTask }) => {
  const { setNodeRef } = useDroppable({
    id: stage,
    data: { stage }
  });

  return (
    <div 
      className="flex flex-col" 
      style={{ 
        width: '320px', 
        minWidth: '320px',
        maxHeight: '100%', 
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-sidebar)', /* Subtle darker background for columns */
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        padding: '0.75rem 1rem', 
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-sidebar)'
      }}>
        <div className="flex items-center gap-2">
          <h3 style={{ fontSize: '13px', margin: 0, fontWeight: 600 }}>{stage}</h3>
          <span style={{ 
            fontSize: '11px',
            color: 'var(--text-muted)'
          }}>
            {tasks.length}
          </span>
        </div>
        <button className="btn-icon" onClick={onAddTask} style={{ padding: '0.15rem' }}>
          <Plus size={14} />
        </button>
      </div>

      <div 
        ref={setNodeRef}
        style={{ 
          padding: '1rem', 
          flex: 1, 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          minHeight: '150px'
        }}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div style={{ 
            padding: '2rem 1rem', 
            textAlign: 'center', 
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
          }}>
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
