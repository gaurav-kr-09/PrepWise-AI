import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import StartInterviewPage from './pages/StartInterviewPage';
import InterviewSessionPage from './pages/InterviewSessionPage';
import InterviewResultPage from './pages/InterviewResultPage';
import InterviewHistoryPage from './pages/InterviewHistoryPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/start-interview"
        element={
          <ProtectedRoute>
            <StartInterviewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviews/:id"
        element={
          <ProtectedRoute>
            <InterviewSessionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviews/:id/result"
        element={
          <ProtectedRoute>
            <InterviewResultPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <InterviewHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
