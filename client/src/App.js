import React from 'react';
import { render } from 'react-dom';




/* Components */
import Appnavbar from './components/Appnavbar';
import MetricCategories from './components/MetricCategories';

/* Components */
class App extends React.Component { 
    
    render(){
      return (
        <div className="App">
          <header className="App-header">
            <Appnavbar />
          </header>

          <div id="main">
            <MetricCategories />
          </div>

        </div>
      );
    }
}

export default App;
