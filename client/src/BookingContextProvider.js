import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBookingContext = () => useContext(BookingContext);

export const BookingContextProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    userId: null,
    vechicleId: null,
    currentStep: 0,
    wheels: 0,
    vehicleList: []
  });

  const updateBooking = (updatedValue) => {
    const step = (bookingData.currentStep + 1) % 5;
    const updatedBookingData = { ...bookingData, ...updatedValue, currentStep: step };
    console.log({ updatedBookingData });
    setBookingData({...updatedBookingData })
  }

  const goToNextStep = () => {
    console.log('adding step');
    const step = (bookingData.currentStep + 1);
    setBookingData({...bookingData, currentStep: step});
  }

  return (
    <BookingContext.Provider value={{
      ...bookingData,
      updateBooking,
      goToNextStep
    }}>
      {children}
    </BookingContext.Provider>
  );
};