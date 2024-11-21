import React, { createContext, useContext, useState, useEffect } from 'react';

const CategoryContext = createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [
      { id: 1, name: 'Antibiotics', description: 'Medicines that fight bacterial infections' },
      { id: 2, name: 'Pain Relief', description: 'Medicines for pain management' },
      { id: 3, name: 'Vitamins', description: 'Dietary supplements and vitamins' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: Date.now()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id, updatedData) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...updatedData } : category
    ));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
