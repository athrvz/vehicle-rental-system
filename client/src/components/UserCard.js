import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { makePostRequest } from '../requestUtils';
import { useBookingContext } from "../BookingContextProvider";

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

export const UserCard = () => {
  const classes = useStyles();
  const { updateBooking, goToNextStep } = useBookingContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const reqBody = { firstName, lastName };
    console.log({reqBody});
    const res = await makePostRequest({
      url: '/user',
      reqBody
    });
    console.log({ res });
    updateBooking({userId: res.user.id});
    // goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
