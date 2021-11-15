/* Local files */
import atreidesLogo from './assets/house_atreides_logo.svg';
import arrakisLogo from './assets/arrakis_spice_melange_logo.svg';
import starFull from './assets/silo-full.png';
import starEmpty from './assets/silo-empty.png';
import data from './assets/data.json';
import './App.css';

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

/* Components */
function myNavbar(){
    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>
               <img src={atreidesLogo} height='60' width='80' alt="House Atreides Logo" />
                House Atreides
            </Navbar.Brand>
      
            <Navbar.Brand>
                <img src={arrakisLogo} height='60' width='80' alt="Arrakis Spice Melange Logo" />
                Arrakis Spice Melange, Inc.
            </Navbar.Brand>
      
            <h1>Spice Production Back on Track</h1>
          </Container>
        </Navbar>
        );
}

// Support function to sum
function sum(total, num){
    return total + num;
}

// Random number function
function randomNum(min, max){
    return Math.floor(Math.random() *  (max - min)) + min;
}

// Format a numeric value
function format(mt){
    
    let val = mt.value;
    
     if(mt.randomize){
        mt.value = randomNum(mt.min, mt.max);
    }
    
    if(mt.unit === "minutes"){
        
        let secs = 0;
        if(mt.randomize) secs = randomNum(0,59);
        
        if(mt.incrementSeconds){
            secs = setInterval(secs=>secs++,1000); /* This isn't working */
        } 
            
        val = val + ":" + secs.toString().padStart(2,'0');
    }
    
    return val;
}


// Increment seconds from one minute value

/* To Do: clean up this if/then logic */
/* Add Trend Logic */
/* Add visual Proportion logic */
function oneMetric(mt){
    
    let viz = "";
    
    if(mt.type === "number") {
        viz = (
            <div className='numberContainer'>
               <div className='number'>{format(mt)}</div>
               <div className='unit'>{mt.unit}</div>
              </div>
        );
    }
    else if(mt.type === "stars"){
        
        // Build array of 'stars'
        let stars = [];
        const starWidth = 32; // 169
        const starHeight = 36; // 193
        const starStyle = { width: (starWidth + 2) * 10 + 'px' };
        
        
        // Full Stars
        for(var i=0; i<mt.value; i++){
            let falt = 'Full '+mt.unit;
            let fstar = (<li className='star' key={i}>
                            <img src={starFull} alt={falt} width={starWidth} height={starHeight} />
                        </li>);
            stars.push(fstar);
        }
        
        // Empty stars
        for(var s=mt.value; s<mt.max; s++){
            let ealt = 'Empty '+mt.unit;
            let estar = (<li className='star' key={s}>
                            <img src={starEmpty} alt={ealt} width={starWidth} height={starHeight} />
                        </li>);
            stars.push(estar);
        }
        
        viz = (
            <div className='starsParentContainer row'>
            
                <div className='numberContainer col-sm-3'>
                    <span className='number'>{mt.value}</span>/
                    <span className='maxNumber'>{mt.max}</span>
                    <div className='unit'>{mt.unit}</div>
                </div>
            
                <div className='starsContainer col-sm-9'>
                    <ul className='stars' style={starStyle}>
                        {stars}
                    </ul>
                </div>

            </div>
        )        
    }
    else if(mt.type === "bar"){
        viz = (
            <div className='numberContainer'>
                <div className='number'>{mt.values.reduce(sum)}</div>
                <div className='unit'>{mt.unit}</div>
            </div>
        )    
    }

    else if(mt.type === "trend"){
        viz = (
            <div className='numberContainer'>
                <div className='number'>{mt.values[mt.values.length-1]}</div>
                <div className='unit'>{mt.unit}</div>
            </div>
        )
    }
    
    return (
        <div className="metric">
            <h3>{mt.name}</h3>
            <div className='description'>{mt.description}</div>
            
            { viz }
        
        </div>
    )
}

function metricCategories(){
   return (
    <ul className="metricList row g-0">
        {data.metricCategories.map(mc =>
          <li className="metricContainer col-sm-6" key={mc.name}>
            <h2>{mc.name}</h2>
            
            {mc.metrics.filter(mt => mt.topline).map(mt =>
                <div className="topLineMetricContainer" key={mt.name}>
                    {oneMetric(mt)}
                </div>
            )}
       
          </li>
        )}
    </ul>
   );  
}

/* Main App */
function App() {  
    
  return (
    <div className="App">
      <header className="App-header">
        {myNavbar()}
      </header>
      
      <div id="main">
        {metricCategories()}
      </div>
      
    </div>
  );
}

export default App;
