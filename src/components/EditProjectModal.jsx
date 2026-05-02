import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useProjectContext } from '../context/ProjectContext';
import { X } from 'lucide-react';

const EditProjectModal = ({ project, onClose }) => {
  const { updateProject } = useProjectContext();

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [type, setType] = useState(project.type);
  const [deadline, setDeadline] = useState(project.deadline || '');
  // Format the date for input type="date"
  const [date, setDate] = useState(() => {
    try {
      return new Date(project.createdAt).toISOString().split('T')[0];
    } catch (e) {
      return new Date().toISOString().split('T')[0];
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Combine the date from the input with the current time (or 00:00:00) to keep it valid ISO string
    const dateObj = new Date(date);
    const newCreatedAt = isNaN(dateObj.getTime()) ? project.createdAt : dateObj.toISOString();

    updateProject(project.id, {
      title,
      description,
      type,
      deadline,
      createdAt: newCreatedAt
    });

    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Project</h2>
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
            <label className="label">Creation Date</label>
            <input
              type="date"
              className="input-field"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ colorScheme: 'dark' }}
              required
            />
          </div>

          <div>
            <label className="label">Project Type (Warning: Changing this may invalidate current task stages)</label>
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
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={!title.trim()}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditProjectModal;
