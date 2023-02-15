import Plot from 'react-plotly.js';
import {useEffect} from 'react';

function SIRPlot({odex_solver, days}) {
    let odex_int = odex_solver.integrate(0, [100, 1, 0]);

    let xs = Array.from({length: days}, (x, i) => i);
    let ys = xs.map( (val) => odex_int(val));
    
    let get_traces = function() {
        let infected = {
          x: xs,
          y: ys.map( (y) => y[1] ),
          type: "scatter",
          name: "Infected",
          marker: { color: "orange" }
        };
      
        let recovered = {
          x: xs,
          y: ys.map( (y) => y[2] ),
          name: "Recovered",
          type: "scatter",
          marker: { color: "green" }
        };
      
        let susceptible = {
            x: xs,
            y: ys.map( (y) => y[0] ),
            name: "Susceptible",
            type: "scatter",
            marker: { color: "blue" }
        }
        let plot_data = [susceptible, infected, recovered];
        return plot_data;
    }

    let layout = {
        xaxis: {
            title: {
                text: 'Time (Days)',
                font: {
                    family: 'Helvetica',
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Individuals',
                font: {
                    family: 'Helvetica',
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        }
    }

    return(
        <Plot data={get_traces()} layout={layout} style={{width: '80%', margin: 'auto'}} useResizeHandler={true}/>
    );
};

export default SIRPlot;