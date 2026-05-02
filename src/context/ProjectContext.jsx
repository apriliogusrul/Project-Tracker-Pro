import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const WORKFLOWS = {
  APP: ['Planning', 'Frontend Development', 'Backend Development', 'Integration', 'Deploy'],
  WEB: ['Planning', 'Site Structure & Design', 'Content Development', 'Integration', 'Launch']
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      const { data: pData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      const { data: tData } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
      
      if (pData) {
        setProjects(pData.map(p => ({
          id: p.id, title: p.title, description: p.description, type: p.type, deadline: p.deadline, createdAt: p.created_at
        })));
      }
      if (tData) {
        setTasks(tData.map(t => ({
          id: t.id, projectId: t.project_id, title: t.title, description: t.description, stage: t.stage, status: t.status, deadline: t.deadline, createdAt: t.created_at
        })));
      }
    };
    fetchData();
  }, []);

  const addProject = (title, description, type, deadline = '', createdAt = new Date().toISOString()) => {
    const newProject = {
      id: uuidv4(),
      title,
      description,
      type, // 'App Workflow' or 'Web Workflow'
      deadline,
      createdAt
    };
    
    // Optimistic UI update
    setProjects(prev => [newProject, ...prev]);
    
    // Save to Supabase
    supabase.from('projects').insert([{
      id: newProject.id,
      title: newProject.title,
      description: newProject.description,
      type: newProject.type,
      deadline: newProject.deadline,
      created_at: newProject.createdAt
    }]).then(({ error }) => {
      if (error) console.error("Error adding project to DB:", error);
    });

    return newProject;
  };

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    
    const dbUpdates = { ...updates };
    if (dbUpdates.createdAt) { dbUpdates.created_at = dbUpdates.createdAt; delete dbUpdates.createdAt; }
    
    supabase.from('projects').update(dbUpdates).eq('id', id).then();
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setTasks(prev => prev.filter(t => t.projectId !== id));
    
    supabase.from('projects').delete().eq('id', id).then();
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
    
    supabase.from('tasks').insert([{
      id: newTask.id,
      project_id: newTask.projectId,
      title: newTask.title,
      description: newTask.description,
      stage: newTask.stage,
      status: newTask.status,
      deadline: newTask.deadline,
      created_at: newTask.createdAt
    }]).then();
    
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    
    const dbUpdates = { ...updates };
    if (dbUpdates.projectId) { dbUpdates.project_id = dbUpdates.projectId; delete dbUpdates.projectId; }
    if (dbUpdates.createdAt) { dbUpdates.created_at = dbUpdates.createdAt; delete dbUpdates.createdAt; }
    
    supabase.from('tasks').update(dbUpdates).eq('id', id).then();
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    supabase.from('tasks').delete().eq('id', id).then();
  };

  const moveTask = (taskId, newStage) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, stage: newStage } : t));
    supabase.from('tasks').update({ stage: newStage }).eq('id', taskId).then();
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
