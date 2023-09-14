import React, { useEffect } from 'react'
import './chart.css'

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
  return color;
}

const Chart = ({data, dataIndicator}) => {
    // const total = data.reduce((acc, value) => acc + value, 0);
    
    const barStyles = data.map((percentage) => ({
        width: `${percentage}%`,
        backgroundColor: getRandomColor(),
    }));


  return (
    <div className='chart__main'>
      
      <div className="chart">
        {
        barStyles.map((style, index) => (
          <div key={index}>
            {Number.isInteger(data[index]) ? (
              <div>{dataIndicator[index]} {data[index]}%</div>
            ) : (
              <div>{dataIndicator[index]} {Math.round(data[index])}%</div>
            ) }
            

            <div className='bar__frame'>
              <div className="bar" style={style}></div>
            </div>
          </div>
        ))
        }
      </div> 


    </div>
  );
}

export default Chart