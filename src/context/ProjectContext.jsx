import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const WORKFLOWS = {
  APP: ['Planning', 'Frontend Development', 'Backend Development', 'Integration', 'Deploy'],
  WEB: ['Planning', 'Site Structure & Design', 'Content Development', 'Integration', 'Launch']
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('ptp_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('ptp_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ptp_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ptp_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addProject = (title, description, type, deadline = '', createdAt = new Date().toISOString()) => {
    const newProject = {
      id: uuidv4(),
      title,
      description,
      type, // 'App Workflow' or 'Web Workflow'
      deadline,
      createdAt
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setTasks(prev => prev.filter(t => t.projectId !== id));
  };

  const addTask = (projectId, title, description, stage, status = 'Pending', deadline = '') => {
    const newTask = {
      id: uuidv4(),
      projectId,
      title,
      description,
      stage,
      status, // 'Pending', 'Running', 'Finished'
      deadline,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const moveTask = (taskId, newStage) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, stage: newStage } : t));
  };

  const getProjectProgress = (projectId) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    
    const project = projects.find(p => p.id === projectId);
    if (!project) return 0;

    const workflow = project.type === 'App Workflow' ? WORKFLOWS.APP : WORKFLOWS.WEB;
    const finalStage = workflow[workflow.length - 1];
    
    const completedTasks = projectTasks.filter(t => t.stage === finalStage).length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      tasks,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      getProjectProgress,
      WORKFLOWS
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
