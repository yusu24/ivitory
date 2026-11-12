import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import RequireRole from './components/RequireRole';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CustomerDashboardPage from './pages/customer/CustomerDashboardPage';
import InvitationLivePreviewPage from './pages/customer/InvitationLivePreviewPage';
import InvitationPage from './pages/InvitationPage';
import TemplatePreviewPage from './pages/TemplatePreviewPage';
import NotFoundPage from './pages/NotFoundPage';
import { useLandingContent, applyFaviconToDocument } from './hooks/useBrandSettings';

function App() {
  const { data: brandData } = useLandingContent();

  useEffect(() => {
    if (brandData) {
      applyFaviconToDocument(brandData);
      if (brandData.site_name && document.title === 'Undangan Pernikahan') {
        document.title = `${brandData.site_name} — Undangan Digital`;
      }
    }
  }, [brandData]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireRole roles={['user']}>
            <CustomerDashboardPage />
          </RequireRole>
        }
      />
      <Route
        path="/dashboard/preview/:id"
        element={
          <RequireAuth>
            <InvitationLivePreviewPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireRole roles={['superadmin', 'admin']}>
            <AdminDashboardPage />
          </RequireRole>
        }
      />
      <Route path="/preview-template/:templateSlug" element={<TemplatePreviewPage />} />
      <Route path="/:slug" element={<InvitationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
