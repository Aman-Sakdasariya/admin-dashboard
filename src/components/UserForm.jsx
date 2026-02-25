import React, { useState, useEffect } from 'react';

const UserForm = ({ initialData, onSubmit, onCancel }) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    name: '', email: '', city: '', company: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        city: initialData.address?.city || initialData.city || '',
        company: initialData.company?.name || initialData.company || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      id: isEditing ? initialData.id : Date.now(), 
      name: formData.name,
      email: formData.email,
      address: { city: formData.city },
      company: { name: formData.company }
    };

    onSubmit(userData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 w-full">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit User' : 'Add New User'}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          {isEditing ? 'Update the details below to modify this user.' : 'Fill out the information below to register a new user to the dashboard.'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text" name="name" value={formData.name} onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white'}`}
              placeholder="e.g. Aman Sakdasariya"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email" name="email" value={formData.email} onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white'}`}
              placeholder="e.g. aman@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input
              type="text" name="city" value={formData.city} onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white'}`}
              placeholder="e.g. Bhavnagar"
            />
            {errors.city && <p className="mt-1 text-xs text-red-500 font-medium">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
            <input
              type="text" name="company" value={formData.company} onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.company ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white'}`}
              placeholder="e.g. Google"
            />
            {errors.company && <p className="mt-1 text-xs text-red-500 font-medium">{errors.company}</p>}
          </div>
        </div>

        <div className="mt-8 flex gap-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            {isEditing ? 'Save Changes' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;