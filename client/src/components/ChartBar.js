import React, {Component} from 'react';

/* Highcharts */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ChartBar extends React.Component {

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
            <div className='barChartContainer metricVizContainer col-sm-9'>
                <HighchartsReact highcharts={Highcharts} options={barOptions} />
            </div>
        );
    }
}

export default ChartBar;