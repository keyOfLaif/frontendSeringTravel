import React from 'react'

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
  return color;
}

const Chart = ({data}) => {
    // const total = data.reduce((acc, value) => acc + value, 0);
    
    const barStyles = data.map((percentage) => ({
        width: `${percentage}%`,
        backgroundColor: getRandomColor(),
    }));

  return (
    <div className="chart">
      {barStyles.map((style, index) => (
        <div className="bar" key={index} style={style}></div>
      ))}
    </div>
  );
}

export default Chart