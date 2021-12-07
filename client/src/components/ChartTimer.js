import React from 'react';
import OverallValue from './OverallValue';
import Seconds from './Seconds'

class ChartTimer extends React.Component {

    render(){
    
        let metricdata = this.props.metricdata;

        return (
            <div>
                <OverallValue metricdata={metricdata} />
                <Seconds />
            </div>
        );
    }
}

export default ChartTimer;