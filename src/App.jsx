import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectBoard from './pages/ProjectBoard';
import Tasks from './pages/Tasks';
import Scheduled from './pages/Scheduled';

function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scheduled" element={<Scheduled />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectBoard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProjectProvider>
  );
}

export default App;
