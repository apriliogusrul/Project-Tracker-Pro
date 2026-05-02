import React, { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import { Plus, LayoutDashboard } from 'lucide-react';

const Projects = () => {
  const { projects } = useProjectContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <header className="flex justify-between items-center" style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LayoutDashboard color="var(--text-muted)" size={20} />
            <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 600 }}>Projects</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> New Project
        </button>
      </header>

      <div style={{ padding: '2rem 2.5rem' }}>
      {projects.length === 0 ? (
        <div className="glass-panel flex flex-col items-center justify-center" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}>
            <LayoutDashboard size={48} color="var(--text-muted)" />
          </div>
          <h2>No projects yet</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
            Get started by creating a new App or Web project to track your workflow automatically.
          </p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Create First Project
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      </div>

      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Projects;
