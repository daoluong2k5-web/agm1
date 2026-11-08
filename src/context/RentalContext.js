import React, { createContext, useContext, useState, useEffect } from 'react';

const RentalContext = createContext();

export const RentalProvider = ({ children }) => {
  const [rentalList, setRentalList] = useState(() => {
    try {
      const saved = localStorage.getItem('motorbike_rental_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('motorbike_rental_cart', JSON.stringify(rentalList));
    } catch (e) {
      console.error('Failed to save rental list to localStorage', e);
    }
  }, [rentalList]);

  // Show temporary toast message
  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Add motorbike to rental list
  const addToRental = (bike, days = 1) => {
    const validDays = Math.max(1, parseInt(days, 10) || 1);
    setRentalList((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === bike.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          days: updated[existingIndex].days + validDays
        };
        return updated;
      } else {
        return [...prev, { ...bike, days: validDays }];
      }
    });
    triggerNotification(`Đã thêm "${bike.name}" vào danh sách thuê!`);
  };

  // Remove bike from rental list
  const removeFromRental = (bikeId) => {
    setRentalList((prev) => {
      const target = prev.find((item) => item.id === bikeId);
      if (target) {
        triggerNotification(`Đã xóa "${target.name}" khỏi danh sách thuê!`, 'warning');
      }
      return prev.filter((item) => item.id !== bikeId);
    });
  };

  // Update rental days for a specific bike
  const updateDays = (bikeId, days) => {
    const numDays = Math.max(1, parseInt(days, 10) || 1);
    setRentalList((prev) =>
      prev.map((item) => (item.id === bikeId ? { ...item, days: numDays } : item))
    );
  };

  // Clear all items after checkout
  const clearRental = () => {
    setRentalList([]);
    localStorage.removeItem('motorbike_rental_cart');
  };

  // Compute total bikes count and total money
  const totalBikes = rentalList.reduce((sum, item) => sum + 1, 0);
  const totalDays = rentalList.reduce((sum, item) => sum + item.days, 0);
  const totalAmount = rentalList.reduce(
    (sum, item) => sum + (item.pricePerDay || item.price || 0) * item.days,
    0
  );

  return (
    <RentalContext.Provider
      value={{
        rentalList,
        addToRental,
        removeFromRental,
        updateDays,
        clearRental,
        totalBikes,
        totalDays,
        totalAmount,
        notification,
        setNotification
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};
