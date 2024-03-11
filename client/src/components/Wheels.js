import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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


export const WheelsCard = () => {
  const classes = useStyles();
  const { updateBooking, goToNextStep } = useBookingContext();
  const [selectedOption, setSelectedOption] = useState(0);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ selectedOption });
    if (!selectedOption) {
      return;
    }
    const res = await makePostRequest({
      url: '/wheels',
      reqBody: { wheels: selectedOption }
    });
    console.log({res});
    updateBooking({ wheels: Number(selectedOption), vehicleList: res.items });
    // goToNextStep();
  };

  return (
    <form className={classes.form}>
      <center className={classes.defaultText}>
        <div>
          <h2>Select #wheels</h2>
        </div>
        <FormControl >
          <RadioGroup
            defaultValue="yes"
            name="radio-buttons-group"
            onChange={(e) => setSelectedOption(Number(e.target.value))}
          >
            <FormControlLabel value="2"
              control={<Radio size="small" />} label="2 Wheels" />
            <FormControlLabel
              value="4"
              control={<Radio size="small" />}
              label="4 Wheels" />
          </RadioGroup>
          <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </FormControl>
      </center>
    </form>
  );
};
