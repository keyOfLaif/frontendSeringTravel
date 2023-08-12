import React, { useEffect } from 'react'

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
            <div>{dataIndicator[index]} {data[index].toFixed(2)}%</div>
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