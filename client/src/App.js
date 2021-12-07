import React, { useState, useEffect } from 'react';
import store from './store';

import Appnavbar from './components/Appnavbar';
import MetricCategories from './components/MetricCategories';

// Must be a function component to use hooks
const App = () => { 
    
    const [count, setCount] = useState(0);

      useEffect(() => {
        const timer = setInterval(() => {
          setCount(prevCount => increment(prevCount));
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
function increment(p){
    
    console.log("Increment "+p);
    store.dispatch({ type: 'applicationTimer/increment' });
    
    var rand = (Math.random()*100).toFixed(0);
    if(rand < 10){
        p = 0;
        sandwormAttack(p);
    }
    else{
        productionPhase(p);
    }
    
    return p+1;
}

// Perform the non-attack actions
function productionPhase(){
    store.dispatch({ type: 'secondsSinceLastAttack/increment' });
    store.dispatch({ type: 'spiceHarvested/increment' });
    store.dispatch({ type: 'profit/increment' });
    store.dispatch({ type: 'profitDataset/increment' });
}

// Perform the sandworm attack actions
function sandwormAttack(){
    store.dispatch({ type: 'secondsSinceLastAttack/reset' });
    store.dispatch({ type: 'sandwormAttacks/increment' });
    store.dispatch({ type: 'harvesters/decrement' });
}
