import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode, ColorType } from "lightweight-charts";
import { useTheme } from "@mui/material";
import useWebSocketStore from "@/store/useWebSocketStore";
import LoadingSpinner from "../LoadingSpinner/index";

export const ChartComponent = (props) => {
  const { palette } = useTheme();
  const {
    tickerData,
    isExpanded,
    colors: { backgroundColor = "#0d171e", textColor = "#fff" } = {},
  } = props;

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const bidSeriesRef = useRef(null);
  const askSeriesRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor: textColor,
      },
      grid: {
        vertLines: { color: "#242526" },
        horzLines: { color: "#242526" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    bidSeriesRef.current = chartRef.current.addLineSeries({
      color: palette.success.main,
      lineWidth: 2,
      crossHairMarkerVisible: true,
    });

    askSeriesRef.current = chartRef.current.addLineSeries({
      color: palette.error.main,
      lineWidth: 2,
      crossHairMarkerVisible: true,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [backgroundColor, textColor, palette]);

  useEffect(() => {
    if (!tickerData.length || !bidSeriesRef.current || !askSeriesRef.current)
      return;

    const formattedData = tickerData.map((item) => ({
      time: new Date(item.time).getTime() / 1000,
      bid: parseFloat(item.best_bid),
      ask: parseFloat(item.best_ask),
    }));

    const sortedData = formattedData
      .sort((a, b) => a.time - b.time)
      .filter(
        (item, index, array) => index === 0 || item.time > array[index - 1].time
      );

    const bidData = sortedData.map(({ time, bid }) => ({ time, value: bid }));
    const askData = sortedData.map(({ time, ask }) => ({ time, value: ask }));

    bidSeriesRef.current.setData(bidData);
    askSeriesRef.current.setData(askData);

    if (bidData.length > 0) {
      const earliestTime = bidData[0].time;
      const latestTime = Math.max(
        bidData[bidData.length - 1].time,
        askData[askData.length - 1].time
      );

      chartRef.current.timeScale().setVisibleRange({
        from: earliestTime,
        to: latestTime,
      });
    }
  }, [tickerData]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current) {
        chartRef.current.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight
        );
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{
        height: `${isExpanded?.chart ? "100%" : "278px"}`,
        width: "100%",
        position: "relative",
      }}
    />
  );
};

export default function LineSeriesChartWidget() {
  const { tickerData, isLoading, isExpanded } = useWebSocketStore();

  if (isLoading) {
    return (
      <div className="min-h-[275px] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <ChartComponent tickerData={tickerData} isExpanded={isExpanded} />;
}
