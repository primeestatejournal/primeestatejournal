import React, { useState } from 'react';
import { AdminDashboardView } from '../../types';
import { ProtectedRoute } from './ProtectedRoute';
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
  const [currentView, setCurrentView] = useState<AdminDashboardView>('overview');
  
  // Triggers from overview
  const [openPropertyModal, setOpenPropertyModal] = useState(false);
  const [openBlogEditor, setOpenBlogEditor] = useState(false);

  return (
    <ProtectedRoute onReturnToSite={onReturnToSite}>
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
    </ProtectedRoute>
  );
};

