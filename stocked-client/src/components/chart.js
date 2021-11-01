import './chart.css';
import loadingGif from "../pics/loading.gif";
import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { Button, Label, Popover } from '@blueprintjs/core';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime';
import { Popover2 } from '@blueprintjs/popover2';

// Helpers

// Date stuff
function deltaDate(input, days, months, years) {
  return new Date(
    input.getFullYear() + years,
    input.getMonth() + months,
    Math.min(
      input.getDate() + days,
      new Date(
        input.getFullYear() + years,
        input.getMonth() + months + 1,
        0
      ).getDate()
    )
  );
}
let dateForm = new Intl.DateTimeFormat("en", {
  timeStyle: "short",
  hour12: false,
  dateStyle: "short"
});

// Range stuff
// from and to are 2 number arrays, s is the number to map
function mapRange(from, to, s) {
  return to[0] + ((s - from[0]) * (to[1] - to[0])) / (from[1] - from[0]);
}
// range is an increasing 2 number array
function isInRangeInclusive(x, range) {
  return x >= range[0] && x <= range[1];
}
function isInRangeExclusive(x, range) {
  return x > range[0] && x < range[1];
}

// Stock chart component
export const Chart = (props) => {
  // Chart data from Finnhub
  let [chartData, setChartData] = useState(null);
  // Error msg
  let [error, setError] = useState(null);
  // Loaded state, used to show loading gif
  let [loaded, setLoaded] = useState(false);
  let width = "800px";
  let height = "500px";
  // Candle resolution - Either "1", "5", "15", "30", "60", "D", "W", or "M"
  let [resolution, setResolution] = useState("30");
  let symbol = props.ticker.toUpperCase();

  // Start 1 day ago, end today by default.
  let now = new Date();
  let then = deltaDate(now, -1, 0, 0);
  let [from, setFrom] = useState(Math.floor(then.getTime() / 1000)); // Need to / 1000 or * 1000 throughout to account for javascript Unix time being in milliseconds, but Finnhub using seconds.  
  let [to, setTo] = useState(Math.floor(now.getTime() / 1000));

  // Call backend to get chart data
  // TODO: Call backend to get setting defaults
  useEffect(() => {
    axios.get("http://localhost:5001/chart_data", { 
      params: {
        resolution: resolution,
        symbol: symbol,
        from: from,
        to: to
      } 
    }).then((response) => {
      setChartData(response.data.chartData);
      setError(response.data.error);
      setLoaded(true);
    })
  }, [resolution, symbol, from, to]);

  // Callbacks for datetime pickers
  let handleFromChange = (date) => {
    setFrom(Math.floor(date.getTime() / 1000));
  }
  let handleToChange = (date) => {
    setTo(Math.floor(date.getTime() / 1000));
  }
  let timePickerProps = {
    showArrowButtons: true,
    useAmPm: false,
  }

  return (
    <div className="chartArea center">
      <div className="chart">
        <StockChart
          chartData={chartData}
          error={error}
          loaded={loaded}
          width={width}
          height={height}
          symbol={symbol}
          resolution={resolution}
          from={from}
          to={to}
        />
      </div>
      { /* If we're done loading, and there's no error, display the chart settings */ }
      {loaded && error === null && (
        <div className="chartSettings">
          { /* Inputs that change resolution, from, and to dates */ }
          <Label>
            From:
            <Popover2 placement="top"
                      content={
                        <DatePicker className="chart-from-datepicker"
                                    onChange={handleFromChange}
                                    timePickerProps={timePickerProps}
                                    timePrecision={TimePrecision.SECOND}
                                    />
                      }>
                <Button text={ dateForm.format(from * 1000) }/>
            </Popover2>
          </Label>
          <Label>
            To:
            <Popover2 placement="top"
                      content={
                        <DatePicker className="chart-from-datepicker"
                                    onChange={handleToChange}
                                    timePickerProps={timePickerProps}
                                    timePrecision={TimePrecision.SECOND}
                                    />
                      }>
                <Button text={ dateForm.format(to * 1000) }/>
            </Popover2>
          </Label>
          <Label>
            Resolution: { /* Either "1", "5", "15", "30", "60", "D", "W", "M" */ }
            <div className="bp3-html-select chart-resolution">
              <select className="chart-resolution-select"
                      onChange={(e) => setResolution(e.target.value)}
                      >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="30" selected>30</option>
                <option value="60">60</option>
                <option value="D">D</option>
                <option value="W">W</option>
                <option value="M">M</option>
              </select>
              <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
            </div>
          </Label>
        </div>
      )}
    </div>
  );
}

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 1, // TODO
      mouseX: null,
      mouseY: null
    };
  }

  // Called every frame by the underlying canvas element
  // Something drawn later in the draw loop will be on top of things drawn before it - like a real painting 
  // So order matters (when we care about things being drawn on top of other things)
  draw = (ctx, frameCount) => {
    // Color palette
    let white = "#ffffff";
    let gray = "#808080";

    let bgColor = "#222222";
    let pricesAreaSeparatorColor = "#2b2b43";
    let posCandleColor = "#26a69a";
    let negCandleColor = "#ee5350";
    let evenCandleColor = gray;
    let pricesTextColor = white;
    let timeTextColor = white;
    let infoTextColor = white;
    let mouseLinesColor = "#758696";
    let mouseTimeBGColor = "#808080";

    // Widths and heights
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    let pricesAreaWidth = 60;
    let candlesAndTimeAreaWidth = width - pricesAreaWidth;
    let timeAreaHeight = 40;
    let pricesAreaHeight = height - timeAreaHeight;

    // Draw Background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw Prices Area
    let pricesAreaPos = width - pricesAreaWidth;
    let pricesAreaSeparatorWidth = 2;
    ctx.fillStyle = pricesAreaSeparatorColor;
    ctx.fillRect(pricesAreaPos, 0, pricesAreaSeparatorWidth, height);

    ctx.fillStyle = pricesTextColor;
    let fontSize = 15;
    let pricePadding = 10;
    ctx.font = fontSize + "px Georgia";
    let topPadding = 5;
    let prices = this.getDisplayedPrices();

    let topPriceHeight, botPriceHeight;
    let lastHeight = 0;
    ctx.textAlign = "center";
    // Loop thru prices and draw them 
    for (let i = 0; i < prices.length; i++) {
      let price = prices[i];
      let x = pricesAreaPos + pricesAreaWidth / 2;
      let y = (pricesAreaHeight / prices.length) * i + fontSize + topPadding;
      if (i === 0) topPriceHeight = y;
      else if (i === prices.length - 1) botPriceHeight = y;
      if (Math.abs(y - lastHeight) >= fontSize + pricePadding) { // Only draw if we won't overlap
        ctx.fillText(price.toFixed(2), x, y);
        lastHeight = y;
      }
    }

    // Candles Area
    let candles = this.props.chartData.candles;
    let amtOfCandles = candles["c"].length;
    let rightPadding = 40;
    let leftRightMargin = 5;
    let candleWidth = (candlesAndTimeAreaWidth - rightPadding) / amtOfCandles;
    let stickWidth = Math.max(candleWidth / 20, 1);
    let lastPos = 0;
    let minTimeWidth = 50; // Minimum width of drawn time in pixels
    let candleInfo = [];
    // Loop thru candles
    for (let i = 0; i < amtOfCandles; i++) {
      let open = candles["o"][i];
      let close = candles["c"][i];
      let high = candles["h"][i];
      let low = candles["l"][i];
      let timestamp = candles["t"][i];
      let volume = candles["v"][i];

      // Calculate pixel heights, relative to canvas, of open, close, high, and low prices
      let openHeight = this.getHeightOfPrice(
        open,
        topPriceHeight,
        botPriceHeight
      );
      let closeHeight = this.getHeightOfPrice(
        close,
        topPriceHeight,
        botPriceHeight
      );
      let highHeight = this.getHeightOfPrice(
        high,
        topPriceHeight,
        botPriceHeight
      );
      let lowHeight = this.getHeightOfPrice(
        low,
        topPriceHeight,
        botPriceHeight
      );

      // Change color based on price moving up, down, or flat thru the candle range
      let candleColor;
      if (open < close) {
        candleColor = posCandleColor;
      } else if (open > close) {
        candleColor = negCandleColor;
      } else {
        candleColor = evenCandleColor;
      }

      ctx.fillStyle = candleColor;
      let candlePos = i * candleWidth + leftRightMargin;
      let actCandleWidth = candleWidth - leftRightMargin;
      let stickPos = candlePos + actCandleWidth / 2 - stickWidth / 2;
      // Draw the candle
      ctx.fillRect(
        candlePos,
        Math.min(openHeight, closeHeight),
        actCandleWidth,
        Math.abs(openHeight - closeHeight)
      );
      // Draw the stick in the middle of the candle
      ctx.fillRect(stickPos, highHeight, stickWidth, lowHeight - highHeight);

      // Push given/calculated info about the candle to an array so we don't have to recalculate it later and its all in one place - not used for much right now besides mouse hovering
      candleInfo.push({
        timestamp: timestamp,
        close: close,
        closeHeight: closeHeight,
        open: open,
        openHeight: openHeight,
        high: high,
        highHeight: highHeight,
        low: low,
        lowHeight: lowHeight,
        xRange: [candlePos, candlePos + actCandleWidth],
        middlePos: stickPos,
      });

      // Time Area
      let date = new Date(timestamp * 1000);
      // Draw the time differently based on resolution
      if(["1", "5", "15", "30", "60"].includes(this.props.resolution)) { // Hour/minute
        let increment = 5;
        if (
          date.getMinutes() % increment === 0 &&
          Math.abs(stickPos - lastPos) >= minTimeWidth // Only draw if we won't overlap
        ) {
          ctx.fillStyle = timeTextColor;
          let strDate;
          if (date.getDate() === 0) {
            strDate = date.toLocaleDateString(undefined, { month: "short" });
          } else {
            strDate = date.toTimeString().slice(0, 5);
          }
          ctx.fillText(strDate, stickPos, height - timeAreaHeight / 2); // Draw time underneath the candlestick
          lastPos = stickPos; // Track last x position to avoid overlapping
        }
      } else {
        if (Math.abs(stickPos - lastPos) >= minTimeWidth) { // Only draw if we won't overlap
          ctx.fillStyle = timeTextColor;
          let strDate;
          if (date.getDate() === 0) {
            strDate = date.toLocaleDateString(undefined, { month: "short" });
          } else {
            if(["D", "W"].includes(this.props.resolution)) { // Day/month
              strDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' });
            } else if("M" === this.props.resolution) { // Month/year
              strDate = date.toLocaleDateString('en-US', { month: 'short', year: "2-digit" });
            }
          }
          ctx.fillText(strDate, stickPos, height - timeAreaHeight / 2); // Draw time underneath the candlestick
          lastPos = stickPos; // Track last x position to avoid overlapping
        }
      }
    }

    // Interactive Bits
    // Mouse hover crosshair
    let { mouseX, mouseY } = this.state;
    if (mouseX && mouseY) { // If we're hovering over the canvas
      // Draw dashed crosshair centered at mouse
      ctx.setLineDash([8, 6]);
      ctx.strokeStyle = mouseLinesColor;
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(0, mouseY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(candlesAndTimeAreaWidth, mouseY); // Doesn't go into prices area
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX, height);
      ctx.stroke();

      ctx.setLineDash([]); // Stop drawing dashed lines

      // Find closest candle to mouse
      let minimumDistance = Number.MAX_SAFE_INTEGER;
      let hoverCandle = null;
      for(let candle of candleInfo) {
        let distance = Math.abs(mouseX - candle.middlePos);
        if (distance < minimumDistance) {
          minimumDistance = distance;
          hoverCandle = candle;
        }
      }

      // Draw info about the candle underneath the crosshair
      if (hoverCandle) { // If we're hovering over a candle
        let { timestamp, open, close, low, high } = hoverCandle;
        let mouseDate = new Date(timestamp * 1000);
        ctx.fillStyle = "green";
        ctx.textAlign = "left";
        ctx.fillText(
          "Time: " +
            dateForm.format(mouseDate) +
            ", Open: " +
            open.toFixed(2) +
            ", Close: " +
            close.toFixed(2) +
            ", Low: " +
            low.toFixed(2) +
            ", High: " +
            high.toFixed(2),
          5,
          40
        );
      }
    }

    // Draw info about current ticker and settings
    ctx.fillStyle = infoTextColor;
    ctx.textAlign = "left";
    let infoFrom = new Date(this.props.from * 1000);
    let infoTo = new Date(this.props.to * 1000);
    let infoStr =
      this.props.symbol +
      " from " +
      dateForm.format(infoFrom) +
      " to " +
      dateForm.format(infoTo) +
      ", Resolution: " +
      this.props.resolution;
    ctx.fillText(infoStr, 5, fontSize + 5);
  };

  // Convert price to height, given the top and bottom price height (relative to the canvas)
  getHeightOfPrice = (price, topPriceHeight, botPriceHeight) => {
    let { max, min } = this.props.chartData.computed;
    // Given two ranges: min price-max price, and bottom height-top height, where would a given price be? Map one range to another
    return mapRange([min, max], [botPriceHeight, topPriceHeight], price);
  };

  // Generate an array of displayed price values for the chart
  getDisplayedPrices = () => {
    let { max, min } = this.props.chartData.computed;
    // let zoomLevel = this.state.zoomLevel; // TODO
    let zoomLevel = 1;
    let defaultStep = 1;

    let prices = [];
    // Start at max price, go down step by step until we hit min price
    // Will always include max and min
    for (
      let curr = Math.ceil(max);
      curr > min;
      curr -= zoomLevel * defaultStep
    ) {
      prices.push(curr);
    }
    prices.push(Math.floor(min));
    return prices;
  };

  // Keep track of mouse position
  updateMousePos = (canvasX, canvasY) => {
    this.setState({
      mouseX: canvasX,
      mouseY: canvasY
    });
  };

  render() {
    let { width, height, loaded, error } = this.props;

    return (
      <div className="center">
        <div className="chart" style={{ width: width, height: height }}>
        { /* If we're done loading, and there's no error, display the canvas */ }
          {loaded && error === null && (
            <Canvas
              draw={this.draw}
              width={width}
              height={height}
              style={{
                width: width,
                height: height
                // border: "1px solid green"
              }}
              updateMousePos={this.updateMousePos}
            />
          )}
          { /* If we're done loading, but there's an error, display the error */ }
          {loaded && error !== null && (
            <React.Fragment> { /* React.Fragment is just a way to wrap multiple child components without adding another actual component onto the rendered page. When doing conditional rendering like this you can only have one component in the ( ) section */ }
              <div> 
                Error 404: ticker not found
              </div>
              <div> 
                More info: {error}
              </div>
            </React.Fragment>
          )}
          { /* If we're  still loading, show a loading spinner */ }
          {!loaded && <img src={loadingGif} alt="Loading..." />}
        </div>
      </div>
    );
  }
}

const Canvas = (props) => {
  const { updateMousePos, draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", function (e) {
      var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
      var canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas
      var canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make
      updateMousePos(canvasX, canvasY);
    });
    canvas.addEventListener("mouseleave", function (e) {
      updateMousePos(null, null);
    });
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...rest} />;
};