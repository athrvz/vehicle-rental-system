import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useBookingContext } from '../BookingContextProvider';
import { makePostRequest } from '../requestUtils';

const useStyles = makeStyles({
  form: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
  },
  errorText: {
    color: 'red'
  },
  defaultText: {
    color: 'black'
  }
});


export const VehicleType = () => {
  const classes = useStyles();
  const { updateBooking, goToNextStep, vehicleList } = useBookingContext();
  const [selectedOption, setSelectedOption] = useState(0);
  console.log({ vehicleList });
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ selectedOption });
    if (!selectedOption) {
      return;
    }
    updateBooking({ vehicleId: selectedOption });
    // goToNextStep();
  };

  return (
    <form className={classes.form}>
      <center className={classes.defaultText}>
        <div>
          <h2>Select the type of vehicle</h2>
        </div>
        <FormControl >
          <RadioGroup
            defaultValue="yes"
            name="radio-buttons-group"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {vehicleList?.map(vehicle => (
              <FormControlLabel
                key={vehicle.id}
                value={vehicle.id}
                control={<Radio size="small" />}
                label={vehicle.variant} />
            ))}
          </RadioGroup>
          <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </FormControl>
      </center>
    </form>
  );
};
