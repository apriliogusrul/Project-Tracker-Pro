import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import { Trash2, ArrowRight, Edit } from 'lucide-react';
import EditProjectModal from './EditProjectModal';

const ProjectCard = ({ project }) => {
  const { deleteProject, getProjectProgress } = useProjectContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const progress = getProjectProgress(project.id);
  const isApp = project.type === 'App Workflow';

  return (
    <div style={{ 
      padding: '1.25rem', 
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      transition: 'all 0.15s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'var(--border-focus)';
      e.currentTarget.style.background = 'var(--bg-card-hover)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'var(--border-color)';
      e.currentTarget.style.background = 'var(--bg-card)';
    }}>
      <div className="flex justify-between items-start">
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '0.25rem' }}>{project.title}</h3>
          <span className={`badge ${isApp ? 'badge-app' : 'badge-web'}`} style={{ marginTop: '0.25rem' }}>
            {project.type}
          </span>
        </div>
        <div className="flex gap-1">
          <button 
            className="btn-icon" 
            onClick={(e) => {
              e.preventDefault();
              setIsEditModalOpen(true);
            }}
            title="Edit Project"
          >
            <Edit size={14} />
          </button>
          <button 
            className="btn-icon" 
            onClick={(e) => {
              e.preventDefault();
              if(window.confirm('Are you sure you want to delete this project?')) deleteProject(project.id);
            }}
            title="Delete Project"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>Created on: {new Date(project.createdAt).toLocaleDateString()}</span>
        {project.deadline && (
          <span style={{ color: 'var(--secondary)' }}>Due: {new Date(project.deadline).toLocaleDateString()}</span>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Progress</span>
          <span style={{ fontWeight: 600 }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: isApp ? 'var(--primary)' : 'var(--secondary)',
            transition: 'width 0.5s ease-out'
          }}></div>
        </div>
      </div>

      <div style={{ marginTop: '0.25rem' }}>
        <Link to={`/project/${project.id}`} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
          Open Project <ArrowRight size={14} />
        </Link>
      </div>

      {isEditModalOpen && (
        <EditProjectModal 
          project={project} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default ProjectCard;
