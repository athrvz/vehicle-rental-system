import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { makeStyles } from '@mui/styles';
import { makePostRequest } from '../requestUtils';
import { useBookingContext } from '../BookingContextProvider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

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

function getDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

export const DatePickerCard = () => {
  const classes = useStyles();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [respMessage, setRespMessage] = useState('');
  const [booked, setBooked] = useState(false);
  const { vehicleId, userId } = useBookingContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await makePostRequest({
      url: '/book',
      reqBody: {
        userId,
        vehicleId,
        fromDate,
        toDate
      }
    });
    console.log({ res });
    setRespMessage(res.message);
    setBooked(res.booked);
  }

  return (
    <form className={classes.form}>
      <center className={classes.defaultText}>
        <div>
          <h2>Select the date range for booking</h2>
        </div>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="From"
                  value={fromDate}
                  onChange={(date) => setFromDate(getDate(date))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="To"
                  value={toDate}
                  onChange={(date) => setToDate(getDate(date))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Box m={2}>
          <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
            Submit
          </Button>
          {respMessage && <Typography >
            {booked ? <CheckCircleOutlineIcon sx={{ color: 'green'}} /> : <CancelIcon sx={{ color: 'red'}} />}
            {respMessage}
          </Typography>}
          </Box>
        </FormControl>
      </center>
    </form>
  );
};
