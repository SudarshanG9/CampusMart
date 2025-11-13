import React from 'react';
import { Routes, Route } from 'react-router-dom';

import StudentLoginPage from './pages/StudentLoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StorePage from './pages/StorePage';
import ProtectedRoute from './components/ProtectedRoute'; // This will now import our "dummy" version

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentLoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/store/:storeId"
        element={
          <ProtectedRoute>
            <StorePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;