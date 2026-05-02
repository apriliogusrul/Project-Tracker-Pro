import React, { useMemo } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { Calendar } from 'lucide-react';
import { TimelineProjectRow, generateDateWindow } from '../components/Timeline';

const Scheduled = () => {
  const { projects, tasks } = useProjectContext();

  const dateWindow = useMemo(() => generateDateWindow(14), []);

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <header className="flex justify-between items-center" style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
        <div className="flex items-center gap-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar color="var(--text-muted)" size={20} />
            <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 600 }}>Timeline Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="p-responsive" style={{ padding: '2rem 2.5rem' }}>
        {projects.length > 0 ? (
          projects.map((project, index) => {
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
          })
        ) : (
          <div className="glass-panel flex flex-col items-center justify-center" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <div style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <Calendar size={48} color="var(--text-muted)" />
            </div>
            <h2>No projects found</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
              Create a project to see its timeline here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheduled;
