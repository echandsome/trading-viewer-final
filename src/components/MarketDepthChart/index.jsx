import React from "react";
import LineSeriesChartWidget from "./LineSeriesChartWidget";
import NoData from "@/assets/no_data.webp";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Errors in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <img src={NoData} alt="no data found" lazy="true" />
        </>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <LineSeriesChartWidget />
    </ErrorBoundary>
  );
}
