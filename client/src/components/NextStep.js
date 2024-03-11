import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles((theme) => ({
  button: {}
}));

export const NextStep = ({ children }) => {
  const classes = useStyles();
  const onClick = () => {
    console.log('clicked');
  }
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      endIcon={<ArrowForwardIcon />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
