import './chart.css';
import loadingGif from "../pics/loading.gif";
import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';

// Helpers
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

export const Chart = (props) => {
  let [chartData, setChartData] = useState(null);
  let [error, setError] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let width = "800px";
  let height = "500px";
  let resolution = "30";
  let symbol = props.ticker.toUpperCase();

  let now = new Date();
  let then = deltaDate(now, -1, 0, 0);
  let from = Math.floor(then.getTime() / 1000);
  let to = Math.floor(now.getTime() / 1000);

  useEffect(() => {
    axios.get("http://localhost:5001/chart_data", { 
      params: {
        resolution: resolution,
        symbol: symbol,
        from: from,
        to: to
      } 
    }).then((response) => {
      // console.log("Got response")
      // console.log(response)
      setChartData(response.data.chartData);
      setError(response.data.error);
      setLoaded(true);
    })
  }, []);

  return (
    <div className="center">
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
    </div>
  );
}

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 1,
      mouseX: null,
      mouseY: null
    };
  }

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

    // Background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Prices Area
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
    for (let i = 0; i < prices.length; i++) {
      let price = prices[i];
      let x = pricesAreaPos + pricesAreaWidth / 2;
      let y = (pricesAreaHeight / prices.length) * i + fontSize + topPadding;
      if (i === 0) topPriceHeight = y;
      else if (i === prices.length - 1) botPriceHeight = y;
      if (Math.abs(y - lastHeight) >= fontSize + pricePadding) {
        ctx.fillText(price.toFixed(2), x, y);
        lastHeight = y;
      }
    }

    // Candles and Time Area
    let candles = this.props.chartData.candles;
    let amtOfCandles = candles["c"].length;
    let rightPadding = 40;
    let leftRightMargin = 5;
    let candleWidth = (candlesAndTimeAreaWidth - rightPadding) / amtOfCandles;
    let stickWidth = Math.max(candleWidth / 20, 1);
    let lastPos = 0;
    let minTimeWidth = 50;
    let candleInfo = [];
    for (let i = 0; i < amtOfCandles; i++) {
      let open = candles["o"][i];
      let close = candles["c"][i];
      let high = candles["h"][i];
      let low = candles["l"][i];
      let timestamp = candles["t"][i];
      let volume = candles["v"][i];

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
      ctx.fillRect(
        candlePos,
        Math.min(openHeight, closeHeight),
        actCandleWidth,
        Math.abs(openHeight - closeHeight)
      );
      ctx.fillRect(stickPos, highHeight, stickWidth, lowHeight - highHeight);

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
        xRange: [candlePos, candlePos + actCandleWidth]
      });

      // Time
      let increment = 5;
      let date = new Date(timestamp * 1000);
      if (
        date.getMinutes() % increment === 0 &&
        Math.abs(stickPos - lastPos) >= minTimeWidth
      ) {
        ctx.fillStyle = timeTextColor;
        let strDate;
        if (date.getDate() === 0) {
          strDate = date.toLocaleDateString(undefined, { month: "short" });
        } else {
          strDate = date.toTimeString().slice(0, 5);
        }
        ctx.fillText(strDate, stickPos, height - timeAreaHeight / 2);
        lastPos = stickPos;
      }
    }

    let dateForm = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
      hour12: false,
      dateStyle: "short"
    });

    // Mouse
    let { mouseX, mouseY } = this.state;
    if (mouseX && mouseY) {
      ctx.setLineDash([8, 6]);
      ctx.strokeStyle = mouseLinesColor;

      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(0, mouseY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(candlesAndTimeAreaWidth, mouseY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX, height);
      ctx.stroke();

      ctx.setLineDash([]);
      let hoverCandle = candleInfo.find(({ xRange }) => {
        return isInRangeInclusive(mouseX, xRange);
      });
      if (hoverCandle) {
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

    // Info
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

  getHeightOfPrice = (price, topPriceHeight, botPriceHeight) => {
    let { max, min } = this.props.chartData.computed;
    return mapRange([min, max], [botPriceHeight, topPriceHeight], price);
  };

  getDisplayedPrices = () => {
    let { max, min } = this.props.chartData.computed;
    let zoomLevel = this.state.zoomLevel;
    let defaultStep = 1;

    let prices = [];
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
          {loaded && error !== null && (
            <div> 
              Error 404: ticker not found
            </div>
          )}
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