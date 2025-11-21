import React from 'react';
import { Routes, Route } from 'react-router-dom';

import StudentLoginPage from './pages/StudentLoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StorePage from './pages/StorePage';
import ProtectedRoute from './components/ProtectedRoute'; // This will now import our "dummy" version
import { CartProvider } from './context/CartContext'; // <-- IMPORT
import { AuthProvider } from './context/AuthContext'; // <-- IMPORT
function App() {
  return (
    <AuthProvider>

      <CartProvider>
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
    </CartProvider>
    </AuthProvider>
  );
}

export default App;