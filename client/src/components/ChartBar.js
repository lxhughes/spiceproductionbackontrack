import React from 'react';
import OverallValue from './OverallValue';

/* Highcharts */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ChartBar extends React.Component {

    render(){
        
        const data = this.props.metricdata;
        
        if(data.dataset){
            const barData = data.dataset.map(row => row.value);
            const barCategories = data.dataset.map(row => row.label);
            
            const barWidth = 10; 
            const chartHeight = (barCategories.length + 1) * (barWidth * 2.5);

            /* Highcharts bar chart options */
            const barOptions = {};
            barOptions.title = { text: data.charttitle, style: { fontSize: "1.2em" } }; // Could be mt.name, but I Want to display it as h3 above not as chart title
            barOptions.chart = { type: "bar", height: chartHeight, backgroundColor: "transparent" };
            barOptions.xAxis = { categories: barCategories, lineWidth: 0 };
            barOptions.yAxis = { title: { text: data.unit }, visible: false };
            barOptions.legend = { enabled: false };
            barOptions.plotOptions = { bar: { pointPadding: 0, pointWidth: barWidth } }
            barOptions.series = [];
            const firstSeries = { data: barData, color: "#04314E", borderWidth: 0, name: data.unit, dataLabels: { enabled: true, style: { textOutline: "none" } } };
            barOptions.series.push(firstSeries);

            return (
                <div>
                    <OverallValue metricdata={data} />
                    <div className='barChartContainer metricVizContainer col-sm-9'>
                        <HighchartsReact highcharts={Highcharts} options={barOptions} />
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

export default ChartBar;