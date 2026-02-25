import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserForm from '../components/UserForm';

const AddEditUsersPage = ({ addUser, editUser, setToastMessage, setCurrentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialData = location.state?.user || null;

  const handleFormSubmit = (userData) => {
    if (initialData) {
      editUser(userData);
      setToastMessage('User updated successfully!');
    } else {
      addUser(userData);
      setToastMessage('New user created successfully!');
      setCurrentPage(1);
    }
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full">
        
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 text-sm font-semibold text-gray-500 hover:text-blue-600 flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to User List
        </button>

        <UserForm 
          initialData={initialData} 
          onSubmit={handleFormSubmit} 
          onCancel={() => navigate('/')} 
        />
        
      </div>
    </div>
  );
};

export default AddEditUsersPage;