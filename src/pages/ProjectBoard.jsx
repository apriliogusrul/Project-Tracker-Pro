import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import KanbanColumn from '../components/KanbanColumn';
import CreateTaskModal from '../components/CreateTaskModal';
import EditProjectModal from '../components/EditProjectModal';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ArrowLeft, Plus, Settings, Edit } from 'lucide-react';

const ProjectBoard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, tasks, moveTask, WORKFLOWS } = useProjectContext();
  
  const project = projects.find(p => p.id === id);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [activeStageForNewTask, setActiveStageForNewTask] = useState(null);

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

  if (!project) {
    return (
      <div className="container flex flex-col items-center justify-center" style={{ height: '100vh' }}>
        <h2>Project not found</h2>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const workflowStages = project.type === 'App Workflow' ? WORKFLOWS.APP : WORKFLOWS.WEB;
  const projectTasks = tasks.filter(t => t.projectId === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    // The over.id can be either a column (stage name) or another task.
    // We are using column as droppable
    const newStage = over.data.current?.stage || over.id;
    
    if (workflowStages.includes(newStage)) {
       moveTask(taskId, newStage);
    }
  };

  const openNewTaskModal = (stage) => {
    setActiveStageForNewTask(stage);
    setIsTaskModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <header className="flex justify-between items-center" style={{ padding: '1rem 1.5rem', background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 style={{ fontSize: '16px', margin: 0, fontWeight: 600 }}>{project.title}</h1>
              <span className={`badge ${project.type === 'App Workflow' ? 'badge-app' : 'badge-web'}`}>
                {project.type}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={() => setIsEditProjectModalOpen(true)}>
            <Edit size={14} /> Edit Project
          </button>
          <button className="btn btn-primary" onClick={() => openNewTaskModal(workflowStages[0])}>
            <Plus size={14} /> Add Task
          </button>
        </div>
      </header>

      <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', padding: '1.5rem' }}>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div style={{ display: 'flex', gap: '1.5rem', height: '100%', alignItems: 'flex-start' }}>
            {workflowStages.map(stage => (
              <KanbanColumn 
                key={stage} 
                stage={stage} 
                tasks={projectTasks.filter(t => t.stage === stage)}
                onAddTask={() => openNewTaskModal(stage)}
              />
            ))}
          </div>
        </DndContext>
      </div>

      {isTaskModalOpen && (
        <CreateTaskModal 
          projectId={project.id}
          initialStage={activeStageForNewTask}
          workflowStages={workflowStages}
          onClose={() => setIsTaskModalOpen(false)} 
        />
      )}

      {isEditProjectModalOpen && (
        <EditProjectModal 
          project={project} 
          onClose={() => setIsEditProjectModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default ProjectBoard;
