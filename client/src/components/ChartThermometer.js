import React from 'react';
import OverallValue from './OverallValue';
import store from '../store';

/* Highcharts */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ChartThermometer extends React.Component {

    render(){
        
        const state = store.getState();
        const metricdata = this.props.metricdata;
        let val = 0;
        let max = 100;
        
        // Get the main value
        if(metricdata.value !== undefined){
            val = metricdata.value;
        }
        else if(metricdata.valueStore !== undefined){        
            val = state[metricdata.valueStore];
        }
        
        // Get the maximum
        if(metricdata.max){
            max = metricdata.max;
        }
        
        // Get the daily goal
        const dailyGoal = Math.round(state.applicationTimer * (max/365));
        
        // Make a bar chart with the actual and max
        const barSeries = [{
            name: "Overall Goal",
            color: 'rgb(135,131,106)', // dark brown
            borderWidth: 0,
            data: [ max ]
        },
        {
            name: "Daily Goal",
            color: 'rgba(0,0,0,0.25)', // transparent black
            borderWidth: 0,
            data: [ dailyGoal ],
            dataLabels: { enabled: true, format: 'Daily Goal {y}', color: '#FFF' }
        },
        {
            name: metricdata.name,
            color: 'rgba(212,85,0,255)', // orange-red
            borderWidth: 0,
            data: [ val ],
            dataLabels: { enabled: true, format: '{y} Tons Harvested', color: '#FFF' }
        }];
        
        const chartHeight = 100;

        /* Highcharts bar chart options */
        const barOptions = {};
        
        if(metricdata.charttitle !== undefined){
            barOptions.title = { text: metricdata.charttitle, style: { fontSize: "1.2em" } }; // Could be mt.name, but I Want to display it as h3 above not as chart title
        }
        
        barOptions.chart = { type: "bar", height: chartHeight, backgroundColor: "transparent" };
        barOptions.tooltip = { shared: true };
        //barOptions.xAxis = { lineWidth: 0 };
        barOptions.yAxis = { title: { text: metricdata.unit }, visible: false, max: max };
        barOptions.xAxis = { visible: false };
        barOptions.legend = { enabled: false };
        barOptions.plotOptions = { bar: { pointPadding: 0, groupPadding: 0, grouping: false, shadow: false }};
        barOptions.series = barSeries;

        return (
            <div>
                <OverallValue metricdata={metricdata} />
                <div className='barChartContainer metricVizContainer col-sm-9'>
                    <HighchartsReact highcharts={Highcharts} options={barOptions} />
                </div>
            </div>
        );
    }
}

export default ChartThermometer;