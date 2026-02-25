import { useState, useEffect } from 'react';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = localStorage.getItem('dashboard_users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
          setIsLoading(false);
          return;
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users data.');
        
        const data = await response.json();
        setUsers(data);
        localStorage.setItem('dashboard_users', JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    localStorage.setItem('dashboard_users', JSON.stringify(updatedUsers));
  };

  const editUser = (updatedUser) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('dashboard_users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('dashboard_users', JSON.stringify(updatedUsers));
  };

  return { users, isLoading, error, addUser, editUser, deleteUser };
};