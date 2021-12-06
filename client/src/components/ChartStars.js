import React from 'react';
import store from '../store';
import OverallValue from './OverallValue';
import ActionButton from './ActionButton';

/* Local files */
import starFull from '../assets/harvester_full.png'; // 49x31
import starEmpty from '../assets/harvester_empty.png';

class ChartStars extends React.Component {

    render(){
        
        const metricdata = this.props.metricdata;
        let val = 0;
        
        // Get the main value: either "value" or a sum of the dataset values
        if(metricdata.value !== undefined){
            val = metricdata.value;
        }
        else if(metricdata.valueStore !== undefined){
            const state = store.getState();
            val = state[metricdata.valueStore];
        }
        
        let stars = [];
        const starWidth = 49; // 169
        const starHeight = 31; // 193
        const starStyle = { width: (starWidth + 2) * 10 + 'px' };


        // Full Stars
        for(var i=0; i<val; i++){
            let falt = 'Full '+metricdata.unit;
            let fstar = (<li className='star' key={i}>
                            <img src={starFull} alt={falt} width={starWidth} height={starHeight} />
                        </li>);
            stars.push(fstar);
        }

            // Empty stars
            if(metricdata.max !== undefined){
                for(var s=val; s<metricdata.max; s++){
                    let ealt = 'Empty '+metricdata.unit;
                    let estar = (<li className='star' key={s}>
                                    <img src={starEmpty} alt={ealt} width={starWidth} height={starHeight} />
                                </li>);
                    stars.push(estar);
                }
            }

            return (
                <div>
                    <OverallValue metricdata={metricdata} />
                    <div className='starsContainer metricVizContainer col-sm-9'>
                        <ul className='stars' style={starStyle}>
                            {stars}
                        </ul>
                        <ActionButton buttondata={metricdata.actionButton} />
                    </div>
                </div>
            );     
    }
}

export default ChartStars;