import React from 'react'
import './helppage.css'


export const HelpPage = (props) => {


  return (
    <div className="helpBody">
      <h1>Help/FAQ</h1>
      <h2>What is Stocked?</h2>
      <p>
        Stocked is a web application that allows users to track their favorite stocks.
      </p>
      <h2>
        How do I use Stocked?
      </h2>
      <p>
        Search for a stock ticker symbol via the search bar to view the stock's chart.
      </p>
      <p>
        Login via the login dropdown to change your settings.
      </p>
      <h2>
        How do I use the stock chart?
      </h2>
      <p>
        The stock chart shows the stock's price over time. You can change the chart's time period and time resolution via the buttons below the chart.
      </p>
    </div>
  )
} 