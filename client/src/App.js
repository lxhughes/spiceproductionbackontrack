import React, { useState, useEffect } from 'react';
import store from './store';

import Appnavbar from './components/Appnavbar';
import MetricCategories from './components/MetricCategories';

// Must be a function component to use hooks
const App = () => { 
    
    const [count, setCount] = useState(0);

      useEffect(() => {          
        const timer = setInterval(() => {
          setCount(
              prevCount => Increment(prevCount)
          );
        }, 1000);
        return () => {
          clearInterval(timer);
        };
      }, []);    

      return (
        <div className="App">
          <header className="App-header">
            <Appnavbar daysElapsed={count} />
          </header>

          <div id="main">
            <MetricCategories />
          </div>

        </div>
      );
}

export default App;

// Increments a counter, or has a 1% chance to reset to zero
function Increment(p){
    
    console.log("Increment "+p);
    
    var rand = (Math.random()*100).toFixed(0);
    
    if(rand < 10){ // sandworm attack
        store.dispatch({ type: 'dayPassed/attack', payload: p });
    }
    else{ // production phase
        store.dispatch({ type: 'dayPassed/harvest', payload: p });
    }
    
    return p+1;
}
