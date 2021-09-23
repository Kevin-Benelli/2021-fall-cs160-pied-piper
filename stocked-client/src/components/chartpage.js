import './chartpage.css';
import React from 'react'
import { useParams } from "react-router-dom";
import { Chart } from './chart';

export const ChartPage = () => {
  const { ticker } = useParams(); 

  return (
    <Chart ticker={ticker}/>
  )
}