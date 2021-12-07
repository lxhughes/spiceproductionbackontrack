import React from 'react';

/* Components */
import Metric from './Metric';

/* Data */
import data from '../assets/data.json';

class MetricCategories extends React.Component {
    render(){
        return (
            <ul className="metricList row g-0">
                {data.metricCategories.map(mc =>
                  <li className="metricCategoryContainer col-sm-6" key={mc.name}>
                    <h2>{mc.name}</h2>

                    {mc.metrics.filter(mt => mt.topline).map(mt =>
                        <div className="metricContainer" key={mt.name}>
                                                             
                           <div className="metric">
                                <h3>{mt.name}</h3>
                                <div className="question">{mt.question}</div>
                                <div className="description">{mt.description}</div>
                            
                                <div className="metricContent row">
                                    <Metric metricdata={mt} />
                                </div>
                            </div>
                                                             
                        </div>
                    )}

                  </li>
                )}
            </ul>
       ); 
    }
}

export default MetricCategories;