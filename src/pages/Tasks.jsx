import React from 'react';
import { useProjectContext } from '../context/ProjectContext';
import TaskCard from '../components/TaskCard';
import { Star } from 'lucide-react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const Tasks = () => {
  const { tasks } = useProjectContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <header className="flex justify-between items-center" style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Star color="var(--text-muted)" size={20} />
            <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 600 }}>My Tasks</h1>
          </div>
        </div>
      </header>

      <div style={{ padding: '2rem 2.5rem' }}>
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <Star size={48} color="var(--text-muted)" />
            </div>
            <h2>No tasks yet</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
              Create a project and add some tasks. They will appear here.
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DndContext sensors={sensors} collisionDetection={closestCorners}>
              <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
