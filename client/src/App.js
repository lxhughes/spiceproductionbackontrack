/* Basics */
import React from 'react';

/* Highcharts */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

/* Local files */
import atreidesLogo from './assets/house_atreides_logo.svg';
import arrakisLogo from './assets/arrakis_spice_melange_logo.svg';
import starFull from './assets/silo-full.png';
import starEmpty from './assets/silo-empty.png';
import data from './assets/data.json';
import './App.css';

/* A constant with date information */
const date = {
    "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "month": 10,
    "day": 17,
    "year": 10191,
    "epoch": "A.G."
};

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

class Appnavbar extends React.Component {
    render(){
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
}


class MetricCategories extends React.Component {
    render(){
        return (
            <ul className="metricList row g-0">
                {data.metricCategories.map(mc =>
                  <li className="metricContainer col-sm-6" key={mc.name}>
                    <h2>{mc.name}</h2>

                    {mc.metrics.filter(mt => mt.topline).map(mt =>
                        <div className="metricContainer" key={mt.name}>
                                                             
                           <div className="metric">
                                <h3>{mt.name}</h3>
                                <div className='description'>{mt.description}</div>
                            
                                <div className='numberContainer'>
                                    <div className='number'>
                                        <OverallValue metricdata={mt} />
                                    </div>
                                    <div className='unit'>{mt.unit}</div>
                                </div>
                                                             
                                <Metric metricdata={mt} />
                            </div>
                        </div>
                    )}

                  </li>
                )}
            </ul>
       ); 
    }
}

class OverallValue extends React.Component {
    
    constructor(props) {
        super(props);
    } 
    
    render(){
        let metricdata = this.props.metricdata;
        let val = 0; 
        
        // Get the main value: either "value" or a sum of the dataset values
        if(metricdata.value != undefined){
            val = metricdata.value;
        }
        else if(metricdata.dataset != undefined){
            val = metricdata.dataset.map(row => row.value).reduce(sum);
        }
    
        if(metricdata.randomize){
            val = randomNum(metricdata.min, metricdata.max);
        }

        if(metricdata.unit === "minutes"){

            let secs = 0;
            if(metricdata.randomize) secs = randomNum(0,59);

            //if(params.incrementSeconds){
            //    secs = setInterval(secs=>secs++,1000); /* This isn't working */
            //}

            val = val + ":" + secs.toString().padStart(2,'0');
        }

        // Format number
        if(!isNaN(val)){

            if(val > 1000000 || val < -1000000){
                val = (val/1000000).toFixed(2).toString() + "M";
            }
            else if(val > 1000 || val < -1000){
                val = (val/1000).toFixed(2).toString() + "K";
            }
            else {
                val = val.toLocaleString();
            }
        }
    
        return val;
    }
}

class Metric extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render(){
        
        if(this.props.metricdata.type === "stars"){
            return (
                <ChartStars metricdata={this.props.metricdata} />
            );
            
        }
        else if(this.props.metricdata.type === "bar"){
            return (
                <ChartBar metricdata={this.props.metricdata} />
            );
        }

        else if(this.props.metricdata.type === "trend"){
            return (
                <ChartTrend metricdata={this.props.metricdata} />
            );
        }
        else {
            return null;
        }

    }
}

class ChartStars extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render(){
        let stars = [];
        const starWidth = 21; // 169
        const starHeight = 24; // 193
        const starStyle = { width: (starWidth + 2) * 10 + 'px' };


        // Full Stars
        for(var i=0; i<this.props.metricdata.value; i++){
            let falt = 'Full '+this.props.metricdata.unit;
            let fstar = (<li className='star' key={i}>
                            <img src={starFull} alt={falt} width={starWidth} height={starHeight} />
                        </li>);
            stars.push(fstar);
        }

            // Empty stars
            for(var s=this.props.metricdata.value; s<this.props.metricdata.max; s++){
                let ealt = 'Empty '+this.props.metricdata.unit;
                let estar = (<li className='star' key={s}>
                                <img src={starEmpty} alt={ealt} width={starWidth} height={starHeight} />
                            </li>);
                stars.push(estar);
            }

            return (
                <div className='starsContainer'>
                    <ul className='stars' style={starStyle}>
                        {stars}
                    </ul>
                </div>
            );     
    }
}

class ChartBar extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render(){
    
        const barData = this.props.metricdata.dataset.map(row => row.value);
        const barCategories = this.props.metricdata.dataset.map(row => row.label);
        const barWidth = 10; 
        const chartHeight = (barCategories.length + 1) * (barWidth * 2.5);

        /* Highcharts bar chart options */
        const barOptions = {};
        barOptions.title = { text: this.props.metricdata.charttitle, style: { fontSize: "1.2em" } }; // Could be mt.name, but I Want to display it as h3 above not as chart title
        barOptions.chart = { type: "bar", height: chartHeight, backgroundColor: "transparent" };
        barOptions.xAxis = { categories: barCategories, lineWidth: 0 };
        barOptions.yAxis = { title: { text: this.props.metricdata.unit }, visible: false };
        barOptions.legend = { enabled: false };
        barOptions.plotOptions = { bar: { pointPadding: 0, pointWidth: barWidth } }
        barOptions.series = [];
        const firstSeries = { data: barData, color: "#04314E", borderWidth: 0, name: this.props.metricdata.unit, dataLabels: { enabled: true, style: { textOutline: "none" } } };
        barOptions.series.push(firstSeries);

        /* End D3 barchart */

        return (
            <div className='barChartContainer'>
                <HighchartsReact highcharts={Highcharts} options={barOptions} />
            </div>
        );
    }
}
    
class ChartTrend extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render(){    
    
        const lineData = this.props.metricdata.dataset.map(row => row.value);
        const chartHeight = 250;


        let xAxis = this.props.metricdata.dataset.map(row => row.name);

        if(this.props.metricdata.xAxisUnit === "months"){
            xAxis = this.props.metricdata.dataset.map(row => date.months[parseInt(row.label)] + " " + date.year);
        }

        /* Highcharts line chart options */
        const lineOptions = {};
        lineOptions.title = { text: this.props.metricdata.charttitle, style: { fontSize: "1.2em" }};
        lineOptions.chart = { type: "line", height: chartHeight, backgroundColor: "transparent" };
        lineOptions.xAxis = { categories: xAxis };
        lineOptions.yAxis = { title: { text: this.props.metricdata.unit } };
        lineOptions.legend = { enabled: false };
        lineOptions.series = [];
        const firstSeries = { data: lineData, color: "#04314E", name: this.props.metricdata.unit, dataLabels: { enabled: false } };
        lineOptions.series.push(firstSeries);


        return (
            <div className='lineChartContainer'>
                <HighchartsReact highcharts={Highcharts} options={lineOptions} />
            </div>
        );
    }
}



/* Support Functions */

// Support function to sum
function sum(total, num){
    return total + num;
}

// Random number function
function randomNum(min, max){
    return Math.floor(Math.random() *  (max - min)) + min;
}

export default App;
