import React from 'react';
import OverallValue from './OverallValue';

class ChartTimer extends React.Component {

    render(){
    
        let metricdata = this.props.metricdata;

        return (
            <OverallValue metricdata={metricdata} />
        );
    }
}

export default ChartTimer;