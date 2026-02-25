import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useUsers } from './hooks/useUsers';
import { useDebounce } from './hooks/useDebounce';

import DashboardLayout from './components/DashboardLayout';
import Toast from './components/Toast';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';

import LoginPage from './pages/LoginPage';
import UsersListPage from './pages/UsersListPage';
import AddEditUsersPage from './pages/AddEditUsersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

const App = () => {
  const { users, isLoading, error, deleteUser, addUser, editUser } = useUsers();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 

  const filteredUsers = users.filter((user) => {
    const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
    return user.name.toLowerCase().includes(lowerCaseQuery) || user.email.toLowerCase().includes(lowerCaseQuery);
  });

  useEffect(() => { setCurrentPage(1); }, [debouncedSearchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setToastMessage('User deleted successfully.');
    }
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />}>
          <Route path="/" element={
            <UsersListPage 
              searchQuery={searchQuery} onSearchChange={setSearchQuery} error={error} isLoading={isLoading}
              paginatedUsers={paginatedUsers} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
              onAddClick={() => navigate('/add')} 
              onEditClick={(user) => navigate('/edit', { state: { user } })} 
              onDeleteClick={(id) => { setUserToDelete(id); setIsDeleteModalOpen(true); }}
            />
          } />
          
          <Route path="/add" element={
            <AddEditUsersPage addUser={addUser} editUser={editUser} setToastMessage={setToastMessage} setCurrentPage={setCurrentPage} />
          } />
          <Route path="/edit" element={
            <AddEditUsersPage addUser={addUser} editUser={editUser} setToastMessage={setToastMessage} setCurrentPage={setCurrentPage} />
          } />
          
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </>
  );
};

export default App;