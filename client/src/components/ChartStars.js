import React, {Component} from 'react';

/* Local files */
import starFull from '../assets/silo-full.png';
import starEmpty from '../assets/silo-empty.png';

class ChartStars extends React.Component {

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
                <div className='starsContainer metricVizContainer col-sm-9'>
                    <ul className='stars' style={starStyle}>
                        {stars}
                    </ul>
                </div>
            );     
    }
}

export default ChartStars;