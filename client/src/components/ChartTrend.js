import React from 'react';
import store from '../store';
import OverallValue from './OverallValue';

/* Highcharts */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Dataset must be in format: [ { name: blahblah, value: 123 }, ... ]

class ChartTrend extends React.Component {

    render(){  
        
        const data = this.props.metricdata;
        let dataset = data.dataset;
        
        const state = store.getState();
        if(data.datasetStore) dataset = state[data.datasetStore];
    
        if(dataset !== undefined){
            const lineData = dataset.map(row => row.value);
            const chartHeight = 250;

            let xAxis = dataset.map(row => formatDate(row.name));

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

// Support function

function formatDate(seconds){
    let date = new Date(10190, 0);
    date.setDate(date.getDate() + seconds);
    return date.toLocaleDateString();
}