import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminDashboardView } from '../../types';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { AdminOverview } from './AdminOverview';
import { AdminProperties } from './AdminProperties';
import { AdminBlogPosts } from './AdminBlogPosts';
import { AdminProfileSettings } from './AdminProfileSettings';
import { AdminDatabaseDesk } from './AdminDatabaseDesk';

interface AdminDashboardProps {
  onReturnToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToSite }) => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<AdminDashboardView>('overview');
  
  // Triggers from overview
  const [openPropertyModal, setOpenPropertyModal] = useState(false);
  const [openBlogEditor, setOpenBlogEditor] = useState(false);

  // If auth is loading, show high-craft luxury loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#071322] flex flex-col items-center justify-center text-slate-100 font-sans">
        <div className="w-12 h-12 border-3 border-blue-600 border-t-amber-400 rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold text-slate-400">Authenticating Executive Session...</p>
      </div>
    );
  }

  // If not authenticated, render Login/Registration portal
  if (!user) {
    return <AdminLogin onReturnToSite={onReturnToSite} />;
  }

  // Authenticated Admin Dashboard
  return (
    <AdminLayout
      currentView={currentView}
      onViewChange={(view) => {
        setCurrentView(view);
        setOpenPropertyModal(false);
        setOpenBlogEditor(false);
      }}
      onReturnToSite={onReturnToSite}
    >
      {currentView === 'overview' && (
        <AdminOverview
          onNavigate={(view) => setCurrentView(view)}
          onAddNewProperty={() => {
            setOpenPropertyModal(true);
            setCurrentView('properties');
          }}
          onAddNewBlogPost={() => {
            setOpenBlogEditor(true);
            setCurrentView('blog');
          }}
        />
      )}

      {currentView === 'properties' && (
        <AdminProperties
          initialOpenModal={openPropertyModal}
          onModalClose={() => setOpenPropertyModal(false)}
        />
      )}

      {currentView === 'blog' && (
        <AdminBlogPosts
          initialOpenEditor={openBlogEditor}
          onEditorClose={() => setOpenBlogEditor(false)}
        />
      )}

      {currentView === 'profile' && <AdminProfileSettings />}

      {currentView === 'database' && <AdminDatabaseDesk />}
    </AdminLayout>
  );
};
