import React from 'react';
import store from '../store';
import OverallValue from './OverallValue';
import ActionButton from './ActionButton';

/* Local files */
import starFull from '../assets/harvester_full.png'; // 49x31
import starEmpty from '../assets/harvester_empty.png';
import starSafe  from '../assets/harvester_armored.png';

class ChartStars extends React.Component {

    render(){
        
        const metricdata = this.props.metricdata;
        const state = store.getState();
        let val = 0;
        
        // Get the main value: either "value" or a sum of the dataset values        
        if(metricdata.value !== undefined){
            val = metricdata.value;
        }
        else if(metricdata.valueStore !== undefined){
            val = state[metricdata.valueStore];
        }
        
        // Get the safe stars (armored/unloseable), if any, and subtract them from main value
        let safeStars = 0;
        if(metricdata.valueStore !== undefined){
            safeStars = state[metricdata.safeStarsValueStore];
        }
        val = val - safeStars;
        
        let stars = [];
        const starWidth = 49; // 169
        const starHeight = 31; // 193
        const starStyle = { width: (starWidth + 2) * 10 + 'px' };

        // Safe stars (if any)
        for(var i=0; i<safeStars; i++){
            let salt = 'Safe '+metricdata.unit;
            let key = i;
            let sstar = (<li className='star' key={key}>
                            <img src={starSafe} alt={salt} width={starWidth} height={starHeight} />
                        </li>);
            stars.push(sstar);
        }
        
        // Full Stars (not safe)
        for(var j=0; j<val; j++){
            let falt = 'Full '+metricdata.unit;
            let key = j + safeStars;
            let fstar = (<li className='star' key={key}>
                            <img src={starFull} alt={falt} width={starWidth} height={starHeight} />
                        </li>);
            stars.push(fstar);
        }

            // Empty stars
            if(metricdata.max !== undefined){
                for(var s=val; s<metricdata.max; s++){
                    let ealt = 'Empty '+metricdata.unit;
                    let key = s + val + safeStars;
                    let estar = (<li className='star' key={key}>
                                    <img src={starEmpty} alt={ealt} width={starWidth} height={starHeight} />
                                </li>);
                    stars.push(estar);
                }
            }
        
          // Action buttons
          let actionbuttons = [];
          for(var k=0; k<metricdata.actionButtons.length; k++){                
              
              // HTML of action button
              let button = (<li className='actionButtonItem' key={k}>
                        <ActionButton buttondata={metricdata.actionButtons[k]} />
                    </li>);
              actionbuttons.push(button);
          }

            return (
                <div>
                    <OverallValue metricdata={metricdata} />
                    <div className='starsContainer metricVizContainer col-sm-9'>
                        <ul className='stars' style={starStyle}>
                            {stars}
                        </ul>
                        <ul className='actionButtons'>
                            {actionbuttons}
                        </ul>
                    </div>
                </div>
            );     
    }
}

export default ChartStars;