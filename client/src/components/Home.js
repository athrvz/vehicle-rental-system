import React, { useState } from "react";
import { UserCard } from "./UserCard";
import { WheelsCard } from "./Wheels";
import { VehicleType } from "./VehicleType";
import { DatePickerCard } from "./DatePickerCard";

// import { NextStep } from "./NextStep";
import { useBookingContext } from "../BookingContextProvider";
// import { BookingCard } from "../pages/BookingCard";
// import { BookingDetailsCard } from "../pages/BookingDetailsCard";
// import { PassangerInfoCard } from "../pages/PassangerInfoCard";
// import { ConfirmationCard } from "../pages/ConfirmationCard";
// import { BOOKING_STEPS } from "../utils/constants";
// import { useBookingContext } from "../BookingContextProvider";

const ErrorDisplay = ({ error }) => (
  <div className="error">{error?.message}</div>
);

export const Home = () => {
  const { currentStep, userId } = useBookingContext();
  console.log({ currentStep, userId });

  let currentCard;
  switch (currentStep) {
    case 0:
      currentCard = <UserCard />;
      break;
    case 1:
      currentCard = <WheelsCard />;
      break;
    case 2:
      currentCard = <VehicleType />;
      break;
    case 3:
      currentCard = <DatePickerCard />;
      break;
    default:
      currentCard = <UserCard />;
      break;
  }

  return (
    <div className="example-flow">
      <div className="container">
      {currentCard}
        {/* {<ErrorDisplay error={error} />} */}
        {/* <DatePickerCard /> */}
      </div>
      {/* <NextStep /> */}
    </div>
  );
};
