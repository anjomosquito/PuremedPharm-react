import React, { createContext, useContext, useState, useEffect } from 'react';

const MedicineContext = createContext();

export function useMedicine() {
  return useContext(MedicineContext);
}

export function MedicineProvider({ children }) {
  const [medicines, setMedicines] = useState(() => {
    const savedMedicines = localStorage.getItem('medicines');
    return savedMedicines ? JSON.parse(savedMedicines) : [];
  });

  const [activityLog, setActivityLog] = useState(() => {
    const savedLogs = localStorage.getItem('activityLog');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
  }, [activityLog]);

  const addActivity = (action, details) => {
    const newActivity = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      details,
      user: 'admin'
    };
    setActivityLog(prev => [newActivity, ...prev]);
  };

  const addMedicine = (medicineData) => {
    setMedicines(prev => {
      const existingMedicine = prev.find(m => 
        m.name.toLowerCase() === medicineData.name.toLowerCase()
      );

      if (existingMedicine) {
        // Merge quantities if medicine exists
        const updatedMedicines = prev.map(m => 
          m.name.toLowerCase() === medicineData.name.toLowerCase()
            ? { 
                ...m, 
                quantity: parseInt(m.quantity) + parseInt(medicineData.quantity),
                price: medicineData.price // Update price to latest
              }
            : m
        );
        addActivity('MERGE', `Merged ${medicineData.quantity} units to ${medicineData.name}`);
        return updatedMedicines;
      } else {
        // Add new medicine
        addActivity('ADD', `Added new medicine: ${medicineData.name}`);
        return [...prev, { ...medicineData, id: Date.now() }];
      }
    });
  };

  const updateMedicine = (id, updatedData) => {
    setMedicines(prev => {
      const updatedMedicines = prev.map(medicine =>
        medicine.id === id ? { ...medicine, ...updatedData } : medicine
      );
      addActivity('UPDATE', `Updated medicine: ${updatedData.name}`);
      return updatedMedicines;
    });
  };

  const deleteMedicine = (id) => {
    setMedicines(prev => {
      const medicineToDelete = prev.find(m => m.id === id);
      addActivity('DELETE', `Deleted medicine: ${medicineToDelete.name}`);
      return prev.filter(medicine => medicine.id !== id);
    });
  };

  const generateReport = (startDate, endDate) => {
    let filteredLogs = activityLog;
    
    if (startDate && endDate) {
      filteredLogs = activityLog.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= new Date(startDate) && logDate <= new Date(endDate);
      });
    }

    const report = {
      totalActivities: filteredLogs.length,
      addCount: filteredLogs.filter(log => log.action === 'ADD').length,
      updateCount: filteredLogs.filter(log => log.action === 'UPDATE').length,
      deleteCount: filteredLogs.filter(log => log.action === 'DELETE').length,
      mergeCount: filteredLogs.filter(log => log.action === 'MERGE').length,
      activities: filteredLogs
    };

    return report;
  };

  const value = {
    medicines,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    activityLog,
    generateReport
  };

  return (
    <MedicineContext.Provider value={value}>
      {children}
    </MedicineContext.Provider>
  );
}
