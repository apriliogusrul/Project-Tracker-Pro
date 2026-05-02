import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useProjectContext } from '../context/ProjectContext';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateProjectModal = ({ onClose }) => {
  const { addProject } = useProjectContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('App Workflow');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject = addProject(title, description, type, deadline);
    onClose();
    navigate(`/project/${newProject.id}`);
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Project</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label">Project Title</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., E-commerce Redesign"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              className="input-field"
              placeholder="Briefly describe what this project is about..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label className="label">Deadline</label>
            <input
              type="date"
              className="input-field"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              style={{ colorScheme: 'dark' }}
            />
          </div>

          <div>
            <label className="label">Project Type</label>
            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div
                onClick={() => setType('App Workflow')}
                style={{
                  padding: '1rem',
                  border: `2px solid ${type === 'App Workflow' ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  background: type === 'App Workflow' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>App Workflow</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Planning, Frontend, Backend, Integration, Deploy</div>
              </div>

              <div
                onClick={() => setType('Web Workflow')}
                style={{
                  padding: '1rem',
                  border: `2px solid ${type === 'Web Workflow' ? 'var(--secondary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  background: type === 'Web Workflow' ? 'rgba(236, 72, 153, 0.1)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Web Workflow</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Planning, Design, Content, Integration, Launch</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={!title.trim()}>Create Project</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateProjectModal;
