import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useProjectContext } from '../context/ProjectContext';
import { X } from 'lucide-react';

const EditTaskModal = ({ task, onClose }) => {
  const { updateTask } = useProjectContext();
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status || 'Pending');
  const [deadline, setDeadline] = useState(task.deadline || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    updateTask(task.id, {
      title,
      description,
      status,
      deadline
    });
    
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Task</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label">Task Title</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g., Design Login Screen" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="label">Description</label>
            <textarea 
              className="input-field" 
              placeholder="Provide details for this task..." 
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
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
            <label className="label">Status</label>
            <select 
              className="input-field" 
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="Pending" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Pending</option>
              <option value="Running" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Running</option>
              <option value="Finished" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Finished</option>
            </select>
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

export default EditTaskModal;
