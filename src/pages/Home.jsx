import React from 'react';
import { useProjectContext } from '../context/ProjectContext';
import TaskCard from '../components/TaskCard';
import ProjectCard from '../components/ProjectCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TimelineProjectRow, generateDateWindow } from '../components/Timeline';

const Home = () => {
  const { projects, tasks } = useProjectContext();
  const dateWindow = React.useMemo(() => generateDateWindow(7), []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="p-responsive" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', minHeight: '100%', paddingBottom: '2rem' }}>

        {/* Left Panel: Tasks */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0,
          background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', 
          padding: '1.5rem', border: '1px solid var(--border-color)'
        }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Tasks</h2>
            <Link to="/tasks" style={{ color: 'var(--text-muted)' }}><ArrowRight size={16} /></Link>
          </div>

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            overflowY: 'auto'
          }}>
            <DndContext sensors={sensors} collisionDetection={closestCorners}>
              <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                {tasks.length > 0 ? tasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                )) : (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                    No tasks found.
                  </div>
                )}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Right Panel: Projects & Schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>

          {/* Top: Project Showcase */}
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Project Showcase</h2>
            </div>

            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {projects.length > 0 ? projects.map(project => (
                <div key={project.id} style={{ minWidth: '280px', flexShrink: 0 }}>
                  <ProjectCard project={project} />
                </div>
              )) : (
                <div style={{ padding: '1rem', textAlign: 'center', width: '100%', color: 'var(--text-muted)', fontSize: '14px' }}>
                  No projects found.
                </div>
              )}
            </div>
          </div>

          {/* Bottom: Schedule Panel */}
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-color)', flex: 1 }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Schedule</h2>
            </div>

            {/* Timeline View */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.length > 0 ? projects.slice(0, 3).map((project, index) => {
                const projectTasks = tasks.filter(t => t.projectId === project.id);
                return (
                  <TimelineProjectRow
                    key={project.id}
                    project={project}
                    tasks={projectTasks}
                    dateWindow={dateWindow}
                    index={index}
                  />
                );
              }) : (
                <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No schedule data available.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
