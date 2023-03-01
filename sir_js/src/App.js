import './App.css';
import {Solver} from "odex";
import SIRPlot from "./SIRPlot";
import {useEffect, useState} from 'react';
import { Slider, Stack, Container, Typography} from '@mui/material';


const SIR = function(beta, gamma) {
  return function(x, y) {
    return [
      -beta * y[0] * y[1],
      beta * y[0] * y[1] - gamma * y[1],
      gamma * y[1]
    ];
  };
};


function App() {
  const [beta, setBeta] = useState(0.005);
  const [gamma, setGamma] = useState(0.01);
  const [numDays, setNumDays] = useState(100);

  let sol = new Solver(SIR(beta, gamma), 3);

  function handleBetaChange(event, newValue) {
    setBeta(newValue);
  };

  function handleGammaChange(event, newValue) {
    setGamma(newValue);
  };

  function handleNumDaysChange(event, newValue) {
    setNumDays(newValue);
  }

  return (
    <Container>
        <SIRPlot odex_solver={sol} days={numDays}/>
      <Stack spacing={2}>
        <Typography gutterBottom>
          Beta (Transmission Rate)
        </Typography>
        <Slider 
          aria-label="Default"
          value={beta}
          onChange={handleBetaChange}
          step={0.0001}
          min={0.0001}
          max={0.05}
          valueLabelDisplay="auto"
        />
        <Typography gutterBottom>
          Gamma (Recovery Rate)
        </Typography>

        <Slider 
          aria-label="Default"
          value={gamma}
          onChange={handleGammaChange}
          step={0.0001}
          min={0.0001}
          max={0.5}
          valueLabelDisplay="auto"
        />
        <Typography gutterBottom>
          Days
        </Typography>
        <Slider 
          aria-label="Default"
          value={numDays}
          onChange={handleNumDaysChange}
          step={1}
          min={10}
          max={1000}
          valueLabelDisplay="auto"
        />
      </Stack>
    </Container>
  );
}

export default App;
