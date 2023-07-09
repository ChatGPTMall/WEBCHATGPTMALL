import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export function CandleChart({ data }) {
  console.log(data);
  const [modifiedData, setModifiedData] = useState();
  const testdata = [
    ["day", "a", "b", "c", "d"],
    ["Mon", 20, 28, 38, 45],
    ["Tue", 31, 38, 55, 66],
    ["Wed", 50, 55, 77, 80],
    ["Thu", 50, 77, 66, 77],
    ["Fri", 15, 66, 22, 68],
  ];
  const options = {
    legend: "none",
    chartArea: {
        backgroundColor: '#292935',
         // Set the desired background color here
      },
      backgroundColor: {
        fill: '#292935', // Set the background color of the entire chart
      },
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: '#ff0000' }, // Set the color of falling (decreasing) candlesticks
        risingColor: { strokeWidth: 0, fill: '#00ff00' }, // Set the color of rising (increasing) candlesticks
      },
      hAxis: {
       
        textStyle: {
          color: 'white', // Set the color of the axis labels
        },},
        vAxis: {
            textStyle: {
              color: 'white', // Set the color of the axis labels
            },}
    
  };
  useEffect(() => {
    const dataa = [['Date','Low', 'Open', 'Close', 'High']];
    let dataKeys = [];
    data?.values?.map((value) => {
      let innerArr = [];

      innerArr.push(value["datetime"]);
      innerArr.push(parseFloat(value["low"]));
      innerArr.push(parseFloat(value["close"]));
      innerArr.push(parseFloat(value["open"]));
      innerArr.push(parseFloat(value["high"]));

      dataa.push(innerArr);
    });
    setModifiedData(dataa);
  }, [data]);
  useEffect(() => {
    console.log(modifiedData);
  }, [modifiedData]);
  return (
    modifiedData && (
      <Chart
        chartType="CandlestickChart"
       
        width="100%"
        height="100%"
        data={modifiedData}
        options={options}
      />
    )
  );
}
