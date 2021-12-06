import React from 'react';
import OverallValue from './OverallValue';

/* Highcharts */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ChartTrend extends React.Component {

    render(){  
        
        const data = this.props.metricdata;
    
        if(data.dataset !== undefined){
            const lineData = data.dataset.map(row => row.value);
            const chartHeight = 250;


            let xAxis = data.dataset.map(row => row.name);

            if(data.xAxisUnit === "months"){
                xAxis = data.dataset.map(row => date.months[parseInt(row.label)] + " " + date.year);
            }

            /* Highcharts line chart options */
            const lineOptions = {};
            lineOptions.title = { text: data.charttitle, style: { fontSize: "1.2em" }};
            lineOptions.chart = { type: "line", height: chartHeight, backgroundColor: "transparent" };
            lineOptions.xAxis = { categories: xAxis };
            lineOptions.yAxis = { title: { text: data.unit } };
            lineOptions.legend = { enabled: false };
            lineOptions.series = [];
            const firstSeries = { data: lineData, color: "#04314E", name: data.unit, dataLabels: { enabled: false } };
            lineOptions.series.push(firstSeries);


            return (
                <div>
                    <OverallValue metricdata={data} />
                    <div className='lineChartContainer metricVizContainer col-sm-9'>
                        <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <OverallValue metricdata={data} />
                </div>
            );
        }
    }
}

export default ChartTrend;

/* A constant with date information */
const date = {
    "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "month": 10,
    "day": 17,
    "year": 10191,
    "epoch": "A.G."
};